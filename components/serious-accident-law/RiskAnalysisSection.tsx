import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SelfCheckSafety } from '@/components/forms/self-check-safety';
import { riskFactors } from '@/constants/serious-accident-law';

export function RiskAnalysisSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Risk Analysis
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            업종별 위험도 분석
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            업종에 따라 다른 위험 요소와 대응 전략이 필요합니다.
            <br />
            귀하의 업종에 맞는 맞춤형 솔루션을 확인하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {riskFactors.map((risk, index) => {
            const Icon = risk.icon;
            const colorClassesMap = {
              red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
              orange:
                'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
              yellow:
                'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
              purple:
                'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
            };
            const colorClasses =
              colorClassesMap[risk.color as keyof typeof colorClassesMap];

            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card text-card-foreground border border-border"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {risk.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {risk.description}
                  </p>
                  <Badge variant="destructive" className="text-xs">
                    {risk.penalty}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 위험도 자가진단 */}
        <div
          id="risk-assessment"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <SelfCheckSafety />
        </div>
      </div>
    </section>
  );
}
