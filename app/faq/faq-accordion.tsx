import type { FAQAccordionProps } from "@/types/faq";
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Building, Factory, Hammer, Cpu } from "lucide-react"

const iconMap = {
  Building,
  Factory,
  Hammer,
  Cpu
}

/**
 * 업종별 맞춤 FAQ 2열 그리드+아코디언 섹션
 * - 각 카테고리별 대표 아이콘+타이틀, FAQ 2열 그리드
 * - 각 FAQ는 카드형+아코디언(질문 클릭 시 답변 펼침/접힘)
 * - 반응형/다크모드/접근성/상세 주석
 */
export default function FAQAccordion({ faqCategories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

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
            {/* FAQ 2열 그리드+아코디언 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.faqs.map((faq) => (
                <div key={faq.id} className="card-modern overflow-hidden rounded-xl shadow bg-white dark:bg-blue-950/60">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    aria-expanded={openItems[faq.id] ? "true" : "false"}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    {openItems[faq.id] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openItems[faq.id] && (
                    <div id={`faq-answer-${faq.id}`} className="px-6 pb-6">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
} 