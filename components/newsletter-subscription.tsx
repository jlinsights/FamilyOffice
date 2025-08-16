'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

interface NewsletterSubscriptionProps {
  source?: string;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export function NewsletterSubscription({ 
  source = 'blog',
  variant = 'default',
  className = ''
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          tags: ['blog-subscriber', source],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '구독 신청 중 오류가 발생했습니다.');
      }

      setIsSubscribed(true);
      toast.success('뉴스레터 구독이 완료되었습니다!');
      
      // GA4 이벤트 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: source,
          value: 1,
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(error instanceof Error ? error.message : '구독 신청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center gap-2 text-green-600 dark:text-green-400 ${className}`}>
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">뉴스레터 구독이 완료되었습니다!</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="max-w-xs"
          required
        />
        <Button type="submit" disabled={isLoading} size="sm">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            '구독'
          )}
        </Button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-muted/50 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">뉴스레터 구독하기</h4>
            <p className="text-xs text-muted-foreground mb-2">
              매주 금요일 오전 7:30 발송
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-8 text-sm"
                required
              />
              <Button type="submit" disabled={isLoading} size="sm" className="h-8">
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  '구독'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-primary text-primary-foreground rounded-lg p-8 text-center ${className}`}>
      <Mail className="h-12 w-12 mx-auto mb-4 opacity-90" />
      <h3 className="text-2xl font-bold mb-2">
        FamilyOffice S 뉴스레터
      </h3>
      <p className="text-lg mb-6 opacity-90">
        매주 금요일 오전 7:30에 발송되는<br/>
        기업승계와 자산관리 전문 인사이트를 받아보세요
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-background text-foreground hover:bg-background/90"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              '구독하기'
            )}
          </Button>
        </div>
      </form>
      <p className="text-sm mt-4 opacity-80">
        500+ 중견기업 경영진이 구독 중 | 언제든 구독 취소 가능
      </p>
    </div>
  );
}