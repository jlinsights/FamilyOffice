/**
 * Podcast-related type definitions for FamilyOffice S
 * Spotify podcast integration and episode management
 */

export interface PodcastEpisode {
  /** Unique identifier for the episode */
  id: string;
  /** Episode title */
  title: string;
  /** Episode description/summary */
  description: string;
  /** Publication date in Korean format (YYYY.MM.DD) */
  publishDate: string;
  /** Episode duration (e.g., "24분") */
  duration: string;
  /** Episode category for content classification */
  category: PodcastCategory;
  /** Direct Spotify episode or show URL */
  spotifyUrl: string;
  /** Optional Spotify embed ID for iframe embedding */
  embedId?: string;
  /** Content tags for enhanced matching and filtering */
  tags?: string[];
  /** Indicates if this is a recently published episode */
  isNew?: boolean;
  /** Episode number or sequence identifier */
  episodeNumber?: number;
  /** Transcript or show notes content */
  transcript?: string;
  /** Featured guests or participants */
  guests?: string[];
  /** Related blog post slugs for cross-content linking */
  relatedBlogSlugs?: string[];
}

export interface PodcastShow {
  /** Unique identifier for the podcast show */
  id: string;
  /** Podcast show title */
  title: string;
  /** Show description */
  description: string;
  /** Main Spotify show URL */
  spotifyUrl: string;
  /** Show cover image URL */
  coverImageUrl?: string;
  /** Primary host/presenter */
  host: string;
  /** Show categories */
  categories: PodcastCategory[];
  /** Publication schedule (e.g., "매주 화요일") */
  schedule?: string;
  /** Show language */
  language: 'ko' | 'en';
  /** Show status */
  status: 'active' | 'paused' | 'completed';
  /** Total number of episodes */
  totalEpisodes?: number;
  /** Show creation date */
  createdAt: string;
  /** Last episode publication date */
  lastEpisodeDate?: string;
}

export interface PodcastPlaylist {
  /** Playlist identifier */
  id: string;
  /** Playlist name */
  name: string;
  /** Playlist description */
  description: string;
  /** Episodes included in this playlist */
  episodes: PodcastEpisode[];
  /** Playlist category */
  category: PodcastCategory;
  /** Playlist creation date */
  createdAt: string;
  /** Playlist update date */
  updatedAt: string;
}

/** Podcast content categories aligned with blog categories */
export type PodcastCategory =
  | '투자전략' // Investment Strategy
  | '세무최적화' // Tax Optimization
  | '가업승계' // Business Succession
  | '패밀리오피스' // Family Office
  | '자산관리' // Asset Management
  | '디지털혁신' // Digital Innovation
  | '글로벌트렌드' // Global Trends
  | '승계전략' // Succession Strategy
  | '기업분석' // Business Analysis
  | '시장동향'; // Market Trends

/** Content matching algorithms for blog-podcast correlation */
export type ContentMatchingStrategy =
  | 'category' // Direct category matching
  | 'tags' // Tag-based matching
  | 'keywords' // Keyword extraction and matching
  | 'semantic' // Semantic similarity matching
  | 'manual'; // Manual curation

export interface ContentMatcher {
  /** Matching strategy used */
  strategy: ContentMatchingStrategy;
  /** Confidence score (0-1) */
  confidence: number;
  /** Matched keywords or tags */
  matchedTerms: string[];
  /** Explanation of why this match was made */
  reason?: string;
}

export interface PodcastEpisodeMatch {
  /** The matched episode */
  episode: PodcastEpisode;
  /** Content matching information */
  matcher: ContentMatcher;
  /** Match relevance score */
  relevanceScore: number;
}

/** Spotify integration configuration */
export interface SpotifyConfig {
  /** Base Spotify show URL */
  showUrl: string;
  /** Show ID for API calls */
  showId?: string;
  /** Embed configuration */
  embedConfig: {
    /** Default embed width */
    width: number;
    /** Default embed height */
    height: number;
    /** Theme preference */
    theme: 'light' | 'dark' | 'auto';
  };
}

/** Analytics tracking for podcast interactions */
export interface PodcastAnalytics {
  /** Episode ID being tracked */
  episodeId: string;
  /** User interaction type */
  action: 'play' | 'share' | 'view' | 'click';
  /** Source context (blog post, main page, etc.) */
  source: string;
  /** Timestamp of interaction */
  timestamp: Date;
  /** User session ID */
  sessionId?: string;
  /** Additional context data */
  metadata?: Record<string, any>;
}

/** Component props interfaces */
export interface PodcastPlayerProps {
  /** Episodes to display */
  episodes?: PodcastEpisode[];
  /** Main show URL override */
  showUrl?: string;
  /** Additional CSS classes */
  className?: string;
  /** Display variant */
  variant?: 'default' | 'compact' | 'minimal';
  /** Maximum episodes to show */
  maxEpisodes?: number;
  /** Enable auto-play functionality */
  autoPlay?: boolean;
  /** Show playlist controls */
  showPlaylist?: boolean;
}

export interface BlogPodcastConnectionProps {
  /** Blog post category for matching */
  blogCategory: string;
  /** Blog post tags for enhanced matching */
  blogTags: string[];
  /** Blog post title for keyword matching */
  blogTitle?: string;
  /** Blog post slug for tracking */
  blogSlug?: string;
  /** Maximum related episodes to show */
  maxEpisodes?: number;
  /** Additional CSS classes */
  className?: string;
  /** Matching strategy preference */
  matchingStrategy?: ContentMatchingStrategy[];
}

/** Error types for podcast functionality */
export interface PodcastError {
  /** Error code */
  code:
    | 'EPISODE_NOT_FOUND'
    | 'SPOTIFY_UNAVAILABLE'
    | 'INVALID_URL'
    | 'NETWORK_ERROR'
    | 'PARSING_ERROR';
  /** Error message */
  message: string;
  /** Additional error context */
  context?: Record<string, any>;
  /** Timestamp when error occurred */
  timestamp: Date;
}

/** Podcast search and filtering */
export interface PodcastSearchParams {
  /** Search query text */
  query?: string;
  /** Filter by category */
  category?: PodcastCategory;
  /** Filter by tags */
  tags?: string[];
  /** Date range filter */
  dateRange?: {
    start: string;
    end: string;
  };
  /** Sort options */
  sortBy?: 'date' | 'relevance' | 'duration' | 'title';
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Pagination limit */
  limit?: number;
  /** Pagination offset */
  offset?: number;
}

export interface PodcastSearchResult {
  /** Found episodes */
  episodes: PodcastEpisode[];
  /** Total count for pagination */
  totalCount: number;
  /** Search metadata */
  searchMetadata: {
    query: string;
    executionTime: number;
    filters: PodcastSearchParams;
  };
}

/** RSS feed integration types (for future expansion) */
export interface PodcastFeed {
  /** Feed URL */
  url: string;
  /** Feed title */
  title: string;
  /** Feed description */
  description: string;
  /** Feed language */
  language: string;
  /** Last build date */
  lastBuildDate: string;
  /** Feed episodes */
  episodes: PodcastEpisode[];
}

export default PodcastEpisode;
