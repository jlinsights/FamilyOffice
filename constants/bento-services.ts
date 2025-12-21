import {
    ArrowRight,
    Building2,
    Calculator,
    Crown,
    Shield,
    Target,
    TrendingUp,
    Users,
    type LucideIcon
} from 'lucide-react';

/**
 * Bento Grid Service Configuration
 * 
 * Size variants:
 * - 'large': 2col × 2row (featured)
 * - 'regular': 1col × 1row (standard)
 * - 'cta': Full/partial width (call-to-action)
 */

export type ServiceSize = 'large' | 'regular' | 'cta';

export interface BentoService {
  id: string;
  size: ServiceSize;
  priority: number;
  icon: LucideIcon;
  title: string;
  tagline?: string;
  description: string;
  features: string[];
  image?: string;
  href: string;
  stats?: {
    value: string;
    label: string;
  };
  badge?: string;
}

/**
 * 8 Main services for Bento Grid layout
 * Ordered by business priority
 */
export const BENTO_SERVICES: BentoService[] = [
  // ========================================
  // TIER 1: Large Featured Cards (2×2)
  // ========================================
  {
    id: 'asset-management',
    size: 'large',
    priority: 1,
    icon: TrendingUp,
    title: '자산관리',
    tagline: '세대를 잇는 자산관리 전략',
    description: '500억원+ 자산 관리 경험을 바탕으로 고액 자산가를 위한 맞춤형 포트폴리오 관리와 리스크 헤지 전략을 제공합니다.',
    features: [
      '포트폴리오 다각화 전략',
      '리스크 관리 및 헤지',
      '세금 최적화 솔루션',
      '차세대 승계 설계',
      '글로벌 자산 배분'
    ],
    href: '/solutions#asset-management',
    stats: {
      value: '500억원+',
      label: '자산관리 실적'
    },
    badge: 'Premium'
  },
  {
    id: 'business-succession',
    size: 'large',
    priority: 2,
    icon: Target,
    title: '가업승계',
    tagline: '전략적 가업승계 설계',
    description: '가업을 다음 세대로 안정적으로 승계하기 위한 종합 전략을 수립하고, 상속세 부담을 최소화하는 최적의 솔루션을 제공합니다.',
    features: [
      '5단계 승계 로드맵',
      '상속세 최적화 전략',
      '경영권 안정화 방안',
      '가족신탁 활용',
      '차세대 CEO 육성'
    ],
    href: '/business-succession-strategy',
    stats: {
      value: '20년+',
      label: '승계 전문 경험'
    },
    badge: 'Expertise'
  },

  // ========================================
  // TIER 2: Regular Cards (1×1)
  // ========================================
  {
    id: 'tax-strategy',
    size: 'regular',
    priority: 3,
    icon: Calculator,
    title: '세무컨설팅',
    description: '법인세 절세부터 개인세 최적화까지 종합 세무 전략을 제공합니다.',
    features: [
      '법인세 절세 전략',
      '개인세 최적화',
      '경정청구 컨설팅'
    ],
    href: '/tax-strategy'
  },
  {
    id: 'corporate-insurance',
    size: 'regular',
    priority: 4,
    icon: Shield,
    title: '기업보험',
    description: '기업 리스크 관리와 임직원 복리후생을 위한 보험 솔루션입니다.'
    features: [
      '경영진정기보험',
      '단체보험 설계',
      '중대재해법 대응'
    ],
    href: '/solutions#corporate-insurance-finance'
  },
  {
    id: 'real-estate',
    size: 'regular',
    priority: 5,
    icon: Building2,
    title: '부동산 투자',
    description: '안정적인 수익을 위한 부동산 투자 전략과 자산 관리 서비스입니다.',
    features: [
      '상업용 부동산 투자',
      '부동산 포트폴리오',
      '자산 가치 평가'
    ],
    href: '/solutions#investment-finance'
  },
  {
    id: 'hr-support',
    size: 'regular',
    priority: 6,
    icon: Users,
    title: '인사노무',
    description: '중소기업 인사관리부터 정부지원금까지 종합 HR 솔루션입니다.',
    features: [
      '노무관리 시스템',
      '고용지원금 신청',
      '복리후생 설계'
    ],
    href: '/solutions#hr-support'
  },

  // ========================================
  // TIER 3: CTA Cards (Full/Partial Width)
  // ========================================
  {
    id: 'family-office-center',
    size: 'cta',
    priority: 7,
    icon: Crown,
    title: '패밀리오피스 센터',
    description: '최고 자산가를 위한 전용 서비스',
    features: [],
    href: '/family-office-center',
    badge: 'VIP'
  },
  {
    id: 'view-all',
    size: 'cta',
    priority: 8,
    icon: ArrowRight,
    title: '전체 솔루션 보기',
    description: '30+ 전문 서비스 확인',
    features: [],
    href: '/solutions'
  }
];

/**
 * Get grid class based on service size
 */
export function getGridClass(size: ServiceSize): string {
  switch (size) {
    case 'large':
      return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2';
    case 'regular':
      return 'col-span-1 md:col-span-1 lg:col-span-1';
    case 'cta':
      return 'col-span-1 md:col-span-1 lg:col-span-2';
    default:
      return 'col-span-1';
  }
}
