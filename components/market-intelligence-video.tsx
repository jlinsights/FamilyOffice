'use client';

import { Play } from 'lucide-react';

interface MarketIntelligenceVideoProps {
  title: string;
  url: string;
  description: string;
}

export function MarketIntelligenceVideo({ title, url, description }: MarketIntelligenceVideoProps) {
  return (
    <div>
      <div 
        className="w-full aspect-video rounded-lg overflow-hidden cursor-pointer"
        onClick={() => window.open(url, '_blank')}
      >
        <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center relative group hover:from-red-600 hover:to-red-700 transition-all duration-300">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-red-600 ml-1" />
            </div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </div>
      <div className="mt-4 p-6 bg-card rounded-lg border">
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
      </div>
    </div>
  );
}