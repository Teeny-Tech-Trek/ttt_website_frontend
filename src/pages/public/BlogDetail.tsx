import { useState, useEffect, type ReactNode, type SVGProps } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchBlogs, getBlogById } from "../../services/blogService"; 
import { Blog } from "../../types/blog";                  
import { BlogRenderer } from "../../components/blog/BlogRenderer";
import { ArrowLeft, Share2, Check, Link2 } from 'lucide-react';

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
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

// Utility: check if a filename or CID looks like a video
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
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    const text = encodeURIComponent(blog ? blog.title : '');
    const map: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    window.open(map[platform], '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const shareMenuItem =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left';

  useEffect(() => {
    let isMounted = true;

    async function fetchBlog() {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken") || undefined;
        
        if (id) {
          // Preview mode: fetch by blog ID
          const result = await getBlogById(id, token);
          if (isMounted) {
            setBlog(result);
          }
        } else if (slug) {
          // Public mode: search by slug
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

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontFamily: FONT_FAMILY,
          color: "#333",
        }}
      >
        Loading…
      </div>
    );
  }

  // Not found or error state
  if (error || !blog) {
    return <NotFoundFallback />;
  }

  return (
    <section className="min-h-screen bg-slate-50 pt-16 sm:pt-20 font-sans" style={{ fontFamily: FONT_FAMILY }}>
      {/* Header with back button — offset below the fixed navbar so it is
          never clipped/partially hidden behind it. */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
        </div>
      </div>

      {/* Card Centering Wrapper */}
      <div className="max-w-7xl mx-auto px-2 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
        <article className="w-full max-w-[720px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">
          {/* Card Heading */}
          <h1 className="text-[#1f528c] font-extrabold text-2xl sm:text-3xl md:text-4xl text-center leading-tight tracking-tight px-4 sm:px-8 pt-8 pb-4 sm:pt-10 sm:pb-5">
            {blog.title}
          </h1>

          {/* Featured Image */}
          {blog.media_cid && (
            <div className="w-full bg-slate-50 flex flex-col items-center justify-center">
              {isVideo(blog.media_cid) ? (
                <video
                  src={blog.media_cid.startsWith('http') ? blog.media_cid : `https://w3s.link/ipfs/${blog.media_cid}`}
                  className="w-full h-[300px] object-cover"
                  controls
                  preload="none"
                />
              ) : (
                <img
                  src={blog.media_cid.startsWith('http') ? blog.media_cid : `https://w3s.link/ipfs/${blog.media_cid}`}
                  alt={blog.featured_alt || blog.title}
                  className="w-full max-h-[450px] object-cover"
                  loading="lazy"
                />
              )}
              {blog.featured_caption && (
                <p className="text-center text-xs text-gray-500 mt-2 mb-2 italic px-2">
                  {blog.featured_caption}
                </p>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 sm:p-10 flex flex-col flex-1 bg-white">
            {/* Summary (italic) */}
            {blog.summary && (
              <p className="text-gray-600 text-base sm:text-lg italic text-center leading-relaxed mb-6">
                {blog.summary}
              </p>
            )}

            {/* Author + Date */}
            <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
              <span className="text-[#3e6aa7] font-semibold text-sm sm:text-base">
                {blog.author}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm">
                {blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  : ''}
              </span>
            </div>

            {/* Article Content */}
            <div className="text-gray-850 text-sm sm:text-base md:text-lg leading-relaxed flex-1">
              {Array.isArray(blog.content) ? (
                <BlogRenderer blocks={blog.content} />
              ) : (
                <div className="whitespace-pre-wrap">{String(blog.content || '')}</div>
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

        {/* Share Section (centered, below the card) */}
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
      </div>
    </section>
  );
}
