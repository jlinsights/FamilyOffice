import { MemberBenefit } from "@/types/program";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award } from "lucide-react";

export function MemberBenefitsSection({ benefits }: { benefits: MemberBenefit[] }) {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            <Award className="h-3 w-3 mr-1" aria-hidden />
            Exclusive Benefits
          </Badge>
          <h2 className="mb-6 font-bold text-balance animate-slide-up">
            멤버만이 누릴 수 있는 <span className="text-primary">프리미엄 혜택</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            네트워킹부터 교육, 투자까지 CEO의 성장을 위한 통합 솔루션
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="card p-8 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" aria-hidden />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
