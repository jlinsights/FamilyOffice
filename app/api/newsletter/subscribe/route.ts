import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소가 필요합니다.' },
        { status: 400 }
      )
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Beehiiv의 Publication ID (올바른 형식: pub_ 접두사 필요)
    // 현재 ID가 잘못된 형식입니다. 실제 Beehiiv 대시보드에서 확인 필요
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID || 'pub_cadbc5d4-d1b2-4eae-94f5-485d75c9042f'
    
    // Beehiiv 구독 API 호출
    const beehiivApiUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`
    
    const subscriptionData = {
      email: email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: 'website',
      utm_medium: 'newsletter_signup',
      utm_campaign: 'footer_signup'
    }

    const apiKey = process.env.BEEHIIV_API_KEY || '08lkBF8C7xLVM0AxGgP3yLkuqf2cWDtBHO9lE9ZEZEFXNlpuF9EU5LGmP6ozt2Jg'
    
    const response = await fetch(beehiivApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(subscriptionData),
    })

    if (!response.ok) {
      console.error('Beehiiv API failed:', response.status, response.statusText)
      const errorData = await response.json().catch(() => ({}))
      console.error('Beehiiv error details:', errorData)
      
      // 이미 구독된 이메일인 경우 성공으로 처리
      if (response.status === 409 || response.status === 400) {
        return NextResponse.json({
          success: true,
          message: '이미 구독 중인 이메일입니다.',
          email: email
        })
      }
      
      return NextResponse.json(
        { error: '구독 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    const result = await response.json()
    
    // 성공적으로 구독 처리됨
    return NextResponse.json({
      success: true,
      message: '뉴스레터 구독이 완료되었습니다.',
      email: email,
      subscription_id: result.data?.id
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: '구독 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}