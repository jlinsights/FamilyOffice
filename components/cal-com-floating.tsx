'use client';

import { Calendar } from 'lucide-react';
import { CalComPopup } from './cal-com-popup';
import { Button } from '@/components/ui/button';

export function CalComFloating() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <CalComPopup 
        trigger={
          <Button
            size="lg"
            className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full w-16 h-16"
          >
            <Calendar className="h-6 w-6" />
          </Button>
        }
        buttonText="무료 상담 예약"
        eventType="consultation"
        variant="default"
        size="lg"
      />
    </div>
  );
}
