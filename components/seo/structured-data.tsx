import { sanitizeStructuredData } from '@/lib/security/html-sanitizer';
import { generateStructuredData } from '@/lib/seo/structured-data';

interface StructuredDataProps {
  data: unknown;
}

export function StructuredData({ data }: StructuredDataProps) {
  // data가 유효하지 않으면 렌더링하지 않음
  if (!data || typeof data !== 'object') {
    return null;
  }

  try {
    // Securely serialize and validate structured data
    const jsonData = sanitizeStructuredData(data);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonData,
        }}
      />
    );
  } catch {
    return null;
  }
}

export interface BreadcrumbItem {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={structuredData} />;
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FamilyOffice S',
    url: 'https://familyoffices.vip',
    logo: 'https://familyoffices.vip/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '0502-5550-8700',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: 'Korean',
    },
    sameAs: ['https://familyoffices.vip'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
  };

  return <StructuredData data={structuredData} />;
}

export function WebsiteStructuredData() {
  const structuredData = generateStructuredData('WebSite');
  return <StructuredData data={structuredData} />;
}
