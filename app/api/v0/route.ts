import { NextRequest, NextResponse } from 'next/server'
import { getV0ApiKey } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    // 안전한 v0 API key 가져오기
    const apiKey = getV0ApiKey()

    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'V0 API key가 설정되지 않았거나 형식이 올바르지 않습니다.',
          details: 'V0_API_KEY 환경변수를 확인해주세요.'
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    // 요청 데이터 검증
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'prompt는 필수 문자열 필드입니다.' },
        { status: 400 }
      )
    }

    console.log('🚀 v0 API 요청 시작:', { 
      prompt: body.prompt.substring(0, 100) + '...', // 로그에서는 일부만 표시
      timestamp: new Date().toISOString()
    })
    
    // v0 API 호출 (실제 엔드포인트는 v0 문서 참조)
    const response = await fetch('https://api.v0.dev/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'FamilyOffice-S/1.0'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: body.prompt
          }
        ],
        model: 'v0-1', // 또는 원하는 모델명
        stream: false, // 스트리밍이 필요하면 true로 변경
        ...body.options // 추가 옵션들
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ v0 API 응답 오류:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      
      throw new Error(`v0 API 요청 실패: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    console.log('✅ v0 API 응답 성공:', { 
      timestamp: new Date().toISOString(),
      responseLength: JSON.stringify(data).length
    })

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('💥 v0 API 호출 중 오류:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: '내부 서버 오류가 발생했습니다.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// GET 요청 처리 - API 상태 확인
export async function GET() {
  const apiKey = getV0ApiKey()
  
  return NextResponse.json({
    message: 'v0 API 엔드포인트입니다.',
    status: 'active',
    apiKeyConfigured: !!apiKey,
    timestamp: new Date().toISOString(),
    usage: {
      method: 'POST',
      contentType: 'application/json',
      requiredFields: ['prompt'],
      optionalFields: ['options']
    }
  })
} 