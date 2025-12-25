'use client';

import { ArrowRight } from 'lucide-react';

import Link from 'next/link';

import type { BentoService } from '@/constants/bento-services';

interface RegularServiceCardProps {
  service: BentoService;
  className?: string;
}

/**
 * Regular service card (1×1 grid space)
 * Compact design, similar to existing cards
 */
export function RegularServiceCard({
  service,
  className = '',
}: RegularServiceCardProps) {
  return (
    <Link href={service.href} className={`block group ${className}`}>
      <div className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border hover:-translate-y-2">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
            <service.icon className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Features (max 3) */}
          <div className="space-y-2.5 mb-6">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center text-sm text-slate-600 dark:text-slate-400"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-2.5 flex-shrink-0 group-hover:bg-blue-500 transition-colors duration-300"></div>
                <span className="group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            자세히 보기 <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
