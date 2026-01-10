'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Check, Loader2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

interface LeadCaptureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  source?: string;
  ctaLabel?: string;
  successTitle?: string;
  successDescription?: string;
}

export function LeadCaptureDialog({
  isOpen,
  onClose,
  onSuccess,
  title = "프리미엄 계산기 접근",
  description = "정확한 세금 계산 결과를 확인하려면\n이메일을 입력해 주세요.",
  source = "calculator-access",
  ctaLabel = "계산기 무료 이용하기",
  successTitle = "접근 권한이 확인되었습니다.",
  successDescription = "계산기 페이지로 이동합니다."
}: LeadCaptureDialogProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("유효한 이메일 주소를 입력해 주세요.");
      }

      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: source,
          // We don't send calculationResult here as this is just for access
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '처리 중 오류가 발생했습니다.');
      }

      toast({
        title: successTitle,
        description: successDescription,
      });

      // Brief delay to show success state if desired, but here we just proceed
      onSuccess();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-blue-200/50 dark:border-blue-800/50 shadow-2xl p-8 animate-in zoom-in-95 duration-300">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span className="sr-only">닫기</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shadow-inner">
               <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
            {title}
          </h2>
          
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 whitespace-pre-wrap">
            {description}
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-8">
             <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    2025년 최신 세법 적용
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    전문가 검증 알고리즘
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    절세 가이드 무료 제공
                  </span>
                </li>
              </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                placeholder="이메일 주소를 입력해 주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 text-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  처리 중...
                </>
              ) : (
                ctaLabel
              )}
            </Button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              * 입력하신 정보는 안전하게 보호되며, 스팸을 발송하지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
