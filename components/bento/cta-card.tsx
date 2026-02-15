'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { BentoService } from '@/constants/bento-services';

interface CTACardProps {
  service: BentoService;
  className?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * CTA card for full/partial width calls-to-action
 * Minimal content, prominent button
 */
export function CTACard({
  service,
  className = '',
  variant = 'primary',
}: CTACardProps) {
  const isPrimary = variant === 'primary';

  return (
    <Link href={service.href} className={`block group ${className}`}>
      <div
        className={`
          h-full relative overflow-hidden transition-all duration-500 
          hover:shadow-xl rounded-2xl p-6 
          ${
            isPrimary
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0'
              : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800'
          }
          hover:-translate-y-1
        `}
      >
        {/* Gradient overlay for secondary */}
        {!isPrimary && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`
                h-12 w-12 rounded-xl shadow-md flex items-center justify-center 
                group-hover:scale-110 transition-transform duration-300
                ${
                  isPrimary
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
                }
              `}
            >
              <service.icon
                className={`
                  h-6 w-6 transition-colors duration-300
                  ${
                    isPrimary
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }
                `}
              />
            </div>

            {/* Text */}
            <div>
              {service.badge && (
                <Badge
                  variant="secondary"
                  className={`
                    mb-1
                    ${
                      isPrimary
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    }
                  `}
                >
                  {service.badge}
                </Badge>
              )}
              <h3
                className={`
                  text-xl font-bold mb-1
                  ${
                    isPrimary
                      ? 'text-white'
                      : 'text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300'
                  }
                  transition-colors duration-300
                `}
              >
                {service.title}
              </h3>
              <p
                className={`
                  text-sm
                  ${
                    isPrimary
                      ? 'text-white/90'
                      : 'text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                {service.description}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <service.icon
            className={`
              h-6 w-6 flex-shrink-0 
              group-hover:translate-x-2 transition-transform duration-300
              ${isPrimary ? 'text-white' : 'text-blue-600 dark:text-blue-400'}
            `}
          />
        </div>
      </div>
    </Link>
  );
}
