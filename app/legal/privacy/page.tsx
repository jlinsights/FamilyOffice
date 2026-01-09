import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | FamilyOffice S',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-20 container max-w-4xl mx-auto px-4 prose dark:prose-invert">
        <h1>개인정보처리방침</h1>
        <p className="text-muted-foreground">시행일자: 2026년 1월 1일</p>
        
        <p>FamilyOffice S(이하 "회사")는 회원의 개인정보를 중요시하며, "개인정보보호법", "정보통신망 이용촉진 및 정보보호 등에 관한 법률"을 준수하고 있습니다.</p>
        
        <h2>1. 수집하는 개인정보의 항목</h2>
        <p>회사는 서비스 가입 및 상담, 서비스 제공 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul>
            <li>필수항목: 성명, 연락처, 소속, 직함, 이메일, 거주지역</li>
            <li>선택항목: 관심사, 가족 사항, 라이프스타일 선호도</li>
        </ul>

        <h2>2. 개인정보의 수집 및 이용목적</h2>
        <p>수집한 개인정보는 다음의 목적을 위해 활용합니다.</p>
        <ul>
            <li>서비스 제공에 관한 계약 이행 및 요금 정산</li>
            <li>회원 관리 (본인 확인, 가입 의사 확인, 민원 처리)</li>
            <li>마케팅 및 광고에 활용 (신규 서비스 안내, 이벤트 정보 제공)</li>
        </ul>

         <h2>3. 개인정보의 보유 및 이용기간</h2>
        <p>원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 보존합니다.</p>
      </main>
      <Footer />
    </div>
  );
}
