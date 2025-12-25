'use client';

import { ExternalLink, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function DomainMigrationBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 배너 해제 상태 확인
    const dismissed = localStorage.getItem('domain-migration-dismissed');
    if (!dismissed) {
      // 리퍼러 확인 - 기존 도메인에서 온 경우 또는 쿠키로 기존 사용자 식별
      const isFromOldDomain =
        document.referrer.includes('samsunglife.vip') ||
        localStorage.getItem('legacy-user') === 'true';

      if (isFromOldDomain) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('domain-migration-dismissed', 'true');
    localStorage.setItem('legacy-user', 'true');
  };

  const handleLearnMore = () => {
    // 새 도메인 소개 페이지나 공지사항으로 연결
    window.open('/about#domain-migration', '_blank');
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
            <div className="text-sm md:text-base">
              <span className="font-semibold">도메인이 변경되었습니다!</span>
              <span className="ml-2">
                <span className="text-blue-200">samsunglife.vip</span> →
                <span className="text-white font-semibold ml-1">
                  familyoffices.vip
                </span>
              </span>
              <span className="hidden md:inline ml-2 text-blue-200">
                북마크를 업데이트해 주세요.
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLearnMore}
              className="text-white hover:bg-white/20 text-xs md:text-sm"
            >
              자세히 보기
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="배너 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
