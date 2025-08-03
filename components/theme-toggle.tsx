'use client';

import { Moon, Sun } from 'lucide-react';

import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서만 렌더링
  if (!mounted) {
    return (
      <div className="h-9 w-9 border border-border/40 bg-background/80 dark:bg-background/60 rounded-xl" />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 border border-border/40 bg-background/80 dark:bg-background/60 hover:bg-accent hover:border-border transition-all hover:scale-105"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="테마 전환"
    >
      <div className="relative h-4 w-4">
        <Sun className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500 dark:text-amber-400" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-300" />
      </div>
      <span className="sr-only">테마 전환</span>
    </Button>
  );
}
