// src/pages/admin/CreateEvent.tsx
import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { createEvent, updateEvent } from "../../services/eventService";
import { useNavigate } from "react-router-dom";
import { EventInput, EventStatus } from "../../types/event";

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const EVENT_STATUS: { value: EventStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

export default function CreateEventPage() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [status, setStatus] = useState<EventStatus>("draft");
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Must be logged in as admin
    if (!accessToken || !user || user.role !== "admin") {
      setMessage("You must be logged in as an admin to create an event.");
      return;
    }

    setLoading(true);
    setMessage("Creating event…");

    try {
      // 1) Create the event with default status = "draft"
      const payload: EventInput = {
        created_by: user.sub,
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        location: location.trim(),
        start_time: startTime ? new Date(startTime).toISOString() : "",
        end_time: endTime ? new Date(endTime).toISOString() : "",
        registration_deadline: registrationDeadline
          ? new Date(registrationDeadline).toISOString()
          : "",
        payment_required: paymentRequired,
        // Note: createEvent does not accept "status"—it defaults to "draft".
      };

      const createdEvent = await createEvent(payload, accessToken);

      // 2) If the selected status is anything other than "draft", immediately update it:
      if (status !== "draft") {
        await updateEvent(
          createdEvent.id,
          { status },
          accessToken
        );
      }

      setMessage("Event created successfully!");
      // Redirect to the admin events list page
      navigate("/admin/events");
    } catch (err: any) {
      console.error(err);
      // If the backend provided an error message, show it; otherwise a generic one
      setMessage(err.response?.data?.error || "Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  // If not an admin, show access‐denied
  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "40px 0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-xl mx-auto rounded-lg shadow-lg p-8 flex flex-col gap-6"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: PRIMARY }}
        >
          Admin: Create New Event
        </h2>

        <label className="font-medium">
          Event Title
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          />
        </label>

        <label className="font-medium">
          Slug (for URL)
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. ai-bootcamp-june2025"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          />
        </label>

        <label className="font-medium">
          Description
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          />
        </label>

        <label className="font-medium">
          Location
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Mohali Convention Centre"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          />
        </label>

        <div className="flex gap-4">
          <label className="font-medium flex-1">
            Start Time
            <input
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
            />
          </label>
          <label className="font-medium flex-1">
            End Time
            <input
              type="datetime-local"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
            />
          </label>
        </div>

        <label className="font-medium">
          Registration Deadline
          <input
            type="datetime-local"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          />
        </label>

        <label className="font-medium">
          Status
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as EventStatus)
            }
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50"
            style={{ borderColor: SECONDARY, fontFamily: FONT_FAMILY }}
          >
            {EVENT_STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="font-medium flex items-center gap-2">
          <input
            type="checkbox"
            checked={paymentRequired}
            onChange={(e) => setPaymentRequired(e.target.checked)}
            className="h-5 w-5 text-primary"
          />
          <span className="text-sm text-gray-700">
            Payment required for registration
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-semibold transition"
          style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: FONT_FAMILY,
          }}
        >
          {loading ? "Creating…" : "Create Event"}
        </button>

        {message && (
          <div
            className="text-center"
            style={{ color: SECONDARY, fontFamily: FONT_FAMILY }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
