import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getEventsByStatus } from "../../services/eventService";
import { Event, EventStatus } from "../../types/event";
import { Link } from "react-router-dom";

const EVENTS_STATUS_OPTIONS: EventStatus[] = [
  "draft",
  "published",
  "cancelled",
  "completed",
];

const EventsManager: React.FC = () => {
  const { user, accessToken } = useAuth();
  const [statusFilter, setStatusFilter] = useState<EventStatus>("draft");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByStatus = async (status: EventStatus) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getEventsByStatus(status, accessToken);
      setEvents(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin" && accessToken) {
      fetchByStatus(statusFilter);
    }
  }, [statusFilter, user, accessToken]);

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Events Management
        </h1>
        <Link to="/admin/events/new">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            New Event
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium">Show status:</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as EventStatus)
          }
          className="px-3 py-2 border rounded-md"
          style={{ borderColor: "#3e6aa7" }}
        >
          {EVENTS_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={() => fetchByStatus(statusFilter)}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && events.length === 0 && (
          <p className="text-gray-500">No events found.</p>
        )}

        {!loading && events.length > 0 && (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Slug</th>
                <th className="p-2 text-left">Start</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id} className="border-b">
                  <td className="p-2">{ev.title || "—"}</td>
                  <td className="p-2">{ev.slug || "—"}</td>
                  <td className="p-2">
                    {ev.start_time
                      ? new Date(ev.start_time).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-2">{ev.status}</td>
                  <td className="p-2 space-x-2">
                    <Link
                      to={`/admin/events/edit/${ev.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    {/* Example: You could wire up delete/cancel here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EventsManager;
