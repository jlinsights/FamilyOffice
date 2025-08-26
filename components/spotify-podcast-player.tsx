'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Volume2, Clock, Calendar } from 'lucide-react';
import { PodcastEpisode, PodcastPlayerProps } from '@/types/podcast';
import { 
  DEFAULT_PODCAST_EPISODES, 
  SPOTIFY_CONFIG, 
  PODCAST_CATEGORIES
} from '@/constants/podcasts';

// 기본 에피소드 데이터는 constants에서 가져옴

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export function SpotifyPodcastPlayer({ 
  episodes = DEFAULT_PODCAST_EPISODES,
  showUrl = SPOTIFY_CONFIG.showUrl,
  className = ""
}: PodcastPlayerProps) {
  const [_selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const getCategoryColor = (category: string) => {
    return PODCAST_CATEGORIES[category as keyof typeof PODCAST_CATEGORIES]?.color || 
           'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const handleEpisodePlay = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
    // Spotify 에피소드로 이동
    window.open(episode.spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-green-500 flex items-center justify-center mr-4">
              <SpotifyIcon className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                FamilyOffice 팟캐스트
              </h2>
              <p className="text-lg text-muted-foreground">
                전문가와 함께하는 자산관리 토크
              </p>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            복잡한 자산관리와 세무 전략을 쉽게 풀어드리는 오디오 콘텐츠입니다. 
            통근길이나 운동하면서 편리하게 들어보세요.
          </p>

          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => window.open(showUrl, '_blank', 'noopener,noreferrer')}
          >
            <SpotifyIcon className="mr-2 h-5 w-5" />
            Spotify에서 팟캐스트 듣기
          </Button>
        </div>

        {/* 에피소드 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {episodes.map((episode) => (
            <Card 
              key={episode.id}
              className="group hover:shadow-lg transition-all duration-300 border-border/40 bg-background/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getCategoryColor(episode.category)}>
                    {episode.category}
                  </Badge>
                  {episode.isNew && (
                    <Badge variant="destructive" className="text-xs">
                      NEW
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                  {episode.title}
                </CardTitle>
                
                <CardDescription className="text-sm line-clamp-3">
                  {episode.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {episode.publishDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {episode.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleEpisodePlay(episode)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    재생하기
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(episode.spotifyUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더 많은 에피소드 */}
        <div className="text-center mt-12">
          <div className="bg-muted/30 rounded-xl p-8 max-w-2xl mx-auto">
            <Volume2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              더 많은 에피소드가 준비되어 있습니다
            </h3>
            <p className="text-muted-foreground mb-6">
              Spotify에서 전체 에피소드를 확인하고 팔로우하여 
              새로운 콘텐츠 알림을 받아보세요.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open(showUrl, '_blank', 'noopener,noreferrer')}
            >
              <SpotifyIcon className="mr-2 h-5 w-5" />
              전체 에피소드 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpotifyPodcastPlayer;