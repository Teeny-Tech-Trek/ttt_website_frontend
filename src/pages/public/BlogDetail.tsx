import { useState, useEffect, useMemo, useRef, type SVGProps } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchBlogs, getBlogById } from "../../services/blogService"; 
import { Blog } from "../../types/blog";                  
import { BlogRenderer } from "../../components/blog/BlogRenderer";
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Link2, 
  Clock, 
  Calendar, 
  AlignLeft, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

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

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.737-.961zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

function isVideo(cidOrFilename?: string): boolean {
  if (!cidOrFilename) return false;
  return (
    cidOrFilename.endsWith(".mp4") ||
    cidOrFilename.endsWith(".webm") ||
    cidOrFilename.endsWith(".ogg")
  );
}

function NotFoundFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md border border-gray-150">
        <h3 className="text-2xl font-bold text-red-600 mb-2">Blog Not Found</h3>
        <p className="text-gray-600 mb-6">The article you are looking for does not exist or has been removed.</p>
        <a href="/blogs" className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md">
          Back to Blogs
        </a>
      </div>
    </div>
  );
}

export default function BlogSingleView() {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();

  if (!slug && !id) {
    return <NotFoundFallback />;
  }

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Refs for TOC auto-scroll
  const tocNavRef = useRef<HTMLElement>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

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

  const shareTo = (platform: 'x' | 'linkedin' | 'whatsapp') => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(blog ? blog.title : '');
    const map: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(map[platform], '_blank', 'noopener,noreferrer');
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch blog data
  useEffect(() => {
    let isMounted = true;

    async function fetchBlog() {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken") || undefined;
        
        if (id) {
          const result = await getBlogById(id, token);
          if (isMounted) {
            setBlog(result);
          }
        } else if (slug) {
          const results = await searchBlogs({ field: "slug", value: slug }, token);
          if (isMounted && results.length > 0) {
            setBlog(results[0]);
          } else if (isMounted) {
            setBlog(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [slug, id]);

  // Extract headings from blog content for Table of Contents
  const headings = useMemo(() => {
    if (!blog?.content || !Array.isArray(blog.content)) return [];
    return blog.content
      .filter((b: any) => b.type === 'heading' || b.type === 'subheading')
      .map((b: any, index: number) => {
        const textClean = (b.text || '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
        const headingId = b.id || (textClean ? textClean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `heading-${index}`);
        return {
          id: headingId,
          text: textClean,
          level: b.level || (b.type === 'subheading' ? 3 : 2)
        };
      });
  }, [blog]);

  // ScrollSpy: observe which heading is currently in viewport in real-time
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScrollSpy = () => {
      const topOffset = 180;
      const elements = headings
        .map((h) => ({ id: h.id, el: document.getElementById(h.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) return;

      let currentActive = elements[0].id;
      for (const item of elements) {
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= topOffset) {
          currentActive = item.id;
        } else {
          break;
        }
      }

      setActiveHeadingId(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [headings]);

  // Auto-scroll TOC nav to keep active item visible
  useEffect(() => {
    if (!activeHeadingId || !tocNavRef.current || !activeItemRef.current) return;
    const nav = tocNavRef.current;
    const item = activeItemRef.current;
    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    // Scroll item into view within the nav container with smooth animation
    if (itemRect.top < navRect.top + 20 || itemRect.bottom > navRect.bottom - 20) {
      nav.scrollTo({
        top: nav.scrollTop + (itemRect.top - navRect.top) - navRect.height / 2 + itemRect.height / 2,
        behavior: 'smooth'
      });
    }
  }, [activeHeadingId]);

  const scrollToHeading = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveHeadingId(targetId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center font-sans"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return <NotFoundFallback />;
  }

  return (
    <section 
      className="min-h-screen bg-[#f8fafc] relative font-sans overflow-x-clip pt-16 sm:pt-20"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* 1. Global Reading Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50">
        <div
          className="h-full bg-blue-900 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Clean Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />

      {/* 3. Sub-Navigation Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate('/blogs')}
            className="group flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Blogs</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block font-medium text-slate-400 text-xs sm:text-sm max-w-sm truncate">
              {blog.title}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-xs sm:text-sm font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-900" />
              <span>{blog.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OPTION 1: 3-COLUMN EDITORIAL LAYOUT */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-8 lg:py-10 flex justify-center items-start gap-6 xl:gap-10">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Sticky Floating Quick Action Pill               */}
        {/* ============================================================ */}
        <aside className="hidden xl:flex sticky top-28 flex-col items-center gap-3 w-14 shrink-0">
          <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center gap-3 w-full">
            
            {/* Back button */}
            <button
              onClick={() => navigate('/blogs')}
              title="Back to Blogs"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-blue-900 hover:bg-slate-50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-6 h-px bg-slate-200" />

            {/* Reading Progress Percentage */}
            <div className="flex flex-col items-center justify-center py-1">
              <span className="text-[11px] font-bold text-blue-900 tabular-nums">
                {Math.round(scrollProgress)}%
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                read
              </span>
            </div>

            <div className="w-6 h-px bg-slate-200" />

            {/* Share on X */}
            <button
              onClick={() => shareTo('x')}
              title="Share on X"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-50 transition-all"
            >
              <XBrandIcon className="w-4 h-4" />
            </button>

            {/* Share on LinkedIn */}
            <button
              onClick={() => shareTo('linkedin')}
              title="Share on LinkedIn"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#0A66C2] hover:bg-blue-50 transition-all"
            >
              <LinkedInIcon className="w-4 h-4" />
            </button>

            {/* Share on WhatsApp */}
            <button
              onClick={() => shareTo('whatsapp')}
              title="Share on WhatsApp"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#25D366] hover:bg-green-50 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopy}
              title="Copy Article Link"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-blue-900 hover:bg-slate-50 transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Link2 className="w-4 h-4" />
              )}
              {copied && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-md whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>

            {/* Scroll to Top */}
            {scrollProgress > 25 && (
              <>
                <div className="w-6 h-px bg-slate-200" />
                <button
                  onClick={scrollToTop}
                  title="Scroll to Top"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-900 hover:bg-slate-50 transition-all"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </aside>

        {/* ============================================================ */}
        {/* CENTER COLUMN: Main Blog Article Card (840px Wide)           */}
        {/* ============================================================ */}
        <main className="w-full max-w-[840px] flex-1 flex flex-col">
          <article className="w-full bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden flex flex-col">
            
            {/* Card Header */}
            <div className="px-5 sm:px-8 xl:px-12 pt-8 sm:pt-10 pb-6 flex flex-col items-center text-center">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-100 mb-4">
                <span>{blog.category || 'AI Solutions'}</span>
              </div>

              {/* Title */}
              <h1 className="text-[#1f528c] font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.22] tracking-tight mb-6">
                {blog.title}
              </h1>

              {/* Author & Publication Byline */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 border-t border-b border-slate-100 py-3.5 w-full max-w-xl">
                {/* Author Avatar Pill */}
                <div className="flex items-center gap-2 font-medium">
                  <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {(blog.author || 'T').charAt(0)}
                  </div>
                  <span className="text-slate-800 font-semibold">{blog.author || 'Teeny Tech Trek'}</span>
                </div>

                <span className="text-slate-300">•</span>

                {/* Published Date */}
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : ''}
                  </span>
                </div>

                <span className="text-slate-300">•</span>

                {/* Read time */}
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{blog.readTime || '5 min read'}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blog.media_cid && (
              <div className="w-full bg-white flex flex-col items-center justify-center border-t border-b border-slate-100 p-4 sm:p-6">
                {isVideo(blog.media_cid) ? (
                  <video
                    src={blog.media_cid.startsWith('http') ? blog.media_cid : `https://w3s.link/ipfs/${blog.media_cid}`}
                    className="w-full max-h-[440px] rounded-xl object-contain shadow-xs"
                    controls
                    preload="none"
                  />
                ) : (
                  <img
                    src={blog.media_cid.startsWith('http') ? blog.media_cid : `https://w3s.link/ipfs/${blog.media_cid}`}
                    alt={blog.featured_alt || blog.title}
                    className="w-full max-h-[520px] object-contain rounded-xl shadow-xs"
                    loading="eager"
                  />
                )}
                {blog.featured_caption && (
                  <p className="text-center text-xs text-gray-500 mt-2 mb-2 italic px-4">
                    {blog.featured_caption}
                  </p>
                )}
              </div>
            )}

            {/* Content Body */}
            <div className="p-5 sm:p-8 xl:p-12 flex flex-col flex-1 bg-white">
              
              {/* Summary Lead */}
              {blog.summary && (
                <div className="mb-8 p-5 bg-slate-50 border-l-4 border-blue-900 rounded-r-xl">
                  <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed">
                    "{blog.summary}"
                  </p>
                </div>
              )}

              {/* Article Content */}
              <div className="text-gray-800 text-base sm:text-lg leading-relaxed flex-1 space-y-4">
                {Array.isArray(blog.content) ? (
                  <BlogRenderer blocks={blog.content} />
                ) : (
                  <div className="whitespace-pre-wrap">{String(blog.content || '')}</div>
                )}
              </div>
            </div>

            {/* Bottom Accent Bar */}
            <div className="h-1.5 w-full bg-[#1f528c]" />
          </article>

          {/* Bottom Share & Feedback Bar */}
          <div className="w-full mt-6 p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-slate-900 font-bold text-sm sm:text-base">Share this article:</h4>
              <p className="text-slate-500 text-xs">Spread the insight with your team or network.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => shareTo('x')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-black transition-colors"
                title="Share on X"
              >
                <XBrandIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => shareTo('linkedin')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-blue-50 text-slate-700 hover:text-[#0A66C2] transition-colors"
                title="Share on LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => shareTo('whatsapp')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-green-50 text-slate-700 hover:text-[#25D366] transition-colors"
                title="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </main>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Sticky Table of Contents & Professional CTA     */}
        {/* ============================================================ */}
        <aside className="hidden lg:block w-64 xl:w-80 shrink-0 sticky top-28 self-start space-y-4">
          
          {/* Widget 1: Interactive Table of Contents */}
          {headings.length > 0 && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-md">
              
              {/* Header with Reading Progress */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <AlignLeft className="w-4 h-4 text-blue-900" />
                  <span>On this page</span>
                </div>
                <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/80 tabular-nums">
                  {Math.round(scrollProgress)}% read
                </span>
              </div>

              {/* Progress mini-bar */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-3.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-900 to-blue-600 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {/* Headings Nav List — scrolls independently, synced to active heading */}
              <nav ref={tocNavRef} className="space-y-1 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {headings.map((h, i) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <button
                      key={i}
                      ref={isActive ? activeItemRef : null}
                      onClick={() => scrollToHeading(h.id)}
                      className={`w-full text-left text-xs sm:text-[13px] py-2 px-2.5 rounded-lg transition-all duration-200 leading-snug flex items-start gap-2.5 group ${
                        h.level === 3 ? 'pl-5 font-normal' : 'font-medium'
                      } ${
                        isActive
                          ? 'bg-blue-50/90 text-blue-900 font-semibold border-l-[3px] border-blue-900 shadow-xs'
                          : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                      }`}
                    >
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0 mt-1.5 animate-pulse" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all duration-200" />
                      )}
                      <span className="line-clamp-2">{h.text}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Widget 2: Professional Clean TTT CTA Card */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all duration-300">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-100 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-900" />
              <span>AI Implementation</span>
            </div>

            <h4 className="text-base font-bold text-slate-900 leading-snug mb-1.5">
              Deploy AI in Your Business
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We build intelligent AI agents, custom chatbots, and automated workflows tailored for your team.
            </p>

            <button
              onClick={() => navigate('/book-consultation')}
              className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
            >
              <span>Book Free Consultation</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Widget 3: Medium Source Attribution (if applicable) */}
          {(blog as any)?.medium_url && (
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>Originally on Medium</span>
              <a
                href={(blog as any).medium_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-900 font-semibold hover:underline"
              >
                <span>Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </aside>
      </div>
    </section>
  );
}
