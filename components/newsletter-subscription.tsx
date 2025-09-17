'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

/**
 * Props for the NewsletterSubscription component
 * @interface NewsletterSubscriptionProps
 */
interface NewsletterSubscriptionProps {
  /** Source identifier for analytics tracking */
  source?: string;
  /** Visual variant of the component */
  variant?: 'default' | 'compact' | 'inline';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Newsletter subscription component with email validation and Beehiiv integration.
 * Supports multiple variants and tracking sources for analytics.
 * 
 * @example
 * ```tsx
 * <NewsletterSubscription 
 *   source="blog-page"
 *   variant="default"
 *   className="my-4"
 * />
 * ```
 * 
 * @param props - The component props
 * @returns JSX element with newsletter subscription form
 */
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
      toast.success('Weekly Brief 구독이 완료되었습니다!');
      
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
      <div className={`flex items-center gap-2 text-emerald-600 dark:text-emerald-400 ${className}`} role="status">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">구독 완료!</span>
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
        <Button type="submit" disabled={isLoading} size="sm" aria-disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" data-testid="loading-spinner" />
          ) : (
            '구독하기'
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
            <h4 className="font-semibold text-sm mb-1">Weekly Brief 구독하기</h4>
            <p className="text-xs text-muted-foreground mb-2">
              매주 화·금요일 오전 7:30 발송
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
              <Button type="submit" disabled={isLoading} size="sm" className="h-8" aria-disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" data-testid="loading-spinner" />
                ) : (
                  '이메일로 받아보기'
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
    <div className={`bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-xl p-8 text-center shadow-lg ${className}`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <Mail className="h-8 w-8" />
      </div>
      
      <h3 className="text-2xl font-bold mb-2 tracking-tight">
        자산관리 전문가 인사이트 구독
      </h3>
      <p className="text-base mb-8 opacity-90 leading-relaxed max-w-sm mx-auto">
        매주 화·금요일 오전 7:30 발송<br/>
        기업승계와 자산관리 전문 인사이트
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-4">
          <div className="flex gap-1">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-transparent border-0 text-primary-foreground placeholder:text-primary-foreground/60 pl-10 h-11 focus:ring-0 focus:ring-offset-0"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 dark:bg-white dark:text-primary dark:hover:bg-white/90 font-semibold px-6 h-11"
              aria-disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" data-testid="loading-spinner" />
              ) : (
                '무료 구독하기'
              )}
            </Button>
          </div>
        </div>
      </form>
      
      <div className="flex items-center justify-center gap-6 text-xs opacity-80">
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>1,200+ 경영진 구독</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>언제든 구독 취소</span>
        </div>
      </div>
    </div>
  );
}