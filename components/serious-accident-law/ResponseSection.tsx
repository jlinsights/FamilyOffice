import { CheckCircle, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { responseSteps } from '@/constants/serious-accident-law';

export function ResponseSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Target className="h-3 w-3 mr-1" />
            Response Strategy
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            4단계 완벽 대응 전략
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            체계적이고 단계별로 진행되는 완벽한 중대재해처벌법 대응 솔루션
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {responseSteps.map((step, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-card text-card-foreground border border-border"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {step.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 프로세스 플로우 */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full px-6 py-3 border border-primary/20">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold">총 소요기간: 4-8주</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                완료 후 상시 모니터링
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
