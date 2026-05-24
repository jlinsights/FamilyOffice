/**
 * Structure Check Payment Success Page
 *
 * Toss successUrl redirect target. Query: paymentKey, orderId, amount.
 * 서버 컴포넌트에서 즉시 confirm API 호출 → 결과 렌더.
 */
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '결제 완료 | FamilyOffice S',
  robots: { index: false, follow: false },
};

interface ConfirmResult {
  success: boolean;
  orderId?: string;
  paymentKey?: string;
  amount?: number;
  method?: string;
  approvedAt?: string;
  error?: string;
  code?: string;
}

async function confirmPayment(
  paymentKey: string,
  orderId: string,
  amount: number
): Promise<ConfirmResult> {
  const headerStore = await headers();
  const host = headerStore.get('host');
  const protocol =
    headerStore.get('x-forwarded-proto') ??
    (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  const url = `${protocol}://${host}/api/payments/structure-check/confirm`;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
      cache: 'no-store',
    });
    return (await res.json()) as ConfirmResult;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '결제 확인 중 오류',
    };
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}) {
  const params = await searchParams;
  const paymentKey = params.paymentKey;
  const orderId = params.orderId;
  const amount = params.amount ? Number(params.amount) : NaN;

  const hasValidParams =
    typeof paymentKey === 'string' &&
    typeof orderId === 'string' &&
    Number.isInteger(amount) &&
    amount > 0;

  const result: ConfirmResult = hasValidParams
    ? await confirmPayment(paymentKey, orderId, amount)
    : { success: false, error: '잘못된 결제 정보입니다' };

  const isOk = result.success;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-2xl mx-auto px-4">
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            {isOk ? (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
                <h1 className="text-3xl font-bold">결제가 완료되었습니다</h1>
                <p className="text-muted-foreground">
                  구조 점검 상담 신청이 확정되었습니다. 검토 후 개별적으로
                  연락드리겠습니다.
                </p>
                <dl className="text-left max-w-sm mx-auto space-y-2 text-sm bg-muted/30 p-6 rounded-lg">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">주문번호</dt>
                    <dd className="font-mono">{result.orderId}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">결제 금액</dt>
                    <dd className="financial-value">
                      {(result.amount ?? 0).toLocaleString('ko-KR')}원
                    </dd>
                  </div>
                  {result.method && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">결제 수단</dt>
                      <dd>{result.method}</dd>
                    </div>
                  )}
                  {result.approvedAt && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">승인 일시</dt>
                      <dd>
                        {new Date(result.approvedAt).toLocaleString('ko-KR')}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="flex gap-3 justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link href="/legal/refund">환불 정책</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">홈으로</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-destructive mx-auto" />
                <h1 className="text-3xl font-bold">결제 확인 실패</h1>
                <p className="text-muted-foreground">
                  {result.error ?? '결제 확인 중 오류가 발생했습니다'}
                </p>
                <p className="text-sm text-muted-foreground">
                  결제는 정상 처리되었을 수 있습니다. 잠시 후 다시 확인하시거나
                  고객센터로 문의주시기 바랍니다.
                </p>
                <div className="flex gap-3 justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link href="/structure-check">다시 시도</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">홈으로</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
