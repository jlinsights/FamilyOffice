import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: '유의사항 및 면책 | FamilyOffice S',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-4xl mx-auto px-4 prose dark:prose-invert">
        <h1>서비스 유의사항 및 면책</h1>

        <h2>1. 서비스의 성격</h2>
        <p>
          본 멤버십(FamilyOffice S)은 회원을 대신하여 상품/서비스를 탐색, 기획,
          예약 대행하는 <strong>컨시어지 및 자문 서비스</strong>입니다. 회사는
          통신판매중개자로서 거래 당사자가 아니며, 제휴사(호텔, 항공사, 여행사
          등)가 제공하는 용역의 하자에 대해서는 직접적인 책임을 지지 않습니다.
        </p>

        <h2>2. 비용 부담 원칙</h2>
        <p>
          멤버십 연회비는 기획, 섭외, 우선권 확보, 상담 등 무형의 서비스에 대한
          대가이며, 실제 발생하는 숙박비, 항공료, 티켓 구매비, 식대 등의 실비는
          회원이 별도로 부담하여야 합니다.
        </p>

        <h2>3. 예약 및 변동</h2>
        <p>
          모든 예약 및 섭외는 제휴처의 실시간 상황에 따라 변동될 수 있습니다.
          회사는 예약 확정을 위해 최선을 다하나, 제휴처의 사정으로 인한 취소나
          변경에 대해서는 동급의 대안을 제시하는 것으로 책임을 다합니다.
        </p>

        <h2>4. 전문가 연결</h2>
        <p>
          세무, 법무, 부동산 등 전문가 연결 시, 1차 상담 주선은 멤버십 혜택에
          포함되나, 실제 사건 수임이나 용역 계약 체결에 따른 비용은 회원과 해당
          전문가 간의 별도 계약에 따릅니다.
        </p>
      </main>
      <Footer />
    </div>
  );
}
