// // src/routes/Admin/AdminRoutes.tsx
// import { Route } from "react-router-dom";
// import { Fragment } from "react/jsx-runtime";

// import DashboardOverview from "../../components/admin/DashboardOverview";
// import UsersManager from "../../components/admin/UsersManager";
// import BusinessesManager from "../../components/admin/BusinessesManager";
// import ConsultationsManager from "../../components/admin/ConsultationsManager";
// import ContactsManager from "../../components/admin/ContactsManager";
// import CareersManager from "../../pages/admin/CareersManager";
// import EventRoutes from "./EventRoutes";
// import BlogRoutes from "./BlogRoutes";
// import PackageRoutes from "./PackageRoutes";

// const AdminRoutes = () => (
//   <Fragment>
//     {/* /admin/ → DashboardOverview */}
//     <Route index element={<DashboardOverview />} />

//     {/* /admin/users → UsersManager */}
//     <Route path="users" element={<UsersManager />} />

//     {/* /admin/businesses → BusinessesManager */}
//     <Route path="businesses" element={<BusinessesManager />} />

//     {/* /admin/consultations → ConsultationsManager */}
//     <Route path="consultations" element={<ConsultationsManager />} />

//     {/* /admin/contacts → ContactsManager */}
//     <Route path="contacts" element={<ContactsManager />} />

//     {/* /admin/blogs/* → BlogRoutes (handles /admin/blogs and /admin/blogs/new) */}
//     <Route path="blogs/*">{BlogRoutes()}</Route>

//     {/* /admin/events/* → EventRoutes */}
//     <Route path="events/*">{EventRoutes()}</Route>

//     {/* /admin/careers → CareersManager */}
//     <Route path="careers" element={<CareersManager />} />

//     {/* /admin/packages/* -> PackagesManager*/}
//     <Route path="packages/*">{PackageRoutes()}</Route>
//   </Fragment>
// );

// export default AdminRoutes;

// src/routes/Admin/AdminRoutes.tsx
import { Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import DashboardOverview from "../../components/admin/DashboardOverview";
import UsersManager from "../../components/admin/UsersManager";
import BusinessesManager from "../../components/admin/BusinessesManager";
import ConsultationsManager from "../../components/admin/ConsultationsManager";
import ContactsManager from "../../components/admin/ContactsManager";
import BlogManager from "../../components/admin/Blog";

const AdminRoutes = () => (
  <Fragment>
    {/* /admin/ → DashboardOverview */}
    <Route index element={<DashboardOverview />} />

    {/* /admin/users → UsersManager */}
    <Route path="users" element={<UsersManager />} />

    {/* /admin/businesses → BusinessesManager */}
    <Route path="businesses" element={<BusinessesManager />} />

    {/* /admin/blogs → BlogManager (view only, toggle publish) */}
    <Route path="blogs" element={<BlogManager />} />

    {/* /admin/consultations → ConsultationsManager */}
    <Route path="consultations" element={<ConsultationsManager />} />

    {/* /admin/contacts → ContactsManager */}
    <Route path="contacts" element={<ContactsManager />} />
  </Fragment>
);

export default AdminRoutes;