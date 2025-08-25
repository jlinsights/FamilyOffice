'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AvailabilitySlot {
  start: string;
  end: string;
  available: boolean;
}

interface CalComAvailabilityProps {
  eventTypeId?: string;
  dateRange?: number; // days to show from today
  className?: string;
  onSlotSelect?: (slot: AvailabilitySlot) => void;
  showBookButton?: boolean;
}

export function CalComAvailability({
  eventTypeId = 'consultation',
  dateRange = 7,
  className = '',
  onSlotSelect,
  showBookButton = true,
}: CalComAvailabilityProps) {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const dateStr = new Date().toISOString().split('T')[0];
    return dateStr || new Date().toISOString().substring(0, 10);
  });

  // Generate date range
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < dateRange; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0] || date.toISOString().substring(0, 10),
        label: date.toLocaleDateString('ko-KR', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
        }),
        isToday: i === 0,
      });
    }
    return dates;
  };

  const dates = generateDates();

  // Mock availability data (replace with actual Cal.com API call)
  const fetchAvailability = async (date: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // This would be replaced with actual Cal.com API call
      // const response = await fetch(`/api/cal-com/availability?date=${date}&eventTypeId=${eventTypeId}`);
      console.log('Fetching availability for date:', date); // Use the date parameter
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockSlots: AvailabilitySlot[] = [
        { start: '09:00', end: '10:00', available: true },
        { start: '10:00', end: '11:00', available: false },
        { start: '11:00', end: '12:00', available: true },
        { start: '14:00', end: '15:00', available: true },
        { start: '15:00', end: '16:00', available: true },
        { start: '16:00', end: '17:00', available: false },
      ];
      
      setAvailability(mockSlots);
    } catch (err) {
      setError('예약 가능 시간을 불러올 수 없습니다.');
      console.error('Availability fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate, eventTypeId]);

  const handleSlotClick = (slot: AvailabilitySlot) => {
    if (slot.available) {
      onSlotSelect?.(slot);
    }
  };

  const handleBookNow = () => {
    const calLink = `https://cal.com/familyoffice?date=${selectedDate}`;
    window.open(calLink, '_blank', 'noopener,noreferrer');
  };

  const availableSlots = availability.filter(slot => slot.available).length;
  const totalSlots = availability.length;

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">예약 가능 시간</CardTitle>
          </div>
          {!isLoading && !error && (
            <Badge variant="outline" className="text-sm">
              {availableSlots}/{totalSlots} 슬롯 예약 가능
            </Badge>
          )}
        </div>
        <CardDescription>
          원하는 날짜와 시간을 선택하여 전문가와 상담을 예약하세요
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">날짜 선택</h4>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {dates.map((date) => (
              <Button
                key={date.value}
                variant={selectedDate === date.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDate(date.value)}
                className={`min-w-fit whitespace-nowrap ${
                  date.isToday ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                {date.label}
                {date.isToday && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    오늘
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">시간 선택</h4>
            {isLoading && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>불러오는 중...</span>
              </div>
            )}
          </div>

          {error ? (
            <div className="flex items-center space-x-2 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchAvailability(selectedDate)}
                className="ml-auto"
              >
                다시 시도
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availability.map((slot, index) => (
                <Button
                  key={index}
                  variant={slot.available ? 'outline' : 'ghost'}
                  size="sm"
                  disabled={!slot.available}
                  onClick={() => handleSlotClick(slot)}
                  className={`relative ${
                    slot.available
                      ? 'hover:bg-primary hover:text-primary-foreground cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {slot.start}
                  {slot.available && (
                    <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                  )}
                </Button>
              ))}
            </div>
          )}

          {!isLoading && !error && availability.length === 0 && (
            <div className="text-center p-6 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">선택한 날짜에 예약 가능한 시간이 없습니다.</p>
              <p className="text-xs mt-1">다른 날짜를 선택해 주세요.</p>
            </div>
          )}
        </div>

        {/* Book Now Button */}
        {showBookButton && !error && availableSlots > 0 && (
          <div className="pt-4 border-t">
            <Button
              onClick={handleBookNow}
              className="w-full"
              size="lg"
            >
              <Calendar className="mr-2 h-4 w-4" />
              지금 예약하기
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Cal.com에서 정확한 시간을 선택하고 예약을 완료하세요
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}