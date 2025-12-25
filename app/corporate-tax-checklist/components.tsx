import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

// Premium Card Component
export const PremiumCard = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Card
    className={cn(
      'border-border/50 bg-card/50 backdrop-blur-xl shadow-premium hover:shadow-premium-gold transition-all duration-300',
      className
    )}
    {...props}
  >
    {children}
  </Card>
);

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader = ({
  title,
  subtitle,
  className,
  centered = true,
}: SectionHeaderProps) => (
  <div className={cn('mb-12', centered && 'text-center', className)}>
    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-premium-navy dark:text-white bg-clip-text">
      {title}
    </h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

// Status Badge Component
export const StatusBadge = ({
  status,
}: {
  status: 'critical' | 'high' | 'normal';
}) => {
  const styles = {
    critical:
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    normal:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  };

  const labels = {
    critical: '필수',
    high: '중요',
    normal: '일반',
  };

  return (
    <Badge variant="outline" className={cn('px-2 py-0.5', styles[status])}>
      {labels[status]}
    </Badge>
  );
};
