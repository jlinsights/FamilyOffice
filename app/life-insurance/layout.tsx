import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인/법인 종신보험 | FamilyOffice S - 평생보장 + 세무최적화 통합 솔루션',
  description: 'CEO와 고액자산가를 위한 개인/법인 종신보험 전문 설계. 평생보장 사망보험금, 해약환급금 퇴직금 활용, 상속세 납부재원 확보, 법인 손금처리로 세무최적화까지. 삼성생명 1000억+ 실적.',
  keywords: [
    '개인종신보험',
    '법인종신보험', 
    '종신보험 설계',
    'CEO 종신보험',
    '법인명의 종신보험',
    '상속세 납부재원',
    '해약환급금 퇴직금',
    '법인 손금처리',
    '세무최적화 보험',
    '평생보장 보험',
    '가업승계 보험',
    '고액자산가 보험',
    '중견기업 보험',
    '삼성생명 종신보험'
  ],
  openGraph: {
    title: '개인/법인 종신보험 | FamilyOffice S - 평생보장 + 세무최적화',
    description: 'CEO와 고액자산가를 위한 종신보험 전문 설계. 평생보장 + 상속세 납부재원 + 세무최적화 통합 솔루션. 삼성생명 1000억+ 실적으로 검증된 신뢰성.',
    url: 'https://familyoffices.vip/life-insurance',
    type: 'website',
    images: [{
      url: '/og-life-insurance.jpg',
      width: 1200,
      height: 630,
      alt: '개인/법인 종신보험 전문 설계 서비스'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '개인/법인 종신보험 | FamilyOffice S',
    description: 'CEO와 고액자산가를 위한 종신보험 전문 설계. 평생보장 + 세무최적화 통합 솔루션.',
    images: ['/og-life-insurance.jpg']
  },
  alternates: {
    canonical: 'https://familyoffices.vip/life-insurance'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function LifeInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}