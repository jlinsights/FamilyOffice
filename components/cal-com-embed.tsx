'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface CalComEmbedProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function CalComEmbed({ className, style }: CalComEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // 로딩 상태를 잠시 후 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Force dark theme for better visibility
  const calUrl = `https://cal.com/familyoffice/consulting?embed=1&theme=dark&bg=000000&text=ffffff&layout=month_view`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={style}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">
            예약 시스템을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={calUrl}
      width="100%"
      height="100%"
      style={{
        border: 'none',
        borderRadius: '8px',
        background: '#000000',
        colorScheme: 'dark',
        ...style,
      }}
      className={className}
      title="상담 예약"
      allow="camera; microphone"
    />
  );
}
