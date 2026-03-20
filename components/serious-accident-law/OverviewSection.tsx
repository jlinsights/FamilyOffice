import {
  AlertTriangle,
  Building,
  CheckCircle,
  Gavel,
  Scale,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OverviewSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Gavel className="h-3 w-3 mr-1" />
              Legal Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              중대재해처벌법이란?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              중대재해로 인한 인명피해 발생 시 경영책임자와 기업에 대해
              형사처벌을 강화한 법률입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 적용 대상 */}
            <Card className="border-2 border-red-200 dark:border-red-800 bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                  <Building className="h-5 w-5 mr-2" />
                  적용 대상
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>상시근로자 50인 이상</strong> 사업장
                      (2022.1.27~)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>상시근로자 5인 이상</strong> 사업장
                      (2024.1.27~)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>중대시민재해</strong> 전 사업장 적용
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>공공기관, 지방공사</strong> 포함
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 처벌 수준 */}
            <Card className="border-2 border-orange-200 dark:border-orange-800 bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700 dark:text-orange-400">
                  <Scale className="h-5 w-5 mr-2" />
                  처벌 수준
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>경영책임자:</strong> 1년 이상 징역 또는 10억원
                      이하 벌금
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>법인:</strong> 50억원 이하 벌금 (매출액의
                      1/1000 이하)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>공공기관:</strong> 100억원 이하 벌금
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>추가:</strong> 영업정지, 허가취소 등
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 중대재해 정의 */}
          <Card className="bg-card text-card-foreground border border-border">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                중대재해의 정의
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">
                    📍 중대산업재해
                  </h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• 사망자 1명 이상 발생</li>
                    <li>• 6개월 이상 치료가 필요한 부상자 2명 이상</li>
                    <li>• 3개월 이상 치료가 필요한 부상자 10명 이상</li>
                    <li>• 급성중독 등으로 동시에 3명 이상 부상</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700 dark:text-orange-400">
                    📍 중대시민재해
                  </h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• 사망자 1명 이상 발생</li>
                    <li>• 2개월 이상 치료가 필요한 부상자 10명 이상</li>
                    <li>• 1개월 이상 치료가 필요한 부상자 30명 이상</li>
                    <li>• 원료·제조물질 등으로 인한 피해</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
