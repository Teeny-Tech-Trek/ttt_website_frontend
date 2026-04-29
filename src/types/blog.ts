// src/types/blog.ts

export interface Blog {
    id: string;
    author_id: string;
    title?: string;
    slug?: string;
    summary?: string;
    content?: string;
    media_cid?: string;
    status: 'draft' | 'published' | 'archived';
    views_count: number;
    published_at?: string;
    deleted_at?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface BlogInput {
    author_id: string;
    title?: string;
    slug?: string;
    summary?: string;
    content?: string;
    media_cid?: string;
    status?: 'draft' | 'published' | 'archived';
    published_at: string
  }
  