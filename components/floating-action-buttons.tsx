'use client';

import { Calendar } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalComPopup } from '@/components/calendar/cal-com-popup';
import { BRAND_COLORS } from '@/constants/brand';

export function FloatingActionButtons() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleKakaoTalk = () => {
    // 카카오톡 채널 추가 또는 1:1 채팅 시작
    if (typeof window !== 'undefined') {
      const kakaoChannelUrl = BRAND_COLORS.social[0]?.url;
      if (kakaoChannelUrl) {
        window.open(kakaoChannelUrl, '_blank');
      }
    }
  };

  return (
    <div className="floating-buttons-mobile">
      {/* 카카오톡 문의 버튼 */}
      <div className="relative group pointer-events-auto">
        {/* 호버 툴팁 */}
        <div
          className={`absolute bottom-20 right-0 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 transform ${
            isHovered === 'kakao'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          카카오톡으로 문의하기
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
        </div>

        {/* 카카오톡 버튼 */}
        <Button
          size="lg"
          onClick={handleKakaoTalk}
          onMouseEnter={e => {
            setIsHovered('kakao');
            e.currentTarget.style.backgroundColor = '#FFED00';
          }}
          onMouseLeave={e => {
            setIsHovered(null);
            e.currentTarget.style.backgroundColor = '#FEE500';
          }}
          className={`
            mobile-touch-target
            relative overflow-hidden
            shadow-2xl hover:shadow-3xl 
            transition-all duration-500 ease-out
            border-0
            text-white 
            font-semibold 
            rounded-full 
            w-14 h-14 md:w-16 md:h-16
            group-hover:scale-110 
            hover:rotate-[5deg]
            focus:outline-none focus:ring-4 focus:ring-[#FEE500]/30
            active:scale-95
            p-2
            flex items-center justify-center
          `}
          style={{
            backgroundColor: '#FEE500',
            backgroundImage: 'none',
          }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image
              src="/images/KAKAO/kakaotalk_sharing_btn/kakaotalk_sharing_btn_small.png"
              alt="카카오톡"
              width={36}
              height={36}
              className={`
                transition-all duration-300 
                ${isHovered === 'kakao' ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                drop-shadow-sm
                object-contain
              `}
              style={{
                filter: 'none',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </Button>

        {/* 맥동 효과 */}
        <div
          className="absolute inset-0 rounded-full border-2 animate-pulse-ring pointer-events-none"
          style={{ borderColor: '#FEE500', opacity: 0.4 }}
        />
        <div
          className="absolute inset-0 rounded-full border-2 animate-pulse-ring pointer-events-none"
          style={{
            borderColor: '#FEE500',
            opacity: 0.2,
            animationDelay: '1s',
          }}
        />

        {/* 글로우 효과 */}
        <div
          className={`
            absolute inset-0 rounded-full 
            blur-xl
            transition-all duration-500
            pointer-events-none
            ${
              isHovered === 'kakao'
                ? 'scale-150 opacity-60'
                : 'scale-100 opacity-30'
            }
          `}
          style={{
            backgroundColor: '#FEE500',
            opacity: isHovered === 'kakao' ? 0.6 : 0.3,
          }}
        />
      </div>

      {/* 상담 예약 버튼 */}
      <div className="relative group pointer-events-auto">
        {/* 호버 툴팁 */}
        <div
          className={`absolute bottom-20 right-0 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 transform ${
            isHovered === 'consultation'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          무료 상담 예약하기
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
        </div>

        {/* 상담 예약 버튼 */}
        <CalComPopup
          trigger={
            <Button
              size="lg"
              onMouseEnter={() => setIsHovered('consultation')}
              onMouseLeave={() => setIsHovered(null)}
              className={`
                mobile-touch-target
                relative overflow-hidden
                shadow-2xl hover:shadow-3xl 
                transition-all duration-500 ease-out
                bg-gradient-to-br from-primary via-primary to-primary/80 
                hover:from-primary/90 hover:via-primary hover:to-primary/70
                text-primary-foreground 
                font-semibold 
                rounded-full 
                w-14 h-14 md:w-16 md:h-16
                group-hover:scale-110 
                hover:rotate-[5deg]
                focus:outline-none focus:ring-4 focus:ring-primary/30
                active:scale-95
                before:absolute before:inset-0 
                before:bg-white/10 before:rounded-full 
                before:opacity-0 before:transition-opacity before:duration-300
                hover:before:opacity-100
                after:absolute after:inset-0 
                after:bg-gradient-to-tr after:from-transparent after:via-white/5 after:to-white/10
                after:rounded-full after:pointer-events-none
              `}
            >
              <Calendar
                className={`
                  h-6 w-6 md:h-7 md:w-7 
                  transition-all duration-300 
                  ${isHovered === 'consultation' ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                  drop-shadow-sm
                `}
              />
            </Button>
          }
          buttonText="무료 상담 예약"
          eventType="consultation"
          variant="default"
          size="lg"
        />

        {/* 맥동 효과 */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-ring pointer-events-none" />
        <div
          className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-ring pointer-events-none"
          style={{ animationDelay: '1s' }}
        />

        {/* 글로우 효과 */}
        <div
          className={`
            absolute inset-0 rounded-full 
            bg-primary/20 blur-xl
            transition-all duration-500
            pointer-events-none
            ${
              isHovered === 'consultation'
                ? 'scale-150 opacity-60'
                : 'scale-100 opacity-30'
            }
          `}
        />
      </div>
    </div>
  );
}
