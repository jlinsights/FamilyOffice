import { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  '프로그램 | 가업승계·자산관리 교육 프로그램 | FamilyOffice S',
  'CEO를 위한 체계적 가업승계, 자산관리 교육 프로그램. 100년 기업 프로그램, 자산 클래스 교육 등 법인 대표와 고액자산가 전용 프리미엄 프로그램.',
  [
    // 📚 프로그램 키워드 (Program-focused)
    'CEO 프로그램',
    'CEO 교육 프로그램',
    '경영자 프로그램',
    '경영자 교육',
    '법인 대표 교육',
    '기업 오너 교육',

    // 🏢 가업승계/자산관리 교육 (Education Categories)
    '가업승계 프로그램',
    '가업승계 교육',
    '자산관리 교육',
    '자산관리 프로그램',
    '100년 기업 프로그램',
    '대를 잇는 기업',

    // 💼 타겟 고객 키워드 (Target Clients)
    '법인 대표 전용',
    '고액자산가 교육',
    '기업 오너 전용',
    'CEO 전담 프로그램',

    // ✨ 차별화 키워드 (Differentiation)
    '체계적 프로그램',
    '프리미엄 교육',
    '프리미엄 프로그램',
    '전문가 교육',
    '맞춤형 교육',

    // 🎓 프로그램 유형 (Program Types)
    '자산 클래스 교육',
    '미술품 자산 교육',
    '대체자산 교육',
    '경영 교육',
  ],
  'https://familyoffices.vip/Images/og-image-familyoffice-v2.png'
);

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
