'use client';

import { useEffect, useState } from 'react';

export function DebugStyles() {
  const [debugInfo, setDebugInfo] = useState<{
    bodyComputedStyle?: CSSStyleDeclaration;
    floatingButton?: HTMLElement | null;
    scrollY?: number;
    bodyPaddingTop?: string;
    announcementHeight?: string;
    viewportHeight?: number;
    bodyOverflow?: string;
    htmlOverflow?: string;
    containerOverflow?: string[];
  }>({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const body = document.body;
      const html = document.documentElement;
      const floatingButton = document.querySelector('.cal-com-floating-force') as HTMLElement;
      const containers = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.overflow === 'hidden' || style.position === 'fixed' || style.position === 'sticky';
      });

      setDebugInfo({
        bodyComputedStyle: window.getComputedStyle(body),
        floatingButton,
        scrollY: window.scrollY,
        bodyPaddingTop: window.getComputedStyle(body).paddingTop,
        announcementHeight: getComputedStyle(html).getPropertyValue('--announcement-height'),
        viewportHeight: window.innerHeight,
        bodyOverflow: window.getComputedStyle(body).overflow,
        htmlOverflow: window.getComputedStyle(html).overflow,
        containerOverflow: containers.slice(0, 10).map(el => {
          const style = window.getComputedStyle(el);
          return `${el.tagName}.${el.className} - overflow: ${style.overflow}, position: ${style.position}`;
        })
      });
    };

    updateDebugInfo();
    window.addEventListener('scroll', updateDebugInfo);
    window.addEventListener('resize', updateDebugInfo);

    // Check for the floating button periodically
    const interval = setInterval(updateDebugInfo, 1000);

    return () => {
      window.removeEventListener('scroll', updateDebugInfo);
      window.removeEventListener('resize', updateDebugInfo);
      clearInterval(interval);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-24 left-4 z-[99999] bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm max-h-96 overflow-auto">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <div className="space-y-1">
        <p>Scroll Y: {debugInfo.scrollY}px</p>
        <p>Viewport Height: {debugInfo.viewportHeight}px</p>
        <p>Body Padding Top: {debugInfo.bodyPaddingTop}</p>
        <p>Announcement Height: {debugInfo.announcementHeight}</p>
        <p>Body Overflow: {debugInfo.bodyOverflow}</p>
        <p>HTML Overflow: {debugInfo.htmlOverflow}</p>
        <p>Floating Button Found: {debugInfo.floatingButton ? 'Yes' : 'No'}</p>
        {debugInfo.floatingButton && (
          <>
            <p>Button Position: {window.getComputedStyle(debugInfo.floatingButton).position}</p>
            <p>Button Bottom: {window.getComputedStyle(debugInfo.floatingButton).bottom}</p>
            <p>Button Right: {window.getComputedStyle(debugInfo.floatingButton).right}</p>
            <p>Button Z-Index: {window.getComputedStyle(debugInfo.floatingButton).zIndex}</p>
            <p>Button Display: {window.getComputedStyle(debugInfo.floatingButton).display}</p>
            <p>Button Visibility: {window.getComputedStyle(debugInfo.floatingButton).visibility}</p>
          </>
        )}
        <div className="mt-2">
          <p className="font-bold">Problematic Containers:</p>
          {debugInfo.containerOverflow?.map((info, i) => (
            <p key={i} className="text-xs">{info}</p>
          ))}
        </div>
      </div>
    </div>
  );
}