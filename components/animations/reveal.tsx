'use client';

import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

/**
 * Fade in from bottom animation variant
 * Slash.financial-inspired premium reveal animation
 */
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1], // Custom easing for premium feel
  },
  viewport: {
    once: true, // Animate only once
    margin: '-50px', // Trigger 50px before entering viewport
  },
};

/**
 * Stagger container for child animations
 * Creates cascading reveal effect
 */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  transition: {
    staggerChildren: 0.1, // 100ms delay between children
  },
  viewport: {
    once: true,
    margin: '-50px',
  },
};

/**
 * Scale in animation for cards/buttons
 */
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  whileInView: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  },
  viewport: {
    once: true,
    margin: '-50px',
  },
};

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  children: React.ReactNode;
}

/**
 * Reusable reveal animation component
 *
 * Usage:
 * ```tsx
 * <Reveal>
 *   <YourContent />
 * </Reveal>
 * ```
 */
export function Reveal({
  delay = 0,
  children,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container component
 * Animates children with cascading effect
 *
 * Usage:
 * ```tsx
 * <StaggerContainer>
 *   <Reveal>Item 1</Reveal>
 *   <Reveal>Item 2</Reveal>
 *   <Reveal>Item 3</Reveal>
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: HTMLMotionProps<'div'> & { staggerDelay?: number }) {
  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      transition={{ staggerChildren: staggerDelay }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
