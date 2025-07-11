import type { FAQAccordionProps } from "@/types/faq";
"use client"

import { Building, Factory, Hammer, Cpu } from "lucide-react"

const iconMap = {
  Building,
  Factory,
  Hammer,
  Cpu
}

/**
 * 업종별 맞춤 FAQ 그리드 섹션 (반응형, 모바일 최적화)
 * - 각 카테고리별 대표 아이콘+타이틀, FAQ 카드 그리드
 * - 아코디언/토글 없이 직관적 카드 UI, 반응형/다크모드/접근성
 */
export default function FAQGridSection({ faqCategories }: FAQAccordionProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {faqCategories.map((category, categoryIndex) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap]
        return (
          <div key={categoryIndex} className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {IconComponent && <IconComponent className="h-6 w-6" />}
              </div>
              <h3 className="text-2xl font-semibold">{category.title}</h3>
            </div>
            {/* FAQ 카드 그리드 (모바일 1, md 2, lg 3열) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.faqs.map((faq) => (
                <div key={faq.id} className="card-modern p-6 rounded-xl shadow bg-white dark:bg-blue-950/60 flex flex-col gap-3">
                  <div className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{faq.question}</div>
                  <div className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
} 