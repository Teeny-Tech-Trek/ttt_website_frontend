import { useEffect, useRef, useState } from 'react';
import { 
  Users, MessageCircle,  
  BookOpen, Zap, Check, ArrowRight,
  Calendar, Plus, Heart, Reply, Trophy, ExternalLink,
  TrendingUp, Search, Download, FileText, Gavel, Layout, Newspaper,
  MapPin
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

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

const Community = () => {
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
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">Recent Discussions</h2>
                  <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
                    <Plus className="mr-2" size={16} />
                    New Discussion
                  </Button>
                </div>
                
                {isLoadingDiscussions ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-slate-200 rounded mb-3" />
                          <div className="h-3 bg-slate-200 rounded mb-2" />
                          <div className="h-3 bg-slate-200 rounded w-3/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : discussions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No discussions available</p>
                    <p className="text-sm text-slate-500 mt-2">Be the first to start a conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={discussion.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(discussion.authorName)}&size=40`}
                            alt={discussion.authorName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-slate-900">{discussion.title}</h3>
                              <Badge className={getCategoryColor(discussion.category)}>
                                {discussion.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{discussion.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <span>by {discussion.authorName}</span>
                              <span>{formatTimeAgo(discussion.createdAt)}</span>
                              <span>
                                <Reply className="mr-1 inline" size={12} />
                                {discussion.replies} replies
                              </span>
                              <button 
                                onClick={() => likeDiscussion(discussion.id)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <Heart className="mr-1 inline" size={12} />
                                {discussion.likes} likes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 text-center">
                      <Button className="text-brand-blue hover:text-brand-blue-dark">
                        View All Discussions <ArrowRight className="ml-1" size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {featuredStory && (
              <Card className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Trophy className="text-emerald-500 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-slate-900">Community Success Spotlight</h3>
                  </div>
                  <div className="flex items-start space-x-4">
                    <img 
                      src={featuredStory.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredStory.authorName)}&size=64`}
                      alt={featuredStory.authorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-2">{featuredStory.title}</h4>
                      <p className="text-sm text-slate-600 mb-3">{featuredStory.description}</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <span>{featuredStory.authorName}{featuredStory.authorTitle && `, ${featuredStory.authorTitle}`}</span>
                        <span className="mx-2">•</span>
                        <button className="text-brand-blue hover:text-brand-blue-dark">
                          Read Full Story
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      case "events":
        const upcomingEvents = events.filter(event => isEventUpcoming(event.date));
        const pastEvents = events.filter(event => !isEventUpcoming(event.date));
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Calendar className="text-brand-blue mr-3" size={20} />
                    <h2 className="text-xl font-semibold text-slate-900">Upcoming Events</h2>
                  </div>
                  <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
                    <Plus className="mr-2" size={16} />
                    Create Event
                  </Button>
                </div>

                {isLoadingEvents ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-slate-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No upcoming events scheduled</p>
                    <p className="text-sm text-slate-500 mt-2">Check back soon for new events!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="border-l-4 border-l-brand-blue">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-medium text-slate-900">{event.title}</h3>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                              </div>
                              {event.description && (
                                <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                              )}
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <span className="flex items-center">
                                  <Calendar className="mr-1" size={14} />
                                  {formatEventDate(event.date)}
                                </span>
                                <span>{event.time}</span>
                                {event.location && (
                                  <span className="flex items-center">
                                    <MapPin className="mr-1" size={14} />
                                    {event.location}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Users className="mr-1" size={14} />
                                  {event.attendees}{event.maxAttendees && `/${event.maxAttendees}`} attendees
                                </span>
                              </div>
                            </div>
                            <Button className="ml-4">
                              RSVP
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {pastEvents.length > 0 && (
                  <>
                    <div className="mt-8 mb-4">
                      <h3 className="text-lg font-medium text-slate-900">Past Events</h3>
                    </div>
                    <div className="space-y-3">
                      {pastEvents.slice(0, 3).map((event) => (
                        <Card key={event.id} className="opacity-75">
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="text-sm font-medium text-slate-700">{event.title}</h4>
                                  <Badge className="text-xs">
                                    {event.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-3 text-xs text-slate-500">
                                  <span>{formatEventDate(event.date)}</span>
                                  <span>{event.attendees} attended</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
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
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BookOpen className="text-brand-blue mr-3" size={20} />
                    <h2 className="text-xl font-semibold text-slate-900">Community Resources</h2>
                  </div>
                  <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
                    <Plus className="mr-2" size={16} />
                    Share Resource
                  </Button>
                </div>

                {isLoadingResources ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-slate-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : resources.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No resources available</p>
                    <p className="text-sm text-slate-500 mt-2">Be the first to share a useful resource!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(resourcesByType).map(([type, typeResources]) => (
                      <div key={type}>
                        <h3 className="text-lg font-medium text-slate-900 mb-3 capitalize">
                          {type}s ({typeResources.length})
                        </h3>
                        <div className="space-y-3">
                          {typeResources.map((resource) => {
                            const IconComponent = getResourceIcon(resource.type);
                            return (
                              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <IconComponent size={16} className="text-slate-600" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="font-medium text-slate-900 truncate">{resource.title}</h4>
                                        <Badge className={getResourceTypeColor(resource.type)}>
                                          {resource.type}
                                        </Badge>
                                      </div>
                                      {resource.description && (
                                        <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                                          {resource.description}
                                        </p>
                                      )}
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        {resource.tags.slice(0, 3).map((tag) => (
                                          <Badge key={tag} className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                        {resource.tags.length > 3 && (
                                          <Badge className="text-xs">
                                            +{resource.tags.length - 3} more
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                                        <span>by {resource.authorName}</span>
                                        <span>{formatDate(resource.createdAt)}</span>
                                        <span>
                                          <Download className="mr-1 inline" size={12} />
                                          {resource.downloads} downloads
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      {resource.url ? (
                                        <Button>
                                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink size={14} className="mr-1" />
                                            View
                                          </a>
                                        </Button>
                                      ) : (
                                        <Button>
                                          <Download size={14} className="mr-1" />
                                          Download
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "success":
        const featuredStories = stories.filter(story => story.featured === 1);
        const regularStories = stories.filter(story => story.featured === 0);
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Trophy className="text-brand-blue mr-3" size={20} />
                    <h2 className="text-xl font-semibold text-slate-900">Success Stories</h2>
                  </div>
                  <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
                    <Plus className="mr-2" size={16} />
                    Share Your Story
                  </Button>
                </div>

                {isLoadingStories ? (
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-32 bg-slate-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : stories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No success stories available</p>
                    <p className="text-sm text-slate-500 mt-2">Be the first to share your success!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {featuredStories.length > 0 && (
                      <div>
                        <div className="flex items-center mb-4">
                          <Trophy className="text-amber-500 mr-2" size={16} />
                          <h3 className="text-lg font-medium text-slate-900">Featured Stories</h3>
                        </div>
                        <div className="space-y-4">
                          {featuredStories.map((story) => (
                            <Card key={story.id} className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                              <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                  <img 
                                    src={story.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.authorName)}&size=64`}
                                    alt={story.authorName}
                                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-1">{story.title}</h4>
                                        <div className="flex items-center text-sm text-slate-600 mb-2">
                                          <span>{story.authorName}</span>
                                          {story.authorTitle && (
                                            <>
                                              <span className="mx-1">•</span>
                                              <span>{story.authorTitle}</span>
                                            </>
                                          )}
                                          {story.company && (
                                            <>
                                              <span className="mx-1">•</span>
                                              <span>{story.company}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <Badge className="bg-amber-500 text-white">Featured</Badge>
                                    </div>
                                    <p className="text-slate-700 mb-4">{story.description}</p>
                                    {story.metrics.length > 0 && (
                                      <div className="flex flex-wrap gap-4 mb-3">
                                        {story.metrics.map((metric, index) => (
                                          <div key={index} className="flex items-center bg-white/50 rounded-lg px-3 py-2">
                                            <TrendingUp className="text-emerald-600 mr-2" size={14} />
                                            <div className="text-sm">
                                              <div className="font-semibold text-slate-900">{metric.value}</div>
                                              <div className="text-slate-600">{metric.label}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">{formatDate(story.createdAt)}</span>
                                      <Button>
                                        <ExternalLink size={14} className="mr-1" />
                                        Read Full Story
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {regularStories.length > 0 && (
                      <div>
                        {featuredStories.length > 0 && (
                          <h3 className="text-lg font-medium text-slate-900 mb-4">Community Stories</h3>
                        )}
                        <div className="space-y-4">
                          {regularStories.map((story) => (
                            <Card key={story.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-5">
                                <div className="flex items-start space-x-4">
                                  <img 
                                    src={story.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.authorName)}&size=48`}
                                    alt={story.authorName}
                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 mb-1">{story.title}</h4>
                                    <div className="flex items-center text-sm text-slate-600 mb-2">
                                      <span>{story.authorName}</span>
                                      {story.authorTitle && (
                                        <>
                                          <span className="mx-1">•</span>
                                          <span>{story.authorTitle}</span>
                                        </>
                                      )}
                                    </div>
                                    <p className="text-sm text-slate-700 mb-3 line-clamp-2">{story.description}</p>
                                    {story.metrics.length > 0 && (
                                      <div className="flex flex-wrap gap-3 mb-3">
                                        {story.metrics.slice(0, 3).map((metric, index) => (
                                          <div key={index} className="text-xs bg-slate-100 rounded px-2 py-1">
                                            <span className="font-medium">{metric.value}</span> {metric.label}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">{formatDate(story.createdAt)}</span>
                                      <Button>
                                        Read More
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "members":
        const displayMembers = searchQuery.length > 0 ? searchResults : members;
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Users className="text-brand-blue mr-3" size={20} />
                  <h2 className="text-xl font-semibold text-slate-900">Community Members</h2>
                  <span className="ml-auto text-sm text-slate-500">
                    {members.length} member{members.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search by name or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {isLoadingMembers ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-slate-200 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                ) : displayMembers.length === 0 ? (
                  <div className="text-center py-8">
                    {searchQuery ? (
                      <p className="text-slate-600">No members found matching "{searchQuery}"</p>
                    ) : (
                      <p className="text-slate-600">No members available</p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayMembers.map((member) => (
                      <Card key={member.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <img 
                              src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=48`}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-slate-900 truncate">{member.name}</h3>
                              <p className="text-sm text-slate-500 mb-2">@{member.username}</p>
                              {member.bio && (
                                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{member.bio}</p>
                              )}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {member.expertise.slice(0, 3).map((skill) => (
                                  <Badge key={skill} className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {member.expertise.length > 3 && (
                                  <Badge className="text-xs">
                                    +{member.expertise.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-500">
                                Joined {formatJoinDate(member.joinedAt)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-shape absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/20 blur-3xl opacity-50"></div>
        <div className="bg-shape absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-100/25 to-blue-100/30 blur-3xl opacity-40"></div>
        <div className="bg-shape absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-100/20 to-indigo-100/20 blur-3xl opacity-30"></div>
        
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: '2px',
              background: `linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${3 + (Math.random() * 2)}s infinite alternate`
            }}
          ></div>
        ))}
        
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="community-node absolute w-3 h-3 bg-indigo-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 pt-16 pb-32 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 mt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            <span className="block">AI Innovation</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Community Hub
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with innovators, share knowledge, and collaborate on the future of intelligent systems.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="animate-bounce w-10 h-16 border-2 border-blue-400/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {["discussions", "events", "resources", "success", "members"].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize ${activeTab === tab ? 'bg-brand-blue text-white' : 'text-brand-blue'}`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderTabContent()}
          </div>
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-brand-blue" size={20} />
                    <span>{members.length} Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="text-brand-blue" size={20} />
                    <span>{discussions.length} Discussions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-brand-blue" size={20} />
                    <span>{events.length} Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-brand-blue" size={20} />
                    <span>{resources.length} Resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="text-brand-blue" size={20} />
                    <span>{stories.length} Success Stories</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-white/30 rounded-3xl overflow-hidden backdrop-blur-sm p-8 md:p-12 max-w-4xl mx-auto shadow-xl relative">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-300/10 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-300/10 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Join Our AI Community</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get exclusive access to community events, project updates, and AI resources.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Weekly AI insights newsletter</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Early access to new tools</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Invites to live workshops</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Stay Updated</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Email submitted:', email);
                }}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="consent" className="ml-2 block text-sm text-gray-600">
                      I agree to receive emails about community updates
                    </label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Join Community</span>
                    <Zap size={20} />
                  </Button>
                  
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} AI Innovation Community. All rights reserved.</p>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default Community;