'use client';

import { Play, Headphones, FileText } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export type MediaType = 'youtube' | 'spotify' | 'article';

interface MediaCardProps {
  type: MediaType;
  title: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  link: string;
  date?: Date;
  isNew?: boolean;
}

const mediaIcons = {
  youtube: Play,
  spotify: Headphones,
  article: FileText,
};

const mediaLabels = {
  youtube: '동영상',
  spotify: '팟캐스트',
  article: '아티클',
};

const mediaColors = {
  youtube: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  spotify:
    'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  article: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
};

export function MediaCard({
  type,
  title,
  description,
  duration,
  thumbnail,
  link,
  date,
  isNew = false,
}: MediaCardProps) {
  const Icon = mediaIcons[type];
  const label = mediaLabels[type];
  const colorClass = mediaColors[type];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <a
        href={link}
        target={type !== 'article' ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="block"
      >
        {thumbnail && (
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {duration && (
              <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/80 text-white rounded">
                {duration}
              </span>
            )}
          </div>
        )}

        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${colorClass} gap-1`}>
              <Icon className="w-3 h-3" />
              {label}
            </Badge>
            {isNew && (
              <Badge
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                NEW
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {date && (
            <time className="text-xs text-gray-500 dark:text-gray-500">
              {date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </CardContent>
      </a>
    </Card>
  );
}
