'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle, TrendingUp, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useAnnouncements, type Announcement } from '@/components/announcement-manager';

export function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { activeAnnouncements, dismissAnnouncement } = useAnnouncements();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Set CSS variable for announcement banner height
    if (activeAnnouncements.length > 0 && activeAnnouncements[currentIndex]) {
      document.documentElement.style.setProperty('--announcement-height', '3rem');
    } else {
      document.documentElement.style.setProperty('--announcement-height', '0px');
    }
  }, [activeAnnouncements.length, currentIndex]);

  useEffect(() => {
    // Auto-rotate announcements every 10 seconds
    if (activeAnnouncements.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
      }, 10000);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [activeAnnouncements.length]);

  const currentAnnouncement = activeAnnouncements[currentIndex];

  const handleDismiss = (id: string) => {
    dismissAnnouncement(id);
    // Reset index if we dismissed the current announcement
    if (activeAnnouncements.length > 1) {
      setCurrentIndex(0);
    }
  };

  const getTypeStyles = (type: Announcement['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-100';
      case 'success':
        return 'bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-100';
      case 'promotion':
        return 'bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-100';
      default: // info
        return 'bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-100';
    }
  };

  const getDefaultIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'success':
        return <TrendingUp className="h-5 w-5" />;
      case 'promotion':
        return <Bell className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  if (!mounted || !currentAnnouncement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
      >
        <div className={`relative ${getTypeStyles(currentAnnouncement.type)} border-b backdrop-blur-sm`}>
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                {/* Icon */}
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm">
                  {currentAnnouncement.icon || getDefaultIcon(currentAnnouncement.type)}
                </div>

                {/* Message */}
                <div className="flex-1 flex items-center gap-4 flex-wrap">
                  <p className="text-sm sm:text-base font-medium">
                    {currentAnnouncement.message}
                  </p>
                  
                  {currentAnnouncement.link && (
                    <a
                      href={currentAnnouncement.link.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold hover:underline underline-offset-4 transition-all"
                    >
                      {currentAnnouncement.link.text}
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>

                {/* Dots indicator for multiple announcements */}
                {activeAnnouncements.length > 1 && (
                  <div className="hidden sm:flex items-center gap-1">
                    {activeAnnouncements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentIndex
                            ? 'w-4 bg-current'
                            : 'bg-current/30 hover:bg-current/50'
                        }`}
                        aria-label={`Go to announcement ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDismiss(currentAnnouncement.id)}
                className="h-8 w-8 rounded-full hover:bg-background/50"
                aria-label="닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}