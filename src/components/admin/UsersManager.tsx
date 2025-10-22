// src/pages/admin/UsersManager.tsx
import { useState, useEffect } from 'react';
import { listUsers, deleteUser, User } from '../../services/adminService';
import { Trash2, Search, UserCheck, Shield, Calendar, Mail } from 'lucide-react';

const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users Management</h1>
          <p className="text-slate-600">Manage all registered users on the platform</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 bg-white border-l-4 border-blue-900 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{users.length}</p>
            </div>
            <div className="p-4 rounded-full bg-blue-50">
              <UserCheck size={28} className="text-blue-900" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-purple-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Admins</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {users.filter((u) => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-full">
              <Shield size={28} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-green-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Regular Users</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {users.filter((u) => u.role !== 'admin').length}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-full">
              <UserCheck size={28} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="relative">
          <Search className="absolute text-slate-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 transition-all border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 bg-slate-50 border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  Provider
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-blue-900 to-blue-700">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.username}</div>
                        <div className="text-xs text-slate-500">ID: {user._id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={16} className="text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}
                    >
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium border rounded-full text-slate-600 bg-slate-50 border-slate-200">
                      {user.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} className="text-slate-400" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {deleteConfirm === user._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-4 py-2 text-xs font-bold text-white transition-all bg-red-600 rounded-lg hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-4 py-2 text-xs font-bold transition-all border-2 rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(user._id)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 transition-all border-2 border-red-200 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-16 text-center bg-white shadow-lg rounded-xl">
          <UserCheck size={64} className="mx-auto mb-4 text-slate-300" />
          <h3 className="mb-2 text-xl font-bold text-slate-800">No users found</h3>
          <p className="text-slate-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default UsersManager;