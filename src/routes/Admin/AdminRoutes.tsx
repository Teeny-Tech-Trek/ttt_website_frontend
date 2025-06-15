// src/routes/Admin/AdminRoutes.tsx
import { Route } from "react-router-dom";

import DashboardOverview from "../../pages/admin/DashboardOverview";
import CareersManager from "../../pages/admin/CareersManager";
import EventRoutes from "./EventRoutes";
import BlogRoutes from "./BlogRoutes";
import { Fragment } from "react/jsx-runtime";
import PackageRoutes from "./PackageRoutes";

const AdminRoutes = () => (
  <Fragment>
    {/* /admin/ → DashboardOverview */}
    <Route index element={<DashboardOverview />} />

    {/* /admin/blogs/* → BlogRoutes (handles /admin/blogs and /admin/blogs/new) */}
    <Route path="blogs/*">{BlogRoutes()}</Route>

    {/* /admin/events/* → EventRoutes */}
    <Route path="events/*">{EventRoutes()}</Route>

    {/* /admin/careers → CareersManager */}
    <Route path="careers" element={<CareersManager />} />

    {/* /admin/packages/* -> PackagesManager*/}
    <Route path="packages/*">{PackageRoutes()}</Route>
  </Fragment>
);

export default AdminRoutes;
