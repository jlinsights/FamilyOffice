'use client';

import { Wifi, WifiOff } from 'lucide-react';

import { useEffect, useState } from 'react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't show anything if online and toast hidden
  if (isOnline && !showToast) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        showToast
          ? 'translate-y-0 opacity-100'
          : '-translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`px-4 py-3 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 ${
          isOnline
            ? 'bg-green-600/90 text-white'
            : 'bg-slate-900/90 dark:bg-slate-800/90 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">다시 온라인 상태입니다</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">오프라인 모드</span>
          </>
        )}
      </div>
    </div>
  );
}
