/**
 * Lead Capture API
 *
 * POST /api/leads/capture
 *
 * Captures email leads from calculator and initiates email automation sequence
 *
 * Flow:
 * 1. Validate email and calculation data
 * 2. Save to Supabase leads table
 * 3. Add subscriber to Beehiiv
 * 4. Start 7-day email automation
 * 5. Track GA4 event
 * 6. Return success response
 */

import { beehiiv } from '@/lib/beehiiv/client';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Request body interface
interface CaptureLeadRequest {
  email: string;
  name?: string;
  calculationResult: {
    totalAssets: number;
    totalDebts: number;
    netAssets: number;
    estimatedTax: number;
    hasSpouse: boolean;
    numChildren: number;
    numMinorChildren?: number;
  };
  source?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  referringUrl?: string;
}

// Response interface
interface CaptureLeadResponse {
  success: boolean;
  leadId?: string;
  beehiivSubscriptionId?: string | undefined;
  message: string;
  error?: string;
}

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * POST /api/leads/capture
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CaptureLeadRequest = await request.json();

    // Validate required fields
    if (!body.email || !EMAIL_REGEX.test(body.email)) {
      return NextResponse.json<CaptureLeadResponse>(
        {
          success: false,
          message: '유효한 이메일 주소를 입력해주세요.',
          error: 'INVALID_EMAIL',
        },
        { status: 400 }
      );
    }

    if (!body.calculationResult) {
      return NextResponse.json<CaptureLeadResponse>(
        {
          success: false,
          message: '계산 결과가 필요합니다.',
          error: 'MISSING_CALCULATION',
        },
        { status: 400 }
      );
    }

    const { email, name, calculationResult, source, utm, referringUrl } = body;

    // Create Supabase client
    const supabase = await createClient();

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, email, beehiiv_subscription_id')
      .eq('email', email)
      .single() as any;

    let leadId: string;
    let beehiivSubscriptionId: string | undefined;

    if (existingLead) {
      // Lead exists - update with new calculation
      leadId = existingLead.id;
      beehiivSubscriptionId = existingLead.beehiiv_subscription_id || undefined;

      const { error: updateError } = (await (supabase
        .from('leads') as any)
        .update({
          name: name || existingLead.name,
          total_assets: calculationResult.totalAssets,
          total_debts: calculationResult.totalDebts,
          net_assets: calculationResult.netAssets,
          estimated_tax: calculationResult.estimatedTax,
          has_spouse: calculationResult.hasSpouse,
          num_children: calculationResult.numChildren,
          num_minor_children: calculationResult.numMinorChildren || 0,
          source: source || 'calculator',
          utm_source: utm?.source,
          utm_medium: utm?.medium,
          utm_campaign: utm?.campaign,
          utm_content: utm?.content,
          referring_url: referringUrl,
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', leadId)) as any;

      if (updateError) {
        console.error('Failed to update existing lead:', updateError);
        throw new Error('데이터 업데이트에 실패했습니다.');
      }

      return NextResponse.json<CaptureLeadResponse>({
        success: true,
        leadId,
        beehiivSubscriptionId,
        message: '이미 등록된 이메일입니다. 계산 결과가 업데이트되었습니다.',
      });
    }

    // New lead - insert into Supabase
    const { data: newLead, error: insertError } = (await supabase
      .from('leads')
      .insert({
        email,
        name,
        total_assets: calculationResult.totalAssets,
        total_debts: calculationResult.totalDebts,
        net_assets: calculationResult.netAssets,
        estimated_tax: calculationResult.estimatedTax,
        has_spouse: calculationResult.hasSpouse,
        num_children: calculationResult.numChildren,
        num_minor_children: calculationResult.numMinorChildren || 0,
        source: source || 'calculator',
        utm_source: utm?.source,
        utm_medium: utm?.medium,
        utm_campaign: utm?.campaign,
        utm_content: utm?.content,
        referring_url: referringUrl,
      } as any)
      .select('id')
      .single()) as any;

    if (insertError || !newLead) {
      console.error('Failed to insert lead:', insertError);
      throw new Error('데이터 저장에 실패했습니다.');
    }

    leadId = newLead.id;

    // Add to Beehiiv and start automation
    try {
      const beehiivResponse = await beehiiv.addCalculatorLead({
        email,
        name: name || undefined,
        totalAssets: calculationResult.totalAssets,
        estimatedTax: calculationResult.estimatedTax,
        hasSpouse: calculationResult.hasSpouse,
        numChildren: calculationResult.numChildren,
        source: source || 'calculator',
        utm,
      });

      beehiivSubscriptionId = beehiivResponse?.data?.id;

      // Update lead with Beehiiv subscription ID
      if (beehiivSubscriptionId) {
        await (supabase
          .from('leads') as any)
          .update({
            beehiiv_subscription_id: beehiivSubscriptionId,
            beehiiv_status: 'active',
            automation_started_at: new Date().toISOString(),
          } as any)
          .eq('id', leadId);
      }

      // Start automation sequence
      await beehiiv.startAutomation(email);

      console.log('✅ Lead captured and automation started:', {
        leadId,
        email,
        beehiivSubscriptionId,
      });
    } catch (beehiivError) {
      // Beehiiv failed but Supabase succeeded - log error but continue
      console.error('Beehiiv integration failed (non-fatal):', beehiivError);
      // Still return success since data was saved to Supabase
    }

    // Log email event
    try {
      (await supabase.from('email_events').insert({
        lead_id: leadId,
        event_type: 'captured',
        event_data: {
          source: source || 'calculator',
          utm,
        } as any,
      } as any)) as any;
    } catch (eventError) {
      console.error('Failed to log event (non-fatal):', eventError);
    }

    return NextResponse.json<CaptureLeadResponse>({
      success: true,
      leadId,
      beehiivSubscriptionId,
      message: '이메일이 성공적으로 등록되었습니다. 절세 가이드를 이메일로 보내드릴게요!',
    });
  } catch (error) {
    console.error('Lead capture error:', error);

    return NextResponse.json<CaptureLeadResponse>(
      {
        success: false,
        message: '이메일 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads/capture
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/leads/capture',
    methods: ['POST'],
    version: '1.0.0',
  });
}
