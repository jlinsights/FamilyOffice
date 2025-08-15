'use client';

import { Calendar } from 'lucide-react';
import { CalComPopup } from './cal-com-popup';
import { Button } from '@/components/ui/button';

export function CalComFloating() {
  const FloatingTrigger = (
    <Button
      size="lg"
      className="fixed bottom-5 right-5 z-50 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-5 py-3"
    >
      <Calendar className="mr-2 h-4 w-4" />
      상담 예약
    </Button>
  );

  return (
    <CalComPopup 
      trigger={FloatingTrigger}
      buttonText="무료 상담 예약"
      eventType="consultation"
      variant="default"
      size="lg"
    />
  );
}
