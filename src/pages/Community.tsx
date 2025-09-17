import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, MessageCircle,  
  BookOpen, Zap, Check, ArrowRight,
  Calendar, Plus, Heart, Reply, Trophy, ExternalLink,
  TrendingUp, Search, Download, FileText, Gavel, Layout, Newspaper,
  MapPin, Sparkles, Globe ,  Eye, Clock
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  replies: number;  
  likes: number;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  type: string;
  location?: string;
  attendees: number;
  maxAttendees?: number;
  createdAt: string;
}

interface Resource {
  id: string;
  title: string;
  description?: string;
  type: string;
  url?: string;
  authorId: string;
  authorName: string;
  tags: string[];
  downloads: number;
  createdAt: string;
}

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorTitle?: string;
  company?: string;
  metrics: { label: string; value: string }[];
  featured: number;
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  expertise: string[];
  joinedAt: string;
}



const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    weekday: "long",
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
};

const isEventUpcoming = (dateString: string) => {
  return new Date(dateString) > new Date();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
};

const formatJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "ai workflows": return "bg-brand-cyan text-white";
    case "tools": return "bg-emerald-500 text-white";
    case "showcase": return "bg-amber-500 text-white";
    default: return "bg-slate-500 text-white";
  }
};

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "virtual": return "bg-brand-cyan text-white";
    case "in-person": return "bg-emerald-500 text-white";
    case "hybrid": return "bg-amber-500 text-white";
    default: return "bg-slate-500 text-white";
  }
};

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "guide": return FileText;
    case "tool": return Gavel;
    case "template": return Layout;
    case "article": return Newspaper;
    default: return FileText;
  }
};

const getResourceTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "guide": return "bg-blue-500 text-white";
    case "tool": return "bg-emerald-500 text-white";
    case "template": return "bg-purple-500 text-white";
    case "article": return "bg-orange-500 text-white";
    default: return "bg-slate-500 text-white";
  }
};

// Button Component
const Button = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${className}`}
  >
    {children}
  </button>
);

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 py-5 sm:p-6 ${className}`}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Input Component
const Input = ({ className = "", ...props }) => (
  <input
    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
    {...props}
  />
);

const Community = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.8, 0.6]);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [featuredStory, setFeaturedStory] = useState<SuccessStory | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2, 
        ease: 'easeOut' 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Fetch data for discussions
  useEffect(() => {
    const fetchDiscussions = async () => {
      setIsLoadingDiscussions(true);
      try {
        const response = await fetch('/api/community/discussions');
        if (!response.ok) throw new Error('Failed to fetch discussions');
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setIsLoadingDiscussions(false);
      }
    };
    fetchDiscussions();
  }, []);

  // Fetch data for featured story
  useEffect(() => {
    const fetchFeaturedStory = async () => {
      try {
        const response = await fetch('/api/community/success-stories/featured');
        if (!response.ok) throw new Error('Failed to fetch featured story');
        const data = await response.json();
        setFeaturedStory(data);
      } catch (error) {
        console.error('Error fetching featured story:', error);
      }
    };
    fetchFeaturedStory();
  }, []);

  // Fetch data for blogs
useEffect(() => {
  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const response = await fetch('/api/community/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };
  fetchBlogs();
}, []);

  // Fetch data for events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const response = await fetch('/api/community/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch data for resources
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoadingResources(true);
      try {
        const response = await fetch('/api/community/resources');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoadingResources(false);
      }
    };
    fetchResources();
  }, []);

  // Fetch data for success stories
  useEffect(() => {
    const fetchStories = async () => {
      setIsLoadingStories(true);
      try {
        const response = await fetch('/api/community/success-stories');
        if (!response.ok) throw new Error('Failed to fetch success stories');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      } finally {
        setIsLoadingStories(false);
      }
    };
    fetchStories();
  }, []);

  // Fetch data for members
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoadingMembers(true);
      try {
        const response = await fetch('/api/community/members');
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoadingMembers(false);
      }
    };
    fetchMembers();
  }, []);

  // Fetch search results for members
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(`/api/community/members/search?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  // Like mutation
  const likeDiscussion = async (discussionId: string) => {
    try {
      const response = await fetch(`/api/community/discussions/${discussionId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to like discussion');
      const updatedDiscussion = await response.json();
      setDiscussions((prev) =>
        prev.map((d) => (d.id === discussionId ? { ...d, likes: updatedDiscussion.likes } : d))
      );
      console.log('Discussion liked successfully!');
    } catch (error) {
      console.error('Failed to like discussion:', error);
    }
  };
  
  // Like blog mutation
const likeBlog = async (blogId: string) => {
  try {
    const response = await fetch(`/api/community/blogs/${blogId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to like blog');
    const updatedBlog = await response.json();
    setBlogs((prev) =>
      prev.map((b) => (b.id === blogId ? { ...b, likes: updatedBlog.likes } : b))
    );
    console.log('Blog liked successfully!');
  } catch (error) {
    console.error('Failed to like blog:', error);
  }
};

  // Handle mouse and touch animations
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: (touch.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animateElements = () => {
      const nodes = document.querySelectorAll('.community-node');
      const shapes = document.querySelectorAll('.bg-shape');
      
      nodes.forEach((node, index) => {
        const element = node as HTMLElement;
        const intensity = (index % 3 + 1) * (isMobile ? 0.3 : 0.5);
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 4 : 8);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 4 : 8);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const intensity = (index + 1) * 0.3;
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 3 : 6);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 3 : 6);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${index * 25}px)`;
      });

      requestAnimationFrame(animateElements);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    animateElements();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobile]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "discussions":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                        <MessageCircle className="text-white" size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                        Recent Discussions
                      </h2>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="text-white shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        <Plus className="mr-2" size={16} />
                        New Discussion
                      </Button>
                    </motion.div>
                  </div>
                  
                  {isLoadingDiscussions ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="h-4 mb-3 bg-gray-300 rounded" />
                          <div className="h-3 mb-2 bg-gray-300 rounded" />
                          <div className="w-3/4 h-3 bg-gray-300 rounded" />
                        </motion.div>
                      ))}
                    </div>
                  ) : discussions.length === 0 ? (
                    <motion.div 
                      variants={itemVariants}
                      className="py-12 text-center border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl"
                    >
                      <Globe className="mx-auto mb-4 text-blue-400" size={48} />
                      <p className="text-lg font-medium text-slate-600">No discussions available</p>
                      <p className="mt-2 text-sm text-slate-500">Be the first to start a conversation!</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {discussions.map((discussion, index) => (
                        <motion.div 
                          key={discussion.id} 
                          variants={itemVariants}
                          whileHover={cardHoverVariants.hover}
                          className="p-6 border shadow-lg bg-gradient-to-r from-white to-blue-50/30 rounded-2xl border-white/50 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-4">
                            <motion.img 
                              src={discussion.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(discussion.authorName)}&size=48`}
                              alt={discussion.authorName}
                              className="object-cover w-12 h-12 rounded-full shadow-lg ring-2 ring-white"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center mb-2 space-x-3">
                                <h3 className="text-lg font-semibold text-slate-900">{discussion.title}</h3>
                                <Badge className={`${getCategoryColor(discussion.category)} shadow-sm`}>
                                  {discussion.category}
                                </Badge>
                              </div>
                              <p className="mb-4 leading-relaxed text-slate-600">{discussion.content}</p>
                              <div className="flex items-center space-x-6 text-sm text-slate-500">
                                <span className="font-medium">by {discussion.authorName}</span>
                                <span>{formatTimeAgo(discussion.createdAt)}</span>
                                <motion.span 
                                  className="flex items-center transition-colors cursor-pointer hover:text-blue-600"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Reply className="mr-1" size={14} />
                                  {discussion.replies} replies
                                </motion.span>
                                <motion.button 
                                  onClick={() => likeDiscussion(discussion.id)}
                                  className="flex items-center transition-colors hover:text-red-500"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Heart className="mr-1" size={14} />
                                  {discussion.likes} likes
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <motion.div 
                        variants={itemVariants}
                        className="mt-8 text-center"
                      >
                        <Button className="text-blue-600 bg-white border border-blue-200 shadow-lg hover:text-blue-800 hover:bg-blue-50">
                          View All Discussions <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {featuredStory && (
              <motion.div variants={itemVariants}>
                <Card className="border shadow-xl bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-200/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <Trophy className="text-white" size={24} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text">
                        Community Success Spotlight
                      </h3>
                    </div>
                    <motion.div 
                      className="flex items-start space-x-6"
                      whileHover={cardHoverVariants.hover}
                    >
                      <motion.img 
                        src={featuredStory.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredStory.authorName)}&size=80`}
                        alt={featuredStory.authorName}
                        className="object-cover w-20 h-20 rounded-full shadow-xl ring-4 ring-white"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="flex-1">
                        <h4 className="mb-3 text-xl font-bold text-slate-900">{featuredStory.title}</h4>
                        <p className="mb-4 leading-relaxed text-slate-600">{featuredStory.description}</p>
                        <div className="flex items-center text-sm text-slate-500">
                          <span className="font-medium">{featuredStory.authorName}{featuredStory.authorTitle && `, ${featuredStory.authorTitle}`}</span>
                          <span className="mx-3">•</span>
                          <motion.button 
                            className="font-medium transition-colors text-emerald-600 hover:text-emerald-800"
                            whileHover={{ scale: 1.05 }}
                          >
                            Read Full Story
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        );
      case "events":
        const upcomingEvents = events.filter(event => isEventUpcoming(event.date));
        const pastEvents = events.filter(event => !isEventUpcoming(event.date));
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <Calendar className="text-white" size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text">
                        Upcoming Events
                      </h2>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="text-white shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Plus className="mr-2" size={16} />
                        Create Event
                      </Button>
                    </motion.div>
                  </div>

                  {isLoadingEvents ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : upcomingEvents.length === 0 ? (
                    <motion.div 
                      variants={itemVariants}
                      className="py-12 text-center border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"
                    >
                      <Calendar className="mx-auto mb-4 text-purple-400" size={48} />
                      <p className="text-lg font-medium text-slate-600">No upcoming events scheduled</p>
                      <p className="mt-2 text-sm text-slate-500">Check back soon for new events!</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {upcomingEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          variants={itemVariants}
                          whileHover={cardHoverVariants.hover}
                          className="overflow-hidden border-l-4 shadow-lg bg-gradient-to-r from-white to-purple-50/30 rounded-2xl border-l-purple-500 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-3 space-x-3">
                                  <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                                  <Badge className={`${getEventTypeColor(event.type)} shadow-sm`}>
                                    {event.type}
                                  </Badge>
                                </div>
                                {event.description && (
                                  <p className="mb-4 leading-relaxed text-slate-600">{event.description}</p>
                                )}
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                                  <span className="flex items-center font-medium">
                                    <Calendar className="mr-2 text-purple-500" size={16} />
                                    {formatEventDate(event.date)}
                                  </span>
                                  <span className="font-medium">{event.time}</span>
                                  {event.location && (
                                    <span className="flex items-center">
                                      <MapPin className="mr-2 text-purple-500" size={16} />
                                      {event.location}
                                    </span>
                                  )}
                                  <span className="flex items-center">
                                    <Users className="mr-2 text-purple-500" size={16} />
                                    {event.attendees}{event.maxAttendees && `/${event.maxAttendees}`} attendees
                                  </span>
                                </div>
                              </div>
                              <motion.div 
                                className="ml-6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button className="text-white shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                                  RSVP
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      case "resources":
        const resourcesByType = resources.reduce((acc, resource) => {
          if (!acc[resource.type]) {
            acc[resource.type] = [];
          }
          acc[resource.type].push(resource);
          return acc;
        }, {} as Record<string, Resource[]>);
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                        <BookOpen className="text-white" size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text">
                        Community Resources
                      </h2>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="text-white shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                        <Plus className="mr-2" size={16} />
                        Share Resource
                      </Button>
                    </motion.div>
                  </div>

                  {isLoadingResources ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : resources.length === 0 ? (
                    <motion.div 
                      variants={itemVariants}
                      className="py-12 text-center border bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-emerald-100"
                    >
                      <BookOpen className="mx-auto mb-4 text-emerald-400" size={48} />
                      <p className="text-lg font-medium text-slate-600">No resources available</p>
                      <p className="mt-2 text-sm text-slate-500">Be the first to share a useful resource!</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(resourcesByType).map(([type, typeResources]) => (
                        <motion.div key={type} variants={itemVariants}>
                          <h3 className="flex items-center mb-4 text-xl font-bold capitalize text-slate-900">
                            <Sparkles className="mr-3 text-emerald-500" size={20} />
                            {type}s ({typeResources.length})
                          </h3>
                          <div className="space-y-4">
                            {typeResources.map((resource, index) => {
                              const IconComponent = getResourceIcon(resource.type);
                              return (
                                <motion.div
                                  key={resource.id}
                                  whileHover={cardHoverVariants.hover}
                                  className="border shadow-lg bg-gradient-to-r from-white to-emerald-50/30 rounded-2xl backdrop-blur-sm border-white/50"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                      <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                                          <IconComponent size={20} className="text-emerald-600" />
                                        </div>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center mb-2 space-x-3">
                                          <h4 className="text-lg font-semibold truncate text-slate-900">{resource.title}</h4>
                                          <Badge className={`${getResourceTypeColor(resource.type)} shadow-sm`}>
                                            {resource.type}
                                          </Badge>
                                        </div>
                                        {resource.description && (
                                          <p className="mb-3 leading-relaxed text-slate-600 line-clamp-2">
                                            {resource.description}
                                          </p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                          {resource.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} className="text-xs bg-emerald-100 text-emerald-700">
                                              {tag}
                                            </Badge>
                                          ))}
                                          {resource.tags.length > 3 && (
                                            <Badge className="text-xs text-gray-600 bg-gray-100">
                                              +{resource.tags.length - 3} more
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                                          <span className="font-medium">by {resource.authorName}</span>
                                          <span>{formatDate(resource.createdAt)}</span>
                                          <span className="flex items-center">
                                            <Download className="mr-1" size={14} />
                                            {resource.downloads} downloads
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex-shrink-0">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          {resource.url ? (
                                            <Button className="text-white shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600">
                                              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                <ExternalLink size={16} className="mr-2" />
                                                View
                                              </a>
                                            </Button>
                                          ) : (
                                            <Button className="text-white shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600">
                                              <Download size={16} className="mr-2" />
                                              Download
                                            </Button>
                                          )}
                                        </motion.div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      case "success":
        const featuredStories = stories.filter(story => story.featured === 1);
        const regularStories = stories.filter(story => story.featured === 0);
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                        <Trophy className="text-white" size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-amber-800 bg-clip-text">
                        Success Stories
                      </h2>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="text-white shadow-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                        <Plus className="mr-2" size={16} />
                        Share Your Story
                      </Button>
                    </motion.div>
                  </div>

                  {isLoadingStories ? (
                    <div className="space-y-6">
                      {[1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : stories.length === 0 ? (
                    <motion.div 
                      variants={itemVariants}
                      className="py-12 text-center border bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-amber-100"
                    >
                      <Trophy className="mx-auto mb-4 text-amber-400" size={48} />
                      <p className="text-lg font-medium text-slate-600">No success stories available</p>
                      <p className="mt-2 text-sm text-slate-500">Be the first to share your success!</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-8">
                      {featuredStories.length > 0 && (
                        <motion.div variants={itemVariants}>
                          <div className="flex items-center mb-6">
                            <Trophy className="mr-3 text-amber-500" size={24} />
                            <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text">
                              Featured Stories
                            </h3>
                          </div>
                          <div className="space-y-6">
                            {featuredStories.map((story, index) => (
                              <motion.div
                                key={story.id}
                                whileHover={cardHoverVariants.hover}
                                className="overflow-hidden border shadow-xl bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 rounded-2xl backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <CardContent className="p-8">
                                  <div className="flex items-start space-x-6">
                                    <motion.img 
                                      src={story.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.authorName)}&size=80`}
                                      alt={story.authorName}
                                      className="flex-shrink-0 object-cover w-20 h-20 rounded-full shadow-xl ring-4 ring-white"
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-3">
                                        <div>
                                          <h4 className="mb-2 text-xl font-bold text-slate-900">{story.title}</h4>
                                          <div className="flex items-center mb-3 text-sm text-slate-600">
                                            <span className="font-medium">{story.authorName}</span>
                                            {story.authorTitle && (
                                              <>
                                                <span className="mx-2">•</span>
                                                <span>{story.authorTitle}</span>
                                              </>
                                            )}
                                            {story.company && (
                                              <>
                                                <span className="mx-2">•</span>
                                                <span className="font-medium">{story.company}</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        <Badge className="text-white shadow-lg bg-amber-500">Featured</Badge>
                                      </div>
                                      <p className="mb-6 text-lg leading-relaxed text-slate-700">{story.description}</p>
                                      {story.metrics.length > 0 && (
                                        <div className="flex flex-wrap gap-4 mb-4">
                                          {story.metrics.map((metric, index) => (
                                            <motion.div 
                                              key={index} 
                                              className="flex items-center px-4 py-3 border shadow-md bg-white/70 backdrop-blur-sm rounded-xl border-white/50"
                                              whileHover={{ scale: 1.05, y: -2 }}
                                            >
                                              <TrendingUp className="mr-3 text-emerald-600" size={18} />
                                              <div className="text-sm">
                                                <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                                                <div className="text-slate-600">{metric.label}</div>
                                              </div>
                                            </motion.div>
                                          ))}
                                        </div>
                                      )}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">{formatDate(story.createdAt)}</span>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button className="text-white shadow-lg bg-gradient-to-r from-amber-600 to-orange-600">
                                            <ExternalLink size={16} className="mr-2" />
                                            Read Full Story
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {regularStories.length > 0 && (
                        <motion.div variants={itemVariants}>
                          {featuredStories.length > 0 && (
                            <h3 className="flex items-center mb-6 text-xl font-bold text-slate-900">
                              <div className="w-2 h-2 mr-3 rounded-full bg-slate-400"></div>
                              Community Stories
                            </h3>
                          )}
                          <div className="space-y-4">
                            {regularStories.map((story, index) => (
                              <motion.div
                                key={story.id}
                                whileHover={cardHoverVariants.hover}
                                className="border shadow-lg bg-gradient-to-r from-white to-amber-50/20 rounded-2xl backdrop-blur-sm border-white/50"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <CardContent className="p-6">
                                  <div className="flex items-start space-x-4">
                                    <motion.img 
                                      src={story.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.authorName)}&size=56`}
                                      alt={story.authorName}
                                      className="flex-shrink-0 object-cover rounded-full shadow-lg w-14 h-14 ring-2 ring-white"
                                      whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="flex-1">
                                      <h4 className="mb-2 text-lg font-semibold text-slate-900">{story.title}</h4>
                                      <div className="flex items-center mb-3 text-sm text-slate-600">
                                        <span className="font-medium">{story.authorName}</span>
                                        {story.authorTitle && (
                                          <>
                                            <span className="mx-2">•</span>
                                            <span>{story.authorTitle}</span>
                                          </>
                                        )}
                                      </div>
                                      <p className="mb-4 leading-relaxed text-slate-700 line-clamp-2">{story.description}</p>
                                      {story.metrics.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mb-4">
                                          {story.metrics.slice(0, 3).map((metric, index) => (
                                            <div key={index} className="px-3 py-1 text-xs font-medium rounded-lg bg-amber-100 text-amber-800">
                                              <span className="font-bold">{metric.value}</span> {metric.label}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">{formatDate(story.createdAt)}</span>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button className="text-white shadow-lg bg-gradient-to-r from-amber-600 to-orange-600">
                                            Read More
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

        case "blog":
  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
                  <Newspaper className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-teal-800 bg-clip-text">
                  Community Blog
                </h2>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-white shadow-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                  <Plus className="mr-2" size={16} />
                  Write Article
                </Button>
              </motion.div>
            </div>

            {isLoadingBlogs ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="py-12 text-center border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl"
              >
                <Newspaper className="mx-auto mb-4 text-teal-400" size={48} />
                <p className="text-lg font-medium text-slate-600">No blog posts available</p>
                <p className="mt-2 text-sm text-slate-500">Be the first to write an article!</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {featuredBlogs.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center mb-6">
                      <Sparkles className="mr-3 text-teal-500" size={24} />
                      <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text">
                        Featured Articles
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {featuredBlogs.map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          whileHover={cardHoverVariants.hover}
                          className="overflow-hidden border border-teal-200 shadow-xl bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CardContent className="p-8">
                            {blog.coverImage && (
                              <div className="mb-6 -mx-8 -mt-8">
                                <img 
                                  src={blog.coverImage} 
                                  alt={blog.title}
                                  className="object-cover w-full h-48"
                                />
                              </div>
                            )}
                            <div className="flex items-start space-x-6">
                              <motion.img 
                                src={blog.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.authorName)}&size=80`}
                                alt={blog.authorName}
                                className="flex-shrink-0 object-cover w-16 h-16 rounded-full shadow-xl ring-4 ring-white"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <div className="flex items-center gap-3 mb-2">
                                      <Badge className={`${getCategoryColor(blog.category)} shadow-sm`}>
                                        {blog.category}
                                      </Badge>
                                      <Badge className="text-white bg-teal-500 shadow-lg">Featured</Badge>
                                    </div>
                                    <h4 className="mb-2 text-2xl font-bold text-slate-900">{blog.title}</h4>
                                    <div className="flex items-center mb-3 text-sm text-slate-600">
                                      <span className="font-medium">{blog.authorName}</span>
                                      <span className="mx-2">•</span>
                                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                                      <span className="mx-2">•</span>
                                      <span className="flex items-center">
                                        <Clock className="mr-1" size={12} />
                                        {blog.readTime} min read
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="mb-6 text-lg leading-relaxed text-slate-700">
                                  {blog.excerpt || blog.content.substring(0, 200) + "..."}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {blog.tags.slice(0, 4).map((tag) => (
                                    <Badge key={tag} className="text-xs text-teal-700 bg-teal-100">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {blog.tags.length > 4 && (
                                    <Badge className="text-xs text-gray-600 bg-gray-100">
                                      +{blog.tags.length - 4} more
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                                    <span className="flex items-center">
                                      <Eye className="mr-1" size={14} />
                                      {blog.views} views
                                    </span>
                                    <motion.button 
                                      onClick={() => likeBlog(blog.id)}
                                      className="flex items-center transition-colors hover:text-red-500"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Heart className="mr-1" size={14} />
                                      {blog.likes} likes
                                    </motion.button>
                                    <span className="flex items-center">
                                      <MessageCircle className="mr-1" size={14} />
                                      {blog.comments} comments
                                    </span>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="text-white shadow-lg bg-gradient-to-r from-teal-600 to-cyan-600">
                                      <ExternalLink size={16} className="mr-2" />
                                      Read Full Article
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {regularBlogs.length > 0 && (
                  <motion.div variants={itemVariants}>
                    {featuredBlogs.length > 0 && (
                      <h3 className="flex items-center mb-6 text-xl font-bold text-slate-900">
                        <div className="w-2 h-2 mr-3 rounded-full bg-slate-400"></div>
                        Recent Articles
                      </h3>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {regularBlogs.map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          whileHover={cardHoverVariants.hover}
                          className="border shadow-lg bg-gradient-to-r from-white to-teal-50/20 rounded-2xl backdrop-blur-sm border-white/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CardContent className="p-6">
                            {blog.coverImage && (
                              <div className="mb-4 -mx-6 -mt-6">
                                <img 
                                  src={blog.coverImage} 
                                  alt={blog.title}
                                  className="object-cover w-full h-32 rounded-t-2xl"
                                />
                              </div>
                            )}
                            <div className="flex items-start space-x-4">
                              <motion.img 
                                src={blog.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.authorName)}&size=48`}
                                alt={blog.authorName}
                                className="flex-shrink-0 object-cover w-12 h-12 rounded-full shadow-lg ring-2 ring-white"
                                whileHover={{ scale: 1.1 }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={`${getCategoryColor(blog.category)} shadow-sm text-xs`}>
                                    {blog.category}
                                  </Badge>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 line-clamp-2">{blog.title}</h4>
                                <div className="flex items-center mb-3 text-xs text-slate-600">
                                  <span className="font-medium">{blog.authorName}</span>
                                  <span className="mx-2">•</span>
                                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                                  <span className="mx-2">•</span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1" size={10} />
                                    {blog.readTime}m
                                  </span>
                                </div>
                                <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                                  {blog.excerpt || blog.content.substring(0, 120) + "..."}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {blog.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} className="text-xs text-teal-700 bg-teal-100">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {blog.tags.length > 2 && (
                                    <Badge className="text-xs text-gray-600 bg-gray-100">
                                      +{blog.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                                    <span className="flex items-center">
                                      <Eye className="mr-1" size={12} />
                                      {blog.views}
                                    </span>
                                    <motion.button 
                                      onClick={() => likeBlog(blog.id)}
                                      className="flex items-center transition-colors hover:text-red-500"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Heart className="mr-1" size={12} />
                                      {blog.likes}
                                    </motion.button>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="px-3 py-1 text-xs text-white shadow-lg bg-gradient-to-r from-teal-600 to-cyan-600">
                                      Read More
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

      case "members":
        const displayMembers = searchQuery.length > 0 ? searchResults : members;
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-8">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                      <Users className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text">
                      Community Members
                    </h2>
                    <span className="px-4 py-2 ml-auto text-sm font-medium bg-indigo-100 rounded-full text-slate-500">
                      {members.length} member{members.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <motion.div variants={itemVariants} className="relative mb-8">
                    <Search className="absolute transform -translate-y-1/2 left-4 top-1/2 text-slate-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Search by name or expertise..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="py-4 pl-12 text-lg border-2 border-indigo-100 shadow-lg rounded-xl focus:border-indigo-500 bg-white/80 backdrop-blur-sm"
                    />
                  </motion.div>

                  {isLoadingMembers ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  ) : displayMembers.length === 0 ? (
                    <motion.div 
                      variants={itemVariants}
                      className="py-12 text-center border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl"
                    >
                      <Users className="mx-auto mb-4 text-indigo-400" size={48} />
                      {searchQuery ? (
                        <p className="text-lg font-medium text-slate-600">No members found matching "{searchQuery}"</p>
                      ) : (
                        <p className="text-lg font-medium text-slate-600">No members available</p>
                      )}
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {displayMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          whileHover={cardHoverVariants.hover}
                          className="border shadow-lg bg-gradient-to-r from-white to-indigo-50/30 rounded-2xl backdrop-blur-sm border-white/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <motion.img 
                                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=56`}
                                alt={member.name}
                                className="object-cover rounded-full shadow-lg w-14 h-14 ring-3 ring-white"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold truncate text-slate-900">{member.name}</h3>
                                <p className="mb-3 text-sm font-medium text-indigo-600">@{member.username}</p>
                                {member.bio && (
                                  <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-2">{member.bio}</p>
                                )}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {member.expertise.slice(0, 3).map((skill) => (
                                    <Badge key={skill} className="text-xs text-indigo-700 bg-indigo-100">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {member.expertise.length > 3 && (
                                    <Badge className="text-xs text-gray-600 bg-gray-100">
                                      +{member.expertise.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs font-medium text-slate-500">
                                  Joined {formatJoinDate(member.joinedAt)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border shadow-xl bg-white/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="py-12 text-center">
                    <Globe className="mx-auto mb-4 text-blue-400" size={48} />
                    <p className="text-lg font-medium text-slate-600">Welcome to the Community!</p>
                    <p className="mt-2 text-sm text-slate-500">Select a tab above to explore different sections.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
    >
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23e0e7ff%22 fill-opacity=%220.3%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%222%22/%3E%3Ccircle cx=%2213%22 cy=%2213%22 r=%221%22/%3E%3Ccircle cx=%2233%22 cy=%225%22 r=%221%22/%3E%3Ccircle cx=%223%22 cy=%2233%22 r=%221%22/%3E%3Ccircle cx=%2233%22 cy=%2233%22 r=%222%22/%3E%3Ccircle cx=%2243%22 cy=%2213%22 r=%221%22/%3E%3Ccircle cx=%2213%22 cy=%2243%22 r=%221%22/%3E%3Ccircle cx=%2243%22 cy=%2243%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" 
        />
        
        <div className="absolute rounded-full opacity-50 bg-shape top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/20 blur-3xl"></div>
        <div className="bg-shape absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-indigo-100/25 to-purple-100/30 blur-3xl opacity-40"></div>
        <div className="bg-shape absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-100/20 to-blue-100/20 blur-3xl opacity-30"></div>
        
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${120 + Math.random() * 250}px`,
              height: '3px',
              background: `linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full community-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(147, 197, 253, 0.2))`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 pt-16 pb-32 mx-auto max-w-7xl">
        {/* Enhanced Header Section */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative flex items-center justify-center w-24 h-24 mx-auto mb-8 shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl"
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)'
            }}
            transition={{ duration: 0.4 }}
          >
            <Globe className="text-white" size={36} />
            <motion.div
              className="absolute inset-0 opacity-75 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-md"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1 
            className="mb-8 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text">
              AI Innovation
            </span>
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Community Hub
            </span>
          </motion.h1>
          
          <motion.p 
            className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Connect with innovators, share knowledge, and collaborate on the future of intelligent systems.
          </motion.p>
        </motion.div>

        {/* Enhanced Tabs Navigation - FIXED TO ALWAYS SHOW LABELS */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap justify-center gap-3">
          {[
  { key: "discussions", label: "Discussions", icon: MessageCircle },
  { key: "events", label: "Events", icon: Calendar },
  { key: "resources", label: "Resources", icon: BookOpen },
  { key: "success", label: "Success", icon: Trophy },
  { key: "blog", label: "Blog", icon: Newspaper },
  { key: "members", label: "Members", icon: Users }
].map((tab, index) => (
              <motion.div
                key={tab.key}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => setActiveTab(tab.key)}
                  className={`capitalize flex items-center px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 min-w-[140px] ${
                    activeTab === tab.key 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30' 
                      : 'bg-white/80 text-blue-600 hover:bg-blue-50 border border-blue-200 backdrop-blur-sm'
                  }`}
                >
                  <tab.icon size={18} className="flex-shrink-0 mr-2" />
                  <span className="font-medium whitespace-nowrap">{tab.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {renderTabContent()}
          </div>
          
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="sticky border shadow-2xl bg-white/80 backdrop-blur-sm border-white/30 top-8">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-10 h-10 mr-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                        <Sparkles className="text-white" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text">
                        Community Stats
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: Users, label: "Members", count: members.length, color: "text-blue-500" },
                        { icon: MessageCircle, label: "Discussions", count: discussions.length, color: "text-green-500" },
                        { icon: Calendar, label: "Events", count: events.length, color: "text-purple-500" },
                        { icon: BookOpen, label: "Resources", count: resources.length, color: "text-orange-500" },
                        { icon: Trophy, label: "Success Stories", count: stories.length, color: "text-amber-500" },
                        { icon: Newspaper, label: "Blog Posts", count: blogs.length, color: "text-teal-500" }
                      ].map((stat, index) => (
                        <motion.div 
                          key={stat.label}
                          className="flex items-center gap-4 p-3 transition-all duration-300 border border-gray-100 rounded-xl bg-gradient-to-r from-gray-50 to-indigo-50/50 hover:shadow-md"
                          whileHover={{ scale: 1.02, x: 4 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <stat.icon className={stat.color} size={20} />
                            <span className="font-medium text-slate-700">{stat.count} {stat.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Newsletter Section */}
        <motion.div 
          className="mt-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            variants={itemVariants}
            className="relative max-w-5xl p-8 mx-auto overflow-hidden border shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-white/30 rounded-3xl backdrop-blur-sm md:p-16"
          >
            {/* Background decorations */}
            <div className="absolute rounded-full -top-20 -right-20 w-80 h-80 bg-blue-300/10 blur-3xl"></div>
            <div className="absolute rounded-full -bottom-20 -left-20 w-80 h-80 bg-indigo-300/10 blur-3xl"></div>
            <div className="absolute w-4 h-4 rounded-full top-8 right-8 bg-blue-400/30"></div>
            <div className="absolute w-6 h-6 rounded-full bottom-12 left-12 bg-indigo-400/20"></div>
            
            <div className="relative z-10 grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Zap className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-transparent sm:text-4xl bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                    Join Our AI Community
                  </h2>
                </div>
                <p className="mb-8 text-xl leading-relaxed text-gray-600">
                  Get exclusive access to community events, project updates, and AI resources.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    "Weekly AI insights newsletter",
                    "Early access to new tools", 
                    "Invites to live workshops"
                  ].map((benefit, index) => (
                    <motion.li 
                      key={benefit}
                      className="flex items-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                        <Check className="text-white" size={14} />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="p-8 border shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-white/50"
              >
                <h3 className="mb-8 text-2xl font-bold text-center text-gray-800">Stay Updated</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Email submitted:', email);
                }}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-3 text-sm font-semibold text-gray-700">
                      Your Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 shadow-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="consent" className="ml-3 text-sm font-medium text-gray-600">
                      I agree to receive emails about community updates
                    </label>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="flex items-center justify-center w-full gap-3 px-8 py-4 text-lg font-bold text-white transition-all shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-blue-500/30 hover:shadow-blue-500/40"
                    >
                      <span>Join Community</span>
                      <Zap size={22} />
                    </Button>
                  </motion.div>
                  
                  <p className="mt-6 text-xs leading-relaxed text-center text-gray-500">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Footer */}
      <motion.div 
        className="px-4 pb-12 mx-auto text-center text-gray-600 max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="h-px mb-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <p className="font-medium">© {new Date().getFullYear()} AI Innovation Community. All rights reserved.</p>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
          .bg-shape {
            opacity: 0.2 !important;
            filter: blur(2rem) !important;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
          .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          }
      `}</style>
    </div>
  );
};

export default Community;