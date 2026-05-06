/**
 * Toss Payments V2 Widget
 *
 * 결제 위젯을 렌더하고 사용자가 "결제하기" 버튼을 누르면 Toss 결제창을 띄운다.
 * 결제 완료/실패 시 successUrl/failUrl로 redirect (서버에서 confirm 처리).
 *
 * 결제 수단(카드/간편결제 한정)은 Toss 가맹점 대시보드의 변형 설정으로 관리.
 * 개발 단계의 공개 테스트 키는 기본 변형(전체 수단)이 노출된다.
 */
'use client';

import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface TossPaymentWidgetProps {
  clientKey: string;
  customerKey: string;
  orderId: string;
  orderName: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}

const PAYMENT_METHOD_SELECTOR = 'toss-payment-method';
const AGREEMENT_SELECTOR = 'toss-payment-agreement';

export function TossPaymentWidget({
  clientKey,
  customerKey,
  orderId,
  orderName,
  amount,
  customerEmail,
  customerName,
  successUrl,
  failUrl,
}: TossPaymentWidgetProps) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        if (cancelled) return;

        const widgets = tossPayments.widgets({ customerKey });
        widgetsRef.current = widgets;

        await widgets.setAmount({ currency: 'KRW', value: amount });
        if (cancelled) return;

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: `#${PAYMENT_METHOD_SELECTOR}`,
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: `#${AGREEMENT_SELECTOR}`,
            variantKey: 'AGREEMENT',
          }),
        ]);
        if (cancelled) return;

        setIsReady(true);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : '결제 위젯 초기화 실패';
        setError(message);
      }
    };

    void init();

    return () => {
      cancelled = true;
    };
  }, [clientKey, customerKey, amount]);

  const handlePay = async () => {
    if (!widgetsRef.current) return;
    setIsLoading(true);
    setError(null);
    try {
      await widgetsRef.current.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
        customerEmail,
        customerName,
      });
      // 정상 흐름: Toss 결제창에서 successUrl로 redirect → 본 컴포넌트는 unmount.
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '결제 요청 중 오류가 발생했습니다';
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div id={PAYMENT_METHOD_SELECTOR} className="rounded-md border" />
      <div id={AGREEMENT_SELECTOR} />

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="button"
        onClick={handlePay}
        disabled={!isReady || isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading || !isReady ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isReady ? '결제 진행 중...' : '결제 위젯 로딩...'}
          </>
        ) : (
          `${amount.toLocaleString('ko-KR')}원 결제하기 (VAT 포함)`
        )}
      </Button>
    </div>
  );
}
