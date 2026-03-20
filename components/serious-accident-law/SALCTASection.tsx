import { Heart, Phone, Shield, Target } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { cn } from '@/lib/utils';

export function SALCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            중대재해는 예고 없이 찾아옵니다
            <br />
            완벽한 준비로 기업과 경영진을 보호하세요
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">무료 진단</h3>
              <p className="text-sm opacity-75">현재 위험도 무료 분석</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">완벽 대응</h3>
              <p className="text-sm opacity-75">4단계 체계적 솔루션</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">안심 보장</h3>
              <p className="text-sm opacity-75">지속적인 관리 지원</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalComPopup
              buttonText="긴급 상담 신청"
              variant="secondary"
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            />
            <a
              href="tel:0502-5550-8700"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'bg-white/10 border-white/20 hover:bg-white/20 text-white'
              )}
            >
              <Phone className="mr-2 h-4 w-4" />☎ 0502-5550-8700
            </a>
          </div>

          <p className="text-xs opacity-75 mt-6">
            * 상담 예약 시 중대재해처벌법 대응 가이드북을 무료로 제공합니다
          </p>
        </div>
      </div>
    </section>
  );
}
