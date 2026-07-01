// src/types/blog.ts
import { BlogBlock } from '../components/blog/BlogRenderer';

export interface Blog {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  author: string;
  readTime: string;
  media_cid: string; // Featured image URL
  featured_alt: string;
  featured_caption: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  content: BlogBlock[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  views_count: number;
  published_at?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogInput {
  title: string;
  slug?: string;
  summary: string;
  category: string;
  author: string;
  readTime: string;
  media_cid: string; // Featured image URL
  featured_alt: string;
  featured_caption: string;
  status?: 'draft' | 'published' | 'archived';
  tags: string[];
  content: BlogBlock[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  published_at?: string | null;
}