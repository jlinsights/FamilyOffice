'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogPostTocProps {
  content: string;
  className?: string;
}

export function BlogPostToc({ content, className }: BlogPostTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from content
  useEffect(() => {
    const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      items.push({
        id: match[2] || '',
        text: (match[3] || '').replace(/<[^>]*>/g, ''), // Remove HTML tags
        level: parseInt(match[1] || '2'),
      });
    }

    setTocItems(items);
  }, [content]);

  // Track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <nav className={cn('space-y-2', className)}>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
        목차
      </h3>
      <ul className="space-y-1 text-sm">
        {tocItems.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                'block w-full text-left py-1.5 px-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                activeId === item.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}