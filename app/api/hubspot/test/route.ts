import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    // 환경변수 확인
    const hubspotToken = env.HUBSPOT_PRIVATE_ACCESS_TOKEN;
    const hubspotApiKey = env.HUBSPOT_API_KEY;
    const portalId = env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    
    if (!hubspotToken && !hubspotApiKey) {
      return NextResponse.json(
        { 
          success: false,
          error: 'HubSpot API 키가 설정되지 않았습니다.',
          details: {
            hasToken: !!hubspotToken,
            hasApiKey: !!hubspotApiKey,
            hasPortalId: !!portalId
          }
        },
        { status: 500 }
      );
    }

    // HubSpot API 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (hubspotToken) {
      headers['Authorization'] = `Bearer ${hubspotToken}`;
    } else if (hubspotApiKey) {
      headers['Authorization'] = `Bearer ${hubspotApiKey}`;
    }

    // 1. Account 정보 확인
    const accountResponse = await fetch('https://api.hubapi.com/account-info/v3/details', {
      headers,
    });

    if (!accountResponse.ok) {
      const accountError = await accountResponse.json();
      return NextResponse.json({
        success: false,
        error: 'HubSpot 계정 인증 실패',
        details: accountError,
        status: accountResponse.status
      });
    }

    const accountData = await accountResponse.json();

    // 2. Contact Properties 확인
    const propertiesResponse = await fetch('https://api.hubapi.com/crm/v3/properties/contacts', {
      headers,
    });

    const propertiesData = propertiesResponse.ok ? await propertiesResponse.json() : null;

    // 3. 필요한 Custom Properties 확인
    const requiredProperties = ['service_type', 'message'];
    const customProperties = propertiesData?.results?.filter((prop: any) => 
      requiredProperties.includes(prop.name)
    ) || [];

    // 4. 테스트 Contact 생성 (선택사항)
    const testContact = {
      properties: {
        firstname: 'Test',
        lastname: 'Contact',
        email: `test_${Date.now()}@example.com`,
        phone: '010-0000-0000',
        service_type: '테스트',
        message: 'HubSpot 연동 테스트'
      }
    };

    let contactCreated = false;
    let contactData = null;

    try {
      const contactResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify(testContact),
      });

      if (contactResponse.ok) {
        contactCreated = true;
        contactData = await contactResponse.json();
      }
    } catch (contactError) {
      console.log('테스트 Contact 생성 실패 (정상):', contactError);
    }

    return NextResponse.json({
      success: true,
      message: 'HubSpot 연동 테스트 완료',
      results: {
        account: {
          portalId: accountData.portalId,
          accountType: accountData.accountType,
          currencyCode: accountData.currencyCode,
          utcOffset: accountData.utcOffset
        },
        authentication: {
          method: hubspotToken ? 'Private Access Token' : 'API Key',
          status: 'Success'
        },
        properties: {
          total: propertiesData?.results?.length || 0,
          customPropertiesFound: customProperties.length,
          requiredProperties: requiredProperties,
          foundProperties: customProperties.map((prop: any) => ({
            name: prop.name,
            label: prop.label,
            type: prop.type
          }))
        },
        testContact: {
          created: contactCreated,
          id: contactData?.id || null
        }
      },
      recommendations: customProperties.length < requiredProperties.length 
        ? [
            'HubSpot에서 다음 Custom Properties를 생성하세요:',
            ...requiredProperties.filter(prop => 
              !customProperties.some((cp: any) => cp.name === prop)
            ).map(prop => `- ${prop} (Single-line text)`)
          ]
        : ['모든 필수 Properties가 설정되었습니다.']
    });

  } catch (error) {
    console.error('HubSpot 테스트 오류:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'HubSpot API 테스트 실패',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST 요청으로 테스트 Contact 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('contactId');

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const hubspotToken = env.HUBSPOT_PRIVATE_ACCESS_TOKEN;
    const hubspotApiKey = env.HUBSPOT_API_KEY;

    const headers: Record<string, string> = {};
    
    if (hubspotToken) {
      headers['Authorization'] = `Bearer ${hubspotToken}`;
    } else if (hubspotApiKey) {
      headers['Authorization'] = `Bearer ${hubspotApiKey}`;
    }

    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: '테스트 Contact가 삭제되었습니다.'
      });
    } else {
      const errorData = await response.json();
      return NextResponse.json({
        success: false,
        error: 'Contact 삭제 실패',
        details: errorData
      });
    }

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Contact 삭제 중 오류 발생',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}