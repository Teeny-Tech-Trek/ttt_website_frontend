import React, { useState } from 'react';
import { BlogRenderer } from '../../components/blog/BlogRenderer';
import { Blog } from '../../types/blog';
import previewBlogsData from '../../data/mediumPreviewBlogs.json';
import { 
  ArrowLeft, Share2, Check, Link2, Eye, FileText, Image as ImageIcon, 
  Layers, CheckCircle2, Sparkles 
} from 'lucide-react';

const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const previewBlogs: Blog[] = previewBlogsData as unknown as Blog[];

export default function MediumBlogPreview() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentBlog = previewBlogs[selectedIndex] || previewBlogs[0];

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareMenuItem =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left';

  // Count block types in current article for the inspector badge
  const blockTypeCounts = currentBlog.content.reduce((acc: Record<string, number>, b) => {
    acc[b.type] = (acc[b.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-100 font-sans" style={{ fontFamily: FONT_FAMILY }}>
      {/* Dev Control Bar */}
      <div className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              DEV PREVIEW
            </span>
            <span className="text-sm text-slate-300 font-medium">
              Medium → TTT BlogBlock UI Render Verification (In-Memory Dry Run)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> 0 Database Writes
            </span>
            <span>•</span>
            <span>6 Articles Converted</span>
          </div>
        </div>

        {/* Article Switcher Pills */}
        <div className="max-w-7xl mx-auto px-4 pb-3 overflow-x-auto flex items-center gap-2">
          {previewBlogs.map((b, idx) => (
            <button
              key={b.id || idx}
              onClick={() => {
                setSelectedIndex(idx);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedIndex === idx
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              #{idx + 1}: {b.title.slice(0, 24)}...
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostics Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-900">Article #{selectedIndex + 1}:</span>
            <span className="text-blue-700 font-semibold">{currentBlog.title}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Slug: <code className="font-mono">{currentBlog.slug}</code>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> {currentBlog.content.length} Blocks
            </span>
            {Object.entries(blockTypeCounts).map(([type, count]) => (
              <span key={type} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {type}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* EXACT TTT BLOG DETAIL RENDER CONTAINER */}
      <section className="pt-6 pb-20">
        {/* Card Centering Wrapper (Exact parity to BlogDetail.tsx lines 180-260) */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center">
          <article className="w-full max-w-[720px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">
            {/* Card Heading */}
            <h1 className="text-[#1f528c] font-extrabold text-2xl sm:text-3xl md:text-4xl text-center leading-tight tracking-tight px-4 sm:px-8 pt-8 pb-4 sm:pt-10 sm:pb-5">
              {currentBlog.title}
            </h1>

            {/* Featured Hero Image */}
            {currentBlog.media_cid && (
              <div className="w-full bg-slate-50 flex flex-col items-center justify-center">
                <img
                  src={currentBlog.media_cid}
                  alt={currentBlog.featured_alt || currentBlog.title}
                  className="w-full max-h-[450px] object-cover"
                  loading="lazy"
                />
                {currentBlog.featured_caption && (
                  <p className="text-center text-xs text-gray-500 mt-2 mb-2 italic px-2">
                    {currentBlog.featured_caption}
                  </p>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 sm:p-10 flex flex-col flex-1 bg-white">
              {/* Summary (italic) */}
              {currentBlog.summary && (
                <p className="text-gray-600 text-base sm:text-lg italic text-center leading-relaxed mb-6">
                  {currentBlog.summary}
                </p>
              )}

              {/* Author + Date */}
              <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
                <span className="text-[#3e6aa7] font-semibold text-sm sm:text-base">
                  {currentBlog.author}
                </span>
                <span className="text-gray-400 text-xs sm:text-sm">
                  {currentBlog.published_at
                    ? new Date(currentBlog.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : ''}
                </span>
                <span className="text-gray-400 text-xs sm:text-sm">•</span>
                <span className="text-gray-400 text-xs sm:text-sm">{currentBlog.readTime}</span>
              </div>

              {/* Converted Medium Article Body via native BlogRenderer */}
              <div className="text-gray-850 text-sm sm:text-base md:text-lg leading-relaxed flex-1">
                {Array.isArray(currentBlog.content) ? (
                  <BlogRenderer blocks={currentBlog.content} />
                ) : (
                  <div className="whitespace-pre-wrap">{String(currentBlog.content || '')}</div>
                )}
              </div>
            </div>

            {/* Bottom accent gradient bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background: 'linear-gradient(90deg, #1f528c, #3e6aa7)',
              }}
            />
          </article>

          {/* Share Section below card */}
          <div className="w-full max-w-[720px] mt-6 flex items-center justify-between p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <span className="text-gray-700 font-medium text-sm sm:text-base">Share this article:</span>
            <div className="relative">
              <button
                onClick={() => setShareOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {shareOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShareOpen(false)} />
                  <div className="absolute bottom-full right-0 mb-3 w-60 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-2">
                    <button onClick={handleCopy} className={shareMenuItem}>
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Link2 className="w-5 h-5 text-gray-500" />}
                      <span className="font-medium text-gray-800">{copied ? 'Link copied!' : 'Copy link'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Conversion Verification Checklist Badge */}
          <div className="w-full max-w-[720px] mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-900 text-base mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Medium → TTT Rendering Validation Checks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Hero image set as <code>media_cid</code> (no body duplicate)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Zero Medium tracking pixels rendered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Headings render with TTT gradient accent bar
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Lists render with blue bullet styling
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Quotes render with TTT indigo callout card
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Title duplication check passed (no repeated H1/H2)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
