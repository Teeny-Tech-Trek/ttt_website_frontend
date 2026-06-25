// src/pages/admin/BlogEditorModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { 
  X, Save, Eye, Edit, Trash2, Copy, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Plus, 
  HelpCircle, Image as ImageIcon, Link, Sparkles, MessageSquare, List, Grid, AlignLeft, 
  Code, AlertCircle, FileText, Move, Check, Loader2 
} from 'lucide-react';
import api from '../../api/axios';
import { Blog, BlogInput } from '../../types/blog';
import { BlogBlock, BlogRenderer } from '../../components/blog/BlogRenderer';
import { createBlog, editBlog, getBlogById } from '../../services/blogService';

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onDebouncedChange: (val: string) => void;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({ value, onDebouncedChange, ...props }) => {
  const [val, setVal] = useState(value || '');
  useEffect(() => {
    setVal(value || '');
  }, [value]);

  const handleBlur = () => {
    if (val !== value) {
      onDebouncedChange(val);
    }
  };

  return (
    <input
      {...props}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

interface DebouncedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onDebouncedChange: (val: string) => void;
}

const DebouncedTextarea: React.FC<DebouncedTextareaProps> = ({ value, onDebouncedChange, ...props }) => {
  const [val, setVal] = useState(value || '');
  useEffect(() => {
    setVal(value || '');
  }, [value]);

  const handleBlur = () => {
    if (val !== value) {
      onDebouncedChange(val);
    }
  };

  return (
    <textarea
      {...props}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const BLOCK_TYPES = [
  { value: 'heading', label: 'Heading' },
  { value: 'subheading', label: 'Sub Heading' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'image', label: 'Image' },
  { value: 'quote', label: 'Quote' },
  { value: 'divider', label: 'Divider' },
  { value: 'bulletList', label: 'Bullet List' },
  { value: 'orderedList', label: 'Ordered List' },
  { value: 'faq', label: 'FAQ' },
  { value: 'table', label: 'Table' },
  { value: 'highlight', label: 'Highlight Box' },
  { value: 'callout', label: 'Callout' },
  { value: 'code', label: 'Code Block' },
  { value: 'comparison', label: 'Comparison Table' },
  { value: 'spacer', label: 'Spacer' },
  { value: 'custom_section', label: 'Custom Section' }
];

interface BlogEditorModalProps {
  blogId?: string; // If provided, edit mode. Otherwise, create mode.
  onClose: () => void;
  onSaved: () => void;
}

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({ blogId, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Blog meta states
  const [currentId, setCurrentId] = useState<string | undefined>(blogId);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugModified, setSlugModified] = useState(false);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('AI Solutions');
  const [author, setAuthor] = useState('Sarah Chen');
  const [readTime, setReadTime] = useState('5 min read');
  
  // Featured image states
  const [mediaCid, setMediaCid] = useState('');
  const [featuredAlt, setFeaturedAlt] = useState('');
  const [featuredCaption, setFeaturedCaption] = useState('');

  // SEO states
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Blocks state
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [collapsedBlocks, setCollapsedBlocks] = useState<Record<string, boolean>>({});

  // View state — default to editor-only on mobile (split only on md+)
  const [previewMode, setPreviewMode] = useState<'split' | 'editor'>(
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'split' : 'editor'
  );
  const [showMetadata, setShowMetadata] = useState(true);

  // File upload state for featured image
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  // Ref for exit warning
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  // Load blog if in edit mode
  useEffect(() => {
    if (blogId) {
      loadBlog(blogId);
    } else {
      // Initialize with a default paragraph block
      setBlocks([createEmptyBlock('paragraph')]);
    }
  }, [blogId]);

  // Alert beforeunload setup
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  // Slug auto generation
  useEffect(() => {
    if (!slugModified && title && !currentId) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      setSlug(generated);
    }
  }, [title, slugModified, currentId]);

  // Auto Save timer setup (every 10 seconds if dirty)
  useEffect(() => {
    const timer = setInterval(() => {
      if (isDirtyRef.current && !saving && title.trim()) {
        silentAutoSave();
      }
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(timer);
  }, [title, summary, category, author, readTime, mediaCid, featuredAlt, featuredCaption, blocks, metaTitle, metaDescription, canonicalUrl, tags, status, currentId, saving]);

  const loadBlog = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken') || undefined;
      const data = await getBlogById(id, token);
      
      setTitle(data.title || '');
      setSlug(data.slug || '');
      setSlugModified(true);
      setSummary(data.summary || '');
      setCategory(data.category || 'AI Solutions');
      setAuthor(data.author || 'Admin');
      setReadTime(data.readTime || '5 min read');
      setMediaCid(data.media_cid || '');
      setFeaturedAlt(data.featured_alt || '');
      setFeaturedCaption(data.featured_caption || '');
      setMetaTitle(data.metaTitle || '');
      setMetaDescription(data.metaDescription || '');
      setCanonicalUrl(data.canonicalUrl || '');
      setStatus(data.status === 'published' ? 'published' : 'draft');
      setTags(data.tags || []);
      setBlocks(Array.isArray(data.content) ? data.content : []);
      setIsDirty(false);
    } catch (err) {
      console.error('Failed to load blog for editing:', err);
      showToast('Failed to load blog post details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPayload = (): BlogInput => {
    return {
      title,
      slug: slug.trim() || undefined,
      summary,
      category,
      author,
      readTime,
      media_cid: mediaCid,
      featured_alt: featuredAlt,
      featured_caption: featuredCaption,
      status: status,
      tags,
      content: blocks,
      metaTitle,
      metaDescription,
      canonicalUrl,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };
  };

  const saveBlog = async (newStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Blog title is required.');
      return;
    }
    
    setSaving(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      const payload = getPayload();
      if (newStatus) {
        payload.status = newStatus;
        setStatus(newStatus);
      }

      let res: Blog;
      if (currentId) {
        res = await editBlog(currentId, payload, token);
      } else {
        res = await createBlog(payload, token);
        setCurrentId(res.id || res._id);
        setSlug(res.slug); // update with unique slug returned
      }

      setIsDirty(false);
      setLastSaved(new Date().toLocaleTimeString());
      if (newStatus === 'published') {
        showToast('Blog published successfully! 🎉', 'success');
      } else if (!newStatus) {
        showToast('Blog saved successfully!', 'success');
      }
    } catch (err: any) {
      console.error('Failed to save blog:', err);
      showToast(err.response?.data?.error || 'Failed to save blog post.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const silentAutoSave = async () => {
    try {
      const token = localStorage.getItem('accessToken') || '';
      const payload = getPayload();
      
      let res: Blog;
      if (currentId) {
        res = await editBlog(currentId, payload, token);
      } else {
        res = await createBlog(payload, token);
        setCurrentId(res.id || res._id);
        setSlug(res.slug);
      }
      setIsDirty(false);
      setLastSaved(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Silent auto-save failed:', err);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to discard them and close the editor?');
      if (!confirmClose) return;
    }
    onClose();
    onSaved();
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFeatured(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await api.post('/blogs/upload?type=featured', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMediaCid(res.data.url);
      setIsDirty(true);
    } catch (err) {
      console.error('Featured image upload failed:', err);
      showToast('Failed to upload image. Please try again.', 'error');
    } finally {
      setUploadingFeatured(false);
    }
  };

  // Block Helpers
  function createEmptyBlock(type: string): BlogBlock {
    const rand = Math.random().toString(36).substr(2, 9);
    const base = { id: `block-${Date.now()}-${rand}`, type };

    switch (type) {
      case 'heading':
        return { ...base, text: '', level: 2 };
      case 'subheading':
        return { ...base, text: '' };
      case 'paragraph':
      case 'quote':
      case 'highlight':
        return { ...base, text: '' };
      case 'callout':
        return { ...base, text: '', style: 'info' };
      case 'image':
        return { ...base, url: '', alt: '', caption: '' };
      case 'bulletList':
      case 'orderedList':
        return { ...base, items: [''] };
      case 'faq':
        return { ...base, question: '', answer: '' };
      case 'table':
      case 'comparison':
        return { ...base, header: ['Header 1', 'Header 2'], body: [['Cell 1', 'Cell 2']] };
      case 'code':
        return { ...base, text: '', lang: 'javascript' };
      case 'spacer':
        return { ...base, height: 30 };
      case 'custom_section':
        return { ...base, children: [] };
      default:
        return { ...base };
    }
  }

  const addBlock = (type: string, index?: number) => {
    const newBlock = createEmptyBlock(type);
    setBlocks(prev => {
      const clone = [...prev];
      if (index !== undefined) {
        clone.splice(index + 1, 0, newBlock);
      } else {
        clone.push(newBlock);
      }
      return clone;
    });
    setIsDirty(true);
  };

  const duplicateBlock = (block: BlogBlock, index: number) => {
    const clone = JSON.parse(JSON.stringify(block));
    const assignNewIds = (b: BlogBlock) => {
      const rand = Math.random().toString(36).substr(2, 9);
      b.id = `block-${Date.now()}-${rand}`;
      if (b.children) {
        b.children.forEach(assignNewIds);
      }
    };
    assignNewIds(clone);

    setBlocks(prev => {
      const copy = [...prev];
      copy.splice(index + 1, 0, clone);
      return copy;
    });
    setIsDirty(true);
  };

  const deleteBlock = (index: number) => {
    if (blocks.length <= 1) {
      alert('You must keep at least one block.');
      return;
    }
    setBlocks(prev => prev.filter((_, idx) => idx !== index));
    setIsDirty(true);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    setBlocks(prev => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setIsDirty(true);
  };

  const updateBlock = (index: number, fields: Partial<BlogBlock>) => {
    setBlocks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...fields };
      return copy;
    });
    setIsDirty(true);
  };

  // Drag and Drop block ordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIdxStr = e.dataTransfer.getData('text/plain');
    if (!sourceIdxStr) return;
    const sourceIdx = parseInt(sourceIdxStr, 10);
    if (sourceIdx === targetIndex) return;

    setBlocks(prev => {
      const copy = [...prev];
      const [removed] = copy.splice(sourceIdx, 1);
      copy.splice(targetIndex, 0, removed);
      return copy;
    });
    setIsDirty(true);
  };

  const addTag = () => {
    const cleaned = tagInput.trim();
    if (!cleaned) return;
    const currentTags = Array.isArray(tags) ? tags : [];
    const exists = currentTags.some(t => t.toLowerCase() === cleaned.toLowerCase());
    if (!exists) {
      setTags([...currentTags, cleaned]);
      setTagInput('');
      setIsDirty(true);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const currentTags = Array.isArray(tags) ? tags : [];
    setTags(currentTags.filter((_, idx) => idx !== indexToRemove));
    setIsDirty(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col font-sans text-slate-800 overflow-hidden" style={{ fontFamily: FONT_FAMILY }}>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold animate-fade-in-up transition-all ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <Check className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
          {toast.message}
        </div>
      )}
      {/* Top Header Bar - responsive */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-shrink-0 shadow-lg gap-3">
        {/* Left: Close + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex-shrink-0"
            title="Close Editor"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm md:text-lg font-bold flex items-center gap-2 truncate">
              <span className="truncate">{currentId ? 'Edit Blog Post' : 'Create New Blog Post'}</span>
              <span className={`hidden sm:inline-block flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                status === 'published' ? 'bg-green-500 text-white' : 'bg-amber-500 text-slate-900'
              }`}>
                {status}
              </span>
            </h2>
            {lastSaved && (
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Check className="h-3 w-3 text-green-400" />
                Saved {lastSaved}
              </p>
            )}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
          {/* Preview Toggle — hidden on mobile */}
          <div className="hidden md:flex bg-slate-800 p-0.5 rounded-lg items-center border border-slate-700">
            <button
              onClick={() => setPreviewMode('editor')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                previewMode === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Editor Only</span>
            </button>
            <button
              onClick={() => setPreviewMode('split')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                previewMode === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Split View</span>
            </button>
          </div>

          {currentId && (
            <a
              href={`/admin/blog-preview/${currentId}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 md:px-4 md:py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 font-semibold text-sm transition-all flex items-center gap-1.5 border border-slate-700"
              title="Full Preview"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Preview</span>
            </a>
          )}

          <button
            onClick={() => saveBlog('draft')}
            disabled={saving}
            className="p-1.5 md:px-4 md:py-2 bg-slate-800 text-blue-400 rounded-lg hover:bg-slate-700 font-semibold text-sm transition-all flex items-center gap-1.5 border border-blue-900/50"
            title="Save as Draft"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden md:inline">Save Draft</span>
          </button>

          <button
            onClick={() => saveBlog('published')}
            disabled={saving}
            className="px-3 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-xs md:text-sm transition-all shadow-md flex items-center gap-1.5"
            title="Publish Post"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      {loading ? (
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="text-sm font-medium">Loading blog content and editor panels...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden flex">
          {/* LEFT: Editor Column */}
          <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col p-4 md:p-6 space-y-5 md:space-y-6">
            
            {/* Toggle Metadata section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
              <button 
                onClick={() => setShowMetadata(!showMetadata)}
                className="w-full px-6 py-4 bg-slate-50/50 flex items-center justify-between border-b border-slate-100 hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-900" />
                  <span className="font-bold text-slate-800 text-base">Blog Metadata & SEO Settings</span>
                </div>
                {showMetadata ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
              </button>

              {showMetadata && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title & Slug */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                        placeholder="Enter blog post title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Slug</label>
                      <input 
                        type="text" 
                        value={slug} 
                        onChange={(e) => { setSlug(e.target.value); setSlugModified(true); setIsDirty(true); }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-sm text-slate-600"
                        placeholder="auto-generated-slug"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Excerpt / Summary</label>
                      <textarea 
                        value={summary} 
                        onChange={(e) => { setSummary(e.target.value); setIsDirty(true); }}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                        placeholder="A short teaser summary displayed on cards"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                        <select
                          value={category}
                          onChange={(e) => { setCategory(e.target.value); setIsDirty(true); }}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="AI Solutions">AI Solutions</option>
                          <option value="Automation">Automation</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Inventory AI">Inventory AI</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Insights">Insights</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Author</label>
                        <input 
                          type="text" 
                          value={author} 
                          onChange={(e) => { setAuthor(e.target.value); setIsDirty(true); }}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Read Time</label>
                        <input 
                          type="text" 
                          value={readTime} 
                          onChange={(e) => { setReadTime(e.target.value); setIsDirty(true); }}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                          placeholder="e.g. 5 min read"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tags</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                            placeholder="press enter"
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                          />
                          <button type="button" onClick={addTag} className="px-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(Array.isArray(tags) ? tags : []).map((tg, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                              {tg}
                              <button type="button" onClick={() => removeTag(idx)} className="text-blue-500 hover:text-blue-700">
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image & SEO */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Featured Cover Image</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-3">
                          <input 
                            type="text" 
                            value={mediaCid}
                            onChange={(e) => { setMediaCid(e.target.value); setIsDirty(true); }}
                            placeholder="Paste image URL directly"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm"
                          />
                          <div className="relative">
                            <input 
                              type="file" 
                              id="featured-image-upload" 
                              accept="image/*"
                              onChange={handleFeaturedImageUpload}
                              className="hidden"
                            />
                            <label 
                              htmlFor="featured-image-upload"
                              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer font-semibold text-xs transition-all text-slate-600"
                            >
                              {uploadingFeatured ? (
                                <>
                                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                  Uploading Cover...
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="h-4 w-4 text-slate-400" />
                                  Or Upload Local File
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        {mediaCid && (
                          <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-white flex-shrink-0 flex items-center justify-center p-1 shadow-inner">
                            <img src={mediaCid} alt="featured thumbnail" className="w-full h-full object-cover rounded-lg" />
                          </div>
                        )}
                      </div>

                      {/* Image Alt & Caption */}
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          value={featuredAlt}
                          onChange={(e) => { setFeaturedAlt(e.target.value); setIsDirty(true); }}
                          placeholder="Alt description text"
                          className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                        <input 
                          type="text" 
                          value={featuredCaption}
                          onChange={(e) => { setFeaturedCaption(e.target.value); setIsDirty(true); }}
                          placeholder="Visible image caption"
                          className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Search Engine Optimization (SEO)</span>
                      <div>
                        <input 
                          type="text" 
                          value={metaTitle}
                          onChange={(e) => { setMetaTitle(e.target.value); setIsDirty(true); }}
                          placeholder="Meta Title Tag (Google Title)"
                          className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={metaDescription}
                          onChange={(e) => { setMetaDescription(e.target.value); setIsDirty(true); }}
                          placeholder="Meta Description Snippet"
                          className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={canonicalUrl}
                          onChange={(e) => { setCanonicalUrl(e.target.value); setIsDirty(true); }}
                          placeholder="Canonical URL Tag override"
                          className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Block Builder Area */}
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Grid className="h-5 w-5 text-blue-900" />
                  Article Content Blocks
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-full">
                  {blocks.length} Blocks
                </span>
              </div>

              <div className="space-y-4">
                {blocks.map((block, idx) => (
                  <BlockItem 
                    key={block.id}
                    block={block}
                    index={idx}
                    total={blocks.length}
                    onMoveUp={() => moveBlock(idx, 'up')}
                    onMoveDown={() => moveBlock(idx, 'down')}
                    onDelete={() => deleteBlock(idx)}
                    onDuplicate={() => duplicateBlock(block, idx)}
                    onInsertAbove={(type) => addBlock(type, idx - 1)}
                    onInsertBelow={(type) => addBlock(type, idx)}
                    onUpdate={(fields) => updateBlock(idx, fields)}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    isCollapsed={Boolean(collapsedBlocks[block.id])}
                    onToggleCollapse={() => setCollapsedBlocks(prev => ({ ...prev, [block.id]: !prev[block.id] }))}
                  />
                ))}
              </div>

              {/* Bottom Append Block Panel */}
              <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-white hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Append a Content Block</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {BLOCK_TYPES.map((bt) => (
                    <button
                      key={bt.value}
                      onClick={() => addBlock(bt.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      {bt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview Column — only visible on md+ screens */}
          {previewMode === 'split' && (
            <div className="hidden md:flex w-[440px] lg:w-[520px] xl:w-[600px] border-l border-slate-200 bg-slate-100 overflow-y-auto p-4 md:p-6 flex-col">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase text-slate-400 tracking-widest flex-shrink-0">
                <Eye className="h-4 w-4 text-blue-600" />
                Live Preview
              </div>
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-lg p-8 overflow-y-auto max-w-[720px] mx-auto min-h-full">
                {/* Title */}
                <h2 style={{ color: PRIMARY, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 34, textAlign: "center", marginBottom: 18, lineHeight: 1.2 }}>
                  {title || 'Untitled Blog Post'}
                </h2>
                
                {/* Featured image */}
                {mediaCid && (
                  <div className="w-full mb-6 bg-slate-50 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                    <img src={mediaCid} alt={featuredAlt || title} className="w-full object-cover max-h-[280px]" />
                    {featuredCaption && (
                      <p className="text-center text-xs text-gray-500 mt-2 mb-2 italic px-2">
                        {featuredCaption}
                      </p>
                    )}
                  </div>
                )}

                {/* Excerpt */}
                {summary && (
                  <p className="text-gray-600 italic text-center text-[1.1rem] mb-6 leading-relaxed border-b border-gray-100 pb-4">
                    {summary}
                  </p>
                )}

                {/* Meta details */}
                <div className="flex justify-center gap-4 text-xs text-gray-400 mb-8 font-semibold tracking-wider uppercase">
                  <span className="text-blue-900">{author || 'Admin'}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>

                <div className="text-slate-800">
                  <BlogRenderer blocks={blocks} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  );
};

// Component for Individual Block Item configuration inside the list builder
interface BlockItemProps {
  block: BlogBlock;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onInsertAbove: (type: string) => void;
  onInsertBelow: (type: string) => void;
  onUpdate: (fields: Partial<BlogBlock>) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const BlockItem: React.FC<BlockItemProps> = ({
  block, index, total, onMoveUp, onMoveDown, onDelete, onDuplicate, onInsertAbove, onInsertBelow, onUpdate,
  onDragStart, onDragOver, onDrop, isCollapsed, onToggleCollapse
}) => {
  const [showInsAbove, setShowInsAbove] = useState(false);
  const [showInsBelow, setShowInsBelow] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);

  const handleBlockImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/blogs/upload?type=inline', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate({ url: res.data.url });
    } catch (err) {
      console.error('Block image upload failed:', err);
      alert('Failed to upload block image.');
    } finally {
      setUploading(false);
    }
  };

  const insertDropdownMenu = (callback: (type: string) => void, close: () => void) => (
    <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-2 grid grid-cols-2 gap-1 w-64 max-h-72 overflow-y-auto">
      {BLOCK_TYPES.map(bt => (
        <button
          key={bt.value}
          onClick={() => { callback(bt.value); close(); }}
          className="text-left px-2.5 py-1.5 hover:bg-slate-50 hover:text-blue-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <Plus className="h-3 w-3" />
          {bt.label}
        </button>
      ))}
    </div>
  );

  const getBlockIcon = () => {
    switch (block.type) {
      case 'heading': return <AlignLeft className="h-4 w-4 text-blue-600" />;
      case 'subheading': return <AlignLeft className="h-4 w-4 text-sky-500" />;
      case 'paragraph': return <AlignLeft className="h-4 w-4 text-slate-500" />;
      case 'image': return <ImageIcon className="h-4 w-4 text-green-500" />;
      case 'quote': return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      case 'divider': return <ArrowDown className="h-4 w-4 text-slate-400" />;
      case 'bulletList': return <List className="h-4 w-4 text-amber-500" />;
      case 'orderedList': return <List className="h-4 w-4 text-amber-600" />;
      case 'faq': return <HelpCircle className="h-4 w-4 text-teal-500" />;
      case 'table': return <Grid className="h-4 w-4 text-purple-500" />;
      case 'comparison': return <Grid className="h-4 w-4 text-pink-500" />;
      case 'highlight': return <Sparkles className="h-4 w-4 text-yellow-500" />;
      case 'callout': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'code': return <Code className="h-4 w-4 text-emerald-500" />;
      case 'spacer': return <ArrowDown className="h-4 w-4 text-slate-300" />;
      case 'custom_section': return <Grid className="h-4 w-4 text-rose-500" />;
      default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div 
      draggable={dragEnabled}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col group/item transition-shadow hover:shadow-md"
    >
      {/* Block Header Panel */}
      <div className="bg-slate-50/60 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onMouseEnter={() => setDragEnabled(true)}
            onMouseLeave={() => setDragEnabled(false)}
            className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing p-0.5"
          >
            <Move className="h-4 w-4" />
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-slate-200">
            {getBlockIcon()}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {block.type === 'heading' ? `Heading H${block.level || 2}` : block.type}
            </span>
            <p className="text-[10px] text-slate-400 font-mono select-none">Index: {index} • ID: {block.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Collapse/Expand Toggle */}
          <button 
            onClick={onToggleCollapse} 
            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            title={isCollapsed ? "Expand panel" : "Collapse panel"}
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>

          {/* Reordering Controls */}
          <button 
            onClick={onMoveUp} 
            disabled={index === 0} 
            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button 
            onClick={onMoveDown} 
            disabled={index === total - 1} 
            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
          >
            <ArrowDown className="h-4 w-4" />
          </button>

          {/* Insert Above dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowInsAbove(!showInsAbove); setShowInsBelow(false); }}
              className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 font-semibold text-xs flex items-center gap-0.5"
            >
              Ins Above
            </button>
            {showInsAbove && insertDropdownMenu(onInsertAbove, () => setShowInsAbove(false))}
          </div>

          {/* Insert Below dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowInsBelow(!showInsBelow); setShowInsAbove(false); }}
              className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 font-semibold text-xs flex items-center gap-0.5"
            >
              Ins Below
            </button>
            {showInsBelow && insertDropdownMenu(onInsertBelow, () => setShowInsBelow(false))}
          </div>

          <div className="w-px h-4 bg-slate-200 mx-1" />

          {/* Duplicate & Delete */}
          <button 
            onClick={onDuplicate} 
            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
            title="Duplicate block"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button 
            onClick={onDelete} 
            className="p-1 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Delete block"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Block Body Input Panel */}
      {!isCollapsed && (
        <div className="p-5 bg-white space-y-4">
          
          {/* HEADING block input details */}
          {block.type === 'heading' && (
            <div className="flex gap-4">
              <div className="w-24">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Level</label>
                <select
                  value={block.level || 2}
                  onChange={(e) => onUpdate({ level: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                >
                  <option value={1}>H1</option>
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Heading text</label>
                <DebouncedInput
                  type="text"
                  value={block.text || ''}
                  onDebouncedChange={(val) => onUpdate({ text: val })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                  placeholder="Enter heading text"
                />
              </div>
            </div>
          )}

          {/* SUBHEADING block input details */}
          {block.type === 'subheading' && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Sub heading text</label>
              <DebouncedInput
                type="text"
                value={block.text || ''}
                onDebouncedChange={(val) => onUpdate({ text: val })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold"
                placeholder="Enter sub heading text"
              />
            </div>
          )}

          {/* PARAGRAPH / QUOTE / HIGHLIGHT block input details */}
          {(block.type === 'paragraph' || block.type === 'quote' || block.type === 'highlight') && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Text content</label>
              <DebouncedTextarea
                value={block.text || ''}
                onDebouncedChange={(val) => onUpdate({ text: val })}
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                placeholder={`Enter ${block.type} content... Support markdown formatting: **bold**, *italic*, \`code\``}
              />
            </div>
          )}

          {/* CALLOUT block input details */}
          {block.type === 'callout' && (
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-32">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Callout Style</label>
                  <select
                    value={block.style || 'info'}
                    onChange={(e) => onUpdate({ style: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="warning">Warning (Yellow)</option>
                    <option value="success">Success (Green)</option>
                    <option value="error">Error (Red)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Callout text</label>
                  <DebouncedTextarea
                    value={block.text || ''}
                    onDebouncedChange={(val) => onUpdate({ text: val })}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                    placeholder="Enter callout warning/info message..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* DIVIDER block input details */}
          {block.type === 'divider' && (
            <div className="py-2 text-center text-xs text-slate-400 italic">
              Horizontal rule divider line. No parameters required.
            </div>
          )}

          {/* SPACER block input details */}
          {block.type === 'spacer' && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Spacer Height (px)</label>
              <input
                type="number"
                value={block.height || 30}
                onChange={(e) => onUpdate({ height: parseInt(e.target.value, 10) || 10 })}
                className="w-32 px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                min={5}
                max={500}
              />
            </div>
          )}

          {/* CODE block input details */}
          {block.type === 'code' && (
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-48">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Language</label>
                  <select
                    value={block.lang || 'javascript'}
                    onChange={(e) => onUpdate({ lang: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="json">JSON</option>
                    <option value="bash">Bash / Shell</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Code contents</label>
                <DebouncedTextarea
                  value={block.text || ''}
                  onDebouncedChange={(val) => onUpdate({ text: val })}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono text-xs bg-slate-900 text-slate-100"
                  placeholder="Paste your source code snippet here"
                />
              </div>
            </div>
          )}

          {/* FAQ block input details */}
          {block.type === 'faq' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">FAQ Question</label>
                <DebouncedInput
                  type="text"
                  value={block.question || ''}
                  onDebouncedChange={(val) => onUpdate({ question: val })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold"
                  placeholder="e.g. How does machine learning prevent automated workflows from breaking?"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">FAQ Answer</label>
                <DebouncedTextarea
                  value={block.answer || ''}
                  onDebouncedChange={(val) => onUpdate({ answer: val })}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                  placeholder="Enter detailed FAQ answer... Support markdown formatting: **bold**, *italic*, `code`"
                />
              </div>
            </div>
          )}

          {/* IMAGE block input details */}
          {block.type === 'image' && (
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Image URL</label>
                    <DebouncedInput
                      type="text"
                      value={block.url || ''}
                      onDebouncedChange={(val) => onUpdate({ url: val })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm"
                      placeholder="Paste image URL here"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      id={`image-upload-${block.id}`}
                      accept="image/*"
                      onChange={handleBlockImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor={`image-upload-${block.id}`}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer font-semibold text-xs transition-all text-slate-600 bg-white"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                          Uploading Block Image...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                          Or Upload Local Image
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {block.url && (
                  <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-white flex-shrink-0 flex items-center justify-center p-1 shadow-inner">
                    <img src={block.url} alt="inline preview" className="w-full h-full object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Alt description</label>
                  <DebouncedInput
                    type="text"
                    value={block.alt || ''}
                    onDebouncedChange={(val) => onUpdate({ alt: val })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white"
                    placeholder="Describe image context"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Visible caption</label>
                  <DebouncedInput
                    type="text"
                    value={block.caption || ''}
                    onDebouncedChange={(val) => onUpdate({ caption: val })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white"
                    placeholder="Enter visible image caption text"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LISTS block input details */}
          {(block.type === 'bulletList' || block.type === 'orderedList') && (
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">List items</label>
              <div className="space-y-2">
                {(block.items || []).map((it, listIdx) => (
                  <div key={listIdx} className="flex gap-2 items-center">
                    <span className="text-slate-400 font-semibold text-xs w-6 text-center select-none">
                      {block.type === 'bulletList' ? '•' : `${listIdx + 1}.`}
                    </span>
                    <DebouncedInput
                      type="text"
                      value={it}
                      onDebouncedChange={(val) => {
                        const newItems = [...(block.items || [])];
                        newItems[listIdx] = val;
                        onUpdate({ items: newItems });
                      }}
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-sm"
                      placeholder={`Enter list item ${listIdx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = (block.items || []).filter((_, idx) => idx !== listIdx);
                        onUpdate({ items: newItems });
                      }}
                      disabled={(block.items || []).length <= 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors disabled:opacity-20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  onUpdate({ items: [...(block.items || []), ''] });
                }}
                className="mt-2 flex items-center gap-1 py-1.5 px-3 border border-slate-200 hover:border-blue-500 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 transition-all"
              >
                <Plus className="h-3 w-3" />
                Add Item
              </button>
            </div>
          )}

          {/* TABLES block input details */}
          {(block.type === 'table' || block.type === 'comparison') && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const header = [...(block.header || []), `Header ${(block.header || []).length + 1}`];
                    const body = (block.body || []).map(row => [...row, 'Cell']);
                    onUpdate({ header, body });
                  }}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Add Column
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if ((block.header || []).length <= 1) return;
                    const header = (block.header || []).slice(0, -1);
                    const body = (block.body || []).map(row => row.slice(0, -1));
                    onUpdate({ header, body });
                  }}
                  disabled={(block.header || []).length <= 1}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30"
                >
                  Remove Column
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const rowLen = (block.header || []).length;
                    const newRow = Array(rowLen).fill('Cell');
                    const body = [...(block.body || []), newRow];
                    onUpdate({ body });
                  }}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Add Row
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if ((block.body || []).length <= 1) return;
                    const body = (block.body || []).slice(0, -1);
                    onUpdate({ body });
                  }}
                  disabled={(block.body || []).length <= 1}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30"
                >
                  Remove Row
                </button>
              </div>

              {/* Table cells grid input */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50">
                      {(block.header || []).map((h, hIdx) => (
                        <th key={hIdx} className="p-2 border border-slate-200">
                          <DebouncedInput
                            type="text"
                            value={h}
                            onDebouncedChange={(val) => {
                              const newHeader = [...(block.header || [])];
                              newHeader[hIdx] = val;
                              onUpdate({ header: newHeader });
                            }}
                            className="w-full bg-transparent font-bold border-none outline-none focus:ring-1 focus:ring-blue-500 p-1"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(block.body || []).map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 border border-slate-200">
                            <DebouncedInput
                              type="text"
                              value={cell}
                              onDebouncedChange={(val) => {
                                const newBody = (block.body || []).map(r => [...r]);
                                newBody[rIdx][cIdx] = val;
                                onUpdate({ body: newBody });
                              }}
                              className="w-full bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 p-1"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOM SECTION block input details (Recursive Blocks) */}
          {block.type === 'custom_section' && (
            <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/20 space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <span className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">Nested Custom Section Container</span>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-100/50 px-2 py-0.5 rounded-full">
                  {(block.children || []).length} Children
                </span>
              </div>
              
              {/* Render Recursive Sub-blocks */}
              <div className="space-y-3">
                {(block.children || []).map((childBlock, childIdx) => (
                  <div key={childBlock.id} className="relative flex gap-2 items-start bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{childBlock.type}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const children = [...(block.children || [])];
                              if (childIdx === 0) return;
                              const temp = children[childIdx];
                              children[childIdx] = children[childIdx - 1];
                              children[childIdx - 1] = temp;
                              onUpdate({ children });
                            }}
                            disabled={childIdx === 0}
                            className="p-0.5 rounded hover:bg-slate-100 disabled:opacity-20 text-slate-400"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const children = [...(block.children || [])];
                              if (childIdx === children.length - 1) return;
                              const temp = children[childIdx];
                              children[childIdx] = children[childIdx + 1];
                              children[childIdx + 1] = temp;
                              onUpdate({ children });
                            }}
                            disabled={childIdx === (block.children || []).length - 1}
                            className="p-0.5 rounded hover:bg-slate-100 disabled:opacity-20 text-slate-400"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const children = (block.children || []).filter((_, idx) => idx !== childIdx);
                              onUpdate({ children });
                            }}
                            className="p-0.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Sub-inputs */}
                      {childBlock.type === 'heading' && (
                        <DebouncedInput
                          type="text"
                          value={childBlock.text || ''}
                          onDebouncedChange={(val) => {
                            const children = [...(block.children || [])];
                            children[childIdx] = { ...children[childIdx], text: val };
                            onUpdate({ children });
                          }}
                          className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                          placeholder="Heading text"
                        />
                      )}
                      {(childBlock.type === 'paragraph' || childBlock.type === 'quote') && (
                        <DebouncedTextarea
                          value={childBlock.text || ''}
                          onDebouncedChange={(val) => {
                            const children = [...(block.children || [])];
                            children[childIdx] = { ...children[childIdx], text: val };
                            onUpdate({ children });
                          }}
                          rows={2}
                          className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                          placeholder="Text text"
                        />
                      )}
                      {childBlock.type === 'image' && (
                        <div className="space-y-2">
                          <DebouncedInput
                            type="text"
                            value={childBlock.url || ''}
                            onDebouncedChange={(val) => {
                              const children = [...(block.children || [])];
                              children[childIdx] = { ...children[childIdx], url: val };
                              onUpdate({ children });
                            }}
                            className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded-lg bg-white"
                            placeholder="Image url"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Append nested block */}
              <div className="flex gap-2 pt-2 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => {
                    const newChild = { id: `child-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, type: 'heading', level: 3, text: '' };
                    onUpdate({ children: [...(block.children || []), newChild] });
                  }}
                  className="px-2 py-1 border border-rose-200 rounded-lg text-[10px] font-bold text-rose-700 bg-white hover:bg-rose-50"
                >
                  + Add Heading
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newChild = { id: `child-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, type: 'paragraph', text: '' };
                    onUpdate({ children: [...(block.children || []), newChild] });
                  }}
                  className="px-2 py-1 border border-rose-200 rounded-lg text-[10px] font-bold text-rose-700 bg-white hover:bg-rose-50"
                >
                  + Add Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newChild = { id: `child-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, type: 'image', url: '', alt: '' };
                    onUpdate({ children: [...(block.children || []), newChild] });
                  }}
                  className="px-2 py-1 border border-rose-200 rounded-lg text-[10px] font-bold text-rose-700 bg-white hover:bg-rose-50"
                >
                  + Add Image
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default BlogEditorModal;
