'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface PremiumFAQProps {
  items: FAQItem[];
  className?: string;
}

export function PremiumFAQ({ items, className }: PremiumFAQProps) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start gap-4 w-full">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white transition-colors duration-300">
                    Q
                  </div>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-lg leading-relaxed pt-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="flex items-start gap-4 pl-12">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  {item.answer}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
