'use client';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CalComEmbedProps {
  className?: string;
  style?: React.CSSProperties;
  calLink?: string;
}

export default function CalComEmbed({
  className = '',
  style,
  calLink = 'familyoffice',
}: CalComEmbedProps) {
  const handleClick = () => {
    window.open(`https://cal.com/${calLink}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
      style={style}
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
  );
}
