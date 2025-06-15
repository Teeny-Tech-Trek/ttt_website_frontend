import { useState, useEffect } from "react";
import { getPublishedEvents } from "../../services/eventService"; // adjust as needed
import { Event } from "../../types/event";

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80";

export default function EventDisplayPage() {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getPublishedEvents();
        if (isMounted) setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="events" className="py-20"
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "0 0 60px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <h2
          style={{
            color: PRIMARY,
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 38,
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "-1px",
            padding: "60px 0 30px 0",
            background: "#fff",
          }}
        >
          Upcoming Events
        </h2>

        {loading && (
          <div style={{ color: "#888", fontSize: 20, textAlign: "center", padding: 80 }}>
            Loading events…
          </div>
        )}
        {error && (
          <div style={{ color: "#d32f2f", fontSize: 20, textAlign: "center", padding: 80 }}>
            Failed to load events.
          </div>
        )}
        {!loading && !error && events?.length === 0 && (
          <div style={{ color: "#888", fontSize: 20, textAlign: "center", padding: 80 }}>
            No events scheduled yet.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 36,
            alignItems: "stretch",
          }}
        >
          {!loading &&
            !error &&
            events?.map((event) => (
              <a
                key={event.id}
                href={`/event/${event.slug || event.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 20,
                  boxShadow:
                    "0 6px 32px 0 rgba(31,82,140,0.11), 0 1.5px 6px rgba(31,82,140,0.07)",
                  background: "#fff",
                  transition: "transform 0.18s cubic-bezier(.39,.58,.57,1.15), box-shadow 0.18s cubic-bezier(.39,.58,.57,1.15)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 430,
                  position: "relative",
                  overflow: "hidden",
                }}
                tabIndex={0}
                aria-label={event.title}
                className="event-card"
              >
                <img
                  src={event.slug || PLACEHOLDER_IMAGE}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    background: "#eee",
                  }}
                  loading="lazy"
                />

                <div style={{
                  flex: 1,
                  padding: "28px 24px 18px 24px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 190,
                }}>
                  <h3
                    style={{
                      color: PRIMARY,
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      fontSize: 22,
                      margin: 0,
                      marginBottom: 8,
                      lineHeight: 1.15,
                    }}
                  >
                    {event.title}
                  </h3>

                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#ecf3fa",
                        color: SECONDARY,
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        padding: "3px 13px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {event.start_time
                        ? new Date(event.start_time).toLocaleDateString()
                        : ""}
                      {event.end_time
                        ? ` — ${new Date(event.end_time).toLocaleDateString()}`
                        : ""}
                    </span>
                    {event.location && (
                      <span
                        style={{
                          background: "#f4f4f4",
                          color: "#3e3e3e",
                          borderRadius: 8,
                          fontWeight: 500,
                          fontSize: 13,
                          padding: "3px 11px",
                        }}
                      >
                        {event.location}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      color: "#444",
                      fontWeight: 400,
                      fontSize: 15.2,
                      marginBottom: 10,
                      minHeight: 38,
                      lineHeight: "1.45",
                      flex: "0 1 auto",
                    }}
                  >
                    {event.description?.slice(0, 110) ?? ""}
                    {event.description && event.description.length > 110 && "..."}
                  </div>

                  <div style={{ flex: 1 }} />

                  <div style={{ marginTop: 10, textAlign: "left" }}>
                    <span
                      style={{
                        color: "#fff",
                        background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                        padding: "9px 28px",
                        borderRadius: 24,
                        fontWeight: 700,
                        fontSize: 15.5,
                        boxShadow: "0 2px 8px rgba(62,106,167,0.10)",
                        display: "inline-block",
                        transition: "background 0.16s",
                        letterSpacing: 0.2,
                      }}
                    >
                      View Details
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 5,
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    width: "100%",
                  }}
                />
              </a>
            ))}
        </div>
      </div>
      {/* Card hover animation with a <style> tag */}
      <style>{`
        .event-card:hover, .event-card:focus {
          transform: translateY(-7px) scale(1.025);
          box-shadow: 0 8px 40px 0 rgba(31,82,140,0.13), 0 1.5px 6px rgba(31,82,140,0.11);
          z-index: 1;
        }
        .event-card:active {
          transform: scale(0.99);
        }
      `}</style>
    </div>
  );
}
