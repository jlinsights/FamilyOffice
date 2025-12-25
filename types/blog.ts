export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  featured?: boolean;
  image?: string;
  views?: number;
  likes?: number;
  shares?: number;
  coverImage?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  lastUpdated?: string; // 최종 수정일 (ISO Date string)
  revisionNote?: string; // 수정 사유 (예: 2025년 세법 개정 반영)
  verificationStatus?: 'verified' | 'needs_revision' | 'outdated'; // 팩트 체크 상태
  sources?: {
    // 출처
    title: string;
    url?: string;
  }[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export type BlogSortBy = 'date' | 'title' | 'readTime' | 'category';
export type BlogSortOrder = 'asc' | 'desc';

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  featured?: boolean;
  search?: string;
}

export interface BlogMeta {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
