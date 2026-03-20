import { Info, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { PremiumFAQ } from '@/components/faq/premium-faq';
import { faqItems } from '@/constants/serious-accident-law';

export function SALFAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Info className="h-3 w-3 mr-1" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              중대재해처벌법 FAQ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              중대재해처벌법에 대해 자주 묻는 질문들을 정리했습니다.
            </p>
          </div>

          <PremiumFAQ items={faqItems} />

          {/* FAQ CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-bold mb-4">
                더 궁금한 점이 있으신가요?
              </h3>
              <p className="text-muted-foreground mb-6">
                중대재해처벌법 대응에 대한 추가 질문이나 맞춤형 상담을
                원하시면 언제든 연락주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalComPopup
                  buttonText="무료 상담 예약"
                  variant="default"
                  size="lg"
                />
                <a
                  href="tel:0502-5550-8700"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                  })}
                >
                  <Phone className="mr-2 h-4 w-4" />☎ 0502-5550-8700
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
