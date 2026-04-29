// src/routes/Admin/EventRoutes.tsx
import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AdminEventCreate from '../../pages/admin/CreateEvent';
// import AdminEventEdit from '../../pages/admin/EditEvent';
import EventManager from '../../pages/admin/EventsManager';

const EventRoutes = () => (
  <Fragment>
    {/* /admin/events/  → EventManager (list of events) */}
    <Route index element={<EventManager />} />

    {/* /admin/events/new  → AdminEventCreate  */}
    <Route path="new" element={<AdminEventCreate />} />

    {/* /admin/events/edit/:id  → AdminEventEdit  */}
    {/* <Route path="edit/:id" element={<AdminEventEdit />} /> */}
  </Fragment>
);

export default EventRoutes;
