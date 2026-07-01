// src/pages/admin/BlogManager.tsx
import { useState, useEffect } from 'react';
import { 
  Search, FileText, Eye, EyeOff, Plus, Calendar, Edit2, ExternalLink, 
  Trash2, RotateCcw, SlidersHorizontal, ArrowUpDown, Image as ImageIcon, Loader2,
  Archive
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllBlogs, archiveBlogs, reactivateBlog, deleteBlog } from '../../services/blogService';
import { Blog } from '../../types/blog';
import { BlogEditorModal } from './BlogEditorModal';

const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'created_at' | 'updated_at' | 'views_count' | 'title'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Editor modal control states
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState<string | undefined>(undefined);

  // Custom confirmation modal state
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    type: 'danger' | 'warning';
    requireTypedConfirm?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    type: 'warning',
    onConfirm: () => {},
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = [...blogs];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(term) ||
        blog.slug.toLowerCase().includes(term) ||
        (blog.author || '').toLowerCase().includes(term)
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(blog => blog.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(blog => blog.status === statusFilter.toLowerCase());
    }

    // Sorting
    result.sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredBlogs(result);
  }, [blogs, searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('accessToken') || '';
      const data = await getAllBlogs(token);
      
      setBlogs(data);
      setFilteredBlogs(data);

      // Compute stats
      setStats({
        total: data.length,
        published: data.filter(b => b.status === 'published').length,
        drafts: data.filter(b => b.status === 'draft').length,
        archived: data.filter(b => b.status === 'archived').length
      });
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (blogId: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Archive Blog Post',
      message: 'Are you sure you want to archive this blog post? It will be hidden from the public website but can be reactivated/restored later.',
      confirmText: 'Archive Post',
      type: 'warning',
      requireTypedConfirm: false,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('accessToken') || '';
          await archiveBlogs([blogId], token);
          toast.success('Blog post archived successfully.');
          fetchBlogs();
        } catch (err) {
          console.error('Failed to archive blog:', err);
          toast.error('Failed to archive blog post.');
        }
      }
    });
  };

  const handleReactivate = async (blogId: string) => {
    try {
      const token = localStorage.getItem('accessToken') || '';
      await reactivateBlog(blogId, token);
      toast.success('Blog post reactivated successfully.');
      fetchBlogs();
    } catch (err) {
      console.error('Failed to reactivate blog:', err);
      toast.error('Failed to reactivate blog post.');
    }
  };

  const handleDelete = async (blogId: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Permanently Delete Blog Post',
      message: 'This action is completely IRREVERSIBLE. This blog post, its database document, and its associated cover photo will be permanently deleted.',
      confirmText: 'Permanently Delete',
      type: 'danger',
      requireTypedConfirm: true,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('accessToken') || '';
          await deleteBlog(blogId, token);
          toast.success('Blog post deleted successfully.');
          fetchBlogs();
        } catch (err) {
          console.error('Failed to delete blog:', err);
          toast.error('Failed to delete blog post.');
        }
      }
    });
  };

  const handleOpenCreate = () => {
    setActiveBlogId(undefined);
    setEditorOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setActiveBlogId(id);
    setEditorOpen(true);
  };

  const handleEditorClose = () => {
    setEditorOpen(false);
    setActiveBlogId(undefined);
    fetchBlogs();
  };

  const toggleSort = (field: 'created_at' | 'updated_at' | 'views_count' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  if (loading && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="w-10 h-10 border-4 border-blue-200 rounded-full animate-spin border-t-blue-900" />
        <span className="mt-4 text-sm font-medium">Fetching blog list from MongoDB...</span>
      </div>
    );
  }

  if (error && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-500">
        <p className="text-base font-semibold text-red-600">{error}</p>
        <button
          onClick={fetchBlogs}
          className="mt-4 px-5 py-2.5 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Content Management System</h1>
          <p className="text-sm text-slate-500">Create, edit, organize, and publish structured articles</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white transition-all shadow-md bg-blue-900 rounded-xl hover:bg-blue-800 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          New Blog Post
        </button>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Articles</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900">
            <FileText size={20} />
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{stats.published}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
            <Eye size={20} />
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Drafts</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{stats.drafts}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <EyeOff size={20} />
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Archived</p>
            <p className="mt-1 text-2xl font-bold text-slate-500">{stats.archived}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500">
            <Trash2 size={20} />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute text-slate-400 transform -translate-y-1/2 left-4 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search blogs by title, slug, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pl-11 pr-4 border border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none text-sm"
            />
          </div>

          {/* Filters Selects */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-100 p-2 rounded-xl">
              <SlidersHorizontal size={14} /> Filters
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Tabular List (Requirement 11) */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-3 py-3">Cover</th>
                <th className="px-3 py-3 cursor-pointer hover:bg-slate-100/50" onClick={() => toggleSort('title')}>
                  <div className="flex items-center gap-1">
                    Title & Slug {sortBy === 'title' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Author</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 cursor-pointer hover:bg-slate-100/50" onClick={() => toggleSort('views_count')}>
                  <div className="flex items-center gap-1">
                    Views {sortBy === 'views_count' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th className="px-3 py-3 cursor-pointer hover:bg-slate-100/50" onClick={() => toggleSort('created_at')}>
                  <div className="flex items-center gap-1">
                    Created {sortBy === 'created_at' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th className="px-3 py-3 cursor-pointer hover:bg-slate-100/50" onClick={() => toggleSort('updated_at')}>
                  <div className="flex items-center gap-1">
                    Updated {sortBy === 'updated_at' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id || blog._id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Featured Cover Image thumbnail */}
                    <td className="px-3 py-2.5">
                      {blog.media_cid ? (
                        <img 
                          src={blog.media_cid} 
                          alt="Cover thumbnail" 
                          className="w-12 h-8 rounded-lg object-cover border border-slate-200 bg-slate-50 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-8 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon size={14} />
                        </div>
                      )}
                    </td>
                    
                    {/* Title & Slug */}
                    <td className="px-3 py-2.5 max-w-xs md:max-w-sm">
                      <p className="font-bold text-slate-900 truncate" title={blog.title}>{blog.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5" title={blog.slug}>{blog.slug}</p>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-2.5 font-semibold text-slate-600">{blog.category}</td>

                    {/* Author */}
                    <td className="px-3 py-2.5 text-slate-600 font-medium">{blog.author}</td>

                    {/* Status Badge */}
                    <td className="px-3 py-2.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        blog.status === 'published' ? 'bg-green-100 text-green-700' :
                        blog.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {blog.status}
                      </span>
                    </td>

                    {/* Views Count */}
                    <td className="px-3 py-2.5 text-slate-600 font-semibold">{blog.views_count}</td>

                    {/* Created */}
                    <td className="px-3 py-2.5 text-slate-500">
                      {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}
                    </td>

                    {/* Updated */}
                    <td className="px-3 py-2.5 text-slate-500">
                      {new Date(blog.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(blog.id || blog._id || '')}
                          className="p-1.5 rounded-lg border border-slate-200 text-blue-900 bg-white hover:bg-slate-50 transition-all"
                          title="Edit structured content blocks"
                        >
                          <Edit2 size={13} />
                        </button>
                        
                        {/* Public or Draft Preview URL */}
                        <a
                          href={blog.status === 'published' ? `/blog/${blog.slug}` : `/admin/blog-preview/${blog.id || blog._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-all flex items-center justify-center"
                          title="View live/preview page"
                        >
                          <ExternalLink size={13} />
                        </a>

                        {/* Archive / Reactivate Controls */}
                        {blog.status !== 'archived' ? (
                          <button
                            onClick={() => handleArchive(blog.id || blog._id || '')}
                            className="p-1.5 rounded-lg border border-slate-200 text-amber-600 bg-white hover:bg-amber-50 hover:border-amber-200 transition-all"
                            title="Archive post (hides from public site)"
                          >
                            <Archive size={13} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(blog.id || blog._id || '')}
                            className="p-1.5 rounded-lg border border-slate-200 text-green-600 bg-white hover:bg-green-50 hover:border-green-200 transition-all"
                            title="Restore to Draft status"
                          >
                            <RotateCcw size={13} />
                          </button>
                        )}

                        {/* Permanent Delete Button */}
                        <button
                          onClick={() => handleDelete(blog.id || blog._id || '')}
                          className="p-1.5 rounded-lg border border-slate-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-200 transition-all"
                          title="Permanently Delete post"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual CMS Block Editor Overlay Modal */}
      {editorOpen && (
        <BlogEditorModal 
          blogId={activeBlogId} 
          onClose={handleEditorClose}
          onSaved={fetchBlogs}
        />
      )}

      {/* Custom Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        type={confirmState.type}
        requireTypedConfirm={confirmState.requireTypedConfirm}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  type: 'danger' | 'warning';
  requireTypedConfirm?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  type,
  requireTypedConfirm = false,
  onConfirm,
  onCancel,
}) => {
  const [typedValue, setTypedValue] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTypedValue('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isConfirmDisabled = requireTypedConfirm && typedValue.trim().toUpperCase() !== 'DELETE';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-card-hover w-full max-w-md overflow-hidden animate-fade-in-up border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className={`p-3.5 rounded-full ${
            type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
          }`}>
            {type === 'danger' ? <Trash2 className="h-7 w-7" /> : <Archive className="h-7 w-7" />}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed px-2">{message}</p>
          </div>

          {requireTypedConfirm && (
            <div className="w-full space-y-2 pt-2 text-left">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Type <span className="text-red-600 font-mono">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={typedValue}
                onChange={(e) => setTypedValue(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 bg-white font-mono text-center uppercase tracking-widest text-sm"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-100 font-semibold text-slate-600 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            disabled={isConfirmDisabled}
            className={`px-5 py-2 font-semibold text-sm rounded-xl transition-all shadow-md text-white disabled:opacity-40 disabled:cursor-not-allowed ${
              type === 'danger' 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                : 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;