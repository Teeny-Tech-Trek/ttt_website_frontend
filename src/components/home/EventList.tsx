import { useState, useEffect } from "react";
import { getPublishedEvents } from "../../services/eventService";
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
    <div
      id="events"
      className="py-20"
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
            fontSize: "clamp(28px, 4vw, 38px)",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "-0.5px",
            padding: "60px 0 30px 0",
          }}
        >
          Upcoming Events
        </h2>

        {loading && (
          <div
            style={{
              color: "#888",
              fontSize: 20,
              textAlign: "center",
              padding: 80,
            }}
          >
            Loading events…
          </div>
        )}
        {error && (
          <div
            style={{
              color: "#d32f2f",
              fontSize: 20,
              textAlign: "center",
              padding: 80,
            }}
          >
            Failed to load events.
          </div>
        )}
        {!loading && !error && events?.length === 0 && (
          <div
            style={{
              color: "#888",
              fontSize: 20,
              textAlign: "center",
              padding: 80,
            }}
          >
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
              <div
                key={event.id}
                style={{
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
                  cursor: "pointer",
                }}
                tabIndex={0}
                aria-label={`View details for ${event.title}`}
                className="event-card"
                onClick={() => setSelectedEvent(event)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedEvent(event);
                  }
                }}
              >
                <div
                  style={{
                    height: 180,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={event.slug || PLACEHOLDER_IMAGE}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: "28px 24px 24px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      color: PRIMARY,
                      fontFamily: FONT_FAMILY,
                      fontWeight: 700,
                      fontSize: 22,
                      margin: "0 0 14px 0",
                      lineHeight: 1.2,
                    }}
                  >
                    {event.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        background: "#ecf3fa",
                        color: SECONDARY,
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        padding: "4px 12px",
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
                          padding: "4px 12px",
                        }}
                      >
                        {event.location}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      color: "#444",
                      fontWeight: 400,
                      fontSize: 15,
                      marginBottom: 20,
                      lineHeight: "1.5",
                      flex: 1,
                    }}
                  >
                    {event.description?.slice(0, 110) ?? ""}
                    {event.description && event.description.length > 110 && "..."}
                  </p>

                  <div
                    style={{
                      marginTop: "auto",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                        padding: "10px 24px",
                        borderRadius: 24,
                        fontWeight: 600,
                        fontSize: 15,
                        boxShadow: "0 2px 8px rgba(62,106,167,0.10)",
                        display: "inline-block",
                        letterSpacing: 0.2,
                        transition: "background 0.16s",
                      }}
                    >
                      View Details
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: 5,
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    width: "100%",
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              maxWidth: 700,
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative" }}>
              <img
                src={selectedEvent.slug || PLACEHOLDER_IMAGE}
                alt={selectedEvent.title}
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
                onClick={() => setSelectedEvent(null)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "32px",
                overflowY: "auto",
                maxHeight: "calc(90vh - 250px)",
              }}
            >
              <h3
                style={{
                  color: PRIMARY,
                  fontFamily: FONT_FAMILY,
                  fontWeight: 700,
                  fontSize: 26,
                  margin: "0 0 20px 0",
                  lineHeight: 1.2,
                }}
              >
                {selectedEvent.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#ecf3fa",
                    color: SECONDARY,
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "8px 16px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>
                    {selectedEvent.start_time
                      ? new Date(
                          selectedEvent.start_time
                        ).toLocaleDateString()
                      : ""}
                    {selectedEvent.end_time
                      ? ` — ${new Date(
                          selectedEvent.end_time
                        ).toLocaleDateString()}`
                      : ""}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#f4f4f4",
                      color: "#3e3e3e",
                      borderRadius: 8,
                      fontWeight: 500,
                      fontSize: 14,
                      padding: "8px 16px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "20px",
                  background: "#f9fbfd",
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    color: "#444",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selectedEvent.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <button
                  style={{
                    color: "#fff",
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    padding: "12px 32px",
                    borderRadius: 24,
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: 0.2,
                  }}
                  onClick={() => {
                    window.location.href = `/event/${
                      selectedEvent.slug || selectedEvent.id
                    }`;
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
            <div
              style={{
                height: 5,
                background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                width: "100%",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        .event-card:hover, .event-card:focus {
          transform: translateY(-7px) scale(1.025);
          box-shadow: 0 12px 40px 0 rgba(31,82,140,0.15), 0 4px 12px rgba(31,82,140,0.10);
          z-index: 1;
        }
        .event-card:hover img {
          transform: scale(1.05);
        }
        .event-card:active {
          transform: scale(0.99);
        }
      `}</style>
    </div>
  );
}