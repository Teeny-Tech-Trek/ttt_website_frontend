// src/pages/admin/AdminCRM.tsx
// Single-page internal Admin CRM: consultation bookings + chatbot leads.
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, MessageSquare, X, Loader2, RefreshCw } from 'lucide-react';
import {
  getConsultations,
  getChatbotLeads,
  logout,
  getStoredAdmin,
  isAuthenticated,
  type ConsultationBooking,
  type ChatbotLead,
} from '../../services/adminCrmService';

const formatDate = (value?: string) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (value?: string) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

type DetailField = { label: string; value: React.ReactNode };

const DetailModal: React.FC<{ title: string; fields: DetailField[]; onClose: () => void }> = ({
  title,
  fields,
  onClose,
}) => (
  // Blurred, dimmed backdrop. Clicking it closes the modal.
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-card-hover w-full max-w-lg max-h-[85vh] overflow-y-auto animate-fade-in-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-xs uppercase tracking-wide text-gray-400">{f.label}</p>
            <div className="text-sm text-gray-900 break-words mt-0.5">{f.value || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminCRM: React.FC = () => {
  const navigate = useNavigate();
  const admin = getStoredAdmin();

  const [tab, setTab] = useState<'consultations' | 'leads'>('consultations');
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [leads, setLeads] = useState<ChatbotLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationBooking | null>(null);
  const [selectedLead, setSelectedLead] = useState<ChatbotLead | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [c, l] = await Promise.all([getConsultations(), getChatbotLeads()]);
      setConsultations(c);
      setLeads(l);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(err?.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const meetLinkEl = (link?: string) =>
    link ? (
      <a href={link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
        Join
      </a>
    ) : (
      <span className="text-gray-400">—</span>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-primary">Teeny Tech Trek</h1>
            <p className="text-xs text-gray-500">Admin CRM Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">{admin?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setTab('consultations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'consultations'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-4 w-4" /> Consultation Bookings ({consultations.length})
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'leads'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Chatbot Leads ({leads.length})
          </button>
          <button
            onClick={load}
            className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 border border-red-100 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
            {/* SECTION 1: Consultation bookings */}
            {tab === 'consultations' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Meeting Link</th>
                      <th className="px-4 py-3 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {consultations.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                          No consultation bookings yet.
                        </td>
                      </tr>
                    )}
                    {consultations.map((c) => (
                      <tr
                        key={c._id}
                        onClick={() => setSelectedConsultation(c)}
                        className="hover:bg-primary-100/40 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                        <td className="px-4 py-3 text-gray-600">{c.email}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(c.startTime)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatTime(c.startTime)}</td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          {meetLinkEl(c.googleMeetLink)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(c.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SECTION 2: Chatbot leads */}
            {tab === 'leads' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Interested Service</th>
                      <th className="px-4 py-3 font-medium">Message</th>
                      <th className="px-4 py-3 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                          No chatbot leads yet.
                        </td>
                      </tr>
                    )}
                    {leads.map((l) => (
                      <tr
                        key={l._id}
                        onClick={() => setSelectedLead(l)}
                        className="hover:bg-primary-100/40 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{l.name}</td>
                        <td className="px-4 py-3 text-gray-600">{l.email}</td>
                        <td className="px-4 py-3 text-gray-600">{l.service || '—'}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{l.message || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(l.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Consultation detail modal */}
      {selectedConsultation && (
        <DetailModal
          title="Consultation Booking"
          onClose={() => setSelectedConsultation(null)}
          fields={[
            { label: 'Name', value: selectedConsultation.name },
            { label: 'Email', value: selectedConsultation.email },
            { label: 'Date', value: formatDate(selectedConsultation.startTime) },
            {
              label: 'Time',
              value: `${formatTime(selectedConsultation.startTime)} – ${formatTime(
                selectedConsultation.endTime
              )}`,
            },
            { label: 'Status', value: selectedConsultation.status },
            {
              label: 'Meeting Link',
              value: selectedConsultation.googleMeetLink ? (
                <a
                  href={selectedConsultation.googleMeetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {selectedConsultation.googleMeetLink}
                </a>
              ) : (
                '—'
              ),
            },
            {
              label: 'Calendar Event',
              value: selectedConsultation.eventLink ? (
                <a
                  href={selectedConsultation.eventLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  Open in Google Calendar
                </a>
              ) : (
                '—'
              ),
            },
            {
              label: 'Additional Form Data',
              value:
                selectedConsultation.formData &&
                Object.keys(selectedConsultation.formData).length > 0 ? (
                  <pre className="bg-gray-50 rounded-lg p-3 text-xs whitespace-pre-wrap">
                    {JSON.stringify(selectedConsultation.formData, null, 2)}
                  </pre>
                ) : (
                  '—'
                ),
            },
            { label: 'Created', value: `${formatDate(selectedConsultation.createdAt)} ${formatTime(selectedConsultation.createdAt)}` },
          ]}
        />
      )}

      {/* Chatbot lead detail modal */}
      {selectedLead && (
        <DetailModal
          title="Chatbot Lead"
          onClose={() => setSelectedLead(null)}
          fields={[
            { label: 'Name', value: selectedLead.name },
            { label: 'Email', value: selectedLead.email },
            { label: 'Interested Service', value: selectedLead.service },
            {
              label: 'Message',
              value: selectedLead.message ? (
                <p className="whitespace-pre-wrap">{selectedLead.message}</p>
              ) : (
                '—'
              ),
            },
            { label: 'Session ID', value: selectedLead.session_id },
            { label: 'Created', value: formatDate(selectedLead.created_at) },
          ]}
        />
      )}
    </div>
  );
};

export default AdminCRM;
