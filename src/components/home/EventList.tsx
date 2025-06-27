import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users, Sparkles, ExternalLink } from "lucide-react";
import { getPublishedEvents } from "../../services/eventService";
import { Event } from "../../types/event";

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Summit 2025",
    description: "Join industry leaders and innovators for a comprehensive exploration of the latest advances in artificial intelligence and machine learning. This summit will cover cutting-edge research, practical applications, and future trends that are shaping the tech landscape.",
    start_time: "2025-02-15T09:00:00Z",
    end_time: "2025-02-15T17:00:00Z",
    location: "Tech Convention Center, San Francisco",
    status: "published",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    created_by: "admin",
    packages_ids: [],
    payment_required: true
  },
  {
    id: "2", 
    title: "Cloud Computing & DevOps Workshop",
    description: "Hands-on workshop covering modern cloud infrastructure, containerization with Docker and Kubernetes, CI/CD pipelines, and best practices for scalable application deployment in cloud environments.",
    start_time: "2025-02-22T10:00:00Z",
    end_time: "2025-02-22T16:00:00Z",
    location: "Innovation Hub, Austin",
    status: "published",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    created_by: "admin",
    packages_ids: [],
    payment_required: true
  },
  {
    id: "3",
    title: "Cybersecurity & Data Privacy Conference",
    description: "Critical insights into modern cybersecurity threats, data protection strategies, compliance frameworks, and emerging security technologies. Perfect for IT professionals and business leaders.",
    start_time: "2025-03-05T08:30:00Z",
    end_time: "2025-03-05T18:00:00Z",
    location: "Security Center, New York",
    status: "published",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    created_by: "admin",
    packages_ids: [],
    payment_required: true
  },
  {
    id: "4",
    title: "Blockchain & Web3 Innovation Forum",
    description: "Explore the future of decentralized technologies, smart contracts, DeFi applications, and the evolving Web3 ecosystem. Network with blockchain developers and crypto entrepreneurs.",
    start_time: "2025-03-12T09:00:00Z",
    end_time: "2025-03-12T17:30:00Z",
    location: "Crypto Campus, Miami",
    status: "published",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    created_by: "admin",
    packages_ids: [],
    payment_required: true
  }
];

export default function EventDisplayPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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
    let isMounted = true;
    async function fetchEvents() {
      try {
        setLoading(true);
        // Try to fetch real events, fallback to sample data
        try {
          const data = await getPublishedEvents();
          if (isMounted) setEvents(data && data.length > 0 ? data : sampleEvents);
        } catch {
          // If service fails, use sample data
          if (isMounted) setEvents(sampleEvents);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
        if (isMounted) {
          setError(true);
          setEvents(sampleEvents); // Still show sample data on error
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      isMounted = false;
    };
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

  const openDialog = (event: Event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const addToGoogleCalendar = (event: Event) => {
    const startDate = event.start_time ? new Date(event.start_time) : new Date();
    const endDate = event.end_time ? new Date(event.end_time) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.set('text', event.title ?? '');
    googleCalendarUrl.searchParams.set('dates', `${formatDate(startDate)}/${formatDate(endDate)}`);
    googleCalendarUrl.searchParams.set('details', event.description || '');
    googleCalendarUrl.searchParams.set('location', event.location || '');
    googleCalendarUrl.searchParams.set('sf', 'true');
    googleCalendarUrl.searchParams.set('output', 'xml');

    window.open(googleCalendarUrl.toString(), '_blank');
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
          Loading events…
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="events"
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
                Upcoming Tech Events
              </span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl rounded-full"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray600 max-w-2xl mx-auto"
          >
            Join us for cutting-edge technology events and networking opportunities
          </motion.p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-amber-600 text-lg mb-8 bg-amber-50 p-4 rounded-lg border border-amber-200"
          >
            Note: Showing sample events. Live event data may be unavailable.
          </motion.div>
        )}

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-xl py-20"
          >
            No events scheduled yet.
          </motion.div>
        ) : (
          <div className="relative">
            {/* Interactive Events Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {events.map((event, index) => (
                  <div key={event.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="relative group cursor-pointer transform-gpu"
                      style={{ perspective: '1000px' }}
                      onHoverStart={() => setHoveredCard(event.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      onClick={() => openDialog(event)}
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 2,
                        rotateY: hoveredCard === event.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/50 relative">
                        {/* Image Section */}
                        <div className="relative h-80 overflow-hidden">
                          <motion.img
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt={event.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Floating date badge */}
                          <motion.div
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="text-2xl font-bold text-blue-600">
                              {event.start_time ? new Date(event.start_time).getDate() : '15'}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              {event.start_time ? new Date(event.start_time).toLocaleDateString('en-US', { month: 'short' }) : 'Feb'}
                            </span>
                          </motion.div>

                          {/* Interactive sparkles */}
                          {hoveredCard === event.id && (
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
                            layoutId={`title-${event.id}`}
                          >
                            {event.title}
                          </motion.h3>
                          
                          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                            {event.description?.slice(0, 150)}
                            {event.description && event.description.length > 150 && "..."}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Clock size={16} className="text-blue-500" />
                              <span>
                                {event.start_time
                                  ? new Date(event.start_time).toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "TBD"}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <MapPin size={16} className="text-blue-500" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToGoogleCalendar(event);
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Calendar size={16} />
                              <span>Add to Calendar</span>
                            </motion.button>
                            
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
                {events.map((_, index) => (
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
        {selectedEvent && (
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
                <motion.div
                  className="mb-8 relative overflow-hidden rounded-2xl"
                  layoutId={`image-${selectedEvent.id}`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt={selectedEvent.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>

                <motion.h2
                  className="text-4xl font-bold text-gray-900 mb-6"
                  layoutId={`title-${selectedEvent.id}`}
                >
                  {selectedEvent.title}
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Clock size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-500">
                        {selectedEvent.start_time
                          ? new Date(selectedEvent.start_time).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "TBD"}
                      </p>
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-sm text-gray-500">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Registration</p>
                      <p className="text-sm text-gray-500">Free Event</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedEvent.description?.split(" ").map((word, i) => (
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

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={() => addToGoogleCalendar(selectedEvent)}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar size={20} />
                    <span>Add to Google Calendar</span>
                    <ExternalLink size={16} />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.open('https://lu.ma/zwtsqc9v', '_blank')}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Users size={20} />
                    <span>Register Now</span>
                    <ExternalLink size={16} />
                  </motion.button>
                  
                  <motion.button
                    onClick={closeDialog}
                    className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close Details
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}