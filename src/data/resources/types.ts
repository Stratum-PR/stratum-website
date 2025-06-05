export interface ResourceContent {
  title: string;
  summary: string;
  description: string;
  type: 'guide' | 'template' | 'whitepaper' | 'toolkit' | 'checklist' | 'worksheet';
  downloadUrl?: string;
  externalUrl?: string;
}

export interface Resource {
  slug: string;
  id: number;
  metadata: {
    title: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    keywords: {
      en: string;
      es: string;
    };
  };
  content: {
    en: ResourceContent;
    es: ResourceContent;
  };
  tags: string[];
  icon: string;
  image: string;
  featured: boolean;
  publishDate: string;
}
