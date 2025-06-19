import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye, Calendar, User, Sparkles } from "lucide-react";
import type { Blog } from "../../types/blog";

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

export default function BlogDisplayPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animateFloatingElements = () => {
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const intensity = (index + 1) * 0.3;
        const offsetX = mouseRef.current.x * intensity * 15;
        const offsetY = mouseRef.current.y * intensity * 15;
        
        htmlElement.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${mouseRef.current.x * 2}deg)`;
      });

      requestAnimationFrame(animateFloatingElements);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateFloatingElements();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const openDialog = (blog: Blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 text-blue-600 text-xl font-medium"
        >
          <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          Loading blogs…
        </motion.div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-xl font-medium"
        >
          {error}
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="blogs"
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
      style={{ perspective: '1500px' }}
    >
      {/* Enhanced 3D Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Dynamic gradient shapes */}
        <div className="floating-element absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-blue-300/30 blur-3xl opacity-70"></div>
        <div className="floating-element absolute bottom-1/3 right-1/5 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-200/35 to-blue-200/40 blur-3xl opacity-60"></div>
        <div className="floating-element absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/35 blur-3xl opacity-50"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-element absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                Blog Articles
              </span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl rounded-full"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover insights, trends, and innovations in AI and automation
          </motion.p>
        </motion.div>

        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-xl py-20"
          >
            No blogs published yet.
          </motion.div>
        ) : (
          <div className="relative">
            {/* Interactive Blog Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {blogs.map((blog, index) => (
                  <div key={blog.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="relative group cursor-pointer transform-gpu"
                      style={{ perspective: '1000px' }}
                      onHoverStart={() => setHoveredCard(blog.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      onClick={() => openDialog(blog)}
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 2,
                        rotateY: hoveredCard === blog.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative">
                        {/* Image Section */}
                        <div className="relative h-80 overflow-hidden">
                          <motion.img
                            src={blog.media_cid}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/1200x400";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Floating stats */}
                          <motion.div
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Eye size={16} className="text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">{blog.views_count}</span>
                          </motion.div>

                          {/* Interactive sparkles */}
                          {hoveredCard === blog.id && (
                            <>
                              {Array.from({ length: 6 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute"
                                  style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                  }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    rotate: [0, 180, 360]
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                  }}
                                >
                                  <Sparkles size={16} className="text-blue-400" />
                                </motion.div>
                              ))}
                            </>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-8">
                          <motion.h3
                            className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2"
                            layoutId={`title-${blog.id}`}
                          >
                            {blog.title}
                          </motion.h3>
                          
                          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                            {blog.content?.slice(0, 150)}
                            {blog.content && blog.content.length > 150 && "..."}
                          </p>

                          {/* Author and Date */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{blog.author_id}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Calendar size={14} />
                                  <span>
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
                            </div>
                            
                            <motion.div
                              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100"
                              whileHover={{ scale: 1.1, rotate: 15 }}
                              transition={{ duration: 0.2 }}
                            >
                              →
                            </motion.div>
                          </div>
                        </div>

                        {/* Gradient border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-12 gap-8">
              <motion.button
                onClick={prevSlide}
                className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-3">
                {blogs.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-blue-300 hover:bg-blue-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDialog}
          >
            <motion.div
              className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeDialog}
                className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50 text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>

              <div className="p-8">
                {selectedBlog.media_cid && (
                  <motion.div
                    className="mb-8 relative overflow-hidden rounded-2xl"
                    layoutId={`image-${selectedBlog.id}`}
                  >
                    <img
                      src={selectedBlog.media_cid}
                      alt={selectedBlog.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/1200x400";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                )}

                <motion.h2
                  className="text-4xl font-bold text-gray-900 mb-6"
                  layoutId={`title-${selectedBlog.id}`}
                >
                  {selectedBlog.title}
                </motion.h2>

                <motion.div
                  className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedBlog.author_id}</p>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>
                      {selectedBlog.published_at
                        ? new Date(selectedBlog.published_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye size={16} />
                    <span>{selectedBlog.views_count} views</span>
                  </div>
                </motion.div>

                <motion.div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedBlog.content?.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (i * 0.01) }}
                      className="inline-block mr-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}