/**
 * Podcast constants and configuration for FamilyOffice S
 * Centralized podcast data, configuration, and mapping constants
 */

import { 
  PodcastEpisode, 
  PodcastShow, 
  PodcastCategory, 
  SpotifyConfig,
  ContentMatchingStrategy 
} from '@/types/podcast';

/** Main FamilyOffice S podcast show configuration */
export const FAMILYOFFICE_PODCAST_SHOW: PodcastShow = {
  id: 'familyoffice-main',
  title: 'FamilyOffice S 팟캐스트',
  description: '전문가와 함께하는 자산관리 토크 - 복잡한 자산관리와 세무 전략을 쉽게 풀어드리는 오디오 콘텐츠',
  spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
  coverImageUrl: '/images/podcast-cover.jpg',
  host: '임재홍 수석 컨설턴트',
  categories: ['투자전략', '세무최적화', '가업승계', '패밀리오피스', '자산관리'],
  schedule: '격주 화요일 오후 2시',
  language: 'ko',
  status: 'active',
  totalEpisodes: 25,
  createdAt: '2024-01-01',
  lastEpisodeDate: '2025-01-15',
};

/** Spotify integration configuration */
export const SPOTIFY_CONFIG: SpotifyConfig = {
  showUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
  showId: '6BvRGd3OODaKyJtVl1GN46',
  embedConfig: {
    width: 800,
    height: 352,
    theme: 'auto',
  },
};

/** Podcast categories with Korean descriptions */
export const PODCAST_CATEGORIES: Record<PodcastCategory, {
  name: string;
  description: string;
  color: string;
  icon: string;
  priority: number;
}> = {
  '투자전략': {
    name: '투자전략',
    description: '포트폴리오 최적화와 글로벌 투자 전략 가이드',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    icon: 'TrendingUp',
    priority: 1,
  },
  '세무최적화': {
    name: '세무최적화', 
    description: '상속세 절세와 합법적 세무 구조 개선 전략',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    icon: 'FileText',
    priority: 2,
  },
  '가업승계': {
    name: '가업승계',
    description: '기업승계와 차세대 경영진 준비 전략',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    icon: 'Users',
    priority: 3,
  },
  '패밀리오피스': {
    name: '패밀리오피스',
    description: '가족자산관리와 패밀리오피스 구축 전략',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    icon: 'Target',
    priority: 4,
  },
  '자산관리': {
    name: '자산관리',
    description: '통합자산관리 및 위험관리 솔루션',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    icon: 'BarChart3',
    priority: 5,
  },
  '디지털혁신': {
    name: '디지털혁신',
    description: '핀테크와 디지털 자산관리 기술 동향',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    icon: 'Cpu',
    priority: 6,
  },
  '글로벌트렌드': {
    name: '글로벌 트렌드',
    description: '해외 패밀리오피스 동향과 글로벌 자산관리',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
    icon: 'Globe',
    priority: 7,
  },
  '승계전략': {
    name: '승계전략',
    description: '체계적인 승계 계획 수립과 실행 방안',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
    icon: 'ArrowRight',
    priority: 8,
  },
  '기업분석': {
    name: '기업분석',
    description: '중견기업 경영 분석과 성장 전략',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
    icon: 'Building',
    priority: 9,
  },
  '시장동향': {
    name: '시장동향',
    description: '금융시장 분석과 경제 전망',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400',
    icon: 'LineChart',
    priority: 10,
  },
};

/** Blog category to podcast category mapping for content correlation */
export const BLOG_TO_PODCAST_CATEGORY_MAPPING: Record<string, PodcastCategory[]> = {
  // Direct mappings
  '패밀리오피스': ['패밀리오피스', '자산관리'],
  '투자전략': ['투자전략', '글로벌트렌드', '시장동향'],
  '세무최적화': ['세무최적화'],
  '자산관리': ['자산관리', '패밀리오피스', '투자전략'],
  '승계전략': ['가업승계', '승계전략'],
  '디지털혁신': ['디지털혁신'],
  '글로벌 트렌드': ['글로벌트렌드', '투자전략'],
  
  // Alternative naming variations
  '가업승계': ['가업승계', '승계전략'],
  '기업승계': ['가업승계', '승계전략'],
  '기업승계 분석': ['가업승계', '기업분석'],
  '세무·법무 인사이트': ['세무최적화'],
  '자산관리 전략': ['자산관리', '투자전략'],
  
  // Compound categories
  '패밀리오피스 & 투자': ['패밀리오피스', '투자전략', '자산관리'],
  '세무 & 승계': ['세무최적화', '가업승계'],
  '글로벌 & 디지털': ['글로벌트렌드', '디지털혁신'],
};

/** Content matching keyword groups for enhanced episode recommendation */
export const CONTENT_MATCHING_KEYWORDS: Record<PodcastCategory, string[]> = {
  '투자전략': ['투자', '포트폴리오', '자산배분', '수익률', '글로벌투자', '주식', '채권', '펀드', '리츠', 'ETF'],
  '세무최적화': ['세금', '절세', '상속세', '증여세', '법인세', '소득세', '가족법인', '홀딩스', '세무구조'],
  '가업승계': ['승계', '가업', '기업승계', '차세대', '경영권', '지분', '후계자', '세대교체', '리더십'],
  '패밀리오피스': ['패밀리오피스', '가족자산', '통합관리', '거버넌스', '가문', '자산관리', '프라이빗뱅킹'],
  '자산관리': ['자산관리', '위험관리', '자산배분', '다이버시피케이션', '헤지', '안전자산', '수익자산'],
  '디지털혁신': ['핀테크', '디지털', '로보어드바이저', '블록체인', '암호화폐', '인공지능', 'AI', '자동화'],
  '글로벌트렌드': ['해외', '글로벌', '국제', '외국', '미국', '유럽', '아시아', '신흥국', '선진국', '환율'],
  '승계전략': ['승계계획', '승계전략', '계획수립', '단계별', '로드맵', '타임라인', '체크리스트'],
  '기업분석': ['기업가치', '밸류에이션', '재무분석', '성장성', '수익성', '안정성', '기업진단'],
  '시장동향': ['시장', '경제', '금리', '인플레이션', '정책', '트렌드', '전망', '분석', '예측'],
};

/** Default podcast episodes data */
export const DEFAULT_PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep001',
    title: '2025년 글로벌 투자 전망 - 변화하는 시장 환경 분석',
    description: '새해를 맞아 글로벌 경제 전망과 주요 투자 테마를 살펴봅니다. 미국 연준의 금리 정책, 중국 경제 회복세, 그리고 한국 시장의 기회요인을 전문가와 함께 논의합니다.',
    publishDate: '2025.1.15',
    duration: '24분',
    category: '투자전략',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['글로벌투자', '포트폴리오', '자산배분', '투자전략', '2025전망'],
    isNew: true,
    episodeNumber: 1,
    guests: ['김◯◯ 투자전문가', '이◯◯ 이코노미스트'],
  },
  {
    id: 'ep002',
    title: '가족법인 설립 가이드 - 세무 최적화 전략',
    description: '중견기업 CEO들이 가장 궁금해하는 가족법인 설립 과정과 세무 혜택을 상세히 설명합니다. 실제 사례를 통해 절세 효과와 주의사항을 알아봅니다.',
    publishDate: '2025.1.12',
    duration: '28분',
    category: '세무최적화',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['가족법인', '절세', '상속세', '세무최적화', '법인설립', '홀딩스'],
    episodeNumber: 2,
    guests: ['박◯◯ 세무사', '정◯◯ 변호사'],
  },
  {
    id: 'ep003',
    title: '성공적인 가업승계를 위한 5단계 전략',
    description: '100년 기업으로 나아가기 위한 체계적인 승계 계획 수립 방법을 제시합니다. 경영권 승계, 재산 승계, 그리고 리더십 개발까지 포괄적으로 다룹니다.',
    publishDate: '2025.1.10',
    duration: '32분',
    category: '가업승계',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['가업승계', '승계계획', '경영권', '차세대', '기업승계', '후계자교육'],
    episodeNumber: 3,
    guests: ['최◯◯ 승계전문가', '김◯◯ 2세 CEO'],
  },
  {
    id: 'ep004',
    title: '패밀리오피스 구축 실전 가이드',
    description: '중견기업 CEO를 위한 맞춤형 패밀리오피스 구축 전략을 소개합니다. 조직 구성, 투자 정책, 거버넌스 설계 등 실무 중심으로 설명드립니다.',
    publishDate: '2025.1.8',
    duration: '26분',
    category: '패밀리오피스',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['패밀리오피스', '자산관리', '거버넌스', '투자전략', '조직구성'],
    episodeNumber: 4,
    guests: ['이◯◯ 패밀리오피스 전문가'],
  },
  {
    id: 'ep005',
    title: '디지털 자산관리 플랫폼 활용법',
    description: '핀테크 기술을 활용한 효율적인 자산관리 방법을 소개합니다. 로보어드바이저, 디지털 뱅킹, 포트폴리오 관리 툴의 실제 활용 사례를 다룹니다.',
    publishDate: '2025.1.5',
    duration: '22분',
    category: '디지털혁신',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['핀테크', '디지털자산', '로보어드바이저', '자산관리', '플랫폼'],
    episodeNumber: 5,
    guests: ['조◯◯ 핀테크 전문가'],
  },
  {
    id: 'ep006',
    title: '글로벌 패밀리오피스 동향 분석',
    description: '해외 선진 패밀리오피스의 운영 방식과 투자 전략을 분석합니다. 싱가포르, 홍콩, 스위스 등 주요 금융 허브의 사례를 통해 국내 적용 방안을 모색합니다.',
    publishDate: '2025.1.3',
    duration: '30분',
    category: '글로벌트렌드',
    spotifyUrl: 'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=FYutRxkCTLiMK9vckK26Bg',
    tags: ['글로벌', '해외투자', '패밀리오피스', '금융허브', '싱가포르', '홍콩'],
    episodeNumber: 6,
    guests: ['한◯◯ 글로벌 투자전문가'],
  },
];

/** Content matching strategy priorities */
export const CONTENT_MATCHING_STRATEGIES: ContentMatchingStrategy[] = [
  'category',    // Highest priority - direct category match
  'keywords',    // Keyword-based matching
  'tags',        // Tag-based matching  
  'semantic',    // Semantic similarity (future enhancement)
  'manual',      // Manual curation (lowest priority)
];

/** Default matching thresholds for content correlation */
export const MATCHING_THRESHOLDS = {
  CATEGORY_MATCH: 1.0,      // Perfect match for direct category
  KEYWORD_MATCH: 0.8,       // High relevance for keyword matches
  TAG_MATCH: 0.7,           // Good relevance for tag matches
  SEMANTIC_MATCH: 0.6,      // Moderate relevance for semantic similarity
  MANUAL_MATCH: 0.9,        // High trust in manual curation
  MIN_CONFIDENCE: 0.5,      // Minimum confidence to show suggestion
};

/** Analytics event types for podcast interactions */
export const PODCAST_ANALYTICS_EVENTS = {
  EPISODE_PLAY: 'podcast_episode_play',
  EPISODE_SHARE: 'podcast_episode_share',
  EPISODE_VIEW: 'podcast_episode_view',
  SHOW_FOLLOW: 'podcast_show_follow',
  RECOMMENDATION_CLICK: 'podcast_recommendation_click',
  SEARCH_PERFORMED: 'podcast_search_performed',
} as const;

/** Error messages for podcast functionality */
export const PODCAST_ERROR_MESSAGES = {
  EPISODE_NOT_FOUND: '에피소드를 찾을 수 없습니다.',
  SPOTIFY_UNAVAILABLE: 'Spotify 서비스에 연결할 수 없습니다.',
  INVALID_URL: '올바르지 않은 Spotify URL입니다.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  PARSING_ERROR: '데이터를 처리하는 중 오류가 발생했습니다.',
  GENERAL_ERROR: '일시적인 오류가 발생했습니다. 다시 시도해주세요.',
} as const;

/** Component display configuration */
export const DISPLAY_CONFIG = {
  MAX_EPISODES_DEFAULT: 3,
  MAX_EPISODES_COMPACT: 2,
  MAX_EPISODES_FULL: 10,
  DESCRIPTION_LENGTH: 150,
  TITLE_LENGTH: 80,
  ANIMATION_DURATION: 300,
} as const;

/** Spotify branding colors */
export const SPOTIFY_BRAND_COLORS = {
  primary: '#1DB954',      // Spotify Green
  primaryHover: '#1ed760', // Lighter green for hover
  dark: '#191414',         // Spotify Dark
  light: '#FFFFFF',        // White
  gray: '#535353',         // Spotify Gray
} as const;

export default {
  FAMILYOFFICE_PODCAST_SHOW,
  SPOTIFY_CONFIG,
  PODCAST_CATEGORIES,
  BLOG_TO_PODCAST_CATEGORY_MAPPING,
  CONTENT_MATCHING_KEYWORDS,
  DEFAULT_PODCAST_EPISODES,
  CONTENT_MATCHING_STRATEGIES,
  MATCHING_THRESHOLDS,
  PODCAST_ANALYTICS_EVENTS,
  PODCAST_ERROR_MESSAGES,
  DISPLAY_CONFIG,
  SPOTIFY_BRAND_COLORS,
};