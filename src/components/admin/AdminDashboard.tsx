// // src/pages/admin/AdminDashboard.tsx
// import { useState, useEffect } from 'react';
// import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import {
//   LayoutDashboard,
//   Users,
//   Briefcase,
//   FileText,
//   MessageSquare,
//   Mail,
//   LogOut,
//   Menu,
//   X,
//   Calendar,
//   Package,
//   Bot,
//   Sparkles
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/#home');
//   };

//  const navItems = [
//   { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
//   { path: '/admin/users', label: 'Users', icon: Users },
//   { path: '/admin/businesses', label: 'Businesses', icon: Briefcase },
//   { path: '/admin/blogs', label: 'Blogs', icon: FileText },
//   { path: '/admin/consultations', label: 'Consultations', icon: MessageSquare },
//   { path: '/admin/contacts', label: 'Contacts', icon: Mail },
// ];

//   const isActive = (path: string) => {
//     if (path === '/admin') {
//       return location.pathname === '/admin';
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? 'w-72' : 'w-20'
//         } bg-white border-r border-slate-200 shadow-xl transition-all duration-300 ease-in-out flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-slate-100">
//           {sidebarOpen && (
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-900 rounded-lg">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold text-blue-900">Admin Panel</h1>
//                 <p className="text-xs text-slate-500">AI Agents Platform</p>
//               </div>
//             </div>
//           )}
//           {!sidebarOpen && (
//             <div className="flex justify-center w-full">
//               <div className="p-2 bg-blue-900 rounded-lg">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           )}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 transition-all rounded-lg hover:bg-slate-100 text-slate-600"
//           >
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.path);
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
//                   active
//                     ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30'
//                     : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'
//                 }`}
//               >
//                 <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
//                 {sidebarOpen && (
//                   <span className="font-medium">{item.label}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User Info & Logout */}
//         <div className="p-4 border-t border-slate-100">
//           <div className={`flex items-center gap-3 mb-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 ${!sidebarOpen && 'justify-center'}`}>
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg">
//               <span className="font-bold text-white">
//                 {user?.username?.charAt(0).toUpperCase() || 'A'}
//               </span>
//             </div>
//             {sidebarOpen && (
//               <div>
//                 <p className="text-sm font-semibold text-slate-800">{user?.username || 'Admin'}</p>
//                 <p className="text-xs text-slate-500">{user?.email || 'admin@teenytechtrek.com'}</p>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={handleLogout}
//             className={`flex items-center gap-2 w-full px-4 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl transition-all font-medium ${
//               !sidebarOpen && 'justify-center'
//             }`}
//           >
//             <LogOut size={18} />
//             {sidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           {/* Header Bar */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user?.username || 'Admin'}!</h2>
//               <p className="text-slate-500">Manage your AI agents platform from here</p>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-xl shadow-sm">
//               <Sparkles className="w-5 h-5 text-blue-900" />
//               <span className="font-medium text-slate-700">AI Platform v1.0</span>
//             </div>
//           </div>

//           {/* Content */}
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
// src/pages/admin/AdminDashboard.tsx
import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Mail,
  LogOut,
  Menu,
  X,
  Bot,
  Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/businesses', label: 'Businesses', icon: Briefcase },
    { path: '/admin/blogs', label: 'Blogs', icon: FileText },
    { path: '/admin/consultations', label: 'Consultations', icon: MessageSquare },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-white border-r border-slate-200 shadow-xl transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-blue-900">Admin Panel</h1>
                <p className="text-xs text-slate-500">AI Agents Platform</p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="flex justify-center w-full">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 transition-all rounded-lg hover:bg-slate-100 text-slate-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  active
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'
                }`}
              >
                <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 mb-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 ${!sidebarOpen && 'justify-center'}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg">
              <span className="font-bold text-white">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-semibold text-slate-800">{user?.username || 'Admin'}</p>
                <p className="text-xs text-slate-500">{user?.email || 'admin@teenytechtrek.com'}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-4 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl transition-all font-medium ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user?.username || 'Admin'}!</h2>
              <p className="text-slate-500">Manage your AI agents platform from here</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-xl shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-900" />
              <span className="font-medium text-slate-700">AI Platform v1.0</span>
            </div>
          </div>

          {/* Content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;