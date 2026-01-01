// 동적 Breadcrumb 생성 함수
export function generateBreadcrumbStructuredData(path: string = '/') {
  const baseUrl = 'https://familyoffices.vip';
  const pathSegments = path.split('/').filter(Boolean);

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: baseUrl,
    },
  ];

  // 경로별 한국어 이름 매핑
  const pathNameMap: Record<string, string> = {
    about: '회사 소개',
    solutions: '솔루션',
    program: '교육 프로그램',
    seminar: '세미나',
    recruit: '채용',
    contact: '연락처',
    blog: '블로그',
    insights: '인사이트',
    'market-intelligence': '시장 정보',
    'weekly-brief': '주간 브리핑',
    resources: '리소스',
    dashboard: '대시보드',
    privacy: '개인정보처리방침',
    terms: '이용약관',
  };

  let currentPath = baseUrl;
  pathSegments.forEach((segment, index) => {
    currentPath += '/' + segment;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: index + 2,
      name: pathNameMap[segment] || segment,
      item: currentPath,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}
