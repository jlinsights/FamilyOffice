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

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버와 클라이언트 모두에서 동일한 구조를 유지
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
      }}
      {...props}
    >
      {mounted && <Icon className="w-full h-full" />}
    </div>
  );
}
