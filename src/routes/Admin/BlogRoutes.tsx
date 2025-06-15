// src/routes/Admin/BlogRoutes.tsx
import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import BlogManager from '../../pages/admin/BlogManager';
import CreateBlogPage from '../../pages/admin/CreateBlog';
// import BlogEdit from '../../pages/admin/EditBlog';

const BlogRoutes = () => (
  <Fragment>
    {/* /admin/blogs/  → list of blogs  */}
    <Route index element={<BlogManager />} />

    {/* /admin/blogs/new  → create page  */}
    <Route path="new" element={<CreateBlogPage />} />

    {/* /admin/blogs/edit/:id  → edit page */}
    {/* <Route path="edit/:id" element={<BlogEdit />} /> */}
  </Fragment>
);

export default BlogRoutes;
