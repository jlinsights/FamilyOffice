'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Reusable FAQ component for service pages
 * Includes SEO-optimized markup and accessible accordion
 */
export function ServiceFAQ({ 
  faqs, 
  title = '자주 묻는 질문',
  description,
  className = ''
}: ServiceFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full mb-6 shadow-sm">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">
              FAQ
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
              <HelpCircle className="h-3 w-3 mr-1" />
              빠른 답변
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 px-6 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline group">
                  <div className="flex items-start gap-3 pr-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                        Q
                      </span>
                    </div>
                    <span className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 dark:text-slate-300 pt-2 pb-5 leading-relaxed">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                        A
                      </span>
                    </div>
                    <div className="flex-1">
                      {faq.answer}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            추가 문의사항이 있으신가요?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200"
          >
            전문가 상담 신청
          </a>
        </div>
      </div>
    </section>
  );
}
