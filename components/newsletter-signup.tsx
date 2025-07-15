"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

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
        throw new Error(data.error || '구독 신청 중 오류가 발생했습니다.');
      }

      setIsSuccess(true);
      setEmail("");
      
      // 3초 후 성공 상태 리셋
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "구독 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="border-t pt-8 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center max-w-md mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            구독 완료!
          </h3>
          <p className="text-green-700 dark:text-green-300 text-sm">
            뉴스레터 구독이 완료되었습니다. 소중한 정보를 정기적으로 보내드리겠습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-8 mb-8">
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">
          FamilyOffice S 뉴스레터
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          중소중견기업 자산관리 전문 인사이트와 시장 동향을 받아보세요
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/80 dark:bg-background/60 border-border/50 focus:border-primary transition-colors"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {error && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-2">
              {error}
            </p>
          )}
          
          <p className="text-xs text-muted-foreground mt-3">
            언제든지 구독을 취소할 수 있으며, 개인정보는 안전하게 보호됩니다.
          </p>
        </form>
      </div>
    </div>
  );
} 