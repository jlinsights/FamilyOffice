/**
 * AI 컨설팅 시스템 상태 확인 API
 * GET /api/ai-consulting/status
 */
import { AIEnvironmentValidator } from '@/lib/ai/ai-env-validator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envValidator = AIEnvironmentValidator.getInstance();
    const envSummary = envValidator.getEnvironmentSummary();
    
    // API 키 검증 (캐시된 결과 사용)
    const apiValidation = await envValidator.validateAllAPIKeys();
    
    const status = {
      timestamp: new Date().toISOString(),
      environment: {
        node_env: process.env.NODE_ENV,
        isDevelopment: envSummary.isDevelopment,
      },
      ai_services: {
        claude: {
          available: envSummary.availableServices.includes('Claude'),
          valid: apiValidation.claude.valid,
          error: apiValidation.claude.error
        },
        openai: {
          available: envSummary.availableServices.includes('OpenAI'),
          valid: apiValidation.openai.valid,
          error: apiValidation.openai.error
        },
        gemini: {
          available: envSummary.availableServices.includes('Gemini'),
          valid: apiValidation.gemini.valid,
          error: apiValidation.gemini.error
        }
      },
      overall_status: apiValidation.overall ? 'healthy' : 'degraded',
      recommendations: envSummary.recommendations,
      cache_info: {
        cache_enabled: true,
        cache_ttl: '5 minutes'
      }
    };

    return NextResponse.json({
      success: true,
      status,
      message: apiValidation.overall 
        ? 'AI 컨설팅 시스템이 정상적으로 작동하고 있습니다.'
        : '일부 AI 서비스에 문제가 있습니다. 전문 상담사와 상담해주세요.'
    });

  } catch (error) {
    console.error('[AI-Status] 상태 확인 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'AI 시스템 상태 확인 중 오류가 발생했습니다',
        message: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
        cta: {
          type: 'contact',
          message: '긴급한 문의사항이 있으시면 직접 상담을 예약해주세요.',
          link: '/contact',
          buttonText: '상담 예약하기'
        }
      },
      { status: 500 }
    );
  }
} 