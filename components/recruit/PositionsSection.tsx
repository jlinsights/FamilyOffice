import { Briefcase, Building, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Position } from '@/constants/recruit';

export interface PositionsSectionProps {
  positions: Position[];
}

export function PositionsSection({ positions }: PositionsSectionProps) {
  return (
    <section
      id="positions-section"
      className="py-20 bg-muted/20 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Briefcase className="h-3 w-3 mr-1" />
            Job Positions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="text-primary dark:text-emerald-300">
              삼성생명GFC
            </span>{' '}
            채용 포지션
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-200">
            가업승계, 자산관리, 세무회계, 투자금융 전문가로 함께할
            기업재무컨설턴트를 모집합니다
          </p>
        </div>

        {/* 2x1 Grid Layout: Luma Calendar + Job Positions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Grid: Recruitment Calendar & Consultation */}
          <Card className="h-fit dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-center text-foreground dark:text-white">
                🚀 채용 프로그램 & 개별 상담
              </CardTitle>
              <p className="text-sm text-center text-muted-foreground dark:text-gray-300 mt-2">
                잡페어 참석 및 개별 인터뷰 상담을 예약하세요
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Job Fair Calendar */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  잡페어 일정
                </h3>
                <div className="w-full flex justify-center">
                  <iframe
                    src="https://lu.ma/embed/calendar/cal-u8wu7qsSnM6rstO/events"
                    width="100%"
                    height="400"
                    className="w-full max-w-full"
                    style={{
                      border: '1px solid #bfcbda88',
                      borderRadius: '8px',
                      minHeight: '400px',
                    }}
                    frameBorder="0"
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                    title="FamilyOffice 잡페어 일정"
                  />
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-300 mt-2 text-center">
                  📍 위 캘린더에서 잡페어 일정을 확인하고 참석 신청하실 수
                  있습니다
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
                <div className="px-4 text-sm text-muted-foreground dark:text-gray-400">
                  또는
                </div>
                <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
              </div>

              {/* Individual Consultation */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground dark:text-white flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  개별 인터뷰 상담
                </h3>
                <div
                  style={{
                    width: '100%',
                    height: '500px',
                    overflow: 'scroll',
                  }}
                  id="my-cal-inline-recruit"
                  className="border border-gray-200 dark:border-gray-600 rounded-lg"
                />
                <p className="text-sm text-muted-foreground dark:text-gray-300 mt-2 text-center">
                  💼 구직자 개별 상담 및 인터뷰 일정을 직접 예약하실 수
                  있습니다
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Grid: Job Positions */}
          <div className="space-y-6">
            {positions.map((position, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2 text-foreground dark:text-white">
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                          <Building className="h-3 w-3 mr-1" />
                          {position.department}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="dark:bg-primary/80 dark:text-white dark:border-primary/60"
                        >
                          {position.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {position.experience}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {position.location}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      className="mt-4 md:mt-0 dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          'https://cal.com/familyoffice/recruit',
                          '_blank'
                        )
                      }
                    >
                      지원하기
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 dark:text-gray-200">
                    {position.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground dark:text-white">
                      지원 자격
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground dark:text-gray-200">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Samsung Life GFC Card */}
            <Card className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 text-foreground dark:text-white">
                      법인컨설팅 동반자, 삼성생명GFC
                    </CardTitle>
                    <p className="text-muted-foreground dark:text-gray-300">
                      Group Financial Consultant
                    </p>
                  </div>
                  <Button
                    className="mt-4 md:mt-0 dark:bg-primary/80 dark:text-white dark:hover:bg-primary/90"
                    onClick={() =>
                      window.open(
                        'https://pub-66c6dc2fd6894c5687d260702159ac9a.r2.dev/20250123%20GFC%20%E1%84%87%E1%85%B3%E1%84%85%E1%85%A9%E1%84%89%E1%85%A7.pdf',
                        '_blank'
                      )
                    }
                  >
                    열어보기
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
