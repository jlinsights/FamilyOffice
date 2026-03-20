import { CheckCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function RequirementsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="h-3 w-3 mr-1" />
              Requirements & Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              GFC 자격조건 및 우대사항
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                기본 자격조건
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 4년제 대졸 이상</li>
                <li>• 금융/경영/회계 관련 전공 우대</li>
                <li>• 기본적인 PC 활용 능력</li>
                <li>• 원활한 의사소통 능력</li>
                <li>• 성실하고 책임감 있는 성격</li>
              </ul>
            </div>

            <div className="bg-background rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                우대사항
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 금융업계 경험자</li>
                <li>• 보험/증권/은행 근무 경력</li>
                <li>• 자산관리/재무설계 경험</li>
                <li>• 영업/컨설팅 경험</li>
                <li>• 관련 자격증 보유자</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
