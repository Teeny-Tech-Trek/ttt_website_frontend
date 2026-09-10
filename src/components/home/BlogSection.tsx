import { useState, useEffect, useMemo, type ReactNode, type SVGProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicBlogs } from '../../services/blogService';
import { BlogRenderer } from '../../components/blog/BlogRenderer';
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  ArrowLeft,
  Share2,
  Sparkles,
  HelpCircle,
  Check,
  Link2,
  BookOpen,
  ChevronDown,
  Star,
  Settings,
  BarChart3,
  Users,
  CheckCircle2,
  Cpu,
  Bookmark,
  Lightbulb,
} from 'lucide-react';

interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
  slug?: string;
  isDb?: boolean;
  featured_alt?: string;
  featured_caption?: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

/* ------------------------------------------------------------------ */
/*  Lightweight Markdown renderer                                      */
/*  Handles: ## / ### headings, **bold**, *italic*, `code`, tables,    */
/*  bullet + numbered lists, > blockquotes and --- rules.              */
/*  ### questions are grouped into clean Q&A cards.                    */
/* ------------------------------------------------------------------ */

type Block =
  | { type: 'h1' | 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; header: string[]; body: string[][] }
  | { type: 'hr' };

// Inline formatting: **bold**, *italic*, `code`
function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      nodes.push(
        <strong key={`${keyBase}-b-${k}`} className="font-semibold text-gray-900">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith('`')) {
      nodes.push(
        <code
          key={`${keyBase}-c-${k}`}
          className="px-1.5 py-0.5 rounded bg-gray-100 text-blue-700 text-[0.9em] font-mono"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <em key={`${keyBase}-i-${k}`} className="italic">
          {tok.slice(1, -1)}
        </em>
      );
    }
    last = regex.lastIndex;
    k++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseMarkdown(content: string): Block[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  const isUL = (s: string) => /^[-*]\s+/.test(s);
  const isOL = (s: string) => /^\d+\.\s+/.test(s);

  while (i < lines.length) {
    const t = lines[i].trim();

    if (t === '') {
      i++;
      continue;
    }
    if (t === '---' || t === '***' || t === '___') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }
    if (t.startsWith('### ')) {
      blocks.push({ type: 'h3', text: t.slice(4).trim() });
      i++;
      continue;
    }
    if (t.startsWith('## ')) {
      blocks.push({ type: 'h2', text: t.slice(3).trim() });
      i++;
      continue;
    }
    if (t.startsWith('# ')) {
      blocks.push({ type: 'h1', text: t.slice(2).trim() });
      i++;
      continue;
    }
    if (t.startsWith('>')) {
      const q: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        q.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: q.join(' ') });
      continue;
    }
    if (t.startsWith('|')) {
      const tbl: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tbl.push(lines[i].trim());
        i++;
      }
      const parsed = tbl.map((r) =>
        r
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((c) => c.trim())
      );
      let header: string[] = [];
      let body: string[][] = [];
      if (parsed.length) {
        header = parsed[0];
        let start = 1;
        if (
          parsed[1] &&
          parsed[1].every((c) => /^:?-+:?$/.test(c.replace(/\s/g, '')))
        ) {
          start = 2;
        }
        body = parsed.slice(start);
      }
      blocks.push({ type: 'table', header, body });
      continue;
    }
    if (isUL(t)) {
      const items: string[] = [];
      while (i < lines.length && isUL(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (isOL(t)) {
      const items: string[] = [];
      while (i < lines.length && isOL(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // paragraph (gather consecutive non-special lines)
    const para: string[] = [];
    while (i < lines.length) {
      const lt = lines[i].trim();
      if (
        lt === '' ||
        lt === '---' ||
        lt.startsWith('#') ||
        lt.startsWith('|') ||
        lt.startsWith('>') ||
        isUL(lt) ||
        isOL(lt)
      ) {
        break;
      }
      para.push(lt);
      i++;
    }
    blocks.push({ type: 'p', text: para.join(' ') });
  }
  return blocks;
}

// A paragraph that is one single bold sentence == the "answer" lead.
function isAnswerLead(t: string): boolean {
  const s = t.trim();
  if (!(s.startsWith('**') && s.endsWith('**') && s.length > 4)) return false;
  return s.slice(2, -2).indexOf('**') === -1;
}

function renderBlock(b: Block, key: string): ReactNode {
  switch (b.type) {
    case 'hr':
      return <hr key={key} className="border-t border-gray-200" />;

    case 'h1':
      return (
        <h1 key={key} className="text-3xl font-bold text-gray-900 mt-10 mb-4">
          {renderInline(b.text, key)}
        </h1>
      );

    case 'h2': {
      const isQ = b.text.trim().endsWith('?');
      return (
        <div key={key} className="flex items-start gap-3 mt-12 mb-5">
          {isQ ? (
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="flex-shrink-0 w-1.5 self-stretch min-h-[2rem] rounded-full bg-gradient-to-b from-blue-600 to-indigo-600" />
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {renderInline(b.text, key)}
          </h2>
        </div>
      );
    }

    case 'p':
      if (isAnswerLead(b.text)) {
        const inner = b.text.trim().slice(2, -2);
        return (
          <div
            key={key}
            className="flex gap-3 rounded-xl bg-blue-50/70 border border-blue-100 border-l-4 border-l-blue-500 p-4"
          >
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-800 font-medium leading-relaxed">
              {renderInline(inner, key)}
            </p>
          </div>
        );
      }
      return (
        <p key={key} className="text-gray-700 leading-relaxed text-[1.05rem]">
          {renderInline(b.text, key)}
        </p>
      );

    case 'quote':
      return (
        <div
          key={key}
          className="flex gap-3 rounded-xl bg-indigo-50 border-l-4 border-indigo-500 p-4"
        >
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-800 leading-relaxed">{renderInline(b.text, key)}</p>
        </div>
      );

    case 'ul':
      return (
        <ul key={key} className="space-y-2.5">
          {b.items.map((it, idx) => (
            <li key={idx} className="flex gap-3 text-gray-700 leading-relaxed">
              <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{renderInline(it, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol key={key} className="space-y-3">
          {b.items.map((it, idx) => (
            <li key={idx} className="flex gap-3 text-gray-700 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span>{renderInline(it, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div key={key} className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                {b.header.map((h, idx) => (
                  <th key={idx} className="px-4 py-3 font-semibold">
                    {renderInline(h, `${key}-h-${idx}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.body.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-4 py-3 text-gray-700 align-top border-t border-gray-100"
                    >
                      {renderInline(cell, `${key}-${rIdx}-${cIdx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

function ArticleContent({ content }: { content: string }) {
  try {
    if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
      const dbBlocks = JSON.parse(content);
      if (Array.isArray(dbBlocks)) {
        return <BlogRenderer blocks={dbBlocks} />;
      }
    }
  } catch (e) {
    // Fail-safe markdown fallback
  }

  const blocks = parseMarkdown(content);
  const out: ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const b = blocks[i];

    // Group a ### question with everything underneath it into a Q&A card.
    if (b.type === 'h3') {
      const answer: Block[] = [];
      const question = b.text;
      i++;
      while (
        i < blocks.length &&
        blocks[i].type !== 'h3' &&
        blocks[i].type !== 'h2' &&
        blocks[i].type !== 'h1' &&
        blocks[i].type !== 'hr'
      ) {
        answer.push(blocks[i]);
        i++;
      }
      out.push(
        <div
          key={`qa-${i}`}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="flex items-start gap-3 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-wider text-blue-600">
                Question
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                {question}
              </h3>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {answer.map((ab, idx) => renderBlock(ab, `qa-b-${i}-${idx}`))}
          </div>
        </div>
      );
    } else {
      out.push(renderBlock(b, `blk-${i}`));
      i++;
    }
  }

  return <div className="space-y-5">{out}</div>;
}

/* ------------------------------------------------------------------ */
/*  Brand icons for the share menu (inline SVG so they don't depend    */
/*  on a specific lucide-react version).                               */
/* ------------------------------------------------------------------ */

const XBrandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.737-.961zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

// Dynamic Icon helper for real categories
const getCategoryIcon = (categoryName: string) => {
  const cat = (categoryName || '').toLowerCase();
  if (cat.includes('ai') || cat.includes('solution') || cat.includes('insight')) return Sparkles;
  if (cat.includes('auto') || cat.includes('process') || cat.includes('workflow')) return Settings;
  if (cat.includes('trend') || cat.includes('industry') || cat.includes('market')) return BarChart3;
  if (cat.includes('customer') || cat.includes('client') || cat.includes('communit') || cat.includes('retail')) return Users;
  if (cat.includes('productiv') || cat.includes('efficiency') || cat.includes('financ')) return CheckCircle2;
  if (cat.includes('engin') || cat.includes('tech') || cat.includes('code') || cat.includes('dev') || cat.includes('manuf')) return Cpu;
  if (cat.includes('guide') || cat.includes('tip') || cat.includes('learn') || cat.includes('start') || cat.includes('medic')) return Bookmark;
  return BookOpen;
};

/* ------------------------------------------------------------------ */
/*  Dynamic Boxing Media Component                                     */
/*  Dynamically adapts aspect ratio, fit mode, and background canvas   */
/*  based on the image's natural dimensions and content type:          */
/*  - Ultra-wide illustrations (2.35+ ratio): aspect-[21/9] on white   */
/*  - Photos (<= 1.55 ratio or Unsplash): aspect-[16/9] full-bleed    */
/*  - Standard graphics with text (1.55-2.35): aspect-[16/9] contain   */
/* ------------------------------------------------------------------ */
interface DynamicBlogMediaProps {
  src: string;
  alt: string;
  isFeatured?: boolean;
}

function DynamicBlogMedia({ src, alt, isFeatured = false }: DynamicBlogMediaProps) {
  const [ratio, setRatio] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const fallback =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
  const activeSrc = error || !src ? fallback : src;

  // Pre-classification for immediate correct render without layout shift
  const isKnownPhoto = activeSrc.includes('unsplash.com') || activeSrc.includes('pexels.com');
  const isKnownUltraWide = false;

  // Dynamic classification based on loaded natural aspect ratio (fallback to pre-detection)
  const isUltraWide = ratio !== null ? ratio >= 2.35 : false;
  const isPhoto = ratio !== null ? ratio <= 1.55 : isKnownPhoto;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight > 0) {
      setRatio(naturalWidth / naturalHeight);
    }
  };

  // Case 1: Ultra-wide illustrations (ratio >= 2.35, e.g. 2.94 to 3.57)
  // Dynamic boxing: aspect-[21/9] with seamless pure-white canvas to eliminate letterbox bands
  if (isUltraWide) {
    return (
      <div
        className={`w-full ${
          isFeatured ? 'aspect-[2.2/1] rounded-2xl shadow-xs' : 'aspect-[21/9] border-b border-slate-100'
        } bg-white flex items-center justify-center relative overflow-hidden transition-all duration-300`}
      >
        <img
          src={activeSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={() => setError(true)}
          className="w-full h-full object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  // Case 2: Full-bleed photographs without text (e.g. Unsplash photos)
  // Dynamic boxing: full-bleed edge-to-edge cover to eliminate side pillarbox gaps
  if (isPhoto) {
    return (
      <div
        className={`w-full ${
          isFeatured ? 'aspect-[16/9] rounded-2xl shadow-xs' : 'aspect-[16/9] border-b border-slate-100'
        } bg-slate-100 relative overflow-hidden transition-all duration-300`}
      >
        <img
          src={activeSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={() => setError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  // Case 3: Standard infographics & graphics with embedded text (16:9 to 2:1)
  // Dynamic boxing: aspect-[16/9] with object-contain & soft ambient glow backdrop
  return (
    <div
      className={`w-full ${
        isFeatured ? 'aspect-[16/9] rounded-2xl shadow-xs' : 'aspect-[16/9] border-b border-slate-100'
      } bg-slate-50 flex items-center justify-center relative overflow-hidden transition-all duration-300`}
    >
      <img
        src={activeSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-15 pointer-events-none"
      />
      <img
        src={activeSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={() => setError(true)}
        className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
      />
    </div>
  );
}

export function BlogSection({ blogPosts: initialBlogPosts }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBlogs() {
      try {
        const dbBlogs = await getPublicBlogs();
        if (dbBlogs && dbBlogs.length > 0) {
          const mapped = dbBlogs.map((b: any) => ({
            id: b.id || b._id,
            title: b.title || '',
            excerpt: b.summary || b.excerpt || '',
            content: Array.isArray(b.content) ? JSON.stringify(b.content) : String(b.content || ''),
            category: b.category || 'AI Solutions',
            date: b.published_at 
              ? new Date(b.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : new Date(b.created_at || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }),
            readTime: b.readTime || '5 min read',
            image: b.media_cid || '',
            featured_alt: b.featured_alt || '',
            featured_caption: b.featured_caption || '',
            author: b.author || 'Admin',
            slug: b.slug,
            isDb: true
          }));
          setPosts(mapped);
        } else {
          setPosts(initialBlogPosts);
        }
      } catch (err) {
        console.error("Failed to load public blogs from database, using static fallback", err);
        setPosts(initialBlogPosts);
      }
    }
    loadBlogs();
  }, [initialBlogPosts]);

  // Unique real categories extracted directly from posts
  const realCategories = useMemo(() => {
    return Array.from(
      new Set(
        posts
          .map((p) => p.category?.trim())
          .filter((cat): cat is string => Boolean(cat && cat.length > 0))
      )
    );
  }, [posts]);

  // Real category counts computed directly from posts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      if (p.category) {
        const key = p.category.trim();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return counts;
  }, [posts]);

  // Category Chips dynamically based on real categories
  const chipCategories = useMemo(() => ['All', ...realCategories], [realCategories]);

  // Combined categories for the dropdown selector
  const categoryOptions = useMemo(() => ['All Categories', ...realCategories], [realCategories]);

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q);

    let matchesCategory = true;
    if (selectedCategory !== 'All Categories' && selectedCategory !== 'All') {
      const sel = selectedCategory.toLowerCase();
      const postCat = post.category.toLowerCase();
      if (sel === 'ai') {
        matchesCategory = postCat.includes('ai');
      } else {
        matchesCategory = postCat.includes(sel) || sel.includes(postCat);
      }
    }
    return matchesSearch && matchesCategory;
  });

  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId)
    : null;

  const handlePostClick = (post: BlogPost | { id?: number | string; slug?: string; isDb?: boolean }) => {
    if (post.slug) {
      navigate(`/blog/${post.slug}`);
      return;
    }
    if (post.id) {
      setSelectedPostId(post.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Blog Detail View (for items viewed internally)
  if (selectedPost) {
    const getShareUrl = () =>
      typeof window !== 'undefined' ? window.location.href : '';

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(getShareUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
    };

    const shareTo = (platform: 'x' | 'linkedin' | 'facebook' | 'whatsapp') => {
      const url = encodeURIComponent(getShareUrl());
      const text = encodeURIComponent(selectedPost.title);
      const map: Record<string, string> = {
        x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
      };
      window.open(map[platform], '_blank', 'noopener,noreferrer');
      setShareOpen(false);
    };

    const goBack = () => {
      setSelectedPostId(null);
      setShareOpen(false);
    };

    const shareMenuItem =
      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left';

    return (
      <section className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-16">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
          <article className="w-full max-w-[720px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">
            <h1 className="text-[#1f528c] font-extrabold text-2xl sm:text-3xl md:text-4xl text-center leading-tight tracking-tight px-4 sm:px-8 pt-8 pb-4 sm:pt-10 sm:pb-5">
              {selectedPost.title}
            </h1>

            {selectedPost.image && (
              <div className="w-full bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full max-h-[460px] object-contain rounded-xl shadow-xs"
                />
                {selectedPost.featured_caption && (
                  <p className="text-center text-xs text-gray-500 mt-2 mb-2 italic px-4">
                    {selectedPost.featured_caption}
                  </p>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{selectedPost.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <span>•</span>
                <span className="text-blue-600 font-medium">{selectedPost.category}</span>
              </div>

              <div className="text-gray-800 text-base leading-relaxed flex-1 space-y-4">
                {selectedPost.content?.startsWith('[') ? (
                  (() => {
                    try {
                      const parsed = JSON.parse(selectedPost.content);
                      return <BlogRenderer blocks={parsed} />;
                    } catch {
                      return <ArticleContent content={selectedPost.content || ''} />;
                    }
                  })()
                ) : (
                  <ArticleContent content={selectedPost.content || selectedPost.excerpt} />
                )}
              </div>
            </div>

            <div className="h-1.5 w-full bg-[#1f528c]" />
          </article>

          <div className="w-full max-w-[720px] mt-6 flex justify-end">
            <div className="relative">
              <button
                onClick={() => setShareOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-xs transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share this article</span>
              </button>

              {shareOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShareOpen(false)}
                  />
                  <div className="absolute right-0 bottom-full mb-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <button onClick={handleCopy} className={shareMenuItem}>
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Link2 className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="font-medium text-gray-800">
                        {copied ? 'Link copied!' : 'Copy link'}
                      </span>
                    </button>
                    <button onClick={() => shareTo('x')} className={shareMenuItem}>
                      <XBrandIcon className="w-5 h-5 text-gray-900" />
                      <span className="font-medium text-gray-800">Share on X</span>
                    </button>
                    <button onClick={() => shareTo('linkedin')} className={shareMenuItem}>
                      <LinkedInIcon className="w-5 h-5" style={{ color: '#0A66C2' }} />
                      <span className="font-medium text-gray-800">LinkedIn</span>
                    </button>
                    <button onClick={() => shareTo('facebook')} className={shareMenuItem}>
                      <FacebookIcon className="w-5 h-5" style={{ color: '#1877F2' }} />
                      <span className="font-medium text-gray-800">Facebook</span>
                    </button>
                    <button onClick={() => shareTo('whatsapp')} className={shareMenuItem}>
                      <WhatsAppIcon className="w-5 h-5" style={{ color: '#25D366' }} />
                      <span className="font-medium text-gray-800">WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Active category / search filtering state
  const isFiltered =
    searchQuery.trim() !== '' ||
    (selectedCategory !== 'All Categories' && selectedCategory !== 'All');

  // Real featured post is either a post marked isFeatured or the newest/first real post
  const featuredPost = posts.length > 0 ? (posts.find((p: any) => p.isFeatured) || posts[0]) : null;
  
  // All articles to show in the main grid
  const displayArticles = isFiltered
    ? filteredPosts
    : featuredPost
      ? posts.filter((p) => p.id !== featuredPost.id)
      : posts;

  return (
    <section className="min-h-screen pt-24 sm:pt-28 pb-20 bg-[#f8fafc] relative overflow-x-clip font-sans">
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-0 w-[450px] h-[450px] bg-indigo-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* 1. HERO SECTION WITH 3D FLOATING CARDS & HEADLINE        */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pt-2 sm:pt-4">
          
          {/* Left Hero Content */}
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-100/70 text-blue-700 border border-blue-200/60 mb-5 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>INSIGHTS &amp; INNOVATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4">
              Ideas Today.
              <br />
              <span className="text-[#1d4ed8]">Smarter Tomorrow.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Explore the latest trends in AI, automation, and technology solutions for modern teams.
            </p>
          </div>

          {/* Right Hero Decorative Graphic (Floating 3D cards) */}
          <div className="relative hidden lg:block w-[420px] h-[210px] select-none shrink-0">
            {/* Handwritten Script Accent */}
            <div className="absolute top-0 right-3 text-right z-10 pointer-events-none">
              <span className="font-serif italic text-2xl text-blue-300 tracking-wide block drop-shadow-xs">
                Real Ideas
              </span>
              <span className="font-serif italic text-2xl text-blue-300 tracking-wide block -mt-1.5 drop-shadow-xs">
                Real Impact
              </span>
            </div>

            {/* Curved Dotted Connecting Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 420 210"
              fill="none"
            >
              <path
                d="M 120 65 C 200 45, 230 130, 290 145"
                stroke="#93c5fd"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <path
                d="M 270 65 C 330 40, 360 100, 350 145"
                stroke="#bfdbfe"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>

            {/* Floating Card 1: Ideas */}
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_10px_25px_rgba(30,58,138,0.08)] border border-blue-50/80 -rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Lightbulb className="w-4 h-4 fill-blue-500/20" />
              </div>
              <span className="font-bold text-slate-800 text-sm tracking-tight">Ideas</span>
            </div>

            {/* Floating Card 2: Insights */}
            <div className="absolute top-16 left-32 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_14px_32px_rgba(30,58,138,0.1)] border border-blue-50/80 rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center gap-2.5 z-10">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-800 text-sm tracking-tight">Insights</span>
            </div>

            {/* Floating Card 3: Innovation */}
            <div className="absolute bottom-2 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_10px_25px_rgba(30,58,138,0.08)] border border-blue-50/80 -rotate-1 hover:rotate-0 transition-transform duration-300 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-800 text-sm tracking-tight">Innovation</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SEARCH & FILTER BAR WITH CATEGORY CHIPS               */}
        {/* ======================================================== */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400 shadow-xs text-sm transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium shadow-xs text-sm cursor-pointer pr-10 transition-all"
              >
                <option value="All Categories">All Categories</option>
                {categoryOptions
                  .filter((cat) => cat !== 'All Categories')
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Horizontal Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {chipCategories.map((chip) => {
              const isSelected =
                (chip === 'All' && (selectedCategory === 'All Categories' || selectedCategory === 'All')) ||
                selectedCategory.toLowerCase() === chip.toLowerCase();

              return (
                <button
                  key={chip}
                  onClick={() => {
                    if (chip === 'All') {
                      setSelectedCategory('All Categories');
                    } else {
                      setSelectedCategory(chip);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. HERO FEATURED ARTICLE CARD (FULL WIDTH)               */}
        {/* ======================================================== */}
        {!isFiltered && featuredPost && (
          <div className="mb-10 sm:mb-12">
            <div
              onClick={() => handlePostClick(featuredPost)}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 items-center cursor-pointer"
            >
              {/* Left Media Container (Dynamic Boxing) */}
              <div className="w-full md:w-[48%] lg:w-[50%] shrink-0">
                <DynamicBlogMedia
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  isFeatured={true}
                />
              </div>

              {/* Right Article Details */}
              <div className="flex flex-col justify-between flex-1 space-y-4 w-full">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-100/80">
                      <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                      FEATURED ARTICLE
                    </span>
                    {featuredPost.category && (
                      <span className="inline-block text-xs font-bold tracking-wider uppercase text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-[2rem] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs sm:text-sm text-slate-500">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-blue-600 group-hover:gap-2.5 transition-all text-xs sm:text-sm">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. ARTICLES GRID (FULL WIDTH, LARGE SPATIOUS CARDS)      */}
        {/* ======================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {isFiltered ? 'Matching Articles' : 'Latest Articles'}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-1">
                {isFiltered
                  ? `Showing ${displayArticles.length} article${displayArticles.length === 1 ? '' : 's'}`
                  : 'Fresh perspectives, practical advice, and real-world stories from our team and community.'}
              </p>
            </div>

            {isFiltered && (
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSearchQuery('');
                }}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline shrink-0 cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Articles Full-Width Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {displayArticles.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full cursor-pointer"
              >
                {/* Dynamic Boxing Media Container */}
                <DynamicBlogMedia
                  src={post.image}
                  alt={post.title}
                />

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {post.category && (
                      <div className="mb-3">
                        <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/90 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-blue-600 group-hover:gap-2 transition-all text-xs sm:text-sm">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results Fallback */}
          {displayArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs max-w-xl mx-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500 text-sm mb-5">
                We couldn't find any articles matching your search query or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}