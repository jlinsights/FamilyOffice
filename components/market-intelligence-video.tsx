'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface MarketIntelligenceVideoProps {
  title: string;
  url: string;
  description: string;
  videoId?: string;
  badges?: string[];
}

export function MarketIntelligenceVideo({ 
  title, 
  url, 
  description, 
  videoId,
  badges = []
}: MarketIntelligenceVideoProps) {
  // YouTube 비디오 ID 추출
  const extractedVideoId = videoId || url.split('/').pop() || url.split('v=').pop()?.split('&')[0] || '';
  const thumbnailUrl = `https://img.youtube.com/vi/${extractedVideoId}/maxresdefault.jpg`;

  return (
    <div>
      <div 
        className="w-full aspect-video rounded-lg overflow-hidden cursor-pointer relative group"
        onClick={() => window.open(url, '_blank')}
      >
        {/* YouTube 썸네일 */}
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* 재생 버튼 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="h-8 w-8 text-white ml-1" fill="white" />
          </div>
        </div>
        
        {/* 제목 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>
      
      <div className="mt-4 p-6 bg-card rounded-lg border">
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary">{badge}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}