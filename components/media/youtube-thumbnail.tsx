'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeThumbnailProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeThumbnail({ 
  videoId, 
  title,
  className = '' 
}: YouTubeThumbnailProps) {
  const [showVideo, setShowVideo] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (showVideo) {
    return (
      <div className={`group ${className}`}>
        <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
            title={title || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`group ${className}`}>
      <div 
        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setShowVideo(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title || 'YouTube video thumbnail'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* 재생 버튼 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="h-8 w-8 text-white ml-1" fill="white" />
          </div>
        </div>
        
        {/* 제목 오버레이 */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-sm font-medium">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}