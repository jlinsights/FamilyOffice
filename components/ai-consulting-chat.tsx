'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { ConsultationResponse } from '@/lib/ai/types';
import {
    AlertCircle,
    BarChart3,
    Bot,
    Brain,
    CheckCircle,
    ChevronUp,
    Clock,
    DollarSign,
    Loader2,
    Send,
    TrendingUp,
    User
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  consultation?: ConsultationResponse;
  loading?: boolean;
  cta?: {
    type: 'contact';
    message: string;
    link: string;
    buttonText?: string;
  };
}

interface AIConsultingChatProps {
  className?: string;
  placeholder?: string;
  maxHeight?: string;
}

export function AIConsultingChat({ 
  className = '', 
  placeholder = '예: 우리 회사 상황에서 가장 효과적인 가업승계 방법은 무엇인가요?',
  maxHeight = '800px'
}: AIConsultingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! FamilyOffice S의 AI 컨설팅 파트너입니다.\n\n💬 "우리 회사 상황에 맞는 가업승계 전략이 궁금하신가요?"\n💬 "절세와 자산보호를 동시에 고려한 방법을 찾고 계신가요?"\n💬 "M&A나 기업가치 평가에 대한 전문적인 조언이 필요하신가요?"\n💬 "기업인증(벤처/이노비즈 등) 취득 전략이 궁금하신가요?"\n💬 "정책자금 조달과 활용방안에 대해 알고 싶으신가요?"\n\n귀사의 고민을 들려주세요. 최신 AI 기술로 한국 중소중견기업에 특화된 맞춤형 솔루션을 제시해드립니다. 복잡한 문제일수록 더 정교한 분석으로 답변드립니다.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{remaining: number; reset: number} | null>(null);
  const [sessionQuestionCount, setSessionQuestionCount] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(1);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스마트 자동 스크롤 (사용자가 수동 스크롤하지 않은 경우에만)
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current && !isUserScrolling) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }
    };

    // 새 메시지가 추가된 경우에만 스크롤
    if (messages.length > lastMessageCount) {
      const timeoutId = setTimeout(scrollToBottom, 100);
      setLastMessageCount(messages.length);
      return () => clearTimeout(timeoutId);
    }
    
    // cleanup function을 항상 반환
    return () => {};
  }, [messages, isUserScrolling, lastMessageCount]);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      
      // 사용자가 맨 아래가 아닌 곳으로 스크롤한 경우 자동 스크롤 비활성화
      if (!isAtBottom && !isUserScrolling) {
        setIsUserScrolling(true);
      }
      // 사용자가 다시 맨 아래로 스크롤한 경우 자동 스크롤 활성화
      else if (isAtBottom && isUserScrolling) {
        setIsUserScrolling(false);
      }
    };

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, [isUserScrolling]);

  // 엔터키 전송 (Shift+Enter는 줄바꿈)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      loading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);
    setSessionQuestionCount(prev => prev + 1);

    try {
      const response = await fetch('/api/ai-consulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          sessionQuestionCount: sessionQuestionCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // 오류 응답에서 CTA 정보 추출
        const cta = data.cta;
        throw new Error(data.error || '컨설팅 요청 실패');
      }

      const consultation = data.consultation as ConsultationResponse;
      
      // Rate limit 정보 업데이트
      if (data.rate_limit) {
        setRateLimitInfo(data.rate_limit);
      }

      const assistantMessage: Message = {
        id: consultation.id,
        role: 'assistant',
        content: consultation.response,
        timestamp: consultation.timestamp,
        consultation: consultation,
        cta: data.cta // 성공 응답의 CTA 정보
      };

      setMessages(prev => prev.slice(0, -1).concat([assistantMessage]));
      
      toast.success('컨설팅 완료', {
        description: `${consultation.response_time}ms만에 답변을 생성했습니다.`
      });

    } catch (error: any) {
      console.error('AI 컨설팅 오류:', error);
      
      // 오류 응답에서 CTA 정보 추출 시도
      let ctaInfo = null;
      try {
        const errorResponse = await fetch('/api/ai-consulting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userMessage.content })
        });
        const errorData = await errorResponse.json();
        ctaInfo = errorData.cta;
      } catch (e) {
        // CTA 정보 추출 실패시 기본값 사용
        ctaInfo = {
          type: 'contact',
          message: '긴급한 문의사항이 있으시면 직접 상담을 예약해주세요.',
          link: '/contact',
          buttonText: '상담 예약하기'
        };
      }
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `죄송합니다. 컨설팅 처리 중 오류가 발생했습니다.\n\n${error.message}\n\n잠시 후 다시 시도해주시거나, 긴급한 경우 직접 상담을 예약해주세요.`,
        timestamp: new Date().toISOString(),
        cta: ctaInfo
      };

      setMessages(prev => prev.slice(0, -1).concat([errorMessage]));
      
      toast.error('컨설팅 오류', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAIModel = (aiUsed: string | string[]): string => {
    if (Array.isArray(aiUsed)) {
      return aiUsed.map(ai => {
        switch (ai) {
          case 'claude-opus': return 'Claude-3.5';
          case 'gpt4-turbo': return 'GPT-4';
          case 'gemini-pro': return 'Gemini-1.5';
          default: return ai;
        }
      }).join(' + ');
    } else {
      switch (aiUsed) {
        case 'claude-opus': return 'Claude-3.5 Sonnet';
        case 'gpt4-turbo': return 'GPT-4 Turbo';
        case 'gemini-pro': return 'Gemini-1.5 Pro';
        default: return aiUsed;
      }
    }
  };

  const formatStrategy = (strategy: string): string => {
    switch (strategy) {
      case 'single_ai': return '단일 AI 분석';
      case 'parallel_hybrid': return '듀얼-AI 하이브리드';
      case 'sequential_cascade': return '순차 심화 분석';
      case 'consensus_voting': return 'Triple-AI 합의투표';
      case 'fallback': return '개발환경 테스트';
      default: return strategy;
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="h-4 w-4" />;
    if (confidence >= 0.6) return <TrendingUp className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  // 메시지 내용 렌더링 (링크 변환 포함)
  const renderMessageContent = (content: string) => {
    // 링크 패턴 매칭: [텍스트](URL)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = content.split(linkPattern);
    
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < parts.length; i += 3) {
      // 일반 텍스트
      if (parts[i]) {
        elements.push(parts[i]);
      }
      
      // 링크 (i+1: 링크 텍스트, i+2: URL)
      if (i + 2 < parts.length && parts[i + 1] && parts[i + 2]) {
        elements.push(
          <Link 
            key={i}
            href={parts[i + 2]} 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
          >
            {parts[i + 1]}
          </Link>
        );
      }
    }
    
    return <>{elements}</>;
  };

  return (
    <Card className={`w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 ${className}`}>
      <CardContent className="h-full flex flex-col p-0 relative" style={{ height: maxHeight }}>
        {/* 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Wealth Advisor</h3>
            <Badge variant="secondary" className="ml-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300">
              Premium AI
            </Badge>
          </div>
          
          {rateLimitInfo && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <Clock className="h-4 w-4" />
              <span>남은 요청: {rateLimitInfo.remaining}회</span>
            </div>
          )}
        </div>

        {/* 메시지 영역 - 향상된 스크롤 기능 */}
        <div 
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto overflow-x-hidden ai-chat-scrollbar"
          style={{ 
            minHeight: '400px',
            maxHeight: 'calc(100% - 200px)',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="p-3 sm:p-6">
            <div className="space-y-3 sm:space-y-4 pb-4">
              {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    {message.loading ? (
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 flex items-center justify-center transition-colors duration-300">
                        <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 flex items-center justify-center transition-colors duration-300">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  {message.role === 'user' && (
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300" suppressHydrationWarning>
                        {new Date(message.timestamp).toLocaleTimeString('ko-KR')}
                      </span>
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                    </div>
                  )}

                  <div className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 dark:bg-blue-700 text-white ml-auto shadow-sm' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                  }`}>
                    {message.loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>AI가 분석 중입니다...</span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{renderMessageContent(message.content)}</div>
                    )}
                  </div>

                  {/* AI 응답 메타데이터 */}
                  {message.consultation && (
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-wrap gap-1 sm:gap-2 text-xs">
                        <Badge variant="outline" className="gap-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 transition-colors duration-300">
                          <Brain className="h-3 w-3" />
                          {formatAIModel(message.consultation.ai_used)}
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 transition-colors duration-300">
                          <BarChart3 className="h-3 w-3" />
                          {formatStrategy(message.consultation.strategy_used)}
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 transition-colors duration-300">
                          <Clock className="h-3 w-3" />
                          {message.consultation.response_time}ms
                        </Badge>
                        <Badge variant="outline" className="gap-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 transition-colors duration-300">
                          <DollarSign className="h-3 w-3" />
                          ${message.consultation.cost.toFixed(4)}
                        </Badge>
                      </div>

                      <div className={`flex items-center gap-1 text-xs ${getConfidenceColor(message.consultation.confidence)}`}>
                        {getConfidenceIcon(message.consultation.confidence)}
                        <span>신뢰도: {(message.consultation.confidence * 100).toFixed(1)}%</span>
                      </div>

                      {message.consultation.expert_escalation_recommended && (
                        <Alert className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            복잡한 사안으로 판단됩니다. 전문가 직접 상담을 권장드립니다.
                          </AlertDescription>
                        </Alert>
                      )}

                      {message.consultation.follow_up_suggestions && message.consultation.follow_up_suggestions.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-600 mb-1">추가 질문 제안:</div>
                          <div className="space-y-1">
                            {message.consultation.follow_up_suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => setInput(suggestion)}
                                className="block w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded border text-gray-700 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {message.role === 'assistant' && !message.loading && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300" suppressHydrationWarning>
                      {new Date(message.timestamp).toLocaleTimeString('ko-KR')}
                    </div>
                  )}

                  {/* CTA 버튼 */}
                  {message.cta && message.cta.type === 'contact' && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {message.cta.message}
                          </p>
                          <Link href={message.cta.link}>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-colors duration-300"
                            >
                              {message.cta.buttonText || '상담 예약하기'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
              {/* 스크롤 앵커 - 항상 최신 메시지로 스크롤 */}
              <div ref={messagesEndRef} className="h-0" />
            </div>
          </div>
        </div>

        {/* 스크롤 상단으로 버튼 - 사용자가 스크롤했을 때 표시 */}
        {isUserScrolling && (
          <div className="absolute bottom-20 right-4 z-10">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full h-10 w-10 p-0 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                setIsUserScrolling(false);
              }}
              title="최신 메시지로 이동"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* 입력 영역 */}
        <div className="p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="min-h-[60px] max-h-[120px] resize-none bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              size="lg"
              className="px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-colors duration-300"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <span>Shift + Enter로 줄바꿈</span>
            <span className="text-right">최신 AI 기술 기반 전문 컨설팅</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}