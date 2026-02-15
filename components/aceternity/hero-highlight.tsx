'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/aceternity-utils';

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'relative h-[40rem] md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center antialiased bg-white dark:bg-black overflow-hidden',
        containerClassName
      )}
    >
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:[mask-image:radial-gradient(farthest-side_at_top,black,transparent)]" />
      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
