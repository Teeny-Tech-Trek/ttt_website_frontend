// src/pages/admin/BlogManager.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getBlogsByStatus,
  archiveBlogs,
  reactivateBlog,
} from "../../services/blogService";
import { Blog } from "../../types/blog";
import { Link } from "react-router-dom";

// Restrict to the statuses your backend supports (must match your DB’s “status” column)
const BLOG_STATUS_OPTIONS = ["draft", "published", "archived"] as const;
type BlogStatus = (typeof BLOG_STATUS_OPTIONS)[number];

const BlogManager: React.FC = () => {
  const { user, accessToken } = useAuth();

  // Start with “draft” (you can choose any default)
  const [statusFilter, setStatusFilter] = useState<BlogStatus>("draft");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs by status
  const fetchByStatus = async (status: BlogStatus) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getBlogsByStatus(status, accessToken);
      setBlogs(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load blogs by status.");
    } finally {
      setLoading(false);
    }
  };

  // Whenever statusFilter (or user/accessToken) changes, re‐fetch
  useEffect(() => {
    if (user?.role === "admin" && accessToken) {
      fetchByStatus(statusFilter);
    }
  }, [statusFilter, user, accessToken]);

  // If not an admin, deny access
  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  // Toggle archive/reactivate and then re‐fetch current status
  const handleToggleActive = async (blog: Blog) => {
    if (!accessToken) return;

    try {
      if (blog.deleted_at || blog.status === "archived") {
        // Reactivate
        await reactivateBlog(blog.id, accessToken);
      } else {
        // Archive
        await archiveBlogs([blog.id], accessToken);
      }
      // After toggling, re-fetch the current statusFilter
      fetchByStatus(statusFilter);
    } catch (err: any) {
      console.error(err);
      alert("Failed to toggle archive state.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header + “New Post” button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Blog Management
        </h1>
        <Link to="/admin/blogs/new">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            New Post
          </button>
        </Link>
      </div>

      {/* Status filter dropdown / Refresh */}
      <div className="flex items-center gap-4">
        <label className="font-medium">Show status:</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as BlogStatus)
          }
          className="px-3 py-2 border rounded-md"
          style={{ borderColor: "#3e6aa7" }}
        >
          {BLOG_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={() => fetchByStatus(statusFilter)}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-6">
        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && blogs.length === 0 && (
          <p className="text-gray-500">No blog posts found.</p>
        )}

        {!loading && blogs.length > 0 && (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Slug</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Views</th>
                <th className="p-2 text-left">Created At</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => {
                const isArchived =
                  blog.status === "archived" || !!blog.deleted_at;

                return (
                  <tr key={blog.id} className="border-b">
                    <td className="p-2">{blog.title || "—"}</td>
                    <td className="p-2">{blog.slug || "—"}</td>
                    <td className="p-2">{blog.status}</td>
                    <td className="p-2">{blog.views_count}</td>
                    <td className="p-2">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2 space-x-2">
                      <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggleActive(blog)}
                        className={`px-2 py-1 text-sm rounded-md focus:outline-none ${
                          isArchived
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isArchived ? "Reactivate" : "Archive"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
