import { CheckCircle, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { cn } from '@/lib/utils';
import type { RecruitFaqCategory } from '@/constants/recruit';
import { getIcon } from '@/constants/recruit';

export interface RecruitFAQSectionProps {
  faqCategories: RecruitFaqCategory[];
}

export function RecruitFAQSection({ faqCategories }: RecruitFAQSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="h-3 w-3 mr-1" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              삼성생명 GFC 채용 FAQ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              삼성생명 GFC 채용에 대해 자주 묻는 질문들을 정리했습니다.
              <br />
              추가 궁금한 사항은 언제든 문의해주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = getIcon(category.icon);
              return (
                <div key={categoryIndex} className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                  </div>

                  <PremiumFAQ
                    items={category.faqs.map(item => ({
                      question: item.question,
                      answer: item.answer,
                    }))}
                  />
                </div>
              );
            })}
          </div>

          {/* FAQ CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold mb-4">
                더 궁금한 점이 있으신가요?
              </h3>
              <p className="text-muted-foreground mb-6">
                삼성생명 GFC 채용에 대한 추가 질문이나 개별 상담을 원하시면
                언제든 연락주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  buttonText="GFC 채용 상담 예약"
                  variant="default"
                  size="lg"
                />
                <a
                  href="tel:0502-5550-8700"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' })
                  )}
                >
                  <Phone className="mr-2 h-4 w-4" /> 0502-5550-8700
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
