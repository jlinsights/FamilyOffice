'use client';

import { Calendar } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface CalComPopupProps {
  buttonText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'tertiary' | 'subtle' | 'emerald' | 'consultation';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  eventType?: string;
}

export function CalComPopup({
  buttonText = '상담 예약하기',
  variant = 'default',
  size = 'default',
  className,
  eventType = 'consultation',
}: CalComPopupProps) {
  // Cal.com 통합이 완료될 때까지 임시로 연락처 페이지로 이동
  const handleClick = () => {
    window.location.href = '/contact';
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </button>
  );
}
