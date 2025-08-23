'use client';

import { useEffect, useState } from 'react';

export function DebugStyles() {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    // Debug mode only in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('debug=styles')) {
      setDebug(true);
    }
  }, []);

  if (!debug) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm">
      <div className="font-bold mb-2">🔧 Style Debug Info</div>
      <div>Environment: {process.env.NODE_ENV}</div>
      <div>Tailwind Classes Test:</div>
      <div className="mt-2 space-y-1">
        <div className="bg-blue-500 text-white p-1 rounded">Blue Background</div>
        <div className="text-red-500 font-bold">Red Text</div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Flexbox + Colors</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-300">
        If you see styled boxes above, Tailwind is working.
      </div>
    </div>
  );
}