'use client';

import { AlertCircle } from 'lucide-react';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { ClientOnlyIcon } from '@/components/ui/client-only-icon';

export const StructureCheckHeroSection = memo(
  function StructureCheckHeroSection() {
    return (
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* 상단 태그 */}
          <div className="flex justify-center mb-8">
            <Badge
              variant="outline"
              size="lg"
              className="border-amber-200 bg-gradient-to-r from-amber-50/80 to-amber-100/50 text-amber-800 dark:border-amber-800 dark:from-amber-950/80 dark:to-amber-900/50 dark:text-amber-200"
            >
              <ClientOnlyIcon icon={AlertCircle} className="h-4 w-4 mr-2" />
              판단 구조 정리 서비스
            </Badge>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-foreground">
            구조 점검 요청
          </h1>

          {/* 핵심 질문 */}
          <p className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-primary mb-8 leading-relaxed">
            이 문제, 혼자 판단하셔도 되는 단계인가요?
          </p>

          {/* 설명 문구 */}
          <div className="max-w-3xl mx-auto space-y-4 text-center text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              기업을 운영하고 자산이 커질수록,
              <br />
              결정은 늦어지고 리스크는 커집니다.
            </p>
            <p className="font-medium text-foreground pt-4">
              이 페이지는 상담이나 상품 제안을 위한 공간이 아닙니다.
            </p>
            <p>
              <span className="font-medium text-foreground">
                지금 상황에서 무엇을 결정해야 하는지,
              </span>
              <br />
              <span className="font-medium text-foreground">
                아직 결정을 미뤄도 되는 문제는 무엇인지
              </span>
              <br />를 정리하는 자리입니다.
            </p>
          </div>
        </div>
      </section>
    );
  }
);
