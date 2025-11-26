'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ViewMode = 'grid' | 'list';

interface BlogViewToggleProps {
  defaultView?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export function BlogViewToggle({ defaultView = 'grid', onViewChange }: BlogViewToggleProps) {
  const [view, setView] = useState<ViewMode>(defaultView);

  useEffect(() => {
    // localStorage에서 사용자 선호도 불러오기
    const savedView = localStorage.getItem('blogViewPreference') as ViewMode;
    if (savedView) {
      setView(savedView);
      onViewChange?.(savedView);
    }
  }, [onViewChange]);

  const handleViewChange = (newView: ViewMode) => {
    setView(newView);
    localStorage.setItem('blogViewPreference', newView);
    onViewChange?.(newView);
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleViewChange('grid')}
        className={cn(
          'h-8 px-3 rounded-lg transition-all',
          view === 'grid'
            ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        )}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        그리드
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleViewChange('list')}
        className={cn(
          'h-8 px-3 rounded-lg transition-all',
          view === 'list'
            ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        )}
      >
        <List className="h-4 w-4 mr-2" />
        리스트
      </Button>
    </div>
  );
}