'use client';

import { Moon, Sun } from 'lucide-react';

import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // SSR 방지: 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted || !isClient) {
    return null;
  }

  // 서버와 클라이언트 렌더링을 일치시키기 위해 항상 button 태그 사용
  return (
    <button
      type="button"
      className="h-9 w-9 border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:border-border transition-all hover:scale-105 rounded-xl inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
      onClick={() => {
        if (mounted && isClient) {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }
      }}
      aria-label="테마 전환"
    >
      <div className="relative h-4 w-4">
        <Sun className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500 dark:text-amber-400" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-300" />
      </div>
      <span className="sr-only">테마 전환</span>
    </button>
  );
}
