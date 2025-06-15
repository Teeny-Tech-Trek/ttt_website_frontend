import React from 'react';
import { Users, FileText, Calendar, Briefcase } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '0', icon: Users, color: 'bg-blue-500' },
    { title: 'Blog Posts', value: '0', icon: FileText, color: 'bg-green-500' },
    { title: 'Events', value: '0', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Job Positions', value: '0', icon: Briefcase, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500">No recent activity</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Create New Blog Post
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Add New Event
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Post Job Opening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;