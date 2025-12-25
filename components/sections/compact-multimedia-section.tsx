'use client';

import { Play, Headphones, Calendar, Clock, TrendingUp } from 'lucide-react';

import React, { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  isNew?: boolean;
  url?: string;
}

const CompactMultimediaSection = memo(() => {
  // 간소화된 데이터 - 2개씩만
  const youtubeVideos: VideoContent[] = [
    {
      id: '1',
      title: '2025년 세제개편안 심층 분석',
      description: '가업상속공제 600억, 이렇게 활용하세요',
      duration: '16:42',
      views: '247',
      thumbnail: '/images/video-thumb-1.jpg',
      isNew: true,
      url: 'Wj-q-Xmg41Q', // YouTube video ID
    },
    {
      id: '2',
      title: '百年永續 100년 기업을 향한 여정',
      description: '기업재해보장보험으로 리스크 제로 달성',
      duration: '13:28',
      views: '312',
      thumbnail: '/images/video-thumb-2.jpg',
      url: 'sKeFgAEAO1M', // YouTube video ID
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="text-sm">
              127개 기업이 선택한 검증된 콘텐츠
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            지식이 자산이 되는 시간
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            매주 업데이트되는 전문가 인사이트로 백년영속의 지혜를 쌓아가세요
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* YouTube Section */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Play className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">
                    YouTube에서 만나는 5분 솔루션
                  </CardTitle>
                  <CardDescription className="text-sm">
                    바쁜 경영자를 위한 핵심만 담았습니다
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm font-medium text-red-600 mb-3">
                🎥 추천 영상
              </div>

              {/* YouTube Videos - 2개만 */}
              {youtubeVideos.map((video, index) => (
                <div key={video.id} className="mb-4">
                  {index === 0 && video.isNew && (
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="text-xs bg-red-500">NEW</Badge>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        🎬 최신 영상
                      </span>
                    </div>
                  )}
                  <div className="rounded-lg overflow-hidden border border-red-500/20 bg-red-500/5 dark:bg-red-500/10 p-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src={`https://www.youtube.com/embed/${video.url}`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() =>
                    window.open(
                      'https://www.youtube.com/@FamilyOffice-S',
                      '_blank'
                    )
                  }
                >
                  🔔 구독하고 알림받기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Spotify Section */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Headphones className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">
                    Spotify 독점, 귀로 듣는 컨설팅
                  </CardTitle>
                  <CardDescription className="text-sm">
                    당신의 일상 속 프리미엄 비즈니스 인사이트
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm font-medium text-green-600 mb-3">
                🎙️ 추천 에피소드
              </div>

              {/* Featured Spotify Episode - NEW */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="text-xs bg-green-500">NEW</Badge>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    🎙️ 최신 에피소드
                  </span>
                </div>
                <div className="rounded-lg overflow-hidden border border-green-500/20 bg-green-500/5 dark:bg-green-500/10 p-4">
                  <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/episode/5aIG8p9AWFuzBSlnIYiL4E?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 2nd Spotify Episode */}
              <div className="mb-4">
                <div className="rounded-lg overflow-hidden border border-green-500/20 bg-green-500/5 dark:bg-green-500/10 p-4">
                  <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/episode/5G9JHBLEfR9L6CKLMr86Sm?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  onClick={() =>
                    window.open(
                      'https://open.spotify.com/show/6BvRGd3OODaKyJtVl1GN46?si=1736cfee52584a98',
                      '_blank'
                    )
                  }
                >
                  🎧 팔로우하고 알림받기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              당신의 시간을 가치있게, 당신의 결정을 현명하게
            </h3>

            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">실무 중심</h4>
                <p className="text-xs text-muted-foreground">
                  바로 적용 가능한 실전 솔루션
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Badge className="w-6 h-6 bg-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">검증된 전문성</h4>
                <p className="text-xs text-muted-foreground">
                  삼성생명 파트너 빅4 전문가
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">시간 효율성</h4>
                <p className="text-xs text-muted-foreground">
                  5분 요약부터 40분 심층분석
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">정기 업데이트</h4>
                <p className="text-xs text-muted-foreground">
                  매주 3회 신규 콘텐츠
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CompactMultimediaSection.displayName = 'CompactMultimediaSection';

export default CompactMultimediaSection;
