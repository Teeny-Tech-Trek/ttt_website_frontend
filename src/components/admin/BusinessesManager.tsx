// src/pages/admin/BusinessesManager.tsx
import { useState, useEffect } from 'react';
import { listBusinesses, Business } from '../../services/adminService';
import { Search, Briefcase, Calendar } from 'lucide-react';

const BusinessesManager = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    const filtered = businesses.filter((business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchTerm, businesses]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await listBusinesses();
      setBusinesses(data);
      setFilteredBusinesses(data);
    } catch (err) {
      console.error('Failed to fetch businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Businesses Management</h1>
        <p className="text-gray-600">View and manage all registered businesses</p>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search businesses by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Businesses</p>
              <p className="text-2xl font-bold">{businesses.length}</p>
            </div>
            <Briefcase size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <div
            key={business._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => setSelectedBusiness(business)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Briefcase className="text-purple-600" size={24} />
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {new Date(business.createdAt).toLocaleDateString()}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                {business.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {business.description}
              </p>
            </div>
            <div className="bg-purple-50 px-6 py-3">
              <button className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No businesses found</p>
        </div>
      )}

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBusiness(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedBusiness.name}
                </h2>
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Description</label>
                  <p className="mt-1 text-gray-800">{selectedBusiness.description}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Business ID</label>
                  <p className="mt-1 text-gray-800 font-mono text-sm">{selectedBusiness._id}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Created At</label>
                  <p className="mt-1 text-gray-800">
                    {new Date(selectedBusiness.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessesManager;