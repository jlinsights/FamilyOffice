/**
 * SEO 최적화된 브레드크럼 네비게이션
 * 구조화 데이터와 접근성 지원
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbStructuredData } from './structured-data';

interface BreadcrumbItem {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbNavigationProps {
  className?: string;
  showHome?: boolean;
  customItems?: BreadcrumbItem[];
}

/**
 * 브레드크럼 네비게이션 컴포넌트
 */
export function BreadcrumbNavigation({
  className = '',
  showHome = true,
  customItems
}: BreadcrumbNavigationProps) {
  const pathname = usePathname();

  // 커스텀 아이템이 제공된 경우 사용
  if (customItems) {
    return (
      <>
        <BreadcrumbStructuredData items={customItems} />
        <nav 
          aria-label="breadcrumb" 
          className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
        >
          <ol className="flex items-center space-x-1">
            {customItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                {item.isCurrentPage ? (
                  <span 
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.url}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </>
    );
  }

  // 자동 경로 생성
  const breadcrumbItems = generateBreadcrumbItems(pathname, showHome);

  if (breadcrumbItems.length <= 1) {
    return null; // 홈페이지이거나 깊이가 1인 경우 표시하지 않음
  }

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <nav 
        aria-label="breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
              {index === breadcrumbItems.length - 1 ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="hover:text-foreground transition-colors flex items-center"
                >
                  {index === 0 && showHome && (
                    <Home className="mr-1 h-4 w-4" />
                  )}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * 경로 기반 브레드크럼 아이템 생성
 */
function generateBreadcrumbItems(pathname: string, showHome: boolean): BreadcrumbItem[] {
  const baseUrl = 'https://familyoffices.vip';
  const items: BreadcrumbItem[] = [];

  // 홈 추가
  if (showHome) {
    items.push({
      name: '홈',
      url: baseUrl
    });
  }

  // 경로별 매핑
  const pathMapping: Record<string, string> = {
    '/services': '서비스',
    '/business-succession-strategy': '기업승계 전략',
    '/tax-strategy': '세무최적화',
    '/key-person-insurance': '핵심인력보험',
    '/program': 'CEO 교육 프로그램',
    '/seminar': '세미나',
    '/blog': '블로그',
    '/insights': '인사이트',
    '/insights': '마켓 인텔리전스',
    '/contact': '문의하기',
    '/about': '회사 소개',
    '/faq': '자주묻는질문',
    '/privacy': '개인정보처리방침',
    '/terms': '이용약관'
  };

  // 현재 경로가 매핑에 있는 경우
  if (pathMapping[pathname]) {
    // 상위 경로들도 추가
    const pathParts = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      
      const pathName = pathMapping[currentPath];
      if (pathName) {
        items.push({
          name: pathName,
          url: `${baseUrl}${currentPath}`
        });
      }
    });
  } else if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    // 블로그 개별 포스트
    items.push({
      name: '블로그',
      url: `${baseUrl}/blog`
    });
    
    const slug = pathname.split('/')[2];
    const postTitle = slug ? getPostTitle(slug) : '블로그 포스트'; // 실제 구현에서는 블로그 데이터에서 가져오기
    
    items.push({
      name: postTitle,
      url: `${baseUrl}${pathname}`
    });
  } else if (pathname !== '/') {
    // 기본적으로 경로명을 한국어로 변환
    const pathParts = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathParts.forEach((part) => {
      currentPath += `/${part}`;
      const name = pathMapping[currentPath] || formatPathSegment(part);
      
      items.push({
        name,
        url: `${baseUrl}${currentPath}`
      });
    });
  }

  return items;
}

/**
 * 경로 세그먼트를 한국어로 포맷
 */
function formatPathSegment(segment: string): string {
  // 기본적인 영어 → 한국어 변환
  const segmentMapping: Record<string, string> = {
    'admin': '관리자',
    'dashboard': '대시보드',
    'settings': '설정',
    'profile': '프로필',
    'consultations': '상담',
    'users': '사용자',
    'analytics': '분석'
  };

  return segmentMapping[segment] || segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * 블로그 포스트 제목 가져오기 (실제 구현에서는 데이터에서 조회)
 */
function getPostTitle(slug: string): string {
  // 실제 구현에서는 블로그 데이터나 API에서 제목을 가져와야 함
  const titleMapping: Record<string, string> = {
    'family-office-guide': '패밀리오피스 완전 가이드',
    'business-succession-planning': '기업승계 계획 수립 방법',
    'tax-optimization-strategies': '세무최적화 전략',
    'wealth-management-trends': '자산관리 트렌드 분석'
  };

  return titleMapping[slug] || '블로그 포스트';
}

/**
 * 서비스별 브레드크럼 컴포넌트
 */
export function ServiceBreadcrumb({ serviceName }: { serviceName: string }) {
  const items: BreadcrumbItem[] = [
    { name: '홈', url: 'https://familyoffices.vip' },
    { name: '서비스', url: 'https://familyoffices.vip/services' },
    { name: serviceName, url: '', isCurrentPage: true }
  ];

  return <BreadcrumbNavigation customItems={items} />;
}

/**
 * 블로그 브레드크럼 컴포넌트
 */
export function BlogBreadcrumb({ 
  postTitle, 
  category 
}: { 
  postTitle?: string; 
  category?: string 
}) {
  const items: BreadcrumbItem[] = [
    { name: '홈', url: 'https://familyoffices.vip' },
    { name: '블로그', url: 'https://familyoffices.vip/blog' }
  ];

  if (category) {
    items.push({
      name: category,
      url: `https://familyoffices.vip/blog?category=${encodeURIComponent(category)}`
    });
  }

  if (postTitle) {
    items.push({
      name: postTitle,
      url: '',
      isCurrentPage: true
    });
  }

  return <BreadcrumbNavigation customItems={items} />;
}

export default BreadcrumbNavigation;