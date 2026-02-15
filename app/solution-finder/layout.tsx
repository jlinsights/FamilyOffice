import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '맞춤형 솔루션 찾기 | 가업승계·절세·자산관리 진단 | FamilyOffice S',
  '5가지 질문으로 최적의 솔루션 추천. 가업승계, 절세 전략, 자산관리 문제 진단 및 맞춤형 해결방안 제시. 법인 대표와 고액자산가 전용 무료 진단 도구.',
  [
    // 🎯 솔루션 발견 키워드 (Solution Discovery)
    '솔루션 찾기',
    '맞춤형 솔루션',
    '최적 솔루션',
    '해결방안 찾기',
    '문제 해결',
    '솔루션 추천',

    // 🔍 진단/분석 키워드 (Diagnostic)
    '무료 진단',
    '무료 진단 도구',
    '문제 진단',
    '현황 분석',
    '니즈 분석',
    '맞춤 추천',
    '5분 진단',

    // 🏢 서비스 카테고리 키워드 (Service Categories)
    '가업승계 솔루션',
    '절세 솔루션',
    '자산관리 솔루션',
    '금융상품 추천',
    '세무 솔루션',

    // 💼 고객 타겟 키워드 (Target Clients)
    '법인 대표 솔루션',
    'CEO 진단',
    '고액자산가 진단',
    '기업 오너 솔루션',
    '법인 문제 해결',

    // ✨ 차별화 키워드 (Differentiation)
    '맞춤형 진단',
    '즉시 추천',
    '전문가 추천',
    '무료 컨설팅',
  ],
  'https://familyoffices.vip/images/og-image-familyoffice-v2.png'
);

export default function SolutionFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
