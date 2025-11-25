'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, MessageCircle, Calendar, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';

// 🎯 Agent OS급 스마트 CTA 시스템: BMAD Method 적용
interface SmartCTASystemProps {
  calculatorType: 'inheritance' | 'gift' | 'succession';
  calculationResults?: {
    totalAmount?: number;
    taxAmount?: number;
    savings?: number;
    effectiveRate?: number;
  };
  userProgress?: {
    timeSpent?: number;
    stepsCompleted?: number;
    totalSteps?: number;
  };
}

export function SmartCTASystem({ 
  calculatorType, 
  calculationResults, 
  userProgress 
}: SmartCTASystemProps) {
  const [ctaVariant, setCTAVariant] = useState<'default' | 'urgent' | 'value' | 'social'>('default');
  const [showProgressiveDisclosure, setShowProgressiveDisclosure] = useState(false);

  // 🎯 Agent OS급 인텔리전트 CTA 선택
  useEffect(() => {
    const determineOptimalCTA = () => {
      // 계산 결과 기반 개인화
      if (calculationResults?.savings && calculationResults.savings > 10000) {
        setCTAVariant('value'); // 고액 절세 효과 시 가치 중심 CTA
      } else if (userProgress?.timeSpent && userProgress.timeSpent > 180) {
        setCTAVariant('urgent'); // 3분 이상 체류 시 긴급성 CTA
      } else if (userProgress?.stepsCompleted === userProgress?.totalSteps) {
        setCTAVariant('social'); // 완료 시 사회적 증명 CTA
      } else {
        setCTAVariant('default');
      }

      // 프로그레시브 공개 조건
      if (userProgress?.stepsCompleted && userProgress.stepsCompleted >= 2) {
        setShowProgressiveDisclosure(true);
      }
    };

    determineOptimalCTA();
  }, [calculationResults, userProgress]);

  // 🎯 BMAD Method 적용: 계산기별 맞춤 메시지
  const getCalculatorMessages = () => {
    const messages = {
      inheritance: {
        default: {
          title: '상속세 전문가 무료 상담',
          description: '계산 결과를 바탕으로 맞춤형 상속세 절세 전략을 받아보세요',
          urgency: '24시간 내 답변 보장'
        },
        value: {
          title: `${calculationResults?.savings?.toLocaleString()}만원 절약 가능!`,
          description: '전문가 상담으로 더 큰 절세 효과를 확인하세요',
          urgency: '지금 상담 신청하면 추가 혜택'
        },
        urgent: {
          title: '상속세 대책, 더 늦기 전에',
          description: '전문가와 함께 지금 바로 실행 계획을 세워보세요',
          urgency: '오늘 상담 가능한 시간 한정'
        },
        social: {
          title: '이미 1,247명이 선택한 상담',
          description: '평균 40% 절세 효과를 경험한 고객들의 선택',
          urgency: '만족도 4.9/5.0 ⭐⭐⭐⭐⭐'
        }
      },
      gift: {
        default: {
          title: '증여세 최적화 무료 상담',
          description: '분할증여 전략으로 더 큰 절세 효과를 만들어보세요',
          urgency: '전문가 직접 상담'
        },
        value: {
          title: `분할증여로 ${calculationResults?.savings?.toLocaleString()}만원 추가 절약!`,
          description: '10년 계획으로 최대 효과를 얻으세요',
          urgency: '2025년 세법 변경 전 유리한 시점'
        },
        urgent: {
          title: '증여 타이밍이 중요합니다',
          description: '최적의 증여 시점을 놓치지 마세요',
          urgency: '올해 증여 한도 활용 마감 임박'
        },
        social: {
          title: '987가족이 선택한 증여 전략',
          description: '평균 70% 절세를 달성한 성공 사례',
          urgency: '만족도 4.8/5.0 ⭐⭐⭐⭐⭐'
        }
      },
      succession: {
        default: {
          title: '가업승계 전략 무료 컨설팅',
          description: '승계 방법별 비용 분석으로 최적 전략을 찾아보세요',
          urgency: '승계 전문가 1:1 상담'
        },
        value: {
          title: `가업승계로 ${calculationResults?.savings?.toLocaleString()}만원 절약!`,
          description: '특례 혜택까지 고려한 맞춤 승계 계획',
          urgency: '조기 승계 계획의 추가 혜택'
        },
        urgent: {
          title: '승계 준비, 지금이 적기입니다',
          description: '5-10년 장기 계획으로 완벽한 승계 준비',
          urgency: '승계 골든타임을 놓치지 마세요'
        },
        social: {
          title: '654개 기업이 선택한 승계 전략',
          description: '성공적인 가업승계를 완료한 기업들의 선택',
          urgency: '만족도 4.9/5.0 ⭐⭐⭐⭐⭐'
        }
      }
    };

    return messages[calculatorType][ctaVariant];
  };

  const message = getCalculatorMessages();

  return (
    <div className="space-y-6">
      {/* 🎯 메인 CTA 카드 */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl blur-xl"></div>
        
        <Card className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200/50 dark:border-blue-700/50 shadow-2xl dark:shadow-slate-900/30">
          <CardContent className="p-8">
            {/* 🎯 BMAD Aspirational: 목표 달성 시각화 */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {message.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {message.urgency}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {message.description}
                </p>

                {/* 🎯 BMAD Decisional: 명확한 행동 단계 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: MessageCircle, text: '1. 무료 상담 신청', time: '30초' },
                    { icon: Phone, text: '2. 전문가 분석', time: '24시간 내' },
                    { icon: CheckCircle, text: '3. 맞춤 전략 수립', time: '실시간' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                      <div className="p-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
                        <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{step.text}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 🎯 메인 CTA 버튼 */}
                <div className="space-y-3">
                  <Button 
                    className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl transition-all duration-300"
                    onClick={() => window.open('/contact?service=tax-consultation', '_blank')}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6" />
                      <span>무료 전문가 상담 신청하기</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>
                  
                  {/* 🎯 대안 CTA */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-12 border-2 border-slate-300 dark:border-slate-600"
                      onClick={() => window.open('/blog', '_blank')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      전문가 블로그 보기
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12 border-2 border-slate-300 dark:border-slate-600"
                      onClick={() => window.open(`tel:+82-2-1234-5678`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      즉시 전화 상담
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🎯 Progressive Disclosure: 단계별 정보 공개 */}
      {showProgressiveDisclosure && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 dark:bg-green-400/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-green-900 dark:text-green-100">
                🎯 계산 완료! 다음 단계 혜택
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                '📊 상세 분석 보고서 제공',
                '🎯 5개년 절세 로드맵',
                '⚖️ 법적 리스크 진단서'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/60 dark:bg-slate-800/40 rounded-lg">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 🎯 사용자 여정 단계별 마이크로 CTA
interface MicroCTAProps {
  step: 'entry' | 'calculation' | 'result';
  calculatorType: string;
}

export function MicroCTA({ step, calculatorType }: MicroCTAProps) {
  const microCTAs = {
    entry: {
      message: '💡 더 정확한 계산을 위해 모든 항목을 입력해보세요',
      action: '완전한 분석 받기'
    },
    calculation: {
      message: '⚡ 실시간으로 절세 효과를 확인하고 계십니다',
      action: '최적화 방안 보기'
    },
    result: {
      message: '🎯 계산이 완료되었습니다. 전문가 검증을 받아보세요',
      action: '전문가 상담받기'
    }
  };

  const cta = microCTAs[step];

  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <span className="text-sm text-blue-800 dark:text-blue-200">{cta.message}</span>
      <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-100">
        {cta.action}
      </Button>
    </div>
  );
}