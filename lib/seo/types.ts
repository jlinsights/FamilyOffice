
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  targetExperience?: '성장기' | '성숙기' | '전문가급' | '리더급';
  businessStage?: '성장기' | '성숙기' | '승계준비';
  searchIntent?: 'informational' | 'commercial' | 'transactional';
}

export interface StructuredDataConfig {
  type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage' | 'LocalBusiness' | 'BreadcrumbList' | 'AIOptimized';
  path?: string;
}
