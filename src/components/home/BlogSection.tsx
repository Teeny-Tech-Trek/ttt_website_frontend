import { useState, type ReactNode, type SVGProps } from 'react';
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
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
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

export function BlogSection({ blogPosts }: BlogSectionProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get unique categories
  const categories = [
    'All Categories',
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedPost = selectedPostId
    ? blogPosts.find((p) => p.id === selectedPostId)
    : null;

  // Blog Detail View
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
      <section className="min-h-screen bg-white">
        {/* Header with back button */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
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

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              {selectedPost.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{selectedPost.readTime}</span>
              </div>
              {selectedPost.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {selectedPost.author}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full  object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="mb-12">
            {selectedPost.content ? (
              <ArticleContent content={selectedPost.content} />
            ) : (
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {selectedPost.excerpt}
              </p>
            )}
          </div>

          {/* Share Section */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <span className="text-gray-700 font-medium">Share this article:</span>
            <div className="relative">
              <button
                onClick={() => setShareOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {shareOpen && (
                <>
                  {/* click-away overlay */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShareOpen(false)}
                  />
                  <div className="absolute bottom-full right-0 mb-3 w-60 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-2">
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
                    <button
                      onClick={() => shareTo('linkedin')}
                      className={shareMenuItem}
                    >
                      <LinkedInIcon className="w-5 h-5" style={{ color: '#0A66C2' }} />
                      <span className="font-medium text-gray-800">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => shareTo('facebook')}
                      className={shareMenuItem}
                    >
                      <FacebookIcon className="w-5 h-5" style={{ color: '#1877F2' }} />
                      <span className="font-medium text-gray-800">Facebook</span>
                    </button>
                    <button
                      onClick={() => shareTo('whatsapp')}
                      className={shareMenuItem}
                    >
                      <WhatsAppIcon className="w-5 h-5" style={{ color: '#25D366' }} />
                      <span className="font-medium text-gray-800">WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </article>
      </section>
    );
  }

  // Blog Listing View
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insights & Innovation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest trends in AI, automation, and technology solutions for
            small teams
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium shadow-sm cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative  overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}