'use client';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CalComInlineProps {
  showHeader?: boolean;
  height?: string;
  namespace?: string;
  calLink?: string;
}

export function CalComInline({
  showHeader = false,
  height = '500px',
  calLink = 'familyoffice',
}: CalComInlineProps) {
  const handleClick = () => {
    window.open(`https://cal.com/${calLink}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {showHeader && (
        <>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
            무료 상담 예약
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground mb-8">
            <span className="playfair-display-bold">FamilyOffice S</span>의
            전문가들과 직접 상담을 예약하세요. 귀하의 자산과 가문의 번영을 위한
            맞춤형 솔루션을 제안해 드립니다.
          </p>
        </>
      )}

      <div
        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-8">
          <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4">전문가 상담 예약</h3>
          <p className="text-muted-foreground mb-6">
            Cal.com에서 편리하게 상담 일정을 예약하세요
          </p>
          <Button onClick={handleClick} size="lg" className="font-bold">
            <Calendar className="mr-2 h-4 w-4" />
            상담 예약하기
          </Button>
        </div>
      </div>
    </div>
  );
}
