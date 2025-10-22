// src/pages/admin/DashboardOverview.tsx
import { useState, useEffect } from 'react';
import { getDashboardStats, DashboardStats } from '../../services/adminService';
import { Users, Briefcase, FileText, MessageSquare, Mail, TrendingUp, Activity, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.users || 0,
      icon: Users,
      color: 'from-blue-900 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-900',
      link: '/admin/users',
      change: '+12%'
    },
    {
      title: 'Businesses',
      value: stats?.businesses || 0,
      icon: Briefcase,
      color: 'from-purple-600 to-purple-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/admin/businesses',
      change: '+8%'
    },
    {
      title: 'Blog Posts',
      value: stats?.blogs || 0,
      icon: FileText,
      color: 'from-green-600 to-green-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/admin/blogs',
      change: '+15%'
    },
    {
      title: 'Discussions',
      value: stats?.discussions || 0,
      icon: MessageSquare,
      color: 'from-amber-600 to-amber-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      link: '/admin/consultations',
      change: '+23%'
    },
    {
      title: 'Consultations',
      value: stats?.consultations || 0,
      icon: Activity,
      color: 'from-pink-600 to-pink-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      link: '/admin/consultations',
      change: '+18%'
    },
    {
      title: 'Messages',
      value: stats?.contacts || 0,
      icon: Mail,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/admin/contacts',
      change: '+10%'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-900"></div>
          <Bot className="absolute text-blue-900 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse" size={32} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-red-200 shadow-lg bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Activity className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-red-900">Error Loading Stats</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchStats}
          className="px-6 py-2 font-medium text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 shadow-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.bgColor} transition-transform group-hover:scale-110`}>
                    <Icon className={card.iconColor} size={24} />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    <TrendingUp size={12} />
                    {card.change}
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-medium text-slate-600">{card.title}</h3>
                <p className="text-3xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                <div className="mt-4 text-sm font-medium text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-900">
            <Bot className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/admin/users"
            className="p-6 transition-all border-2 border-blue-100 group rounded-xl hover:border-blue-900 hover:bg-blue-50"
          >
            <Users className="mb-3 text-blue-900" size={28} />
            <h3 className="mb-2 font-bold text-slate-800">Manage Users</h3>
            <p className="text-sm text-slate-600">View and manage all registered users</p>
            <div className="mt-4 text-sm font-semibold text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
              Go to Users →
            </div>
          </Link>
          <Link
            to="/admin/blogs"
            className="p-6 transition-all border-2 border-green-100 group rounded-xl hover:border-green-600 hover:bg-green-50"
          >
            <FileText className="mb-3 text-green-600" size={28} />
            <h3 className="mb-2 font-bold text-slate-800">Create Content</h3>
            <p className="text-sm text-slate-600">Write and publish new blog posts</p>
            <div className="mt-4 text-sm font-semibold text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Go to Blogs →
            </div>
          </Link>
          <Link
            to="/admin/contacts"
            className="p-6 transition-all border-2 border-purple-100 group rounded-xl hover:border-purple-600 hover:bg-purple-50"
          >
            <Mail className="mb-3 text-purple-600" size={28} />
            <h3 className="mb-2 font-bold text-slate-800">View Messages</h3>
            <p className="text-sm text-slate-600">Check recent contact submissions</p>
            <div className="mt-4 text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Go to Contacts →
            </div>
          </Link>
        </div>
      </div>

      {/* Platform Info */}
      <div className="p-6 shadow-lg bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={24} />
              <h3 className="text-lg font-bold">AI Agents Platform</h3>
            </div>
            <p className="mb-4 text-blue-100">Empowering businesses with intelligent automation</p>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-blue-200">Active Agents</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div>
                <p className="text-blue-200">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <div>
                <p className="text-blue-200">Response Time</p>
                <p className="text-2xl font-bold">&lt; 2s</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <Activity className="text-white animate-pulse" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;