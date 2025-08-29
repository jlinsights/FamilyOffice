'use client';
import React, { memo } from 'react';
import { Play, Headphones, Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  isNew?: boolean;
}


const MultimediaContentSection = memo(() => {

  // Mock data - 실제 구현 시 API에서 가져올 예정
  const youtubeVideos: VideoContent[] = [
    {
      id: '1',
      title: '2025 세법개정, 기업이 꼭 알아야 할 3가지',
      description: '가업상속공제 600억, 이렇게 활용하세요',
      duration: '5:47',
      views: '15.2K',
      thumbnail: '/images/video-thumb-1.jpg',
      isNew: true
    },
    {
      id: '2',
      title: '중대재해처벌법 대응, A사의 완벽 준비과정',
      description: '기업재해보장보험으로 리스크 제로 달성',
      duration: '12:30',
      views: '8.7K',
      thumbnail: '/images/video-thumb-2.jpg'
    },
    {
      id: '3',
      title: '법인종신보험 200% 활용법 [CFO 필수 시청]',
      description: '퇴직금 준비하며 승계자금까지 한번에',
      duration: '8:15',
      views: '12.1K',
      thumbnail: '/images/video-thumb-3.jpg'
    }
  ];


  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background">
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
          <p className="text-base text-primary mt-2 font-medium">
            가업승계와 법인보험, 더 이상 어렵게 생각하지 마세요.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
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
              <p className="text-sm text-muted-foreground">
                복잡한 승계 전략, 세무 절세, 법인보험 설계를 실제 사례와 함께 쉽게 풀어드립니다.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm font-medium text-red-600 mb-3">
                🎥 이번 주 인기 영상
              </div>
              
              {youtubeVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group/item"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Play className="h-4 w-4 text-muted-foreground group-hover/item:text-red-500 transition-colors" />
                    </div>
                    {video.isNew && (
                      <Badge className="absolute -top-2 -right-2 text-xs bg-red-500">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {video.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Regular Schedule */}
              <div className="bg-red-500/5 dark:bg-red-500/10 p-4 rounded-lg mt-4 border border-red-500/20">
                <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">📌 정기 프로그램</h4>
                <div className="space-y-2 text-xs text-red-600 dark:text-red-400">
                  <div>✅ 매주 월요일: &quot;5분 가업승계 클리닉&quot;</div>
                  <div>✅ 매주 수요일: &quot;백년기업 성공스토리&quot;</div>
                  <div>✅ 매주 금요일: &quot;법인보험 마스터클래스&quot;</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                  🔔 구독하고 알림받기
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
                  전체 영상 보기
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
              <p className="text-sm text-muted-foreground">
                출퇴근길, 운동 중, 휴식 시간... 국내 최고 전문가들의 생생한 조언을 팟캐스트로 만나보세요.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm font-medium text-green-600 mb-3">
                🎙️ 이번 주 필청 에피소드
              </div>
              
{/* Featured Spotify Episode - NEW */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="text-xs bg-green-500">NEW</Badge>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">🎙️ 최신 에피소드</span>
                </div>
                <div className="rounded-lg overflow-hidden border border-green-500/20 bg-green-500/5 dark:bg-green-500/10 p-4">
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{borderRadius: '12px'}} 
                    src="https://open.spotify.com/embed/episode/4NsRHqfYlCSidJ5sd0Xvye?utm_source=generator" 
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
                    style={{borderRadius: '12px'}} 
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

              {/* 3rd Spotify Episode */}
              <div className="mb-4">
                <div className="rounded-lg overflow-hidden border border-green-500/20 bg-green-500/5 dark:bg-green-500/10 p-4">
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{borderRadius: '12px'}} 
                    src="https://open.spotify.com/embed/episode/2X1KIsTYtKNAfvrVgVLoJw?utm_source=generator" 
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-green-500/5 dark:bg-green-500/10 p-4 rounded-lg mt-4 border border-green-500/20">
                <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">🗓️ 주간 방송 스케줄</h4>
                <div className="space-y-2 text-xs text-green-600 dark:text-green-400">
                  <div>🔹 월요일 오전 7시: &quot;Monday Morning CEO&quot;</div>
                  <div>🔹 수요일 오후 12시: &quot;승계의 정석&quot;</div>
                  <div>🔹 금요일 오후 5시: &quot;Friday Finance&quot;</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                  🎧 팔로우하고 알림받기
                </Button>
                <Button variant="outline" className="flex-1 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20">
                  전체 에피소드 듣기
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
            
            <div className="grid md:grid-cols-5 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">실무 중심</h4>
                <p className="text-xs text-muted-foreground">바로 적용 가능한 실전 솔루션</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Badge className="w-6 h-6 bg-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">검증된 전문성</h4>
                <p className="text-xs text-muted-foreground">삼성생명 파트너 빅4 전문가</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">시간 효율성</h4>
                <p className="text-xs text-muted-foreground">5분 요약부터 40분 심층분석</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">멀티 플랫폼</h4>
                <p className="text-xs text-muted-foreground">YouTube, Spotify 원하는 방식으로</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">정기 업데이트</h4>
                <p className="text-xs text-muted-foreground">매주 3회 신규 콘텐츠</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MultimediaContentSection.displayName = 'MultimediaContentSection';

export default MultimediaContentSection;