import { LucideIcon } from 'lucide-react';

/**
 * 전문 서비스 카테고리 정의
 */
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  services: DetailedService[];
}

export interface DetailedService {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  targetClient: string;
  slug?: string;
  caseStudy?: {
    situation: string;
    solution: string;
    result: string;
  };
  detailedContent?: {
    overview: string;
    process: string[];
    pricing: {
      type: 'custom' | 'fixed' | 'percentage';
      range?: string;
      description: string;
    };
    timeline: string;
    deliverables: string[];
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

/**
 * 업종별 특화 서비스 데이터 구조
 */
export interface IndustryService {
  icon: LucideIcon;
  title: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  caseStudy: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
  };
  differentiators: string[];
  expertComment: string;
}
