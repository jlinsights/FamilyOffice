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