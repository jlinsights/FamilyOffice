import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: '환불 및 해지 정책 | FamilyOffice S',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-4xl mx-auto px-4 prose dark:prose-invert">
        <h1>환불 및 해지 정책</h1>

        <h2>1. 멤버십 청약 철회</h2>
        <p>
          회원은 멤버십 가입 및 결제 후 7일 이내에, 서비스 이용 이력이 없는
          경우에 한하여 청약 철회(전액 환불)를 요청할 수 있습니다.
        </p>

        <h2>2. 중도 해지 및 환불 기준</h2>
        <p>
          서비스 이용 개시 후 중도 해지 시, 환불 금액은 다음 기준에 따라
          산정됩니다.
        </p>
        <ul>
          <li>
            <strong>온보딩 진행 전:</strong> 결제 금액의 90% 환불
          </li>
          <li>
            <strong>온보딩 완료 후:</strong> (결제 금액 - 가입비/기획착수금) -
            (월 이용료 × 이용 개월 수) - 위약금(잔여 금액의 10%)
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          * 온보딩 및 초기 기획 비용은 서비스 특성상 해지 시 반환되지 않을 수
          있습니다.
        </p>

        <h2>3. 해지 절차</h2>
        <p>
          해지 요청은 전담 컨시어지 또는 고객센터(이메일)를 통해 접수 가능하며,
          회사는 접수일로부터 3영업일 이내에 환불 절차를 안내합니다.
        </p>

        <h2>4. 상담 신청 환불 정책 (1회성 결제)</h2>
        <p>본 조항은 구조 점검 등 1회성 유료 상담 신청 결제에 적용됩니다.</p>
        <ul>
          <li>
            <strong>결제 후 7일 이내, 상담 미팅 진행 전:</strong> 100% 환불
          </li>
          <li>
            <strong>상담 미팅 진행 완료 후:</strong> 환불 불가 (서비스 제공
            완료)
          </li>
          <li>
            <strong>자격 검토 결과 미팅 거절 시 (회사 사유):</strong> 100% 환불,
            거절 통지일로부터 3영업일 이내 환불 처리
          </li>
          <li>
            <strong>결제 후 7일 경과 후 (미팅 미진행):</strong> 환불 불가, 단
            합리적 사유가 소명되는 경우 회사 재량으로 일부 환불 가능
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          환불 신청은 고객센터 이메일로 접수합니다. 근거 법령: 「전자상거래
          등에서의 소비자보호에 관한 법률」 제17조.
        </p>
      </main>
      <Footer />
    </div>
  );
}
