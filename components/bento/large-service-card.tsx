'use client';

import { ArrowRight } from 'lucide-react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

import type { BentoService } from '@/constants/bento-services';

interface LargeServiceCardProps {
  service: BentoService;
  className?: string;
}

/**
 * Large featured service card (2×2 grid space)
 * Premium design with extended content
 */
export function LargeServiceCard({
  service,
  className = '',
}: LargeServiceCardProps) {
  // Gradient colors based on service type
  const gradientMap: Record<string, string> = {
    'asset-management': 'from-blue-500/10 via-indigo-500/5 to-transparent',
    'business-succession': 'from-purple-500/10 via-pink-500/5 to-transparent',
  };

  const gradient = gradientMap[service.id] || 'from-blue-500/10 to-transparent';

  return (
    <Link href={service.href} className={`block group ${className}`}>
      <div className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 border-glow hover:-translate-y-1">
        {/* Background gradient - always visible, enhanced on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-100 dark:opacity-80`}
        ></div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          {service.badge && (
            <Badge
              variant="secondary"
              className="mb-6 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 font-semibold"
            >
              {service.badge}
            </Badge>
          )}

          {/* Icon */}
          <div className="h-16 w-16 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
            <service.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
          </div>

          {/* Title & Tagline */}
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-tight">
            {service.title}
          </h3>

          {service.tagline && (
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {service.tagline}
            </p>
          )}

          {/* Description */}
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-3.5 mb-8">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start text-sm text-slate-600 dark:text-slate-400"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-blue-600 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"></div>
                <span className="group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Stats (if available) */}
          {service.stats && (
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/50 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-slate-700/50">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
                {service.stats.value}
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {service.stats.label}
              </div>
            </div>
          )}

          {/* USPs (Unique Selling Propositions) */}
          {service.usps && service.usps.length > 0 && (
            <div className="mb-6 space-y-2.5">
              {service.usps.map((usp, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-sm font-semibold"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2.5 flex-shrink-0"></div>
                  <span className="text-green-700 dark:text-green-400">
                    {usp}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Proof Metric */}
          {service.proof && (
            <div className="flex items-center gap-3 mb-8 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {service.proof.metric}
              </div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
                {service.proof.label}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center text-base font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            자세히 보기{' '}
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
