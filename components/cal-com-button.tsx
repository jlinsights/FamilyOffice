'use client';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CalComButtonProps {
  calLink?: string;
  buttonText?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CalComButton({
  calLink = 'familyoffice/consultation',
  buttonText = '상담 예약',
  className = '',
  variant = 'default',
  size = 'lg',
}: CalComButtonProps) {
  const handleClick = () => {
    // 단순히 외부 링크로 이동
    if (typeof window !== 'undefined') {
      window.open(
        `https://cal.com/${calLink}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  );
}
