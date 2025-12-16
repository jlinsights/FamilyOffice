'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StructureCheckRequestForm } from '@/components/forms/structure-check-request-form';

export const StructureCheckFormSection = memo(function StructureCheckFormSection() {
  return (
    <section id="request-form" className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            구조 점검 요청
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            이 문제를 혼자 판단하기 어렵다고 느끼셨다면,
            <br />
            아래 요청을 통해 구조 점검을 신청하실 수 있습니다.
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardContent className="p-8 md:p-12">
            <StructureCheckRequestForm />
          </CardContent>
        </Card>

        {/* Notice */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="bg-muted/30 dark:bg-muted/10 border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-center mb-4 text-foreground">안내</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>구조 점검은 선별적으로 진행됩니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>모든 요청이 수락되지는 않습니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>점검 이후 실행 단계는 필요할 경우에만 별도로 논의합니다.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-muted-foreground">
          <p className="text-sm mb-2">기업 오너·자산가를 위한 구조 중심 자문</p>
          <p className="font-semibold text-foreground text-lg mb-4">
            Family Office S │ 임재홍
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
            <p>📍 서울시 중구 세종대로 73 태평로빌딩</p>
            <p className="hidden md:block">|</p>
            <p>📞 0502-5550-8700</p>
            <p className="hidden md:block">|</p>
            <p>🔗 <a href="https://litt.ly/familyoffice" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">litt.ly/familyoffice</a></p>
          </div>
        </div>
      </div>
    </section>
  );
});
