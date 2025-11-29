/**
 * SEO 구조화 데이터 컴포넌트 - 네이버 검색 최적화
 * JSON-LD 형식의 구조화 데이터를 페이지에 삽입
 */

import Script from 'next/script';

interface StructuredDataProps {
  data: any;
  id?: string;
}

/**
 * 구조화 데이터 JSON-LD 컴포넌트 - Next.js Script 컴포넌트 사용
 */
export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}

/**
 * 조직 정보 구조화 데이터
 */
export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FamilyOffice S",
    "alternateName": "패밀리오피스 S",
    "url": "https://familyoffices.vip",
    "logo": "https://familyoffices.vip/favicon.ico",
    "sameAs": [
      "https://blog.naver.com/lim_jaehong"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-502-555-0870",
      "contactType": "Customer Service",
      "areaServed": "KR",
      "availableLanguage": "Korean"
    }
  };

  return <StructuredData data={organizationData} id="organization-schema" />;
}

/**
 * 웹사이트 구조화 데이터
 */
export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FamilyOffice S",
    "url": "https://familyoffices.vip",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://familyoffices.vip/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <StructuredData data={websiteData} id="website-schema" />;
}

/**
 * 서비스 구조화 데이터
 */
interface ServiceStructuredDataProps {
  name: string;
  description: string;
  serviceType: string;
}

export function ServiceStructuredData({ 
  name, 
  description, 
  serviceType 
}: ServiceStructuredDataProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType
  };

  return <StructuredData data={serviceData} id="service-schema" />;
}

/**
 * 블로그 아티클 구조화 데이터
 */
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image: string;
  publishDate: string;
  modifiedDate: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  publishDate,
  modifiedDate,
  url
}: ArticleStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "url": url
  };

  return <StructuredData data={articleData} id="article-schema" />;
}

/**
 * FAQ 구조화 데이터
 */
interface FAQStructuredDataProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQStructuredData({ questions }: FAQStructuredDataProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return <StructuredData data={faqData} id="faq-schema" />;
}

/**
 * 브레드크럼 구조화 데이터
 */
interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={breadcrumbData} id="breadcrumb-schema" />;
}

/**
 * 페이지별 맞춤형 구조화 데이터
 */
export function PageStructuredData({ pathname }: { pathname: string }) {
  const baseUrl = 'https://familyoffices.vip';

  // 메인 페이지
  if (pathname === '/') {
    return (
      <>
        <OrganizationStructuredData />
        <ServiceStructuredData
          name="패밀리오피스 종합 서비스"
          description="중견기업 CEO를 위한 전문 자산관리 서비스"
          serviceType="FinancialService"
        />
      </>
    );
  }

  // 서비스 페이지
  if (pathname === '/services') {
    return (
      <>
        <ServiceStructuredData
          name="자산관리 서비스"
          description="고액자산가를 위한 종합 자산관리 서비스"
          serviceType="WealthManagement"
        />
        <BreadcrumbStructuredData
          items={[
            { name: '홈', url: baseUrl },
            { name: '서비스', url: `${baseUrl}/services` }
          ]}
        />
      </>
    );
  }

  // 기업승계 페이지
  if (pathname === '/business-succession-strategy') {
    return (
      <>
        <ServiceStructuredData
          name="기업승계 전략 컨설팅"
          description="성공적인 기업승계를 위한 전문 컨설팅"
          serviceType="BusinessConsulting"
        />
        <BreadcrumbStructuredData
          items={[
            { name: '홈', url: baseUrl },
            { name: '서비스', url: `${baseUrl}/services` },
            { name: '기업승계', url: `${baseUrl}/business-succession-strategy` }
          ]}
        />
      </>
    );
  }

  // 세무전략 페이지
  if (pathname === '/tax-strategy') {
    return (
      <>
        <ServiceStructuredData
          name="세무최적화 전략"
          description="상속세, 증여세 절세 전문 컨설팅"
          serviceType="TaxConsulting"
        />
        <BreadcrumbStructuredData
          items={[
            { name: '홈', url: baseUrl },
            { name: '서비스', url: `${baseUrl}/services` },
            { name: '세무전략', url: `${baseUrl}/tax-strategy` }
          ]}
        />
      </>
    );
  }

  // FAQ 페이지
  if (pathname === '/faq') {
    const faqData = [
      {
        question: '패밀리오피스 서비스 이용 조건은 무엇인가요?',
        answer: '일반적으로 10억원 이상의 금융자산을 보유하신 고객님께 제공되며, 중견기업 CEO 및 고액자산가를 대상으로 합니다.'
      },
      {
        question: '자산관리 수수료는 어떻게 책정되나요?',
        answer: '고객님의 자산 규모와 서비스 범위에 따라 차등 적용되며, 투명한 수수료 체계를 통해 안내드립니다.'
      },
      {
        question: '기업승계 컨설팅은 어떤 과정으로 진행되나요?',
        answer: '현황 분석, 승계 전략 수립, 세무 최적화, 실행 지원의 4단계로 체계적으로 진행됩니다.'
      }
    ];

    return (
      <>
        <FAQStructuredData questions={faqData} />
        <BreadcrumbStructuredData
          items={[
            { name: '홈', url: baseUrl },
            { name: '자주묻는질문', url: `${baseUrl}/faq` }
          ]}
        />
      </>
    );
  }

  // 블로그 페이지
  if (pathname.startsWith('/blog')) {
    return (
      <BreadcrumbStructuredData
        items={[
          { name: '홈', url: baseUrl },
          { name: '블로그', url: `${baseUrl}/blog` }
        ]}
      />
    );
  }

  // 기본 구조화 데이터
  return <OrganizationStructuredData />;
}

export default PageStructuredData;