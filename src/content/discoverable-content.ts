/**
 * Crawlable copy for llms.txt and content.json.
 * One key per route path; each value is the full text of that page, split into sections.
 *
 * SECURITY: Do not put secrets or PII in PAGE_CONTENT; this data is served publicly.
 */

export interface PageSection {
  heading: string;
  body: string;
}

export interface PageContentShape {
  sections: PageSection[];
}

export const PAGE_CONTENT: Record<string, PageContentShape> = {
  '/': {
    sections: [
      { heading: 'Hero', body: 'Stratum PR - The Architecture of Better Decisions. Expert AI consulting and data analytics services in Puerto Rico. Specializing in AI business automation, CRM implementation, and predictive modeling. 100% Puerto Rico based. Free consultation available.' },
      { heading: 'Challenges', body: 'Are these challenges holding you back? Fragmented data across systems, manual work slowing you down, gut-based decision making. Valuable time is being spent on tasks that systems could manage for you.' },
      { heading: 'What We Do', body: 'Stratum PR brings together a team of data experts based in Puerto Rico, with expertise in analytics, research, systems design, and automation. We specialize in custom reporting dashboards, CRM and ERP implementation, secure data infrastructure, workflow optimization, and user-centric data environments. We free up organizational teams from managing complex systems.' },
      { heading: 'Getting Started', body: 'Complete our free Systems Assessment (coming soon), schedule a free 30-minute consultation, and receive a tailored solution plan. Reach your potential with Stratum.' },
    ],
  },
  '/about': {
    sections: [
      { heading: 'About Stratum PR', body: 'Meet the expert team behind Stratum PR. Founded in 2025 by experienced data scientists and consultants specializing in AI business automation, CRM implementation, and predictive modeling in Puerto Rico.' },
      { heading: 'Mission', body: 'We build systems that make decisions smarter and lives easier. A small but mighty team of data professionals, strategists, and technologists.' },
      { heading: 'Team', body: 'Co-founders and specialists in technology infrastructure, data and insights, and tech and build. Enterprise-level expertise at an accessible scale.' },
    ],
  },
  '/services': {
    sections: [
      { heading: 'Data Analytics Services', body: 'Comprehensive data analytics services in Puerto Rico. Strategic solutions for government, nonprofit, and enterprise clients. CRM implementation consulting, AI business automation, predictive modeling, and big data analytics.' },
      { heading: 'Capabilities', body: 'Data Analytics, CRM Implementation, AI Solutions, Business Automation, Predictive Modeling, Big Data Analytics. Transform your business with Stratum PR.' },
    ],
  },
  '/projects': {
    sections: [
      { heading: 'Projects', body: 'Explore our data analytics and AI implementation projects. Case studies and solutions delivered for businesses in Puerto Rico and the Caribbean.' },
      { heading: 'Our Work', body: 'Featured projects and client solutions across sectors. Strategic analytics and measurable results.' },
    ],
  },
  '/solutions': {
    sections: [
      { heading: 'Solutions', body: 'Data-driven solutions and AI implementation services. Strategic analytics and business automation for organizations in Puerto Rico.' },
    ],
  },
  '/resources': {
    sections: [
      { heading: 'Resources', body: 'Access our projects, news and updates, and IT readiness checklist to help your business leverage data effectively.' },
      { heading: 'Projects, Newsletter, Checklist', body: 'Data analytics resources, projects, news updates, IT checklist, Puerto Rico data analytics.' },
    ],
  },
  '/newsupdates': {
    sections: [
      { heading: 'News and Updates', body: 'Latest news, insights, and updates on data analytics, AI, and business automation from Stratum PR.' },
    ],
  },
  '/blog': {
    sections: [
      { heading: 'Blog', body: 'Blog and insights on data analytics, AI, and business automation from Stratum PR.' },
    ],
  },
  '/contact': {
    sections: [
      { heading: 'Contact', body: 'Contact Stratum PR for expert data analytics consulting in Puerto Rico. Schedule a free consultation for CRM implementation, AI business automation, and predictive modeling services. Get in touch today.' },
    ],
  },
  '/faq': {
    sections: [
      { heading: 'Frequently Asked Questions', body: 'Find answers to common questions about our data analytics services, approach, and how we can help transform your business in Puerto Rico.' },
      { heading: 'About Stratum PR, Services, Getting Started, Impact', body: 'FAQ categories: company, services, basics, and real-world impact. Book a consultation for more.' },
    ],
  },
  '/privacy': {
    sections: [
      { heading: 'Privacy Policy', body: 'Privacy policy for Stratum PR. How we collect, use, and protect your information. Cookie types: essential, analytics, marketing. Your rights and contact information.' },
    ],
  },
  '/terms': {
    sections: [
      { heading: 'Terms of Service', body: 'Terms of service for using Stratum PR website and services. Authorized use, privacy, intellectual property, and limitations of liability.' },
    ],
  },
  '/cookies': {
    sections: [
      { heading: 'Cookie Policy', body: 'Cookie policy for Stratum PR. How we use cookies and similar technologies. Essential, analytics, and marketing cookies.' },
    ],
  },
  '/unsubscribe': {
    sections: [
      { heading: 'Unsubscribe', body: 'Manage your email subscription preferences with Stratum PR.' },
    ],
  },
  '/email-preferences': {
    sections: [
      { heading: 'Email Preferences', body: 'Update your email preferences and subscription settings.' },
    ],
  },
};

/** FAQ entries for content.json and llms.txt (plain text; no secrets/PII). */
export interface FAQEntry {
  question: string;
  answer: string;
}

export const FAQ_ENTRIES: FAQEntry[] = [
  { question: 'Who is Stratum PR and what makes you different?', answer: 'Stratum PR is a data analytics and consulting firm founded in 2025, specializing in transforming complex data into strategic business advantages. What makes us different is our team\'s proven track record with large enterprises, federal programs, and government organizations. We\'re architects of better decision-making systems.' },
  { question: 'Why should I hire Stratum PR instead of a larger consulting firm?', answer: 'While larger firms often assign junior staff to your project, at Stratum PR you work directly with senior consultants and decision-makers. We provide personalized attention, faster response times, and solutions tailored specifically to your needs. Plus, we bring enterprise-level expertise at a more accessible scale and cost.' },
  { question: 'What experience does your team have?', answer: 'Our founding team brings over a decade of combined experience from leading projects at public and private organizations in Puerto Rico and the United States. We\'ve designed systems, dashboards, and automation tools that have delivered measurable results for organizations of all sizes.' },
  { question: 'What is CRM implementation and why do I need it?', answer: 'CRM (Customer Relationship Management) implementation means setting up a system to organize and track all your customer interactions, sales, and relationships in one place. Think of it as upgrading from scattered spreadsheets and emails to a unified system that helps you serve customers better, close more sales, and never lose track of important information.' },
  { question: 'What is big data analytics in simple terms?', answer: 'Big data analytics is the process of examining large amounts of information to discover patterns and insights that help you make better business decisions. We turn your data into actionable insights.' },
  { question: 'How can AI and automation actually help my business?', answer: 'AI and automation can handle repetitive tasks, analyze data faster than humans, and help you make more informed decisions. This frees up your team to focus on strategy and customer relationships while reducing errors and costs.' },
  { question: 'I don\'t have a technical background. Can you still help me?', answer: 'Absolutely! We specialize in working with non-technical business leaders. We translate complex technical concepts into clear business language and focus on outcomes that matter to you. You don\'t need to understand the technology; you just need to understand the results.' },
  { question: 'How do we get started working together?', answer: 'We begin with a free consultation to understand your business challenges and goals. Then we conduct a comprehensive assessment of your current systems and data landscape. Based on this, we design a strategic solution architecture and present you with a clear roadmap, timeline, and expected outcomes before any implementation begins.' },
  { question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope and complexity. Simple CRM implementations can be completed in 30-90 days, while comprehensive data analytics platforms may take 3-6 months. We provide detailed timelines during the planning phase.' },
  { question: 'What kind of real-world results can I expect?', answer: 'Our clients typically see measurable improvements within 90 days: 25-60% reduction in manual data work, 15-40% improvement in decision-making speed, better customer satisfaction scores, and clearer visibility into business performance.' },
  { question: 'How do you measure return on investment (ROI)?', answer: 'We establish clear success metrics before starting any project. We track these throughout implementation and provide regular reports showing your ROI. Most clients see positive returns within 6-12 months, with benefits continuing to compound over time.' },
];
