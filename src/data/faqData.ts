
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'company' | 'services' | 'basics' | 'impact';
}

export const faqCategories = [
  { id: 'company', titleKey: 'faq.categories.company' },
  { id: 'services', titleKey: 'faq.categories.services' },
  { id: 'basics', titleKey: 'faq.categories.basics' },
  { id: 'impact', titleKey: 'faq.categories.impact' }
] as const;

export const faqData: FAQItem[] = [
  // Company Questions
  {
    id: 'who-is-stratum',
    question: 'faq.company.who.question',
    answer: 'faq.company.who.answer',
    category: 'company'
  },
  {
    id: 'why-hire-stratum',
    question: 'faq.company.why.question',
    answer: 'faq.company.why.answer',
    category: 'company'
  },
  {
    id: 'team-experience',
    question: 'faq.company.experience.question',
    answer: 'faq.company.experience.answer',
    category: 'company'
  },
  
  // Services Questions
  {
    id: 'what-is-crm',
    question: 'faq.services.crm.question',
    answer: 'faq.services.crm.answer',
    category: 'services'
  },
  {
    id: 'what-is-big-data',
    question: 'faq.services.bigdata.question',
    answer: 'faq.services.bigdata.answer',
    category: 'services'
  },
  {
    id: 'what-is-ai-automation',
    question: 'faq.services.ai.question',
    answer: 'faq.services.ai.answer',
    category: 'services'
  },
  
  // Basics Questions
  {
    id: 'no-tech-background',
    question: 'faq.basics.notech.question',
    answer: 'faq.basics.notech.answer',
    category: 'basics'
  },
  {
    id: 'getting-started',
    question: 'faq.basics.started.question',
    answer: 'faq.basics.started.answer',
    category: 'basics'
  },
  {
    id: 'timeline',
    question: 'faq.basics.timeline.question',
    answer: 'faq.basics.timeline.answer',
    category: 'basics'
  },
  
  // Impact Questions
  {
    id: 'real-world-results',
    question: 'faq.impact.results.question',
    answer: 'faq.impact.results.answer',
    category: 'impact'
  },
  {
    id: 'roi-measurement',
    question: 'faq.impact.roi.question',
    answer: 'faq.impact.roi.answer',
    category: 'impact'
  }
];
