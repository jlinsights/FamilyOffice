'use client';

import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 lg:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-backwards">
      <Button
        size="lg"
        variant="default"
        className="interaction-ready px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-xl transition-all duration-200 border-0"
        onClick={() => router.push('/calculators/inheritance-tax')}
      >
        <Calculator className="mr-2 h-5 w-5" />
        상속세 3분 계산하기
      </Button>
      <Button
        size="lg"
        variant="default"
        className="interaction-ready px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-colors duration-200"
        onClick={() => router.push('/structure-check#request-form')}
      >
        전문가 상담 예약
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="interaction-ready font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl shadow-lg transition-colors duration-200"
        onClick={() => {
          document.getElementById('services')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }}
      >
        서비스 솔루션 보기
      </Button>
    </div>
  );
}
