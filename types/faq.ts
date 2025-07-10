export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  icon: string; // Lucide 아이콘 이름 문자열
  faqs: FAQ[];
}

export interface FAQAccordionProps {
  faqCategories: FAQCategory[];
}
