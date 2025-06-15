import { ReactNode } from 'react';

export interface CaseStudy {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  longDescription?: string;
  benefits?: string[];
  caseStudies?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
}