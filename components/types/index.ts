/**
 * TypeScript types for components
 */

// UI Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
}

// Layout Component Props
export interface HeaderProps {
  isScrolled?: boolean;
}

export interface FooterProps {
  className?: string;
}

// Form Component Props
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

// Feature Component Props
export interface AuthComponentProps {
  mode?: 'modal' | 'redirect';
  afterSignInUrl?: string;
}

export interface FinancialComponentProps {
  data: any;
  loading?: boolean;
  error?: string;
}

// Blog Component Props
export interface BlogComponentProps {
  posts: BlogPost[];
  category?: string;
  loading?: boolean;
}

export interface SeminarComponentProps {
  seminars: Seminar[];
  loading?: boolean;
  filter?: SeminarFilter;
}

// Common Component Types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}
