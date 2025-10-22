// src/pages/admin/ContactsManager.tsx
import { useState, useEffect } from 'react';
import { listContacts, Contact } from '../../services/adminService';
import { Search, Mail, Phone, User, Calendar, X, ExternalLink } from 'lucide-react';

export const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await listContacts();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
        <p className="text-slate-600">View and manage all contact form submissions</p>
      </div>

      <div className="p-6 bg-white border-l-4 border-blue-900 shadow-lg rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Total Messages</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{contacts.length}</p>
          </div>
          <div className="p-4 rounded-full bg-blue-50">
            <Mail size={32} className="text-blue-900" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="relative">
          <Search className="absolute text-slate-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 transition-all border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredContacts.map((contact) => (
          <div
            key={contact._id}
            onClick={() => setSelectedContact(contact)}
            className="p-6 transition-all bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-br from-blue-900 to-blue-700">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{contact.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={14} />
                    {contact.email}
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Phone size={14} />
                      {contact.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar size={14} />
                {new Date(contact.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-slate-700 line-clamp-3">{contact.message}</p>
            <div className="mt-4 text-sm font-semibold text-blue-900">
              Click to view details →
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="py-16 text-center bg-white shadow-lg rounded-xl">
          <Mail size={64} className="mx-auto mb-4 text-slate-300" />
          <h3 className="mb-2 text-xl font-bold text-slate-800">No messages found</h3>
          <p className="text-slate-600">Try adjusting your search criteria</p>
        </div>
      )}

      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="w-full max-w-2xl overflow-y-auto bg-white shadow-2xl max-h-[80vh] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 transition-all rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 mb-6 space-y-3 border-2 border-blue-100 bg-blue-50/50 rounded-xl">
                <h3 className="font-bold text-blue-900">Contact Information</h3>
                <p><span className="font-semibold">Name:</span> {selectedContact.name}</p>
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-900 hover:underline">
                    {selectedContact.email}
                  </a>
                </p>
                {selectedContact.phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-900 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </p>
                )}
              </div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-slate-900">Message</h3>
                <p className="p-4 whitespace-pre-wrap border-2 rounded-xl text-slate-700 bg-slate-50 border-slate-200">
                  {selectedContact.message}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-slate-900">Submitted On</h3>
                <p className="text-slate-700">{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-all shadow-lg bg-blue-900 rounded-xl hover:bg-blue-800"
                >
                  <Mail size={18} />
                  Reply via Email
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-all bg-green-600 shadow-lg rounded-xl hover:bg-green-700"
                  >
                    <Phone size={18} />
                    Call
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;