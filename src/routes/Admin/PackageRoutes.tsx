// src/routes/Admin/PackageRoutes.tsx
import { Route } from "react-router-dom";
import PackageManager from "../../pages/admin/PackageManager";
import { Fragment } from "react/jsx-runtime";
import CreatePackage from "../../pages/admin/CreatePackage";
// import PackageEdit   from "../../pages/admin/PackageEdit"; // if you have one

const PackageRoutes = () => (
  <Fragment>
    {/* /admin/packages → PackageManager */}
    <Route index element={<PackageManager />} />

    {/* /admin/packages/new → PackageCreate */}
    <Route path="new" element={<CreatePackage />} />

    {/* /admin/packages/edit/:id → PackageEdit (if implemented) */}
    {/* <Route path="edit/:id" element={<PackageEdit />} /> */}
  </Fragment>
);

export default PackageRoutes;
