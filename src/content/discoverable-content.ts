/**
 * Crawlable copy for llms.txt and content.json.
 * One key per route path; each value is the full text of that page, split into sections.
 *
 * SECURITY: Do not put secrets or PII in PAGE_CONTENT; this data is served publicly.
 */

import { ALL_FAQ_ITEMS } from './compliance-faq';
import { COOKIE_POLICY, PRIVACY_POLICY, TERMS_OF_USE, type LegalDoc } from './legal';

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
      { heading: 'Hero', body: 'Your plant, in control. Your product, safe. Stratum PR helps food manufacturers leave paper behind and walk into every inspection with peace of mind.' },
      { heading: 'The problem', body: 'Paper logs, spreadsheets and notes nobody can find when the inspector arrives. The worry of not knowing whether everything is in order, and of everything depending on one person. Competing against companies with full IT departments just for lack of tools.' },
      { heading: 'The plan', body: 'Three steps: a free 30-minute conversation about how your plant works; we design with you and you see a working demo with your processes before deciding; you run with every record captured and ready.' },
      { heading: 'Before and after', body: 'Before: logs in notebooks and spreadsheets, days preparing each audit, losses found at month end, everything depends on one person. With Stratum PR: everything in one system and searchable in seconds, documentation ready every day, errors caught when they happen, knowledge lives in the system.' },
      { heading: 'Products', body: 'Alertas PR is a free public portal that lists, in Spanish, the FDA food recalls affecting Puerto Rico (https://alertas.stratumpr.com/). Stratum PR also offers a quality and compliance platform for food plants (records, traceability and audits in one place); demos by appointment.' },
    ],
  },
  '/about': {
    sections: [
      { heading: 'About Stratum PR', body: 'Stratum PR is a Puerto Rican data and technology company founded in 2025 by Jovaniel Rodríguez (Co-Founder, Technology Infrastructure) and Génesis Rodríguez (Co-Founder, Data Science). It helps local food manufacturers replace paper and spreadsheets with digital systems.' },
      { heading: 'Mission', body: 'We build systems that make decisions smarter and lives easier. A small but mighty team of data professionals, strategists, and technologists.' },
      { heading: 'Team', body: 'Co-founders and specialists in technology infrastructure, data and insights, and tech and build. Enterprise-level expertise at an accessible scale.' },
    ],
  },

  '/autoevaluacion': {
    sections: [
      { heading: 'Audit-readiness self-check', body: 'A free 4-step self-check for food plants covering certification, records, food safety (FDA registration, PCQI food safety plan, recall plan) and suppliers and traceability. It gives a readiness score and a to-do list with official sources.' },
      { heading: 'What we heard in our NSF I-Corps interviews', body: 'From more than 100 interviews with business owners: 81% are not ready for an audit; 73% cannot trace a lot quickly; 64% run operations on Excel or paper; 52% do not have standardized operations; 37% feel they cannot scale. Source: Stratum PR customer-discovery interviews in the NSF I-Corps program.' },
    ],
  },
  '/preguntas': {
    sections: [
      { heading: 'Food safety and compliance questions', body: 'Answers with official sources on documenting food safety records for FSMA (21 CFR 117), the FSMA 204 traceability rule, SQF, BRCGS and GFSI; what Walmart, Sam’s Club and Costco ask of suppliers; and Puerto Rico food establishment oversight. General information, not legal or regulatory advice.' },
    ],
  },
  '/contact': {
    sections: [
      { heading: 'Contact', body: 'Contact Stratum PR by email at contact@stratumpr.com or book a free 30-minute conversation, in Spanish or English, about digitizing records, inventory and traceability for your food plant.' },
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

// Legal pages: full text from legal.ts (Spanish, the official version), so crawlers read what visitors read
function legalSections(doc: LegalDoc): PageSection[] {
  return doc.sections.map((s) => ({
    heading: s.heading,
    body: [
      ...(s.bullets ?? []),
      ...(s.table ? s.table.rows.map((r) => r.join(' - ')) : []),
      ...(s.paragraphs ?? []),
    ].join(' '),
  }));
}
PAGE_CONTENT['/privacy'] = { sections: [{ heading: PRIVACY_POLICY.es.title, body: PRIVACY_POLICY.es.intro }, ...legalSections(PRIVACY_POLICY.es)] };
PAGE_CONTENT['/cookies'] = { sections: [{ heading: COOKIE_POLICY.es.title, body: COOKIE_POLICY.es.intro }, ...legalSections(COOKIE_POLICY.es)] };
PAGE_CONTENT['/terms'] = { sections: [{ heading: TERMS_OF_USE.es.title, body: TERMS_OF_USE.es.intro }, ...legalSections(TERMS_OF_USE.es)] };

/** FAQ entries for content.json and llms.txt (plain text; no secrets/PII). */
export interface FAQEntry {
  question: string;
  answer: string;
}

// The /preguntas FAQ (English first, then Spanish), so llms.txt matches what visitors read
export const FAQ_ENTRIES: FAQEntry[] = [
  ...ALL_FAQ_ITEMS.map((f) => f.en),
  ...ALL_FAQ_ITEMS.map((f) => f.es),
];
