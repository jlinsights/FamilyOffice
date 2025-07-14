import { NextRequest, NextResponse } from 'next/server';

interface ChannelTalkMessage {
  type: 'message';
  content: string;
  user: {
    id: string;
    name?: string;
    profile?: {
      name?: string;
      email?: string;
    };
  };
  channel: {
    id: string;
  };
}

interface ClaudeResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  id: string;
  model: string;
  role: 'assistant';
  stop_reason: 'end_turn' | 'max_tokens';
  stop_sequence: null;
  type: 'message';
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Channel Talk에서 오는 메시지 파싱
    const body: ChannelTalkMessage = await request.json();
    
    // 메시지 타입 확인
    if (body.type !== 'message') {
      return NextResponse.json({ error: 'Invalid message type' }, { status: 400 });
    }

    const userMessage = body.content;
    const userName = body.user.profile?.name || body.user.name || '고객';

    // Claude API 호출
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        system: `당신은 Family Office S의 전문 상담사입니다. 다음 역할을 수행해주세요:

1. 가족 자산 관리 및 투자 상담 전문가
2. 정부 지원 사업 컨설팅 전문가  
3. 기업 설립 및 운영 컨설팅 전문가
4. 세무 및 법무 자문 전문가

응답 시 주의사항:
- 친근하고 전문적인 톤으로 답변
- 구체적인 투자 조언보다는 일반적인 정보 제공
- 전문적인 상담이 필요한 경우 실제 상담 예약을 권유
- 한국어로 답변
- 답변은 간결하고 명확하게 (최대 200자)

고객명: ${userName}`,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    if (!claudeResponse.ok) {
      const error = await claudeResponse.text();
      console.error('Claude API Error:', error);
      return NextResponse.json(
        { 
          type: 'text',
          content: '죄송합니다. 현재 시스템에 문제가 있습니다. 잠시 후 다시 시도해주세요.' 
        },
        { status: 500 }
      );
    }

    const claudeData: ClaudeResponse = await claudeResponse.json();
    const aiResponse = claudeData.content[0]?.text || '답변을 생성할 수 없습니다.';

    // Channel Talk 형식으로 응답 반환
    return NextResponse.json({
      type: 'text',
      content: aiResponse
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { 
        type: 'text',
        content: '죄송합니다. 시스템 오류가 발생했습니다. 담당자에게 연결해드리겠습니다.' 
      },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (테스트용)
export async function GET() {
  return NextResponse.json({ 
    status: 'Family Office S Claude Webhook is running',
    timestamp: new Date().toISOString()
  });
} 