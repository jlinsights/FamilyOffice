import { Metadata } from 'next';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: '이용약관 | FamilyOffice S',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-4xl mx-auto px-4 prose dark:prose-invert">
        <h1>이용약관</h1>
        <p className="text-muted-foreground">시행일자: 2026년 1월 1일</p>

        <h2>제1조 (목적)</h2>
        <p>
          본 약관은 FamilyOffice S(이하 &ldquo;회사&rdquo;)가 제공하는 멤버십 및
          관련 제반 서비스(이하 &ldquo;서비스&rdquo;) 이용과 관련하여 회사와
          회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>

        <h2>제2조 (용어의 정의)</h2>
        <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
        <ul>
          <li>
            &ldquo;서비스&rdquo;라 함은 회사가 제공하는 통합 자산관리, 컨시어지,
            네트워킹 등의 모든 서비스를 의미합니다.
          </li>
          <li>
            &ldquo;회원&rdquo;이라 함은 회사와 이용계약을 체결하고 회사가
            제공하는 서비스를 이용하는 자를 말합니다.
          </li>
        </ul>

        <h2>제3조 (서비스의 내용)</h2>
        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
        <ol>
          <li>자산관리 및 승계 컨설팅</li>
          <li>라이프스타일 컨시어지 (여행, 다이닝, 아트 등 기획 및 예약)</li>
          <li>프라이빗 네트워킹 행사 초청</li>
        </ol>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <p className="font-semibold mb-2">📢 서비스 이용 유의사항</p>
          <p className="text-sm text-muted-foreground m-0">
            본 멤버십은 기획, 섭외, 예약 대행, 우선권 제공을 주 내용으로 하며,
            항공권, 호텔 숙박비, 티켓 구매비 등 실비는 회원이 부담하는 것을
            원칙으로 합니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
