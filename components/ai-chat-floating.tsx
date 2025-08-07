'use client';

import {
  MessageCircle,
  X,
  Send,
  Loader2,
  User,
  Bot,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Minimize2,
  Maximize2,
  Calendar,
} from 'lucide-react';

import { useState, useEffect, useRef, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ConsultationResponse {
  success: boolean;
  consultation?: {
    id: string;
    response: string;
    ai_used: string;
    confidence: number;
    response_time: number;
  };
  error?: string;
  message?: string;
  cta?: {
    type: string;
    message: string;
    link: string;
    buttonText?: string;
  };
}

const WELCOME_MESSAGES = [
  "안녕하세요! 🏢 FamilyOffice S AI 컨설턴트입니다.",
  "가업승계, 자산관리, 세무 최적화 등 궁금한 점을 언제든 물어보세요.",
  "24시간 언제든지 전문적인 답변을 제공해드립니다."
];

export function AIChatFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionQuestionCount, setSessionQuestionCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // 로컬 스토리지에서 채팅 히스토리 로드
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('familyoffice-ai-chat');
      const savedCount = localStorage.getItem('familyoffice-ai-chat-count');
      
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // 타임스탬프를 Date 객체로 변환
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
        setHasWelcomed(messagesWithDates.length > 0);
      }
      
      if (savedCount) {
        setSessionQuestionCount(parseInt(savedCount));
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, []);

  // 메시지 변경시 로컬 스토리지에 저장
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('familyoffice-ai-chat', JSON.stringify(messages));
        localStorage.setItem('familyoffice-ai-chat-count', sessionQuestionCount.toString());
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    }
  }, [messages, sessionQuestionCount]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 웰컴 메시지 표시
  useEffect(() => {
    if (isOpen && !hasWelcomed && messages.length === 0) {
      const welcomeMessages = WELCOME_MESSAGES.map((content, index) => ({
        id: `welcome-${index}`,
        type: 'assistant' as const,
        content,
        timestamp: new Date(Date.now() + index * 1000),
      }));

      let messageIndex = 0;
      const showNextMessage = () => {
        if (messageIndex < welcomeMessages.length) {
          setMessages(prev => [...prev, welcomeMessages[messageIndex]]);
          messageIndex++;
          setTimeout(showNextMessage, 1200);
        }
      };

      setTimeout(showNextMessage, 500);
      setHasWelcomed(true);
    }
  }, [isOpen, hasWelcomed, messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    const typingMessage: ChatMessage = {
      id: `typing-${Date.now()}`,
      type: 'assistant',
      content: 'AI가 답변을 생성 중입니다...',
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-consulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          sessionQuestionCount: sessionQuestionCount + 1,
        }),
      });

      const data: ConsultationResponse = await response.json();

      // 타이핑 메시지 제거
      setMessages(prev => prev.filter(m => !m.isTyping));

      if (data.success && data.consultation) {
        const assistantMessage: ChatMessage = {
          id: data.consultation.id,
          type: 'assistant',
          content: data.consultation.response,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setSessionQuestionCount(prev => prev + 1);
        
        // 상담 예약 버튼 항상 추가 (coffeechat 링크로 변경)
        const consultationMessage: ChatMessage = {
          id: `consultation-${Date.now()}`,
          type: 'assistant',
          content: `💼 **더 자세한 상담이 필요하시다면?**\n\n전문 컨설턴트와 1:1 맞춤 상담을 예약하세요!\n\n[📅 상담 예약하기](https://cal.com/familyoffice/coffeechat)`,
          timestamp: new Date(Date.now() + 1500),
        };
        setTimeout(() => {
          setMessages(prev => [...prev, consultationMessage]);
        }, 2000);
      } else {
        // 에러 처리
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          type: 'assistant',
          content: `⚠️ ${data.error || data.message || '일시적인 오류가 발생했습니다.'}`,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
        
        // 에러 시에도 상담 예약 버튼 추가
        const consultationMessage: ChatMessage = {
          id: `consultation-error-${Date.now()}`,
          type: 'assistant',
          content: `💼 **기술적 문제가 발생했습니다**\n\n전문 컨설턴트와 직접 상담을 받아보세요!\n\n[📅 상담 예약하기](https://cal.com/familyoffice/coffeechat)`,
          timestamp: new Date(Date.now() + 1000),
        };
        setTimeout(() => {
          setMessages(prev => [...prev, consultationMessage]);
        }, 1500);
      }
    } catch (err) {
      console.error('AI Chat error:', err);
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: '⚠️ 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      // 네트워크 오류 시에도 상담 예약 버튼 추가
      const consultationMessage: ChatMessage = {
        id: `consultation-network-${Date.now()}`,
        type: 'assistant',
        content: `💼 **연결 문제가 발생했습니다**\n\n전문 컨설턴트와 직접 상담을 받아보세요!\n\n[📅 상담 예약하기](https://cal.com/familyoffice/coffeechat)`,
        timestamp: new Date(Date.now() + 1000),
      };
      setTimeout(() => {
        setMessages(prev => [...prev, consultationMessage]);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChatHistory = () => {
    setMessages([]);
    setSessionQuestionCount(0);
    setHasWelcomed(false);
    try {
      localStorage.removeItem('familyoffice-ai-chat');
      localStorage.removeItem('familyoffice-ai-chat-count');
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };

  const formatMessage = (content: string) => {
    // 간단한 마크다운 처리
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">$1</a>')
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      {!isOpen && (
        <Button
          onClick={toggleOpen}
          size="lg"
          className={cn(
            "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            "animate-pulse hover:animate-none"
          )}
          aria-label="AI 컨설팅 채팅 열기"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 text-yellow-300" />
        </Button>
      )}

      {/* 채팅 창 */}
      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 bg-background border shadow-2xl transition-all duration-300",
            // 모바일에서는 전체 화면 하단, 데스크톱에서는 플로팅
            "bottom-0 right-0 left-0 md:bottom-6 md:right-6 md:left-auto",
            isMinimized
              ? "h-16 w-full md:w-80"
              : "h-[100vh] md:h-[32rem] w-full md:w-96 lg:w-[28rem] md:max-h-[80vh] md:max-w-[90vw]"
          )}
        >
          {/* 헤더 */}
          <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">AI 컨설턴트</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-1" />
                    실시간 응답
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="h-8 w-8 p-0"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleOpen}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* 채팅 내용 */}
          {!isMinimized && (
            <>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-180px)] md:h-80 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3 max-w-[85%]",
                          message.type === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                      >
                        <div
                          className={cn(
                            "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                            message.type === 'user'
                              ? "bg-primary text-primary-foreground"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          )}
                        >
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm",
                            message.type === 'user'
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                            message.isTyping && "animate-pulse"
                          )}
                        >
                          {message.isTyping ? (
                            <div className="flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span>{message.content}</span>
                            </div>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: formatMessage(message.content),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              {/* 입력 영역 */}
              <div className="p-4 border-t bg-muted/30">
                {error && (
                  <Alert className="mb-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="flex gap-2 items-end">
                  <Textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="가업승계, 자산관리, 세무 등 궁금한 점을 물어보세요..."
                    className="min-h-[44px] max-h-32 resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="h-11 px-3"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  질문 {sessionQuestionCount}/5 · AI가 생성한 답변입니다
                </p>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}