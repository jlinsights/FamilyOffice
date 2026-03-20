import {
  Award,
  Briefcase,
  Building,
  ExternalLink,
  GraduationCap,
  Headphones,
  Heart,
  Play,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { YouTubeEmbed } from '@/components/media/youtube-embed';
import { cn } from '@/lib/utils';

export interface GFCBenefitsSectionProps {
  startAnimation: boolean;
  easingFunction: (t: number) => number;
}

export function GFCBenefitsSection({
  startAnimation,
  easingFunction,
}: GFCBenefitsSectionProps) {
  const [showBrochure, setShowBrochure] = useState(false);

  // GFC 핵심 혜택 (중복 제거를 위해 통합)
  const gfcBenefits = [
    {
      icon: Building,
      title: '기업 전문',
      description: '중소중견기업 CEO 맞춤형 컨설팅',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: '높은 수입',
      description: '프리미엄 고객 대상 고수익 보장',
      color: 'green',
    },
    {
      icon: Award,
      title: '전문 브랜드',
      description: '삼성생명의 신뢰와 명성',
      color: 'yellow',
    },
    {
      icon: GraduationCap,
      title: '체계적 교육',
      description: '전문가 양성 교육 시스템',
      color: 'purple',
    },
    {
      icon: Users,
      title: '전문가 네트워크',
      description: '삼성생명 FP 및 전국 GFC 협업',
      color: 'indigo',
    },
    {
      icon: Heart,
      title: '워라밸 보장',
      description: '유연근무제 및 복리후생 혜택',
      color: 'pink',
    },
  ];

  return (
    <>
      {/* GFC 소개 & 혜택 통합 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Briefcase className="h-3 w-3 mr-1" />
              Group Financial Consultant
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              GFC(기업재무컨설턴트)란?
            </h2>
            <p className="text-lg text-muted-foreground">
              삼성생명의 프리미엄 기업재무컨설턴트로서
              <br />
              중소중견기업 CEO들에게 가업승계, 자산관리, 절세전략 등<br />
              종합적인 재무컨설팅을 제공하는 전문가입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gfcBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const colorClassesMap = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                yellow: 'bg-yellow-100 text-yellow-600',
                purple: 'bg-purple-100 text-purple-600',
                indigo: 'bg-indigo-100 text-indigo-600',
                pink: 'bg-pink-100 text-pink-600',
              };
              const colorClasses =
                colorClassesMap[
                  benefit.color as keyof typeof colorClassesMap
                ] || 'bg-primary/10 text-primary';

              return (
                <div
                  key={index}
                  className="text-center group cursor-pointer"
                  onClick={() => setShowBrochure(true)}
                >
                  <div
                    className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 성공으로 이끄는 이름: 삼성생명 GFC */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                성공으로 이끄는 이름:
                <br />
                <span className="text-foreground">삼성생명 GFC</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                삼성생명 GFC의 성공 스토리와 전문성을 영상과 팟캐스트를 통해
                확인해보세요.
                <br />
                실제 성공 사례와 전문가들의 인사이트를 만나볼 수 있습니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* YouTube Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl">
                    <Play className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      영상으로 보는 GFC
                    </h3>
                    <p className="text-muted-foreground">
                      삼성생명 GFC의 성공 스토리
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative">
                    <YouTubeEmbed
                      videoId="YK1IRyUrxtk"
                      className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
                    />
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-3">
                    🎯 주요 내용
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• 삼성생명 GFC로 성공한 실제 사례</li>
                    <li>• 전문 컨설턴트로서의 성장 과정</li>
                    <li>• 고객과 함께 만들어가는 성공 스토리</li>
                    <li>• GFC 전문성과 차별화된 서비스</li>
                  </ul>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        성공사례
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        전문성
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        고객만족
                      </Badge>
                    </div>
                    <a
                      href="https://youtu.be/YK1IRyUrxtk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                      )}
                    >
                      YouTube에서 보기
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Spotify Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <Headphones className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      팟캐스트로 듣는 GFC
                    </h3>
                    <p className="text-muted-foreground">
                      전문가 인터뷰 & 인사이트
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-4">
                      <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/episode/1ZUHuWpjQRdbwcPaZhqe5W?utm_source=generator"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-3">
                    🎙️ 에피소드 하이라이트
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• 삼성생명 GFC만의 차별화된 전문성</li>
                    <li>• 성공적인 컨설턴트의 커리어 노하우</li>
                    <li>• 클라이언트와의 신뢰 구축 방법</li>
                    <li>• 지속 가능한 성장 전략과 비전</li>
                  </ul>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        전문가인터뷰
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        커리어노하우
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        성장전략
                      </Badge>
                    </div>
                    <a
                      href="https://open.spotify.com/episode/1ZUHuWpjQRdbwcPaZhqe5W?si=MHKRpQslQiWy-glvVDOsCw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400'
                      )}
                    >
                      Spotify에서 듣기
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  삼성생명 GFC와 함께 성공하세요
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  영상과 팟캐스트에서 확인한 성공 스토리의 주인공이
                  되어보세요.
                  <br />
                  전문성과 열정으로 무장한 당신을 기다리고 있습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CalComPopup
                    buttonText="GFC 커리어 상담 신청"
                    variant="default"
                    size="lg"
                    className="hover:scale-105 transition-transform duration-200"
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-transform duration-200"
                    onClick={() => setShowBrochure(true)}
                  >
                    GFC 브로셔 다운로드
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
