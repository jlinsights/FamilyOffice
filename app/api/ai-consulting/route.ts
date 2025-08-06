// Triple-AI 컨설팅 API 엔드포인트
import { AIEnvironmentValidator } from '@/lib/ai/ai-env-validator';
import type { ClientProfile, FileAttachment } from '@/lib/ai/types';
import { checkRateLimit, rateLimiters } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Lazy load AI service to avoid build-time initialization
let tripleAI: any = null;

export async function POST(request: NextRequest) {
  try {
    // 1. 인증 확인 (개발 환경에서는 우회)
    const { userId } = await auth();
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!userId && !isDevelopment) {
      return NextResponse.json(
        { error: 'Unauthorized - 로그인이 필요합니다' }, 
        { status: 401 }
      );
    }

    // 개발 환경에서는 테스트용 사용자 ID 사용
    const effectiveUserId = userId || 'dev-test-user';
    const identifier = `${effectiveUserId}-ai-consulting`;

    // 2. Rate limiting (개발 환경에서는 완화)
    let rateLimitResult = { success: true, total: 100, remaining: 99, reset: Date.now() + 3600000 };
    
    if (!isDevelopment && rateLimiters.general) {
      try {
        const limitResult = await checkRateLimit(request, rateLimiters.general);
        rateLimitResult = {
          success: limitResult.success,
          total: limitResult.total,
          remaining: limitResult.remaining,
          reset: limitResult.reset instanceof Date ? limitResult.reset.getTime() : limitResult.reset
        };
        
        if (!rateLimitResult.success) {
          return NextResponse.json(
            { 
              error: 'Rate limit exceeded - 요청 한도를 초과했습니다',
              limit: rateLimitResult.total,
              remaining: rateLimitResult.remaining,
              resetTime: rateLimitResult.reset,
              cta: {
                type: 'contact',
                message: '긴급한 문의사항이 있으시면 직접 상담을 예약해주세요.',
                link: '/contact'
              }
            }, 
            { status: 429 }
          );
        }
      } catch (rateLimitError) {
        console.warn('[AI-Consulting] Rate limit 확인 실패:', rateLimitError);
        // Rate limit 실패시에도 계속 진행 (개발 환경)
      }
    }

    // 3. 요청 데이터 파싱
    const body = await request.json();
    const { query, attachments, sessionQuestionCount = 0 } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Invalid query - 질문을 입력해주세요',
          cta: {
            type: 'contact',
            message: '구체적인 문의사항이 있으시면 상담을 예약해주세요.',
            link: '/contact'
          }
        }, 
        { status: 400 }
      );
    }

    if (query.length > 5000) {
      return NextResponse.json(
        { 
          error: 'Query too long - 질문이 너무 깁니다 (최대 5000자)',
          cta: {
            type: 'contact',
            message: '긴 문의사항은 상담을 통해 도움을 받으실 수 있습니다.',
            link: '/contact'
          }
        }, 
        { status: 400 }
      );
    }

    // 4. 클라이언트 프로파일 조회 (개발 환경에서는 기본값 사용)
    let clientProfile: ClientProfile;
    
    if (isDevelopment && !userId) {
      // 개발 환경에서 기본 프로파일 사용
      clientProfile = {
        id: 'dev-test-user',
        email: 'dev@familyoffices.vip',
        name: '개발 테스트 사용자',
        company: 'FamilyOffice S',
        industry: 'family_corp',
        tier: 'premium',
        language_preference: 'ko',
        created_at: new Date().toISOString(),
        consultation_history: Array(sessionQuestionCount).fill({ id: 'session' })
      };
    } else {
      // 프로덕션 환경에서는 실제 사용자 데이터 조회
      const supabase = await createClient();
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', effectiveUserId)
        .single();

      if (userError || !userData) {
        console.error('User profile fetch error:', userError);
        return NextResponse.json(
          { 
            error: 'User profile not found - 사용자 정보를 찾을 수 없습니다',
            cta: {
              type: 'contact',
              message: '계정 문제가 있으시면 고객센터로 문의해주세요.',
              link: '/contact'
            }
          }, 
          { status: 404 }
        );
      }

      clientProfile = {
        id: userData.id,
        email: userData.email,
        name: userData.name || undefined,
        company: userData.company || undefined,
        industry: userData.industry || 'family_corp',
        tier: userData.tier || 'standard',
        language_preference: 'ko',
        created_at: userData.created_at,
        consultation_history: Array(sessionQuestionCount).fill({ id: 'session' })
      };
    }

    // 5. 첨부파일 처리 (선택사항)
    const processedAttachments: FileAttachment[] = [];
    if (attachments && Array.isArray(attachments)) {
      for (const attachment of attachments.slice(0, 5)) { // 최대 5개
        if (attachment.size && attachment.size > 10 * 1024 * 1024) { // 10MB 제한
          return NextResponse.json(
            { 
              error: 'File too large - 파일 크기는 10MB 이하여야 합니다',
              cta: {
                type: 'contact',
                message: '큰 파일은 상담을 통해 전달해주세요.',
                link: '/contact'
              }
            }, 
            { status: 400 }
          );
        }
        processedAttachments.push(attachment);
      }
    }

    // 6. Triple-AI 컨설팅 처리
    console.log(`[AI-Consulting] 컨설팅 시작: User=${effectiveUserId}, Query=${query.substring(0, 50)}...`);
    
    // AI 환경 검증
    const envValidator = AIEnvironmentValidator.getInstance();
    const envSummary = envValidator.getEnvironmentSummary();
    
    console.log('[AI-Consulting] AI 환경 상태:', {
      isDevelopment: envSummary.isDevelopment,
      availableServices: envSummary.availableServices,
      missingServices: envSummary.missingServices
    });
    
    let consultation;
    try {
      // Lazy load AI service
      if (!tripleAI) {
        const { FamilyOfficeTripleAI } = await import('@/lib/ai');
        tripleAI = new FamilyOfficeTripleAI();
      }
      
      consultation = await tripleAI.processConsultation(
        query,
        clientProfile,
        processedAttachments.length > 0 ? processedAttachments : undefined
      );
    } catch (aiError) {
      console.error('[AI-Consulting] Triple-AI 처리 오류:', aiError);
      
      // 개발 환경에서는 간단한 fallback 응답 생성
      if (isDevelopment) {
        consultation = {
          id: `fallback-${Date.now()}`,
          query,
          response: `안녕하세요! 현재 AI 시스템이 초기화 중입니다.
          
**질문**: ${query}

**개발 환경 응답**: 
가업승계, 세무 최적화, M&A 관련 문의를 주셨네요. 실제 서비스에서는 Claude Opus 4, GPT-4, Gemini 2.5 Pro가 협력하여 전문적인 답변을 제공합니다.

궁금한 점이 있으시면 언제든 다시 문의해주세요.

*현재 개발 환경에서 테스트 중입니다.*`,
          ai_used: 'development-fallback',
          strategy_used: 'fallback',
          response_time: Date.now() - Date.now(),
          cost: 0,
          confidence: 0.5,
          korean_cultural_context: {
            formality_level: 'business',
            hierarchy_considerations: ['CEO 대상 정중한 존댓말'],
            cultural_recommendations: ['한국 기업 문화 반영'],
            relationship_building_notes: ['체계적이고 신뢰감 있는 어조']
          },
          timestamp: new Date().toISOString()
        };
      } else {
        // 프로덕션 환경에서는 상세한 오류 정보와 함께 CTA 제공
        const errorDetails = aiError instanceof Error ? aiError.message : 'Unknown AI error';
        console.error('[AI-Consulting] 상세 오류:', errorDetails);
        
        // 환경 상태에 따른 맞춤형 메시지
        let errorMessage = '잠시 후 다시 시도해주시거나, 긴급한 경우 직접 상담을 예약해주세요.';
        let ctaMessage = '전문 상담사와 직접 상담하시겠습니까?';
        
        if (envSummary.availableServices.length === 0) {
          errorMessage = 'AI 서비스가 일시적으로 사용할 수 없습니다. 전문 상담사와 직접 상담해주세요.';
          ctaMessage = '전문 상담사와 즉시 상담하시겠습니까?';
        } else if (envSummary.missingServices.length > 0) {
          errorMessage = `일부 AI 서비스(${envSummary.missingServices.join(', ')})가 사용할 수 없습니다. 전문 상담사와 상담해주세요.`;
          ctaMessage = '더 정확한 답변을 위해 전문 상담사와 상담하시겠습니까?';
        }
        
        return NextResponse.json(
          { 
            error: 'AI 컨설팅 처리 중 오류가 발생했습니다',
            message: errorMessage,
            details: isDevelopment ? errorDetails : undefined,
            environment: {
              availableServices: envSummary.availableServices,
              missingServices: envSummary.missingServices
            },
            cta: {
              type: 'contact',
              message: ctaMessage,
              link: '/contact',
              buttonText: '상담 예약하기'
            }
          }, 
          { status: 500 }
        );
      }
    }

    // 7. 컨설팅 기록 저장 (개발 환경에서는 선택적)
    if (!isDevelopment || userId) {
      try {
        const supabase = await createClient();
        const { error: saveError } = await supabase
          .from('ai_consultations')
          .insert({
            id: consultation.id,
            user_id: clientProfile.id,
            query: consultation.query,
            response: consultation.response,
            ai_used: Array.isArray(consultation.ai_used) ? consultation.ai_used : [consultation.ai_used],
            strategy_used: consultation.strategy_used,
            response_time: consultation.response_time,
            cost: consultation.cost,
            confidence: consultation.confidence,
            korean_cultural_context: consultation.korean_cultural_context,
            created_at: consultation.timestamp
          });

        if (saveError) {
          console.error('Consultation save error:', saveError);
          // 저장 실패해도 응답은 반환
        }
      } catch (saveError) {
        console.error('Consultation save error:', saveError);
      }
    }

    // 8. 성공 응답 (CTA 포함)
    console.log(`[AI-Consulting] 컨설팅 완료: ${consultation.id} (${consultation.response_time}ms)`);
    
    return NextResponse.json({
      success: true,
      consultation,
      rate_limit: {
        remaining: isDevelopment ? 999 : rateLimitResult.remaining,
        reset: isDevelopment ? Date.now() + 3600000 : rateLimitResult.reset
      },
      cta: {
        type: 'contact',
        message: '더 자세한 상담이 필요하시면 전문 상담사와 직접 상담하실 수 있습니다.',
        link: '/contact',
        buttonText: '상담 예약하기'
      }
    });

  } catch (error) {
    console.error('[AI-Consulting API] 오류:', error);
    console.error('[AI-Consulting API] Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    // 더 상세한 개발 환경 에러 정보
    const isDevelopment = process.env.NODE_ENV === 'development';
    let errorMessage = '잠시 후 다시 시도해주세요';
    
    if (isDevelopment && error instanceof Error) {
      errorMessage = `개발 환경 에러: ${error.message}\n\nStack: ${error.stack?.substring(0, 500)}`;
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error - 서버 오류가 발생했습니다',
        message: errorMessage,
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

// 컨설팅 기록 조회
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!userId && !isDevelopment) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const offset = parseInt(searchParams.get('offset') || '0');

    // 개발 환경에서는 빈 배열 반환
    if (isDevelopment && !userId) {
      return NextResponse.json({
        success: true,
        consultations: [],
        pagination: {
          limit,
          offset,
          count: 0
        }
      });
    }

    const supabase = await createClient();
    
    // 사용자 ID 확인
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    // 컨설팅 기록 조회
    const { data: consultations, error } = await supabase
      .from('ai_consultations')
      .select('*')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Consultations fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch consultations' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      consultations: consultations || [],
      pagination: {
        limit,
        offset,
        count: consultations?.length || 0
      }
    });

  } catch (error) {
    console.error('[AI-Consulting GET] 오류:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}