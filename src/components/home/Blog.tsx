import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Blog } from "../../types/blog"; // Adjust this path if needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

// Sample blog data for a tech company focused on AI and automation SaaS
const sampleBlogs: Blog[] = [
  {
    id: "1",
    slug: "ai-driven-automation-future",
    title: "How AI-Driven Automation is Shaping the Future of SaaS",
    content:
      "Artificial intelligence is revolutionizing the SaaS industry by automating complex workflows, enhancing decision-making, and improving user experiences. In this article, we explore how AI-powered tools are transforming businesses and what to expect in 2026.",
    media_cid: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author_id: "Jane Doe",
    published_at: "2025-06-01T10:00:00Z",
    status: "published",
    views_count: 1500,
    created_at: "2025-05-30T08:00:00Z",
    updated_at: "2025-06-01T09:00:00Z",
  },
  {
    id: "2",
    slug: "machine-learning-for-saas",
    title: "Leveraging Machine Learning for Smarter SaaS Solutions",
    content:
      "Machine learning algorithms are enabling SaaS platforms to deliver personalized experiences and predictive analytics. Discover how ML is driving innovation in automation and customer success.",
media_cid: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",    author_id: "John Smith",
    published_at: "2025-05-20T09:30:00Z",
    status: "published",
    views_count: 1200,
    created_at: "2025-05-18T07:00:00Z",
    updated_at: "2025-05-20T08:00:00Z",
  },
  {
    id: "3",
    slug: "scaling-saas-with-automation",
    title: "Scaling Your SaaS Business with Intelligent Automation",
    content:
      "Automation is key to scaling SaaS operations efficiently. Learn how to implement intelligent automation to streamline processes, reduce costs, and boost customer satisfaction.",
    media_cid: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author_id: "Emma Wilson",
    published_at: "2025-04-15T14:20:00Z",
    status: "published",
    views_count: 980,
    created_at: "2025-04-10T10:00:00Z",
    updated_at: "2025-04-15T13:00:00Z",
  },
  {
    id: "4",
    slug: "ai-security-in-saas",
    title: "Enhancing SaaS Security with AI-Powered Threat Detection",
    content:
      "As cyber threats evolve, AI is becoming a critical tool for securing SaaS platforms. This blog dives into how AI-driven threat detection can protect your business and customers.",
    media_cid: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author_id: "Michael Chen",
    published_at: "2025-03-10T11:45:00Z",
    status: "published",
    views_count: 1100,
    created_at: "2025-03-08T09:00:00Z",
    updated_at: "2025-03-10T10:30:00Z",
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 6px 20px rgba(31,82,140,0.15)",
    transition: { duration: 0.2 },
  },
};

export default function BlogDisplayPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching blogs with sample data
    try {
      setBlogs(sampleBlogs);
      setLoading(false);
    } catch (err) {
      console.error("Error setting blogs:", err);
      setError("Failed to load blogs.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div
        id="blogs"
        className="py-20"
        style={{
          background: "#fff",
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
          fontSize: 18,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading blogs…
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs"
        className="py-20"
        style={{
          background: "#fff",
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d32f2f",
          fontSize: 18,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      id="blogs"
      className="py-20"
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "0 0 80px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            color: PRIMARY,
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 42,
            marginBottom: 24,
            textAlign: "center",
            letterSpacing: "-1px",
            padding: "80px 0 40px 0",
          }}
        >
          Blog Articles
        </motion.h2>

        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ color: "#888", fontSize: 18, textAlign: "center", padding: "40px 0" }}
          >
            No blogs published yet.
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 40,
          }}
        >
          <AnimatePresence>
            {blogs.map((blog) => (
              <motion.a
                key={blog.id}
                href={`#blog`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 20,
                  boxShadow:
                    "0 4px 16px rgba(62,106,167,0.1), 0 2px 8px rgba(31,82,140,0.08)",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 360,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                tabIndex={0}
                aria-label={blog.title}
              >
                {blog.media_cid && (
                  <img
                    src={blog.media_cid}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                    loading="lazy"
                  />
                )}
                <div
                  style={{
                    flex: 1,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <h3
                    style={{
                      color: PRIMARY,
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      fontSize: 22,
                      margin: 0,
                    }}
                  >
                    {blog.title}
                  </h3>
                  <div
                    style={{
                      color: "#555",
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "1.5",
                      flex: 1,
                    }}
                  >
                    {blog.content?.slice(0, 120) ?? ""}
                    {blog.content && blog.content.length > 120 && "..."}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: SECONDARY, fontWeight: 600, fontSize: 15 }}>
                      {blog.author_id}
                    </span>
                    <span style={{ color: "#aaa" }}>•</span>
                    <span style={{ color: "#888", fontSize: 14 }}>
                      {blog.published_at
                        ? new Date(blog.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    width: "100%",
                  }}
                />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}