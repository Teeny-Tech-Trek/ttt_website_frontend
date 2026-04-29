import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  ArrowLeft, 
  Share2,
  BookOpen,
  TrendingUp,
  Sparkles,
  Tag
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

export function BlogSection({ blogPosts }: BlogSectionProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Get unique categories
  const categories = ['All Categories', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedPost = selectedPostId ? blogPosts.find(p => p.id === selectedPostId) : null;

  // Blog Detail View
  if (selectedPost) {
    return (
      <section className="min-h-screen bg-white">
        {/* Header with back button */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </button>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              {selectedPost.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{selectedPost.readTime}</span>
              </div>
              {selectedPost.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900">{selectedPost.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {selectedPost.content ? (
              selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {selectedPost.excerpt}
              </p>
            )}
          </div>

          {/* Key Takeaways */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Key Takeaways</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span className="text-base leading-relaxed">AI and automation are accessible tools for small businesses, not just enterprises</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span className="text-base leading-relaxed">Strategic implementation can lead to significant productivity gains and cost savings</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span className="text-base leading-relaxed">Industry-specific solutions deliver better ROI than generic tools</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold text-xl">•</span>
                <span className="text-base leading-relaxed">Starting small and iterating helps teams adapt to new technologies effectively</span>
              </li>
            </ul>
          </div>

          {/* Share Section */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <span className="text-gray-700 font-medium">Share this article:</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </article>
      </section>
    );
  }

  // Blog Listing View
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
           
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insights & Innovation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest trends in AI, automation, and technology solutions for small teams
          </p>
        </div>

       

        

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium shadow-sm cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}