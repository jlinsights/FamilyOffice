import { BlogPost, BlogCategory } from '@/types/blog';

// FamilyOffice S 블로그 카테고리 (완전 한국어)
export const blogCategories: BlogCategory[] = [
  {
    name: '패밀리오피스',
    slug: 'family-office',
    icon: 'Target',
    count: 3,
    description: '가족자산관리와 패밀리오피스 구축 전략',
  },
  {
    name: '투자전략',
    slug: 'investment-strategy',
    icon: 'TrendingUp',
    count: 2,
    description: '포트폴리오 최적화와 투자 전략 가이드',
  },
  {
    name: '세무최적화',
    slug: 'tax-optimization',
    icon: 'FileText',
    count: 2,
    description: '상속세 절세와 세무 구조 개선 전략',
  },
  {
    name: '자산관리',
    slug: 'asset-management',
    icon: 'BarChart3',
    count: 3,
    description: '통합자산관리 및 위험관리 솔루션',
  },
  {
    name: '승계전략',
    slug: 'succession-planning',
    icon: 'Users',
    count: 2,
    description: '기업승계와 차세대 경영진 준비',
  },
  {
    name: '디지털혁신',
    slug: 'digital-innovation',
    icon: 'Cpu',
    count: 1,
    description: '핀테크와 디지털 자산관리 기술',
  },
];

// FamilyOffice S 블로그 포스트 (발행 준비된 콘텐츠)
export const blogPosts: Record<string, BlogPost> = {
  'family-office-basics-guide': {
    id: 'family-office-basics-guide',
    title: '패밀리오피스란 무엇인가?',
    excerpt: '패밀리오피스의 개념과 필요성, 그리고 중견기업 경영진이 알아야 할 핵심 포인트를 정리했습니다.',
    content: `# 패밀리오피스란 무엇인가?

패밀리오피스는 초고액 자산가 가족을 위한 전담 자산관리 조직입니다. 단순한 재산관리를 넘어서 가족의 장기적 번영을 위한 통합적 서비스를 제공합니다.

## 패밀리오피스의 핵심 기능

### 1. 자산 관리
- 포트폴리오 관리 및 투자 자문
- 부동산 투자 및 관리
- 대체투자 기회 발굴

### 2. 세무 최적화
- 상속세 절세 전략
- 법인 구조 최적화
- 국제 조세 계획

### 3. 승계 계획
- 차세대 경영진 교육
- 가업 승계 준비
- 거버넌스 체계 구축

## 중견기업에게 패밀리오피스가 중요한 이유

한국의 중견기업들은 창업 1세대에서 2세대로 경영권이 넘어가는 중요한 시기를 맞고 있습니다. 이 과정에서 체계적인 자산관리와 승계 계획이 필수적입니다.

패밀리오피스는 이러한 전환기를 성공적으로 관리하고, 기업과 가족의 지속가능한 성장을 지원합니다.`,
    category: '패밀리오피스',
    author: 'FamilyOffice S',
    date: '2024-12-15',
    readTime: '5분',
    tags: ['패밀리오피스', '자산관리', '승계계획'],
    slug: 'family-office-basics-guide',
    featured: true,
  },

  'asset-management-strategy': {
    id: 'asset-management-strategy',
    title: '체계적인 자산관리 전략',
    excerpt: '분산된 자산을 체계적으로 관리하기 위한 전략과 방법을 소개합니다.',
    content: `# 체계적인 자산관리 전략

중견기업 경영진의 자산은 대개 기업 지분, 부동산, 금융자산 등 다양한 형태로 구성되어 있습니다. 이러한 복합적인 자산을 효과적으로 관리하기 위해서는 체계적인 접근이 필요합니다.

## 자산 관리의 기본 원칙

### 1. 분산 투자
위험을 분산하고 안정적인 수익을 추구하기 위해 다양한 자산 클래스에 투자합니다.

### 2. 정기적인 리밸런싱
시장 상황에 따라 포트폴리오를 조정하여 목표 비율을 유지합니다.

### 3. 장기적 관점
단기적인 시장 변동에 흔들리지 않고 장기적인 목표를 추구합니다.

## 실행 방안

전문적인 자산관리를 위해서는 신뢰할 수 있는 파트너와의 협력이 중요합니다. FamilyOffice S는 이러한 체계적인 자산관리를 지원합니다.`,
    category: '자산관리',
    author: 'FamilyOffice S',
    date: '2024-12-10',
    readTime: '4분',
    tags: ['자산관리', '포트폴리오', '투자전략'],
    slug: 'asset-management-strategy',
    featured: true,
  },

  'tax-optimization-basics': {
    id: 'tax-optimization-basics',
    title: '중견기업을 위한 절세 전략',
    excerpt: '합법적이고 효과적인 절세 방법과 상속세 대비 전략을 알아봅니다.',
    content: `# 중견기업을 위한 절세 전략

세무 최적화는 합법적인 방법을 통해 세부담을 줄이고 기업과 가족의 재정 효율성을 높이는 것입니다.

## 주요 절세 방법

### 1. 가업승계 공제 활용
중소기업 가업승계 특례를 통해 상속세 부담을 크게 줄일 수 있습니다.

### 2. 단계적 증여
상속세보다 낮은 세율의 증여세를 활용하여 미리 자산을 이전합니다.

### 3. 법인 구조 최적화
지주회사 구조를 통해 세부담을 줄이고 경영 효율성을 높입니다.

## 전문가 상담의 중요성

세무 최적화는 복잡한 법률과 세제를 다루므로 반드시 전문가와 함께 진행해야 합니다.`,
    category: '세무최적화',
    author: 'FamilyOffice S',
    date: '2024-12-08',
    readTime: '6분',
    tags: ['절세', '상속세', '증여세', '가업승계'],
    slug: 'tax-optimization-basics',
    featured: true,
  },

  'investment-strategy-2025': {
    id: 'investment-strategy-2025',
    title: '2025년 투자 전망과 전략',
    excerpt: '새로운 해를 맞아 주목해야 할 투자 기회와 리스크 관리 방안을 제시합니다.',
    content: `# 2025년 투자 전망과 전략

글로벌 경제의 불확실성이 지속되는 가운데, 2025년 투자 전략은 신중함과 기회 포착의 균형이 중요합니다.

## 2025년 투자 환경

### 주요 특징
- 금리 정책의 변화
- 인플레이션 관리
- 지정학적 리스크
- 기술 혁신의 가속화

## 권장 투자 전략

### 1. 핵심-위성 전략
안정적인 핵심 자산과 성장 가능성이 높은 위성 자산의 조합

### 2. ESG 투자 확대
지속가능한 투자에 대한 관심 증가와 정부 정책 지원

### 3. 대체투자 검토
전통적인 자산 외에 부동산, 사모투자 등 대체투자 기회 탐색

투자 결정은 개인의 재정 상황과 목표에 따라 달라지므로 전문가와의 상담이 필요합니다.`,
    category: '투자전략',
    author: 'FamilyOffice S',
    date: '2024-12-05',
    readTime: '5분',
    tags: ['투자전략', '2025전망', 'ESG투자'],
    slug: 'investment-strategy-2025',
    featured: false,
  },

  'succession-planning-guide': {
    id: 'succession-planning-guide',
    title: '성공적인 기업 승계를 위한 준비',
    excerpt: '기업 승계 과정에서 고려해야 할 법적, 세무적, 경영적 요소들을 정리했습니다.',
    content: `# 성공적인 기업 승계를 위한 준비

기업 승계는 단순한 소유권 이전이 아닙니다. 기업의 지속가능성과 가족의 화합을 위한 종합적인 계획이 필요합니다.

## 승계 계획의 핵심 요소

### 1. 승계자 준비
- 리더십 역량 개발
- 사업 이해도 향상
- 관계 구축 능력

### 2. 세무 계획
- 상속세 최소화 전략
- 가업승계 특례 활용
- 단계적 이전 계획

### 3. 거버넌스 체계
- 가족헌법 제정
- 의사결정 구조
- 갈등 해결 방안

## 성공적인 승계를 위한 조언

승계는 10년 이상의 장기적인 과정입니다. 충분한 시간을 두고 체계적으로 준비하는 것이 중요합니다.`,
    category: '승계전략',
    author: 'FamilyOffice S',
    date: '2024-12-01',
    readTime: '7분',
    tags: ['기업승계', '가업승계', '거버넌스'],
    slug: 'succession-planning-guide',
    featured: false,
  },

  'digital-transformation-finance': {
    id: 'digital-transformation-finance',
    title: '금융업계의 디지털 혁신',
    excerpt: '핀테크와 디지털 기술이 자산관리 업계에 가져온 변화와 기회를 살펴봅니다.',
    content: `# 금융업계의 디지털 혁신

디지털 기술의 발전은 자산관리 업계에 근본적인 변화를 가져오고 있습니다. 인공지능, 빅데이터, 블록체인 등의 기술이 새로운 서비스와 기회를 창출하고 있습니다.

## 주요 디지털 혁신 트렌드

### 1. AI 기반 자산관리
- 개인화된 포트폴리오 추천
- 리스크 분석 및 예측
- 자동화된 리밸런싱

### 2. 데이터 분석의 진화
- 실시간 시장 분석
- 고객 행동 패턴 분석
- 투자 성과 최적화

### 3. 디지털 플랫폼
- 통합된 자산관리 대시보드
- 모바일 우선 서비스
- 실시간 리포팅

## 중견기업에게 주는 시사점

디지털 기술을 활용한 자산관리는 더 이상 대기업의 전유물이 아닙니다. 중견기업도 이러한 혁신을 통해 효율적이고 전문적인 자산관리가 가능합니다.`,
    category: '디지털혁신',
    author: 'FamilyOffice S',
    date: '2024-11-28',
    readTime: '4분',
    tags: ['디지털혁신', '핀테크', 'AI', '자산관리'],
    slug: 'digital-transformation-finance',
    featured: false,
  },
};