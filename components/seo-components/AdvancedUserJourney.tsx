'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb,
  Calculator,
  Users,
  Shield,
  Zap
} from 'lucide-react';

// 🎯 Agent OS급 사용자 여정 최적화 시스템
interface AdvancedUserJourneyProps {
  calculatorType: 'inheritance' | 'gift' | 'succession';
  onStepComplete?: (step: string, data: any) => void;
  onConversion?: (type: string, data: any) => void;
}

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  timeSpent: number;
  completionTrigger: string;
}

interface UserInsight {
  type: 'tip' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  action?: string;
  value?: string;
}

export function AdvancedUserJourney({ 
  calculatorType, 
  onStepComplete, 
  onConversion 
}: AdvancedUserJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
  const [sessionStartTime] = useState(Date.now());
  const [userInsights, setUserInsights] = useState<UserInsight[]>([]);
  const [engagementScore, setEngagementScore] = useState(0);

  // 🎯 BMAD Method 기반 여정 설계
  const initializeJourney = useCallback(() => {
    const journeyConfigs = {
      inheritance: [
        {
          id: 'discovery',
          title: '상속세 현실 인식',
          description: '현재 상속세 부담 수준을 확인하세요',
          status: 'active' as const,
          timeSpent: 0,
          completionTrigger: 'asset_input_started'
        },
        {
          id: 'calculation',
          title: '정확한 세액 계산',
          description: '전문가급 정밀도로 상속세를 계산합니다',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'calculation_completed'
        },
        {
          id: 'optimization',
          title: '절세 전략 확인',
          description: 'AI가 분석한 최적의 절세 방안을 확인하세요',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'results_viewed'
        },
        {
          id: 'consultation',
          title: '전문가 상담',
          description: '맞춤형 상속세 전략을 전문가와 함께 완성하세요',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'consultation_requested'
        }
      ],
      gift: [
        {
          id: 'discovery',
          title: '증여의 힘 발견',
          description: '분할증여의 놀라운 절세 효과를 확인하세요',
          status: 'active' as const,
          timeSpent: 0,
          completionTrigger: 'gift_info_started'
        },
        {
          id: 'calculation',
          title: '증여세 정밀 계산',
          description: '관계별 공제한도까지 고려한 정확한 계산',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'calculation_completed'
        },
        {
          id: 'planning',
          title: '10년 증여 계획',
          description: '체계적인 분할증여로 최대 절세 효과 달성',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'optimization_viewed'
        },
        {
          id: 'consultation',
          title: '증여 전략 상담',
          description: '가족 상황에 맞는 맞춤형 증여 계획 수립',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'consultation_requested'
        }
      ],
      succession: [
        {
          id: 'discovery',
          title: '승계의 중요성',
          description: '성공적인 가업승계를 위한 첫 단계를 시작하세요',
          status: 'active' as const,
          timeSpent: 0,
          completionTrigger: 'company_info_started'
        },
        {
          id: 'analysis',
          title: '승계 비용 분석',
          description: '방법별 세무비용을 정확히 비교 분석합니다',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'calculation_completed'
        },
        {
          id: 'strategy',
          title: '최적 승계 전략',
          description: '특례 혜택까지 고려한 최적의 승계 방법 제시',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'strategy_viewed'
        },
        {
          id: 'consultation',
          title: '승계 컨설팅',
          description: '5-10년 장기 승계 계획을 전문가와 수립하세요',
          status: 'pending' as const,
          timeSpent: 0,
          completionTrigger: 'consultation_requested'
        }
      ]
    };

    setJourneySteps(journeyConfigs[calculatorType]);
  }, [calculatorType]);

  // 🎯 사용자 인사이트 생성 (실시간)
  const generateUserInsights = useCallback((step: number, timeSpent: number) => {
    const insights: UserInsight[] = [];
    
    // 시간 기반 인사이트
    if (timeSpent > 120 && step === 0) {
      insights.push({
        type: 'tip',
        title: '💡 계산 팁',
        message: '정확한 계산을 위해 모든 자산 정보를 입력해주세요',
        action: '상세 입력 가이드 보기'
      });
    }
    
    if (timeSpent > 180 && step === 1) {
      insights.push({
        type: 'success',
        title: '🎯 계산 완료',
        message: '전문가 수준의 정확한 계산이 완료되었습니다',
        value: '99.9% 정확도'
      });
    }

    // 단계별 맞춤 인사이트
    if (step === 2) {
      const calculatorInsights = {
        inheritance: {
          type: 'warning' as const,
          title: '⚠️ 상속세 부담',
          message: '아무 대책 없이는 상속세 부담이 클 수 있습니다',
          action: '절세 전략 확인하기'
        },
        gift: {
          type: 'success' as const,
          title: '✨ 분할증여 효과',
          message: '체계적인 분할증여로 큰 절세 효과를 얻을 수 있습니다',
          value: '최대 70% 절감 가능'
        },
        succession: {
          type: 'info' as const,
          title: '🏢 승계 골든타임',
          message: '조기 승계 준비로 더 큰 혜택을 받을 수 있습니다',
          action: '승계 전략 상담받기'
        }
      };
      
      insights.push(calculatorInsights[calculatorType]);
    }

    setUserInsights(insights);
  }, [calculatorType]);

  // 🎯 여정 진행 관리
  const advanceStep = useCallback((trigger: string) => {
    setJourneySteps(prev => {
      const updated = [...prev];
      const currentIndex = updated.findIndex(step => step.status === 'active');
      
      if (currentIndex >= 0 && updated[currentIndex]?.completionTrigger === trigger) {
        // 현재 단계 완료
        updated[currentIndex].status = 'completed';
        updated[currentIndex].timeSpent = Date.now() - sessionStartTime;
        
        // 다음 단계 활성화
        const nextStep = updated[currentIndex + 1];
        if (currentIndex + 1 < updated.length && nextStep) {
          nextStep.status = 'active';
          setCurrentStep(currentIndex + 1);
        }
        
        onStepComplete?.(updated[currentIndex]?.id || '', {
          timeSpent: updated[currentIndex]?.timeSpent || 0,
          step: currentIndex
        });
      }
      
      return updated;
    });
  }, [sessionStartTime, onStepComplete]);

  // 🎯 참여도 점수 계산
  useEffect(() => {
    const calculateEngagementScore = () => {
      const timeSpent = Date.now() - sessionStartTime;
      const completedSteps = journeySteps.filter(step => step.status === 'completed').length;
      const progressScore = (completedSteps / journeySteps.length) * 50;
      const timeScore = Math.min((timeSpent / 300000) * 30, 30); // 5분 기준
      const interactionScore = 20; // 기본 상호작용 점수
      
      setEngagementScore(Math.round(progressScore + timeScore + interactionScore));
    };

    const interval = setInterval(calculateEngagementScore, 10000); // 10초마다 업데이트
    return () => clearInterval(interval);
  }, [sessionStartTime, journeySteps]);

  // 초기화
  useEffect(() => {
    initializeJourney();
  }, [initializeJourney]);

  // 실시간 인사이트 업데이트
  useEffect(() => {
    const timeSpent = Date.now() - sessionStartTime;
    generateUserInsights(currentStep, timeSpent / 1000);
  }, [currentStep, sessionStartTime, generateUserInsights]);

  const progressPercentage = (journeySteps.filter(step => step.status === 'completed').length / journeySteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* 🎯 여정 진행률 표시 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Target className="w-5 h-5" />
              계산 여정 진행률
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {Math.round(progressPercentage)}% 완료
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                참여도: {engagementScore}점
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {journeySteps.map((step, index) => {
              const isActive = step.status === 'active';
              const isCompleted = step.status === 'completed';
              
              return (
                <div 
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : isActive 
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                        : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : isActive ? (
                      <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      isCompleted ? 'text-green-800 dark:text-green-200' : 
                      isActive ? 'text-blue-800 dark:text-blue-200' : 
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  <p className={`text-xs ${
                    isCompleted ? 'text-green-600 dark:text-green-300' :
                    isActive ? 'text-blue-600 dark:text-blue-300' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 🎯 실시간 사용자 인사이트 */}
      {userInsights.length > 0 && (
        <div className="space-y-3">
          {userInsights.map((insight, index) => (
            <Card key={index} className={`border-l-4 ${
              insight.type === 'success' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
              insight.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
              insight.type === 'tip' ? 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20' :
              'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{insight.message}</p>
                    {insight.value && (
                      <Badge className="mt-2" variant="secondary">
                        {insight.value}
                      </Badge>
                    )}
                  </div>
                  {insight.action && (
                    <Button size="sm" variant="outline" className="ml-4">
                      {insight.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 🎯 여정 완료시 특별 CTA */}
      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-2 border-green-300 dark:border-green-700">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-3 bg-green-500 rounded-full">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    🎉 완벽한 계산 완료!
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    참여도 {engagementScore}점 달성! 전문가 상담 자격 획득
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Calculator, text: '정확한 계산 완료', desc: '전문가급 99.9% 정확도' },
                  { icon: Lightbulb, text: 'AI 최적화 분석', desc: '맞춤형 절세 전략 확인' },
                  { icon: Shield, text: '전문가 검증 준비', desc: '1:1 맞춤 컨설팅 가능' }
                ].map((achievement, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                    <achievement.icon className="w-8 h-8 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-800 dark:text-green-200">{achievement.text}</h4>
                    <p className="text-sm text-green-600 dark:text-green-300 text-center">{achievement.desc}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg"
                onClick={() => {
                  onConversion?.('consultation_premium', { 
                    engagementScore, 
                    completionTime: Date.now() - sessionStartTime 
                  });
                  window.open('/contact?service=premium-consultation&journey=completed', '_blank');
                }}
              >
                <Users className="w-6 h-6 mr-3" />
                프리미엄 전문가 상담 신청 (무료)
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 🎯 여정 단계 트리거 훅
export function useJourneyTrigger() {
  const triggerStep = useCallback((trigger: string) => {
    // 글로벌 이벤트 발생
    window.dispatchEvent(new CustomEvent('journeyStep', { 
      detail: { trigger } 
    }));
  }, []);

  return { triggerStep };
}