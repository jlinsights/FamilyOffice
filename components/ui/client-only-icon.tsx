'use client';

import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClientOnlyIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  [key: string]: any;
}

export function ClientOnlyIcon({
  icon: Icon,
  className,
  size = 24,
  ...props
}: ClientOnlyIconProps) {
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // SSR 방지: 마운트되기 전에는 기본 div만 표시
  if (!mounted || !isClient) {
    return (
      <div
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'inline-block',
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  // Icon이 유효한지 확인
  if (!Icon || typeof Icon !== 'function') {
    return (
      <div
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'inline-block',
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  // 서버와 클라이언트 모두에서 동일한 구조를 유지
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
      }}
      aria-hidden="true"
      {...props}
    >
      <Icon className="w-full h-full" />
    </div>
  );
}
