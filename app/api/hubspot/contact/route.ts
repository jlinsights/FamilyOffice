import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/lib/env';

// HubSpot Contact 생성/업데이트 스키마
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().optional(),
  // HubSpot 추적 정보
  context: z.object({
    hutk: z.string().optional(),
    pageUri: z.string().optional(),
    pageName: z.string().optional(),
    pageId: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 환경변수 확인
    const hubspotApiKey = env.HUBSPOT_API_KEY;
    const hubspotToken = env.HUBSPOT_PRIVATE_ACCESS_TOKEN;
    
    if (!hubspotApiKey && !hubspotToken) {
      console.error('HubSpot API 키가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'HubSpot integration not configured' },
        { status: 500 }
      );
    }

    // 요청 데이터 검증
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // HubSpot Contact 프로퍼티 매핑
    const properties = {
      firstname: validatedData.firstName,
      lastname: validatedData.lastName || '',
      email: validatedData.email,
      phone: validatedData.phone || '',
      company: validatedData.company || '',
      service_type: validatedData.serviceType || '',
      message: validatedData.message || '',
      // 추가 정보
      hs_lead_status: 'NEW',
      source: 'Website Contact Form',
      website: validatedData.context?.pageUri || '',
    };

    // HubSpot API 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Private Access Token 우선 사용
    if (hubspotToken) {
      headers['Authorization'] = `Bearer ${hubspotToken}`;
    } else if (hubspotApiKey) {
      // API Key는 URL 파라미터로 전달
      headers['Authorization'] = `Bearer ${hubspotApiKey}`;
    }

    // HubSpot Contacts API 호출
    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });

    const responseData = await hubspotResponse.json();

    if (!hubspotResponse.ok) {
      console.error('HubSpot API 오류:', responseData);
      
      // 중복 연락처 처리
      if (responseData.category === 'VALIDATION_ERROR' && 
          responseData.message?.includes('Contact already exists')) {
        
        // 기존 연락처 업데이트 시도
        try {
          const updateResponse = await updateExistingContact(
            validatedData.email,
            properties,
            headers
          );
          
          return NextResponse.json({
            success: true,
            action: 'updated',
            contact: updateResponse,
            message: '기존 연락처 정보가 업데이트되었습니다.'
          });
        } catch (updateError) {
          console.error('연락처 업데이트 실패:', updateError);
          return NextResponse.json(
            { error: 'Contact already exists and update failed' },
            { status: 409 }
          );
        }
      }

      return NextResponse.json(
        { 
          error: 'HubSpot API error',
          details: responseData.message || 'Unknown error'
        },
        { status: hubspotResponse.status }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      action: 'created',
      contact: responseData,
      message: '연락처가 성공적으로 등록되었습니다.'
    });

  } catch (error) {
    console.error('HubSpot 연락처 생성 오류:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 기존 연락처 업데이트 함수
async function updateExistingContact(
  email: string,
  properties: Record<string, any>,
  headers: Record<string, string>
) {
  // 이메일로 연락처 검색
  const searchResponse = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/search`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email
          }]
        }]
      })
    }
  );

  if (!searchResponse.ok) {
    throw new Error('Contact search failed');
  }

  const searchData = await searchResponse.json();
  
  if (searchData.results?.length > 0) {
    const contactId = searchData.results[0].id;
    
    // 연락처 업데이트
    const updateResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties })
      }
    );

    if (!updateResponse.ok) {
      throw new Error('Contact update failed');
    }

    return await updateResponse.json();
  }

  throw new Error('Contact not found for update');
}

// GET 요청으로 연락처 조회 (선택사항)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  try {
    const hubspotToken = env.HUBSPOT_PRIVATE_ACCESS_TOKEN;
    const hubspotApiKey = env.HUBSPOT_API_KEY;
    
    if (!hubspotApiKey && !hubspotToken) {
      return NextResponse.json(
        { error: 'HubSpot integration not configured' },
        { status: 500 }
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (hubspotToken) {
      headers['Authorization'] = `Bearer ${hubspotToken}`;
    } else if (hubspotApiKey) {
      headers['Authorization'] = `Bearer ${hubspotApiKey}`;
    }

    // 연락처 검색
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'HubSpot API error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      contacts: data.results || [],
      total: data.total || 0
    });

  } catch (error) {
    console.error('HubSpot 연락처 조회 오류:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}