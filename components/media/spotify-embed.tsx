'use client';

interface SpotifyEmbedProps {
  uri: string; // spotify:episode:ID or spotify:show:ID
  title?: string;
  height?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SpotifyEmbed({ 
  uri, 
  title,
  height = 152,
  theme = 'dark',
  className = '' 
}: SpotifyEmbedProps) {
  // Extract type and ID from Spotify URI
  const parts = uri.split(':');
  const type = parts[1]; // 'episode' or 'show'
  const id = parts[2];

  const embedUrl = `https://open.spotify.com/embed/${type}/${id}?theme=${theme === 'dark' ? '0' : '1'}`;

  return (
    <div className={`group ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>
      )}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 'none', minHeight: `${height}px` }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full"
          title={title || 'Spotify podcast'}
        />
      </div>
    </div>
  );
}