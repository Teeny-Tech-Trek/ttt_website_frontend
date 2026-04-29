// src/pages/admin/ConsultationsManager.tsx
import { useState, useEffect } from 'react';
import { listConsultations, Consultation } from '../../services/adminService';
import { Search, MessageSquare, User, Mail, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';

const ConsultationsManager = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    const filtered = consultations.filter(
      (consultation) =>
        consultation.userId?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.userId?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConsultations(filtered);
  }, [searchTerm, consultations]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const data = await listConsultations();
      setConsultations(data);
      setFilteredConsultations(data);
    } catch (err) {
      console.error('Failed to fetch consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-900"></div>
      </div>
    );
  }

  const pendingCount = consultations.filter(c => c.status === 'pending').length;
  const completedCount = consultations.filter(c => c.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Consultations</h1>
        <p className="text-slate-600">View and manage all consultation requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 bg-white border-l-4 border-blue-900 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Requests</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{consultations.length}</p>
            </div>
            <div className="p-4 rounded-full bg-blue-50">
              <MessageSquare size={28} className="text-blue-900" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-amber-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{pendingCount}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-full">
              <AlertCircle size={28} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border-l-4 border-green-600 shadow-lg rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{completedCount}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-full">
              <CheckCircle size={28} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="relative">
          <Search className="absolute text-slate-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search consultations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 transition-all border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation) => (
          <div
            key={consultation._id}
            onClick={() => setSelectedConsultation(consultation)}
            className="p-6 transition-all bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-blue-900 to-blue-700">
                  {consultation.userId?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {consultation.userId?.username || 'Unknown User'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={14} />
                    {consultation.userId?.email || 'No email'}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                    consultation.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {consultation.status === 'pending' ? '⏳ Pending' : '✓ Completed'}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={14} />
                  {new Date(consultation.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <p className="text-slate-700 line-clamp-2">{consultation.message}</p>
            <div className="mt-4 text-sm font-semibold text-blue-900">
              Click to view details →
            </div>
          </div>
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <div className="py-16 text-center bg-white shadow-lg rounded-xl">
          <MessageSquare size={64} className="mx-auto mb-4 text-slate-300" />
          <h3 className="mb-2 text-xl font-bold text-slate-800">No consultations found</h3>
          <p className="text-slate-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedConsultation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedConsultation(null)}
        >
          <div
            className="w-full max-w-2xl overflow-y-auto bg-white shadow-2xl max-h-[80vh] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Consultation Details</h2>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="p-2 transition-all rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 mb-6 space-y-4 border-2 border-blue-100 bg-blue-50/50 rounded-xl">
                <h3 className="font-bold text-blue-900">User Information</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Name:</span> {selectedConsultation.userId?.username || 'N/A'}</p>
                  <p><span className="font-semibold">Email:</span> {selectedConsultation.userId?.email || 'N/A'}</p>
                  <p><span className="font-semibold">User ID:</span> <span className="font-mono text-xs">{selectedConsultation.userId?._id || 'N/A'}</span></p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-slate-900">Message</h3>
                <p className="p-4 whitespace-pre-wrap border-2 rounded-xl text-slate-700 bg-slate-50 border-slate-200">{selectedConsultation.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-bold text-slate-900">Status</h3>
                  <span
                    className={`px-4 py-2 inline-block text-sm font-bold rounded-lg ${
                      selectedConsultation.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {selectedConsultation.status}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-slate-900">Date</h3>
                  <p className="text-slate-700">{new Date(selectedConsultation.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationsManager;