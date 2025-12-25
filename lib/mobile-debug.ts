/**
 * Mobile Debugging Utilities for FamilyOffice
 * Enhanced mobile development experience
 */

// QR Code Generator for mobile testing
export const generateMobileTestURL = () => {
  const localIP = getLocalIPAddress();
  const port = process.env.PORT || 3000;
  return `http://${localIP}:${port}`;
};

// Network IP detection for mobile access
const getLocalIPAddress = (): string => {
  const nets = require('os').networkInterfaces();
  const results: string[] = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        results.push(net.address);
      }
    }
  }

  return results[0] || 'localhost';
};

// Mobile-specific console logging
export const mobileDebugLog = (message: string, data?: any) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    console.log(`📱 Mobile Debug: ${message}`, data);

    // Visual debug overlay for mobile
    const debugElement = document.createElement('div');
    debugElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px;
      font-size: 12px;
      z-index: 9999;
      max-width: 300px;
      word-wrap: break-word;
    `;
    debugElement.textContent = `${message} ${JSON.stringify(data || '')}`;

    document.body.appendChild(debugElement);
    setTimeout(() => debugElement.remove(), 3000);
  }
};

// Touch gesture debugging
export const touchDebugger = {
  logTouch: (event: TouchEvent) => {
    const touch = event.touches[0];
    mobileDebugLog('Touch Event', {
      type: event.type,
      x: touch?.clientX,
      y: touch?.clientY,
      target: (event.target as Element)?.tagName,
    });
  },

  logSwipe: (direction: 'left' | 'right' | 'up' | 'down', element: string) => {
    mobileDebugLog('Swipe Detected', { direction, element });
  },
};

// Viewport debugging
export const viewportDebugger = () => {
  if (typeof window !== 'undefined') {
    const info = {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: screen.orientation?.type || 'unknown',
      userAgent: navigator.userAgent.substring(0, 50) + '...',
    };

    mobileDebugLog('Viewport Info', info);
    return info;
  }
  return null;
};

// Korean mobile keyboard compatibility
export const koreanInputDebugger = {
  logInputMethod: (element: HTMLInputElement) => {
    const inputType = element.type;
    const inputMode = element.inputMode;
    const lang = element.lang || document.documentElement.lang;

    mobileDebugLog('Korean Input Debug', {
      inputType,
      inputMode,
      lang,
      hasKoreanCharacters: /[가-힣]/.test(element.value),
      composing: element.dataset.composing === 'true',
    });
  },
};

// Export utilities for development
export const mobileDevTools = {
  generateMobileTestURL,
  mobileDebugLog,
  touchDebugger,
  viewportDebugger,
  koreanInputDebugger,
};
