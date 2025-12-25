'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  className?: string;
}

export function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = '16:9',
  className = '',
}: YouTubeEmbedProps) {
  const aspectRatioClasses = {
    '16:9': 'pb-[56.25%]',
    '4:3': 'pb-[75%]',
    '1:1': 'pb-[100%]',
  };

  return (
    <div className={`group ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>
      )}
      <div
        className={`relative w-full ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
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
