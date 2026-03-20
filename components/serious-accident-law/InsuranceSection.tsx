import { Building, CheckCircle, Shield, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { insuranceProducts } from '@/constants/serious-accident-law';

export function InsuranceSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Insurance Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            경영진 보호 보험 상품
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            중대재해 발생 시 경영진의 재정적 부담을 최소화하고
            <br />
            기업의 지속가능성을 보장하는 보험 솔루션
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {insuranceProducts.map((product, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-card text-card-foreground border border-border"
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                  추천
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {product.coverage}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {product.limit}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    보장한도
                  </div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
                    {product.premium}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    보험료
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={index === 1 ? 'default' : 'outline'}
                >
                  상세 정보 요청
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 보험 선택 가이드 */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">
              보험 선택 가이드
            </h3>
            <p className="text-green-600 dark:text-green-300 text-sm">
              기업 규모와 업종에 따른 맞춤형 보험 추천
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">중소기업 (50-299인)</h4>
              <p className="text-sm text-muted-foreground">
                임원배상책임보험 + 기본 특약
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2">중견기업 (300-999인)</h4>
              <p className="text-sm text-muted-foreground">
                D&O 보험 특약 (추천 상품)
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">대기업 (1000인+)</h4>
              <p className="text-sm text-muted-foreground">
                기업종합보험 (포괄적 보장)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
