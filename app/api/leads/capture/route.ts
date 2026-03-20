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
import { NextRequest, NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Supabase row types (leads 테이블)
interface LeadRow {
  id: string;
  email: string;
  name?: string;
  beehiiv_subscription_id?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referring_url?: string;
  total_assets?: number;
  total_debts?: number;
  net_assets?: number;
  estimated_tax?: number;
  has_spouse?: boolean;
  num_children?: number;
  num_minor_children?: number;
  beehiiv_status?: string;
  automation_started_at?: string;
  updated_at?: string;
}

// Request body interface
interface CaptureLeadRequest {
  email: string;
  name?: string;
  calculationResult?: {
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
  _hp?: string;  // 허니팟 필드 (봇 감지)
  _ts?: number;  // 폼 로드 타임스탬프 (속도 검증)
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

    // 봇 방어: 허니팟 필드가 채워져 있으면 봇으로 간주
    if (body._hp) {
      return NextResponse.json<CaptureLeadResponse>({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다.',
      });
    }

    // 봇 방어: 2초 미만 제출은 봇으로 간주
    if (body._ts && Date.now() - body._ts < 2000) {
      return NextResponse.json<CaptureLeadResponse>({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다.',
      });
    }

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

    // If it's a simple lead capture without calculation (e.g. access gate)
    // we allow it, but we won't have financial data.
    // Ensure at least source is present.
    if (!body.calculationResult && !body.source) {
      return NextResponse.json<CaptureLeadResponse>(
        {
          success: false,
          message: '잘못된 요청입니다.',
          error: 'MISSING_DATA',
        },
        { status: 400 }
      );
    }

    const { email, name, calculationResult, source, utm, referringUrl } = body;

    // Create Supabase client
    const supabase = await createClient();

    // Check if lead already exists
    // Note: Database 타입 미생성으로 Supabase 쿼리에 타입 단언 필요 (supabase gen types 실행 후 제거 가능)
    const leads = supabase.from('leads') as any;
    const emailEvents = supabase.from('email_events') as any;

    const { data: existingLead } = (await leads
      .select('id, email, beehiiv_subscription_id')
      .eq('email', email)
      .single()) as { data: Pick<LeadRow, 'id' | 'email' | 'beehiiv_subscription_id'> | null };

    let leadId: string;
    let beehiivSubscriptionId: string | undefined;

    if (existingLead) {
      // Lead exists - update with new calculation
      leadId = existingLead.id;
      beehiivSubscriptionId = existingLead.beehiiv_subscription_id || undefined;

      const leadData: Record<string, unknown> = {
        name: name || undefined,
        source: source || 'calculator',
        utm_source: utm?.source,
        utm_medium: utm?.medium,
        utm_campaign: utm?.campaign,
        utm_content: utm?.content,
        referring_url: referringUrl,
        updated_at: new Date().toISOString(),
      };

      if (calculationResult) {
        leadData.total_assets = calculationResult.totalAssets;
        leadData.total_debts = calculationResult.totalDebts;
        leadData.net_assets = calculationResult.netAssets;
        leadData.estimated_tax = calculationResult.estimatedTax;
        leadData.has_spouse = calculationResult.hasSpouse;
        leadData.num_children = calculationResult.numChildren;
        leadData.num_minor_children = calculationResult.numMinorChildren || 0;
      }

      const { error: updateError } = await leads
        .update(leadData)
        .eq('id', leadId);

      if (updateError) {
        console.error('Failed to update existing lead:', updateError);
        throw new Error('데이터 업데이트에 실패했습니다.');
      }

      return NextResponse.json<CaptureLeadResponse>({
        success: true,
        leadId,
        beehiivSubscriptionId,
        message: '이미 등록된 이메일입니다. 정보가 업데이트되었습니다.',
      });
    }

    // New lead - insert into Supabase
    const newLeadData: Record<string, unknown> = {
      email,
      name,
      source: source || 'calculator',
      utm_source: utm?.source,
      utm_medium: utm?.medium,
      utm_campaign: utm?.campaign,
      utm_content: utm?.content,
      referring_url: referringUrl,
    };

    if (calculationResult) {
      newLeadData.total_assets = calculationResult.totalAssets;
      newLeadData.total_debts = calculationResult.totalDebts;
      newLeadData.net_assets = calculationResult.netAssets;
      newLeadData.estimated_tax = calculationResult.estimatedTax;
      newLeadData.has_spouse = calculationResult.hasSpouse;
      newLeadData.num_children = calculationResult.numChildren;
      newLeadData.num_minor_children = calculationResult.numMinorChildren || 0;
    }

    const { data: newLead, error: insertError } = (await leads
      .insert(newLeadData)
      .select('id')
      .single()) as { data: Pick<LeadRow, 'id'> | null; error: Error | null };

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
        totalAssets: calculationResult?.totalAssets || 0,
        estimatedTax: calculationResult?.estimatedTax || 0,
        hasSpouse: calculationResult?.hasSpouse || false,
        numChildren: calculationResult?.numChildren || 0,
        source: source || 'calculator',
        utm,
      });

      beehiivSubscriptionId = beehiivResponse?.data?.id;

      // Update lead with Beehiiv subscription ID
      if (beehiivSubscriptionId) {
        await leads
          .update({
            beehiiv_subscription_id: beehiivSubscriptionId,
            beehiiv_status: 'active',
            automation_started_at: new Date().toISOString(),
          })
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
      await emailEvents.insert({
        lead_id: leadId,
        event_type: 'captured',
        event_data: {
          source: source || 'calculator',
          utm,
        },
      });
    } catch (eventError) {
      console.error('Failed to log event (non-fatal):', eventError);
    }

    return NextResponse.json<CaptureLeadResponse>({
      success: true,
      leadId,
      beehiivSubscriptionId,
      message:
        '이메일이 성공적으로 등록되었습니다. 절세 가이드를 이메일로 보내드릴게요!',
    });
  } catch (error) {
    console.error('Lead capture error:', error);

    return NextResponse.json<CaptureLeadResponse>(
      {
        success: false,
        message:
          '이메일 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
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
