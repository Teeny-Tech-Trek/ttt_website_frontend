// src/components/admin/BlogManager.tsx
import { useState, useEffect } from 'react';
import { listBlogs, togglePublishBlog, Blog } from '../../services/adminService';
import { Search, FileText, Eye, EyeOff, Calendar } from 'lucide-react';

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await listBlogs();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (blogId: string) => {
    try {
      setToggling(blogId);
      const updatedBlog = await togglePublishBlog(blogId);
      setBlogs(blogs.map(blog => 
        blog._id === blogId ? updatedBlog : blog
      ));
    } catch (err) {
      console.error('Failed to toggle blog publish status:', err);
      alert('Failed to update blog status');
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-900"></div>
      </div>
    );
  }

  const publishedCount = blogs.filter(b => b.published).length;
  const draftCount = blogs.filter(b => !b.published).length;

  return (
    <div className="space-y-6">
      {/* Header - NO NEW BUTTON */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Blog Management</h1>
        <p className="text-slate-600">View and manage blog posts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 bg-white border-l-4 border-blue-900 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Blogs</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{blogs.length}</p>
            </div>
            <div className="p-4 rounded-full bg-blue-50">
              <FileText size={28} className="text-blue-900" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-green-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Published</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{publishedCount}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-full">
              <Eye size={28} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-amber-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Drafts</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{draftCount}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-full">
              <EyeOff size={28} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="relative">
          <Search className="absolute text-slate-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 transition-all border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="overflow-hidden transition-all bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="text-blue-900" size={20} />
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        blog.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mb-3 text-sm text-slate-500 font-mono line-clamp-1">{blog.slug}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                <Calendar size={14} />
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>

              <button
                onClick={() => handleTogglePublish(blog._id)}
                disabled={toggling === blog._id}
                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                  blog.published
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                } ${toggling === blog._id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {toggling === blog._id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>...</span>
                  </>
                ) : (
                  <>
                    {blog.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="py-16 text-center bg-white shadow-lg rounded-xl">
          <FileText size={64} className="mx-auto mb-4 text-slate-300" />
          <h3 className="mb-2 text-xl font-bold text-slate-800">No blogs found</h3>
          <p className="text-slate-600">Blogs are created through the community section</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager;