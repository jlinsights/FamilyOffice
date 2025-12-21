import type { FAQItem } from '@/components/faq/service-faq';

/**
 * Generate FAQPage schema.org structured data
 * Helps with Google Featured Snippets and AI search engines
 */
export function generateFAQSchema(faqs: FAQItem[], url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    })),
    ...(url && { 'url': url })
  };
}

/**
 * FAQ Schema component for easy integration
 */
export function FAQSchema({ faqs, url }: { faqs: FAQItem[]; url?: string }) {
  const schema = generateFAQSchema(faqs, url);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
