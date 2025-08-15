'use client';

import { Calendar } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const { resolvedTheme } = useTheme();
  
  const handleClick = () => {
    // Theme-aware external link
    const isDark = resolvedTheme === 'dark';
    const calTheme = isDark ? 'dark' : 'light';
    const themeParams = `?theme=${calTheme}&bg=${isDark ? '1a1a1a' : 'ffffff'}&text=${isDark ? 'ffffff' : '000000'}`;
    
    if (typeof window !== 'undefined') {
      window.open(
        `https://cal.com/${calLink}${themeParams}`,
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
