"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Building, Factory, Hammer, Cpu } from "lucide-react"


const iconMap = {
  Building,
  Factory,
  Hammer,
  Cpu
}

export default function FAQAccordion({ faqCategories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {faqCategories.map((category, categoryIndex) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap]
        
        return (
          <div key={categoryIndex} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {IconComponent && <IconComponent className="h-6 w-6" />}
              </div>
              <h3 className="text-2xl font-semibold">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {category.faqs.map((faq) => (
                <div key={faq.id} className="card-modern overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    {openItems[faq.id] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems[faq.id] && (
                    <div className="px-6 pb-6">
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