'use client';

import { Calendar } from 'lucide-react';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalComPopupProps {
  buttonText?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  eventType?: string;
  trigger?: React.ReactNode;
  calLink?: string; // Cal.com event type link (e.g., "familyoffices/consultation")
}

export function CalComPopup({
  buttonText = '상담 예약하기',
  variant = 'default',
  size = 'default',
  className,
  eventType = 'consultation',
  trigger,
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
      {trigger ? (
        trigger
      ) : (
        <>
          <Calendar className="mr-2 h-4 w-4" />
          {buttonText}
        </>
      )}
    </button>
  );
}
