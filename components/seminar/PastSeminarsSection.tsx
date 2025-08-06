import {
  Calendar,
  Users,
  Archive,
  Star,
  Crown,
  Building,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PastSeminarsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 animate-fade-in dark:bg-primary/80 dark:text-white dark:border-primary/60"
          >
            <Archive className="h-3 w-3 mr-1" />
            Premium Archive
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up text-gray-900 dark:text-white">
            <span className="text-primary dark:text-emerald-300">
              프리미엄 세미나
            </span>{' '}
            아카이브
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up dark:text-gray-200"
            style={{ animationDelay: '200ms' }}
          >
            전문가들과 함께하는 프리미엄 세미나 일정을 확인하고 참여해보세요
          </p>
        </div>

        {/* 2x1 Grid Layout: FP센터 세미나 + VVIP 세미나 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Grid: FP센터 자산관리 세미나 */}
          <Card className="h-fit dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                >
                  <Building className="h-3 w-3 mr-1" />
                  프리미엄 세미나
                </Badge>
              </div>
              <CardTitle className="text-xl text-center text-foreground dark:text-white">
                📈 FP센터 자산관리 세미나
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full flex justify-center">
                <iframe
                  src="https://lu.ma/embed/calendar/cal-Ep8q9aCrN1nsfbP/events"
                  width="100%"
                  height="500"
                  className="w-full max-w-full"
                  style={{
                    border: '1px solid #bfcbda88',
                    borderRadius: '8px',
                    minHeight: '500px'
                  }}
                  frameBorder="0"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                  title="FP센터 자산관리 세미나"
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    고액자산가, 기업 오너 대상 프리미엄 세미나
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    정기 개최, 체계적 자산관리 전략 세미나
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    참석 보증금 3만원 (세미나 참석 시 전액 환불)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Grid: VVIP 고객초청 세미나 */}
          <Card className="h-fit dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700"
                >
                  <Crown className="h-3 w-3 mr-1" />
                  럭셔리 프리미엄
                </Badge>
              </div>
              <CardTitle className="text-xl text-center text-foreground dark:text-white">
                👑 VVIP 고객초청 세미나
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full flex justify-center">
                <iframe
                  src="https://lu.ma/embed/calendar/cal-uQJDPHhQFNvQmj4/events"
                  width="100%"
                  height="500"
                  className="w-full max-w-full"
                  style={{
                    border: '1px solid #bfcbda88',
                    borderRadius: '8px',
                    minHeight: '500px'
                  }}
                  frameBorder="0"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                  title="VVIP 고객초청 세미나"
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    초대제 운영, 럭셔리 호텔 & 특별 이벤트 개최
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    소수 정예 맞춤형 프리미엄 패밀리오피스 세미나
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-muted-foreground dark:text-gray-300">
                    참석 보증금 5만원 (세미나 참석 시 전액 환불)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Benefits Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-amber/5 to-primary/5 dark:from-primary/10 dark:via-amber/10 dark:to-primary/10 rounded-xl p-8 max-w-5xl mx-auto border border-primary/10 dark:border-primary/20">
            <h3 className="text-xl font-semibold mb-6 text-foreground dark:text-white">
              💎 프리미엄 패밀리오피스 세미나 특전
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-primary rounded-full"></div>
                  <span className="font-medium text-foreground dark:text-white">
                    전문 투자 인사이트
                  </span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  글로벌 자산관리 전략 및 시장 전망
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
                  <span className="font-medium text-foreground dark:text-white">
                    프리미엄 네트워킹
                  </span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  동급 자산가들과의 고품격 정보 교류
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                  <span className="font-medium text-foreground dark:text-white">
                    맞춤형 자산 컨설팅
                  </span>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  개별 포트폴리오 최적화 방안 제시
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-primary/10 dark:border-primary/20">
              <p className="text-sm text-muted-foreground dark:text-gray-300 font-medium">
                ⚡ 참석 보증금은 세미나 당일 전액 환불되며, 불참 시에는 차후 세미나 참석권으로 전환됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
