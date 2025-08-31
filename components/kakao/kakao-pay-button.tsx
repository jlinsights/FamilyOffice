'use client';

/**
 * 카카오페이 결제 버튼 컴포넌트
 * 프리미엄 서비스 결제를 위한 카카오페이 통합
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard } from 'lucide-react';

interface KakaoPayButtonProps {
  amount: number;
  itemName: string;
  itemCode?: string;
  variant?: 'default' | 'outline' | 'kakao';
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  useOfficialImage?: boolean;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  children?: React.ReactNode;
}

export function KakaoPayButton({
  amount,
  itemName,
  itemCode,
  variant = 'kakao',
  size = 'default',
  fullWidth = false,
  useOfficialImage = true,
  onSuccess,
  onError,
  children
}: KakaoPayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKakaoPay = async () => {
    setIsLoading(true);
    
    try {
      // 카카오페이 결제 요청 API 호출
      const response = await fetch('/api/payment/kakao/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cid: 'TC0ONETIME', // 테스트용 CID
          partner_order_id: `FO_${Date.now()}`,
          partner_user_id: 'user_001',
          item_name: itemName,
          item_code: itemCode,
          quantity: 1,
          total_amount: amount,
          vat_amount: Math.floor(amount / 11),
          tax_free_amount: 0,
          approval_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/kakao/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/kakao/cancel`,
          fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/kakao/fail`,
        }),
      });

      if (!response.ok) {
        throw new Error('결제 요청에 실패했습니다.');
      }

      const paymentData = await response.json();
      
      if (paymentData.success && paymentData.next_redirect_pc_url) {
        // PC 환경: 새 창에서 결제 페이지 열기
        const paymentWindow = window.open(
          paymentData.next_redirect_pc_url,
          'kakao_pay',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        // 결제 완료 대기
        const checkPaymentComplete = () => {
          if (paymentWindow?.closed) {
            setIsLoading(false);
            toast({
              title: '결제 취소',
              description: '결제가 취소되었습니다.',
              variant: 'destructive',
            });
          }
        };

        const interval = setInterval(checkPaymentComplete, 1000);
        
        // 결제 성공 시 콜백 처리
        window.addEventListener('message', (event) => {
          if (event.data.type === 'KAKAO_PAY_SUCCESS') {
            clearInterval(interval);
            paymentWindow?.close();
            setIsLoading(false);
            
            toast({
              title: '결제 완료',
              description: '카카오페이 결제가 완료되었습니다.',
            });
            
            onSuccess?.(event.data.result);
          }
        });

      } else {
        throw new Error(paymentData.message || '결제 URL을 받아올 수 없습니다.');
      }
      
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : '결제 요청 중 오류가 발생했습니다.';
      
      toast({
        title: '결제 오류',
        description: errorMessage,
        variant: 'destructive',
      });
      
      onError?.(errorMessage);
    }
  };

  // 공식 카카오페이 이미지 사용 시 (추후 카카오페이 공식 이미지 추가 시 활성화)
  if (useOfficialImage && variant === 'kakao') {
    return (
      <button
        onClick={handleKakaoPay}
        disabled={isLoading}
        className={`
          ${fullWidth ? 'w-full' : ''}
          ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02] cursor-pointer'}
          transition-all duration-200 outline-none focus:ring-2 focus:ring-[#FFCD00] focus:ring-opacity-50 rounded-md
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center px-6 py-3 bg-[#FFCD00] rounded-md">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#3C1E1E]" />
            <span className="text-[#3C1E1E] font-medium">결제 진행 중...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center px-6 py-3 bg-[#FFCD00] hover:bg-[#FFD700] rounded-md transition-colors">
            <CreditCard className="mr-2 h-4 w-4 text-[#3C1E1E]" />
            <span className="text-[#3C1E1E] font-medium">
              {children || `카카오페이 ${amount.toLocaleString()}원 결제`}
            </span>
          </div>
        )}
      </button>
    );
  }

  // 기본 버튼 스타일
  return (
    <Button
      variant={variant === 'kakao' ? 'default' : variant}
      size={size}
      onClick={handleKakaoPay}
      disabled={isLoading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'kakao' ? 'bg-[#FFCD00] hover:bg-[#FFD700] text-[#3C1E1E] border-0' : ''}
        font-medium transition-all duration-200
        ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02]'}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          결제 진행 중...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {children || `카카오페이 ${amount.toLocaleString()}원`}
        </>
      )}
    </Button>
  );
}

export default KakaoPayButton;