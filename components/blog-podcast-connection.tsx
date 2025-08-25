'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Calendar, Clock, Volume2 } from 'lucide-react';
import { PodcastEpisode, BlogPodcastConnectionProps } from '@/types/podcast';
import { 
  DEFAULT_PODCAST_EPISODES,
  BLOG_TO_PODCAST_CATEGORY_MAPPING,
  PODCAST_CATEGORIES,
  CONTENT_MATCHING_KEYWORDS,
  SPOTIFY_CONFIG,
  DISPLAY_CONFIG 
} from '@/constants/podcasts';

// 팟캐스트 에피소드 데이터는 constants에서 가져옴

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export function BlogPodcastConnection({
  blogCategory,
  blogTags,
  blogTitle,
  blogSlug,
  maxEpisodes = DISPLAY_CONFIG.MAX_EPISODES_DEFAULT,
  className = ""
}: BlogPodcastConnectionProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  // 관련 에피소드 추천 로직
  const relatedEpisodes = useMemo(() => {
    const mappedCategories = BLOG_TO_PODCAST_CATEGORY_MAPPING[blogCategory] || [];
    
    // 1. 카테고리 기반 매칭
    let categoryMatched = DEFAULT_PODCAST_EPISODES.filter(episode => 
      mappedCategories.includes(episode.category)
    );

    // 2. 태그 기반 매칭 (카테고리 매칭이 없는 경우)
    if (categoryMatched.length === 0 && blogTags.length > 0) {
      categoryMatched = DEFAULT_PODCAST_EPISODES.filter(episode =>
        episode.tags?.some(tag => 
          blogTags.some(blogTag => 
            tag.toLowerCase().includes(blogTag.toLowerCase()) ||
            blogTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // 3. 제목 기반 키워드 매칭 (추가 관련성 확보)
    if (blogTitle) {
      const relevantKeywords = CONTENT_MATCHING_KEYWORDS[mappedCategories[0] as keyof typeof CONTENT_MATCHING_KEYWORDS] || [];
      const titleMatched = DEFAULT_PODCAST_EPISODES.filter(episode =>
        relevantKeywords.some(keyword => 
          blogTitle.includes(keyword) && episode.title.includes(keyword)
        )
      );
      
      // 중복 제거하면서 추가
      titleMatched.forEach(episode => {
        if (!categoryMatched.find(e => e.id === episode.id)) {
          categoryMatched.push(episode);
        }
      });
    }

    // 최대 maxEpisodes개까지만 표시 (최신순 정렬)
    return categoryMatched
      .sort((a, b) => new Date(b.publishDate.replace(/\./g, '-')).getTime() - new Date(a.publishDate.replace(/\./g, '-')).getTime())
      .slice(0, maxEpisodes);
  }, [blogCategory, blogTags, blogTitle, maxEpisodes]);

  const getCategoryColor = (category: string) => {
    return PODCAST_CATEGORIES[category as keyof typeof PODCAST_CATEGORIES]?.color || 
           'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const handleEpisodePlay = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
    window.open(episode.spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  // 관련 에피소드가 없으면 컴포넌트 렌더링하지 않음
  if (relatedEpisodes.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center mr-3">
              <SpotifyIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              관련 팟캐스트 에피소드
            </h2>
          </div>
          <p className="text-muted-foreground">
            이 주제와 관련된 오디오 콘텐츠를 들어보세요
          </p>
        </div>

        {/* 에피소드 카드들 */}
        <div className="space-y-4">
          {relatedEpisodes.map((episode) => (
            <Card 
              key={episode.id}
              className="group hover:shadow-lg transition-all duration-300 border-border/40 bg-background/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* 에피소드 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(episode.category)}>
                        {episode.category}
                      </Badge>
                      {episode.isNew && (
                        <Badge variant="destructive" className="text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {episode.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {episode.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground space-x-4 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {episode.publishDate}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {episode.duration}
                      </div>
                    </div>
                  </div>

                  {/* 재생 버튼 */}
                  <div className="flex-shrink-0">
                    <Button 
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleEpisodePlay(episode)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      재생
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 전체 팟캐스트 보기 CTA */}
        <div className="text-center mt-8">
          <div className="bg-muted/30 rounded-xl p-6">
            <Volume2 className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              더 많은 팟캐스트 에피소드
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              FamilyOffice S 팟캐스트에서 투자전략, 세무최적화, 가업승계에 관한 
              다양한 전문가 인사이트를 만나보세요
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.open(SPOTIFY_CONFIG.showUrl, '_blank', 'noopener,noreferrer')}
            >
              <SpotifyIcon className="mr-2 h-4 w-4" />
              전체 에피소드 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogPodcastConnection;