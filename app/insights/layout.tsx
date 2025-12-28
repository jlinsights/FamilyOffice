import { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '인사이트 센터 2025 | 가업승계·절세·자산관리 전문 블로그 | FamilyOffice S',
  '가업승계 전략, 절세플랜, 자산관리, 금융상품 비교. 법인 대표와 고액자산가를 위한 전문 인사이트. 세무 전문가의 실전 사례와 검증된 전략. 주 2회 업데이트 ☎0502-5550-8700',
  [
    // 🏢 가업승계 키워드 (Business Succession)
    '가업승계 전략',
    '가업승계 컨설팅',
    '기업승계 방법',
    '후계자 육성',
    '경영권 승계',
    '가업상속공제',
    '가업승계 증여특례',
    '100년 기업',
    '가족기업 승계',

    // 💰 절세플랜 키워드 (Tax Planning)
    '절세 전략',
    '상속세 절세',
    '증여세 절세',
    '가업승계 절세',
    '사전증여 전략',
    '세무 최적화',
    '이익잉여금 절세',
    '상속세 계산',
    '증여세 비과세',

    // 📊 자산관리 키워드 (Asset Management)
    '자산관리 전략',
    '고액자산가 자산관리',
    '패밀리오피스 자산관리',
    '부동산 자산관리',
    '은퇴 자산관리',
    '신탁 활용',
    '기업 자산관리',
    '위험관리 전략',

    // 💳 금융상품 키워드 (Financial Products)
    '금융상품 비교',
    '절세 금융상품',
    '상속세 재원 마련',
    '종신보험 활용',
    '투자상품 분석',
    '가업승계 금융상품',

    // 📝 인사이트/블로그 키워드
    '세무 인사이트',
    '자산관리 인사이트',
    '전문가 블로그',
    '케이스 스터디',
    '실전 사례',
    '재무설계 블로그',
    '세무전략 블로그',

    // 🎯 타겟 오디언스 키워드
    '법인 대표',
    '고액자산가',
    '기업 오너',
    'CEO 인사이트',
    '자산가 전문',
  ],
  'https://familyoffices.vip/Images/og-image-familyoffice-v2.png'
);

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
