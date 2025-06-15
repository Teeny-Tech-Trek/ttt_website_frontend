import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchBlogs } from "../../services/blogService"; // adjust as needed
import { Blog } from "../../types/blog";                  // adjust as needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

// Utility: check if a filename or CID looks like a video
function isVideo(cidOrFilename?: string): boolean {
  if (!cidOrFilename) return false;
  // crude check for .mp4, .webm, .ogg
  return (
    cidOrFilename.endsWith(".mp4") ||
    cidOrFilename.endsWith(".webm") ||
    cidOrFilename.endsWith(".ogg")
  );
}

function NotFoundFallback() {
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        color: "#d32f2f",
        fontFamily: FONT_FAMILY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
      }}
    >
      Blog not found.
    </div>
  );
}

export default function BlogSingleView() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <NotFoundFallback />;
  }

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchBySlug() {
      try {
        setLoading(true);
        const results = await searchBlogs({ field: "slug", value: slug });
        if (isMounted && results.length > 0) {
          setBlog(results[0]);
        } else if (isMounted) {
          setBlog(null);
        }
      } catch (err) {
        console.error("Failed to fetch blog by slug:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBySlug();

    return () => {
      isMounted = false;
    };
  }, [slug]);

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

  // Blog found — render page
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "36px 8px 24px 8px",
        }}
      >
        <div
          className="blog-card"
          style={{
            width: "100%",
            maxWidth: 720,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.10)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Card Heading */}
          <h2
            style={{
              color: PRIMARY,
              fontFamily: FONT_FAMILY,
              fontWeight: 800,
              fontSize: 38,
              margin: 0,
              textAlign: "center",
              letterSpacing: "-1px",
              padding: "38px 0 18px 0",
              background: "#fff",
            }}
          >
            {blog.title}
          </h2>

          {/* Media */}
          {blog.media_cid && (
            <div style={{ width: "100%", height: 300, background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isVideo(blog.media_cid) ? (
                <video
                  src={`https://w3s.link/ipfs/${blog.media_cid}`}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                  }}
                  controls
                  preload="none"
                />
              ) : (
                <img
                  src={`https://w3s.link/ipfs/${blog.media_cid}`}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              )}
            </div>
          )}

          <div
            className="blog-content-wrapper"
            style={{
              padding: "30px 32px 32px 32px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {/* Summary (italic, under the title) */}
            {blog.summary && (
              <p
                style={{
                  margin: "0 0 24px 0",
                  color: "#555",
                  fontSize: 18,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                {blog.summary}
              </p>
            )}

            {/* Author + Date */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                justifyContent: "center",
              }}
            >
              {/* <span
                style={{
                  color: SECONDARY,
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {blog.author_id}
              </span> */}
              <span
                style={{
                  color: "#888",
                  fontSize: 14,
                }}
              >
                {blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : ""}
              </span>
            </div>

            {/* Content as plain text (preserving line breaks) */}
            <div
              style={{
                color: "#222",
                fontSize: 17,
                lineHeight: 1.75,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
              }}
            >
              {blog.content}
            </div>
          </div>

          {/* Bottom gradient accent bar */}
          <div
            style={{
              height: 6,
              background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
