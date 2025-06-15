import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { createPackage } from "../../services/packageService";
import { getEventsByStatus } from "../../services/eventService";
import { useNavigate } from "react-router-dom";
import type { Event } from "../../types/event"; // adjust path as needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const PACKAGE_TYPES = [
  { value: "subscription", label: "Subscription" },
  { value: "event", label: "Event Ticket" },
];

export default function CreatePackage() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [packageType, setPackageType] = useState<"subscription" | "event">(
    "subscription"
  );
  const [eventId, setEventId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [packageRegistrationDeadline, setPackageRegistrationDeadline] =
    useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventOptions, setEventOptions] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Fetch published events for dropdown
  useEffect(() => {
    if (!accessToken || packageType !== "event") return;
    setEventsLoading(true);
    getEventsByStatus("published", accessToken)
      .then((data) => setEventOptions(data))
      .catch((err) => {
        setEventOptions([]);
        console.error("Failed to fetch events for dropdown:", err);
      })
      .finally(() => setEventsLoading(false));
  }, [accessToken, packageType]);

  // Guard: only admins can create packages
  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setMessage("You must be logged in to create a package.");
      return;
    }
    setLoading(true);
    setMessage("Creating package...");

    const payload: any = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      price: Number(price),
      duration_days: Number(durationDays),
      is_active: isActive,
      package_type: packageType,
      event_id: packageType === "event" ? eventId : null,
      capacity: packageType === "event" ? Number(capacity) : null,
      package_registration_deadline:
        packageType === "event" && packageRegistrationDeadline
          ? new Date(packageRegistrationDeadline).toISOString()
          : null,
    };

    try {
      await createPackage(payload, accessToken);
      setMessage("Package created successfully!");
      setTimeout(() => navigate("/admin/packages"), 1000);
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.error ||
          "Error creating package. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
        style={{
          background: "#fff",
          maxWidth: 550,
          margin: "0 auto",
          borderRadius: 16,
          boxShadow: "0 6px 24px rgba(31,82,140,0.1)",
          padding: 36,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontFamily: FONT_FAMILY,
        }}
      >
        <h2
          style={{
            color: PRIMARY,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Create New Package
        </h2>

        <label style={{ fontWeight: 500 }}>
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Slug (for URL)
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. gold-plan"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Price
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 499.99"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Duration (days)
          <input
            type="number"
            required={packageType === "subscription"}
            min="0"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            placeholder={packageType === "subscription" ? "e.g. 30" : "0"}
            disabled={packageType === "event"}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
              background: packageType === "event" ? "#f4f7fb" : "white",
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Type
          <select
            value={packageType}
            onChange={(e) =>
              setPackageType(e.target.value as "subscription" | "event")
            }
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
              background: "#f9fbfd",
            }}
          >
            {PACKAGE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        {packageType === "event" && (
          <>
            <label style={{ fontWeight: 500 }}>
              Link to Event
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                required
                disabled={eventsLoading}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: `1px solid ${SECONDARY}`,
                  marginTop: 4,
                  background: "#f9fbfd",
                }}
              >
                <option value="">Select Event</option>
                {eventOptions.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontWeight: 500 }}>
              Capacity
              <input
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                placeholder="e.g. 100"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: `1px solid ${SECONDARY}`,
                  marginTop: 4,
                }}
              />
            </label>
            <label style={{ fontWeight: 500 }}>
              Package Registration Deadline
              <input
                type="datetime-local"
                value={packageRegistrationDeadline}
                onChange={(e) =>
                  setPackageRegistrationDeadline(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: `1px solid ${SECONDARY}`,
                  marginTop: 4,
                }}
              />
            </label>
          </>
        )}

        <label style={{ fontWeight: 500 }}>
          Is Active?
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            style={{
              marginLeft: 10,
              accentColor: PRIMARY,
              width: 18,
              height: 18,
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            borderRadius: 8,
            padding: "14px 0",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 8,
            transition: "background 0.2s",
          }}
        >
          {loading ? "Creating…" : "Create Package"}
        </button>

        {message && (
          <div style={{ textAlign: "center", color: SECONDARY }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
