import type { Metadata } from 'next';

import { generateMetadata, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generateMetadata(
  'AI 컨설턴트 | 24시간 가업승계·자산관리 전문상담',
  'FamilyOffice S AI 컨설턴트와 24시간 실시간 상담하세요. 가업승계, 자산이전, 경영인정기보험, 절세 전략, CEO플랜부터 중대재해처벌법까지 전문적인 AI 답변을 즉시 제공받을 수 있습니다. ai.familyoffices.vip',
  [
    'AI 컨설턴트',
    'AI 자산관리 상담',
    'AI 가업승계 상담',
    'AI 세무상담',
    '24시간 AI 상담',
    'AI CEO플랜',
    'AI 경영컨설팅',
    'AI 절세 상담',
    'AI 상속설계',
    'AI 증여설계',
    '실시간 AI 상담',
    'FamilyOffice AI',
    'AI 재무설계',
    'AI 투자자문',
    'AI 보험설계',
    'AI 패밀리오피스',
    '인공지능 자산관리',
    '인공지능 컨설턴트',
    'AI 기업컨설팅',
    'AI 법인상담',
    'Instagram AI 상담',
    'Threads AI 컨설팅',
    '소셜미디어 AI 상담',
    'SNS AI 컨설턴트',
  ]
);

export default function AILayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FamilyOffice S AI 컨설턴트',
    description: '24시간 가업승계, 자산관리, 세무 최적화 전문 AI 상담 서비스',
    url: 'https://ai.familyoffices.vip',
    mainEntity: {
      '@type': 'Service',
      name: 'AI 컨설팅 서비스',
      description: '중소중견기업 CEO를 위한 24시간 AI 전문 상담 서비스',
      provider: {
        '@type': 'Organization',
        name: 'FamilyOffice S',
        url: 'https://familyoffices.vip',
      },
      serviceType: 'AI 컨설팅',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://ai.familyoffices.vip',
        serviceSmsNumber: '+82-502-5550-8700',
        serviceLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'KR',
            addressLocality: 'Seoul',
          },
        },
      },
      offers: {
        '@type': 'Offer',
        description: '24시간 무료 AI 컨설팅',
        price: '0',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: 'https://familyoffices.vip',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI 컨설턴트',
          item: 'https://ai.familyoffices.vip',
        },
      ],
    },
    potentialAction: {
      '@type': 'CommunicateAction',
      name: 'AI와 채팅 시작',
      target: 'https://ai.familyoffices.vip',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}