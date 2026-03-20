import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function ProcessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Clock className="h-3 w-3 mr-1" />
            Recruitment Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            채용 프로세스
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            간단하고 신속한 채용 프로세스로 여러분의 커리어를 시작하세요
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Desktop View - Horizontal Cards */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {/* Step 1 */}
            <div className="relative group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">
                    지원서 접수
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    온라인 지원서 작성 및 제출. 경력사항과 자기소개서 작성
                  </p>
                </CardContent>
              </Card>
              {/* Arrow for desktop */}
              <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-primary/30 border-b-[20px] border-b-transparent"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">
                    서류 심사
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    지원서류 검토 및 기본 자격요건 확인 (3-5일 소요)
                  </p>
                </CardContent>
              </Card>
              {/* Arrow for desktop */}
              <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-blue-500/30 border-b-[20px] border-b-transparent"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">
                    면접 진행
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    1차 실무진 면접, 2차 임원 면접 (개별 일정 조율)
                  </p>
                </CardContent>
              </Card>
              {/* Arrow for desktop */}
              <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 hidden lg:block z-10">
                <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-purple-500/30 border-b-[20px] border-b-transparent"></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
                      4
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">
                    최종 선발
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    위촉계약 체결 및 교육 과정 안내
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile View - Vertical Cards */}
          <div className="lg:hidden space-y-4">
            {[
              {
                number: 1,
                title: '지원서 접수',
                description:
                  '온라인 지원서 작성 및 제출. 경력사항과 자기소개서 작성',
                color: 'from-primary to-primary/80',
              },
              {
                number: 2,
                title: '서류 심사',
                description:
                  '지원서류 검토 및 기본 자격요건 확인 (3-5일 소요)',
                color: 'from-blue-500 to-blue-600',
              },
              {
                number: 3,
                title: '면접 진행',
                description:
                  '1차 실무진 면접, 2차 임원 면접 (개별 일정 조율)',
                color: 'from-purple-500 to-purple-600',
              },
              {
                number: 4,
                title: '최종 선발',
                description: '위촉계약 체결 및 교육 과정 안내',
                color: 'from-green-500 to-green-600',
                isLast: true,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${step.isLast ? 'animate-pulse' : ''}`}
                      >
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Mobile connector line */}
                {!step.isLast && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground/50 to-muted-foreground/20"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
