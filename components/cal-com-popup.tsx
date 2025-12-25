'use client';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CalComPopupProps {
  trigger?: React.ReactNode;
  buttonText?: string;
  calLink?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  eventType?: 'consultation' | 'seminar' | 'demo' | 'follow-up';
}

// Simplified version - just opens Cal.com in a new tab
export function CalComPopup({
  trigger,
  buttonText = '무료 상담 예약',
  calLink = 'familyoffice',
  variant = 'default',
  size = 'lg',
  className = '',
  eventType = 'consultation',
}: CalComPopupProps) {
  // Event type specific configurations
  const eventConfigs = {
    consultation: {
      path: 'familyoffice',
    },
    seminar: {
      path: 'familyoffice/seminar',
    },
    demo: {
      path: 'familyoffice/demo',
    },
    'follow-up': {
      path: 'familyoffice/follow-up',
    },
  };

  const config = eventConfigs[eventType];
  const fullCalLink = `https://cal.com/${calLink || config.path}`;

  const handleClick = () => {
    window.open(fullCalLink, '_blank', 'noopener,noreferrer');
  };

  const DefaultTrigger = (
    <Button
      variant={variant}
      size={size}
      className={`font-bold shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      onClick={handleClick}
    >
      <Calendar className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  );

  // If custom trigger is provided, wrap it with onClick handler
  if (trigger) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {trigger}
      </div>
    );
  }

  return DefaultTrigger;
}
