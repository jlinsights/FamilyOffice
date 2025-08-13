// FamilyOffice S - Clerk 웹훅 처리
// Clerk 사용자 이벤트를 받아 Supabase에 동기화하는 API 엔드포인트

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';

// Clerk 웹훅 이벤트 타입 정의
type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{ email_address: string; id: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    phone_numbers?: Array<{ phone_number: string; id: string }>;
    created_at: number;
    updated_at: number;
    last_sign_in_at?: number;
    private_metadata?: Record<string, any>;
    public_metadata?: Record<string, any>;
    unsafe_metadata?: Record<string, any>;
  };
};

export async function POST(req: NextRequest) {
  try {
    // 환경 변수 런타임 검증
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required Supabase environment variables');
      return new NextResponse('Error: Missing Supabase configuration', { status: 500 });
    }

    if (!webhookSecret) {
      console.error('Missing CLERK_WEBHOOK_SECRET environment variable');
      return new NextResponse('Error: Missing webhook secret', { status: 500 });
    }

    // Supabase 클라이언트 생성
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 웹훅 서명 검증을 위한 헤더 가져오기
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // 헤더가 없으면 에러 반환
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers');
      return new NextResponse('Error: Missing svix headers', { status: 400 });
    }

    // 요청 본문 가져오기
    const body = await req.text();

    // 웹훅 서명 검증
    const wh = new Webhook(webhookSecret);
    
    let evt: ClerkWebhookEvent;
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as ClerkWebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new NextResponse('Error: Verification error', { status: 400 });
    }

    // 이벤트 타입에 따른 처리
    const { type, data } = evt;
    console.log(`Clerk webhook received: ${type} for user ${data.id}`);

    switch (type) {
      case 'user.created':
        await handleUserCreated(data, supabase);
        break;
      case 'user.updated':
        await handleUserUpdated(data, supabase);
        break;
      case 'user.deleted':
        await handleUserDeleted(data.id, supabase);
        break;
      case 'session.created':
        await handleSignIn(data.id, supabase);
        break;
      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse(
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}

// 사용자 생성 처리
async function handleUserCreated(userData: ClerkWebhookEvent['data'], supabase: any) {
  try {
    const primaryEmail = userData.email_addresses.find(email => email.id === userData.email_addresses[0]?.id);
    const primaryPhone = userData.phone_numbers?.[0];

    if (!primaryEmail) {
      throw new Error('No primary email found for user');
    }

    // 사용자 메타데이터 정리
    const metadata = {
      ...userData.private_metadata,
      ...userData.public_metadata,
      clerk_created_at: userData.created_at,
      clerk_updated_at: userData.updated_at,
    };

    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_id: userData.id,
        email: primaryEmail.email_address,
        first_name: userData.first_name || null,
        last_name: userData.last_name || null,
        image_url: userData.image_url || null,
        phone_number: primaryPhone?.phone_number || null,
        last_sign_in_at: userData.last_sign_in_at 
          ? new Date(userData.last_sign_in_at).toISOString() 
          : null,
        metadata: metadata,
      });

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    console.log(`User created in Supabase:`, data);
  } catch (error) {
    console.error('Error creating user in Supabase:', error);
    throw error;
  }
}

// 사용자 업데이트 처리
async function handleUserUpdated(userData: ClerkWebhookEvent['data'], supabase: any) {
  try {
    const primaryEmail = userData.email_addresses.find(email => email.id === userData.email_addresses[0]?.id);
    const primaryPhone = userData.phone_numbers?.[0];

    if (!primaryEmail) {
      throw new Error('No primary email found for user');
    }

    // 사용자 메타데이터 정리
    const metadata = {
      ...userData.private_metadata,
      ...userData.public_metadata,
      clerk_created_at: userData.created_at,
      clerk_updated_at: userData.updated_at,
    };

    const { data, error } = await supabase
      .from('users')
      .update({
        email: primaryEmail.email_address,
        first_name: userData.first_name || null,
        last_name: userData.last_name || null,
        image_url: userData.image_url || null,
        phone_number: primaryPhone?.phone_number || null,
        metadata: metadata,
      })
      .eq('clerk_id', userData.id);

    if (error) {
      throw new Error(`Supabase update error: ${error.message}`);
    }

    console.log(`User updated in Supabase:`, data);
  } catch (error) {
    console.error('Error updating user in Supabase:', error);
    throw error;
  }
}

// 사용자 삭제 처리 (실제로는 비활성화)
async function handleUserDeleted(userId: string, supabase: any) {
  try {
    // 실제 삭제 대신 메타데이터에 삭제 표시
    const { data, error } = await supabase
      .from('users')
      .update({
        metadata: { deleted: true, deleted_at: new Date().toISOString() }
      })
      .eq('clerk_id', userId);

    if (error) {
      throw new Error(`Supabase soft delete error: ${error.message}`);
    }

    console.log(`User soft deleted in Supabase:`, data);
  } catch (error) {
    console.error('Error soft deleting user in Supabase:', error);
    throw error;
  }
}

// 로그인 처리 (마지막 로그인 시간 업데이트)
async function handleSignIn(userId: string, supabase: any) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        last_sign_in_at: new Date().toISOString()
      })
      .eq('clerk_id', userId);

    if (error) {
      throw new Error(`Supabase sign in update error: ${error.message}`);
    }

    console.log(`User sign in recorded in Supabase:`, data);
  } catch (error) {
    console.error('Error recording sign in in Supabase:', error);
    throw error;
  }
} 