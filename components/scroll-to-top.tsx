'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시/숨김
  useEffect(() => {
    const toggleVisibility = () => {
      // 300px 이상 스크롤하면 버튼 표시
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300 md:bottom-36 md:right-8"
          aria-label="맨 위로 가기"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
