import { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '솔루션 | 가업승계·절세·자산관리 전문 서비스 | FamilyOffice S',
  '가업승계, 절세 전략, 자산관리, 금융상품 전문 솔루션. 법인 대표와 고액자산가를 위한 포괄적 서비스 포트폴리오. 검증된 전문가팀이 제공하는 맞춤형 해결방안.',
  [
    // 🏢 서비스 카테고리 키워드 (Service Categories)
    '패밀리오피스 솔루션',
    '가업승계 서비스',
    '절세 서비스',
    '자산관리 서비스',
    '금융상품 솔루션',
    '세무 서비스',
    '재무설계 서비스',

    // 💼 고객 타겟 키워드 (Target Clients)
    '법인 서비스',
    'CEO 서비스',
    '고액자산가 서비스',
    '기업 오너 서비스',
    '법인 대표 전문',

    // ✨ 차별화 키워드 (Differentiation)
    '맞춤형 서비스',
    '종합 솔루션',
    '전문 서비스',
    '포괄적 솔루션',
    '통합 서비스',
    '원스톱 솔루션',

    // 🎯 솔루션 유형 키워드 (Solution Types)
    '맞춤형 해결방안',
    '전문가 솔루션',
    '검증된 서비스',
    '프리미엄 솔루션',
    '종합 컨설팅',

    // 📊 서비스 영역 키워드 (Service Areas)
    '가업승계 컨설팅',
    '절세 컨설팅',
    '자산관리 컨설팅',
    '금융상품 컨설팅',
    '세무 컨설팅',
    '재무 컨설팅',
  ],
  'https://familyoffices.vip/Images/og-image-familyoffice-v2.png'
);

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
