import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import type { Blog } from "../../types/blog";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PRIMARY = "#1e40af";
const SECONDARY = "#3b82f6";
const LIGHT_ACCENT = "#93c5fd";
const BG_COLOR = "#f8fafc";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

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
    media_cid: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author_id: "John Smith",
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    y: -10,
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    rotateX: 5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BlogDisplayPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    try {
      setBlogs(sampleBlogs);
      setLoading(false);
    } catch (err) {
      console.error("Error setting blogs:", err);
      setError("Failed to load blogs.");
      setLoading(false);
    }
  }, []);

  const openDialog = (blog: Blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: (
      <div className="slick-arrow slick-next">
       
          <ChevronRight size={39} className="text-[#3b82f6]" />
       
      </div>
    ),
    prevArrow: (
      <div className="slick-arrow slick-prev">
       
          <ChevronLeft size={39} className="text-[#3b82f6]" />
      
      </div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
        },
      },
    ],
    beforeChange: (current: number, next: number) => {
      // Add animation to the center slide
      const slides = document.querySelectorAll('.slick-slide');
      slides.forEach((slide, index) => {
        if (index === next) {
          slide.classList.add('center-slide');
        } else {
          slide.classList.remove('center-slide');
        }
      });
    },
  };

  if (loading) {
    return (
      <section
        id="blogs"
        className="py-20"
        style={{
          background: BG_COLOR,
          minHeight: "100vh",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: PRIMARY,
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
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="blogs"
        className="py-20"
        style={{
          background: BG_COLOR,
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
      </section>
    );
  }

  return (
    <section
      id="blogs"
      className="py-20 relative overflow-hidden"
      style={{ background: BG_COLOR, fontFamily: FONT_FAMILY }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-[rgba(147,197,253,0.3)] rounded-full blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-[rgba(59,130,246,0.3)] rounded-full blur-xl"
      />
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 60px",
          position: "relative",
          zIndex: 10,
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
            style={{ color: `${PRIMARY}/80`, fontSize: 18, textAlign: "center", padding: "40px 0" }}
          >
            No blogs published yet.
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <style>
            {`
              .slick-slide {
                transition: all 0.4s ease;
                padding: 20px 10px;
                opacity: 0.7;
                transform: scale(0.9);
              }
              
              .slick-slide.slick-center {
                opacity: 1;
                transform: scale(1.05);
              }
              
              .slick-slide:not(.slick-center) {
                filter: blur(1px);
              }
              
              .slick-list {
                overflow: visible;
                padding: 40px 0;
              }
              
              .slick-track {
                display: flex;
                align-items: center;
              }
              
              .slick-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                cursor: pointer;
              }
              
              .slick-prev {
                left: -40px;
              }
              
              .slick-next {
                right: -40px;
              }
              
              .slick-dots {
                bottom: -30px;
              }
              
              .slick-dots li button:before {
                color: ${SECONDARY};
                opacity: 0.5;
                font-size: 10px;
              }
              
              .slick-dots li.slick-active button:before {
                color: ${SECONDARY};
                opacity: 1;
              }
            `}
          </style>
          
          <Slider {...sliderSettings}>
            {blogs.map((blog) => (
              <div key={blog.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl cursor-pointer perspective-1000 transform-gpu border border-[rgba(147,197,253,0.3)]"
                  style={{
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    minHeight: 420,
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => openDialog(blog)}
                  tabIndex={0}
                  aria-label={`Open blog: ${blog.title}`}
                  role="button"
                >
                  {blog.media_cid && (
                    <motion.div
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={blog.media_cid}
                        alt={blog.title}
                        style={{
                          width: "100%",
                          height: 240,
                          objectFit: "cover",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/1200x240";
                        }}
                      />
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 70%)",
                        }}
                      />
                    </motion.div>
                  )}
                  <div
                    style={{
                      flex: 1,
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <h3
                      style={{
                        color: PRIMARY,
                        fontFamily: FONT_FAMILY,
                        fontWeight: 700,
                        fontSize: 24,
                        margin: 0,
                        lineHeight: "1.3",
                      }}
                    >
                      {blog.title}
                    </h3>
                    <div
                      style={{
                        color: `${PRIMARY}/70`,
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "1.6",
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
                        gap: 10,
                      }}
                    >
                      <span style={{ color: SECONDARY, fontWeight: 600, fontSize: 16 }}>
                        {blog.author_id}
                      </span>
                      <span style={{ color: `${PRIMARY}/50` }}>•</span>
                      <span style={{ color: `${PRIMARY}/50`, fontSize: 14 }}>
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
                      height: 6,
                      background: `linear-gradient(to right, ${LIGHT_ACCENT}, ${SECONDARY})`,
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                      width: "100%",
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDialog}
          >
            <motion.div
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white/95 backdrop-blur-md rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[rgba(147,197,253,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 p-2 bg-[rgba(147,197,253,0.2)] rounded-full hover:bg-[rgba(59,130,246,0.3)] transition-all duration-300"
                aria-label="Close blog dialog"
              >
                <X size={24} className="text-[rgba(31,82,140)]" />
              </button>
              <div className="p-8">
                {selectedBlog.media_cid && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <img
                      src={selectedBlog.media_cid}
                      alt={selectedBlog.title}
                      className="w-full h-64 object-cover rounded-2xl"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/1200x400";
                      }}
                    />
                  </motion.div>
                )}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    color: PRIMARY,
                    fontFamily: FONT_FAMILY,
                    fontWeight: 700,
                    fontSize: 28,
                    marginBottom: 16,
                  }}
                >
                  {selectedBlog.title}
                </motion.h2>
                <motion.div
                  style={{
                    color: `${PRIMARY}/80`,
                    fontSize: 16,
                    lineHeight: "1.6",
                    marginBottom: 24,
                  }}
                >
                  {selectedBlog.content?.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={textRevealVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block mx-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: SECONDARY,
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  <span>{selectedBlog.author_id}</span>
                  <span style={{ color: `${PRIMARY}/60` }}>•</span>
                  <span style={{ color: `${PRIMARY}/60`, fontSize: 14 }}>
                    {selectedBlog.published_at
                      ? new Date(selectedBlog.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}