import { Mail, Phone, Users } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { cn } from '@/lib/utils';

export function RecruitCTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* 강력한 CTA */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            삼성생명 GFC로 성공하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문적인 기업재무컨설턴트로서
            <br />
            높은 수입과 안정적인 커리어를 만들어가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalComPopup
              buttonText="GFC 채용 상담 예약"
              variant="secondary"
              size="lg"
            />
            <a
              href="tel:0502-5550-8700"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'bg-white/10 border-white/20 hover:bg-white/20'
              )}
            >
              <Phone className="mr-2 h-4 w-4" /> 0502-5550-8700
            </a>
          </div>
        </div>

        {/* 추가 지원 옵션 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            다양한 지원 방법
          </h3>
          <p className="text-muted-foreground mb-6 dark:text-gray-200">
            가장 편리한 방법으로 지원하고 상담받으세요
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="font-bold shadow-lg"
              onClick={() =>
                window.open('https://recruit.familyoffices.vip', '_blank')
              }
            >
              <Users className="mr-2 h-5 w-5" />
              잡페어 참석하기
            </Button>
            <a
              href="mailto:recruit@familyoffices.vip"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'font-bold shadow-lg'
              )}
            >
              <Mail className="mr-2 h-5 w-5" />
              이메일 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
