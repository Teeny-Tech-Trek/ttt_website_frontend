import { useState, useEffect } from "react";
import { getPublishedEvents } from "../../services/eventService";
import { Event } from "../../types/event";

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";
const TECH_IMAGES = [
  "https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const DEMO_EVENT: Event = {
  id: "tech-trek-1",
  title: "Teeny Tech Trek: AI for Small Teams",
  description: "Join us for an eye-opening evening in Tricity where innovation meets action...", // (keep your full description)
  start_time: "2023-11-15T18:00:00",
  end_time: "2023-11-15T21:00:00",
  location: "Tricity Innovation Hub",
  slug: "teeny-tech-trek",
  created_by: "system",
  packages_ids: [],
  payment_required: false,
  status: "published",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};
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
        if (isMounted) setEvents([DEMO_EVENT, ...(data || [])]);
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

  const getRandomTechImage = () => {
    return TECH_IMAGES[Math.floor(Math.random() * TECH_IMAGES.length)];
  };

  return (
    <div
      id="events"
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <h2
          style={{
            color: PRIMARY,
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: "clamp(32px, 4vw, 42px)",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: "-0.8px",
            padding: "60px 0 30px 0",
          }}
        >
          Upcoming Tech Events
        </h2>

        {loading && (
          <div style={{ 
            color: "#888", 
            fontSize: 20, 
            textAlign: "center", 
            padding: 80 
          }}>
            Loading events…
          </div>
        )}
        {error && (
          <div style={{ 
            color: "#d32f2f", 
            fontSize: 20, 
            textAlign: "center", 
            padding: 80 
          }}>
            Failed to load events.
          </div>
        )}
        {!loading && !error && events?.length === 0 && (
          <div style={{ 
            color: "#888", 
            fontSize: 20, 
            textAlign: "center", 
            padding: 80 
          }}>
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
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
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
                    src={getRandomTechImage()}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                    }}
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
                      margin: "0 0 16px 0",
                      lineHeight: 1.25,
                    }}
                  >
                    {event.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "#ecf3fa",
                        color: SECONDARY,
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13.5,
                        padding: "6px 14px",
                        letterSpacing: "0.01em",
                        gap: 6,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={SECONDARY}
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {event.start_time
                        ? new Date(event.start_time).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : ""}
                    </span>
                    {event.location && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: "#f4f4f4",
                          color: "#3e3e3e",
                          borderRadius: 8,
                          fontWeight: 500,
                          fontSize: 13.5,
                          padding: "6px 14px",
                          gap: 6,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#3e3e3e"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
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
                      lineHeight: "1.55",
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
                        boxShadow: "0 2px 8px rgba(62,106,167,0.15)",
                        display: "inline-block",
                        letterSpacing: 0.2,
                        transition: "all 0.2s ease",
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
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: 20,
            backdropFilter: "blur(4px)",
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
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative" }}>
              <img
                src={getRandomTechImage()}
                alt={selectedEvent.title}
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderBottom: `4px solid ${PRIMARY}`,
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: PRIMARY,
                  transition: "all 0.2s ease",
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
                  fontSize: 28,
                  margin: "0 0 24px 0",
                  lineHeight: 1.2,
                }}
              >
                {selectedEvent.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 28,
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
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 15,
                    padding: "10px 18px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={SECONDARY}
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>
                    {selectedEvent.start_time
                      ? new Date(selectedEvent.start_time).toLocaleDateString(undefined, {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
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
                      borderRadius: 10,
                      fontWeight: 500,
                      fontSize: 15,
                      padding: "10px 18px",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3e3e3e"
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
                  padding: "22px 20px",
                  background: "#f9fbfd",
                  borderRadius: 14,
                  marginBottom: 24,
                  borderLeft: `4px solid ${PRIMARY}`,
                }}
              >
                <p
                  style={{
                    color: "#444",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {selectedEvent.description}
                </p>
              </div>

              <div
                style={{
                  background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                  padding: "20px",
                  borderRadius: 12,
                  color: "white",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  You'll Discover:
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <li>What AI can actually do for your business (with real-life demos)</li>
                  <li>How to automate repetitive tasks and enhance decision-making</li>
                  <li>How non-technical teams can leverage AI in under a week</li>
                  <li>Behind-the-scenes of our lightweight tools and smart workflows</li>
                </ul>
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
          transform: translateY(-8px);
          box-shadow: 0 12px 40px 0 rgba(31,82,140,0.18), 0 4px 12px rgba(31,82,140,0.12);
          z-index: 1;
        }
        .event-card:hover img {
          transform: scale(1.08);
        }
        .event-card:active {
          transform: translateY(-2px);
        }
        button:hover {
          transform: scale(1.05);
          background: rgba(255,255,255,1) !important;
        }
      `}</style>
    </div>
  );
}