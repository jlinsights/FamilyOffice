'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 방지: 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return (
      <div className="h-9 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700" />
    );
  }

  const themes = [
    { value: 'light', icon: Sun, label: '라이트 모드' },
    { value: 'system', icon: Monitor, label: '시스템 모드' },
    { value: 'dark', icon: Moon, label: '다크 모드' },
  ];

  return (
    <div className="relative inline-flex h-9 items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-1">
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            className={`
              relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200
              ${isActive 
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-100' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }
            `}
            onClick={() => setTheme(value)}
            aria-label={label}
            title={label}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
