/**
 * Structure Check Payment Fail Page
 *
 * Toss failUrl redirect target. Query: code, message, orderId.
 */
import { XCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '결제 실패 | FamilyOffice S',
  robots: { index: false, follow: false },
};

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string; orderId?: string }>;
}) {
  const params = await searchParams;
  const code = params.code ?? 'UNKNOWN';
  const message = params.message ?? '결제가 실패하였거나 취소되었습니다';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-2xl mx-auto px-4">
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-3xl font-bold">결제가 완료되지 않았습니다</h1>
            <p className="text-muted-foreground">{message}</p>
            <p className="text-xs font-mono text-muted-foreground">
              에러 코드: {code}
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button asChild variant="outline">
                <Link href="/">홈으로</Link>
              </Button>
              <Button asChild>
                <Link href="/structure-check">다시 시도</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
