'use client';

import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface NewsletterRegistrationFormProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'sidebar';
}

export function NewsletterRegistrationForm({
  className,
  variant = 'default',
}: NewsletterRegistrationFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '구독 신청 중 오류가 발생했습니다.');
      }

      setIsSuccess(true);
      toast({
        title: '구독 신청 완료! 🎉',
        description: '매주 화요일과 금요일, 성공을 위한 인사이트를 보내드립니다.',
      });
      
      // Reset after success if needed, or keep showing success state
      // setEmail('');
    } catch (error) {
      toast({
        title: '오류 발생',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-in fade-in zoom-in duration-300", className)}>
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">구독이 완료되었습니다!</h3>
        <p className="text-blue-100">
          첫 번째 인사이트가 곧 도착할 예정입니다. <br />
          이메일함을 확인해 주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md mx-auto relative", className)}>
      <div className="relative flex items-center">
        <Mail className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <Input
          type="email"
          placeholder="이메일 주소를 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-14 pl-12 pr-36 rounded-full border-2 border-transparent bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-400 transition-all font-medium text-lg shadow-lg"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="absolute right-1.5 top-1.5 h-11 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all hover:scale-105 shadow-md flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              구독하기
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
      <p className="mt-4 text-sm text-blue-200/60 text-center">
        * 스팸 없는 100% 클린한 정보만 보내드립니다.
      </p>
    </form>
  );
}
