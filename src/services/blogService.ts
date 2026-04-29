// src/api/blogs.ts
import api from '../api/axios'; // your preconfigured axios instance
import { Blog, BlogInput } from '../types/blog';

interface SearchParams {
  field: 'slug' | 'author_id' | 'id';
  value: string;
}

/**
 * Helper to attach Authorization header if token is provided.
 */
function authHeaders(token?: string) {
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    : { withCredentials: true };
}

/**
 * Public: fetch all published blogs
 * GET /api/blogs/list
 */
export async function getPublicBlogs(): Promise<Blog[]> {
  const resp = await api.get<Blog[]>('/blogs/list');
  return resp.data;
}

/**
 * Public or Admin: fetch single blog by ID
 * GET /api/blogs/:id
 *
 * If token is provided, backend will treat the request as “admin” (any status).
 * Otherwise, only published + not deleted is returned.
 */
export async function getBlogById(
  id: string,
  token?: string
): Promise<Blog> {
  const config = authHeaders(token);
  const resp = await api.get<Blog>(`/blogs/${id}`, config);
  return resp.data;
}

/**
 * Public or Admin: search blogs by arbitrary field (slug or author_id)
 * GET /api/blogs/search?field=slug&value=some-slug
 *
 * If token is provided, returns any status. Otherwise only published.
 */
export async function searchBlogs(
  params: SearchParams,
  token?: string
): Promise<Blog[]> {
  const config = {
    ...authHeaders(token),
    params: {
      field: params.field,
      value: params.value,
    },
  };
  const resp = await api.get<Blog[]>('/blogs/search', config);
  return resp.data;
}

/**
 * Admin only: fetch blogs by status
 * Internally just calls searchBlogs({ field: "status", value: <status> })
 */
export async function getBlogsByStatus(
    status: string,
    token: string
  ): Promise<Blog[]> {
    // We reuse the “searchBlogs” endpoint:
    const config = {
      ...authHeaders(token),
      params: { field: "status", value: status },
    };
    const resp = await api.get<Blog[]>("/blogs/search", config);
    return resp.data;
  }  

/**
 * Admin only: fetch all blogs (no status filter)
 * GET /api/blogs
 */
export async function getAllBlogs(token: string): Promise<Blog[]> {
  const config = authHeaders(token);
  const resp = await api.get<Blog[]>('/blogs', config);
  return resp.data;
}

/**
 * Admin only: create a new blog (draft or published)
 * POST /api/blogs
 */
export async function createBlog(
  data: BlogInput,
  token: string
): Promise<Blog> {
  const config = authHeaders(token);
  const resp = await api.post<Blog>('/blogs', data, config);
  return resp.data;
}

/**
 * Admin only: edit a single blog by ID
 * PUT /api/blogs/:id
 */
export async function editBlog(
  id: string,
  data: Partial<BlogInput>,
  token: string
): Promise<Blog> {
  const config = authHeaders(token);
  const resp = await api.put<Blog>(`/blogs/${id}`, data, config);
  return resp.data;
}

/**
 * Admin only: archive multiple blogs
 * PUT /api/blogs/archive   body: { ids: string[] }
 */
export async function archiveBlogs(
  ids: string[],
  token: string
): Promise<{ message: string }> {
  const config = authHeaders(token);
  const resp = await api.put<{ message: string }>(
    '/blogs/archive',
    { ids },
    config
  );
  return resp.data;
}

/**
 * Admin only: reactivate one archived blog
 * PUT /api/blogs/:id/reactivate
 */
export async function reactivateBlog(
  id: string,
  token: string
): Promise<Blog> {
  const config = authHeaders(token);
  const resp = await api.put<Blog>(`/blogs/${id}/reactivate`, {}, config);
  return resp.data;
}
