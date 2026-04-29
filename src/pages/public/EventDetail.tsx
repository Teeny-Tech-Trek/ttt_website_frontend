import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventsByField } from "../../services/eventService";
import type { Event } from "../../types/event"; // Adjust import path if needed

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

type SingleEventPageProps = {
  onRegister?: (packageId: string) => void;
};

export default function SingleEventPage({ onRegister }: SingleEventPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    getEventsByField({ slug })
      .then((events) => {
        if (events && events.length > 0) {
          setEvent(events[0]);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
          minHeight: "100vh",
          color: "#fff",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        Loading…
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
          minHeight: "100vh",
          color: "#fff",
          fontFamily: FONT_FAMILY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        Event not found.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `#fff`,
        fontFamily: FONT_FAMILY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 8px", // more breathing room for mobile
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 740,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 8px 38px 0 rgba(31,82,140,0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        {/* Optional: event.banner_url */}
        <div
          style={{
            padding: "34px 28px 22px 28px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontFamily: FONT_FAMILY,
              color: PRIMARY,
              fontWeight: 800,
              fontSize: 32,
              margin: "0 0 12px 0",
              lineHeight: "1.13",
              letterSpacing: "-1px",
            }}
          >
            {event.title}
          </h1>
          <div
            style={{
              color: "#3e6aa7",
              fontWeight: 700,
              fontSize: 17,
              marginBottom: 8,
            }}
          >
            {event.start_time
              ? new Date(event.start_time).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
            {event.end_time &&
              ` - ` +
                new Date(event.end_time).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </div>
          <div
            style={{
              color: "#888",
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 12,
            }}
          >
            {event.location}
          </div>
          <div
            style={{
              color: "#233",
              fontSize: 18,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            {event.description}
          </div>

          {/* ---- Tickets/Packages Section ---- */}
          <h2
            style={{
              color: PRIMARY,
              fontWeight: 700,
              fontSize: 24,
              marginTop: 35,
              marginBottom: 16,
              textAlign: "left",
              letterSpacing: "-0.5px",
            }}
          >
            Tickets & Packages
          </h2>
          {!event.packages_ids || event.packages_ids.length === 0 ? (
            <div style={{ color: "#888", fontSize: 16, marginBottom: 18 }}>
              No tickets/packages available yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 22,
                marginBottom: 12,
              }}
            >
              {event.packages_ids.map((pkgId) => (
                <div
                  key={pkgId}
                  style={{
                    background: "#f8fbff",
                    borderRadius: 13,
                    boxShadow: "0 2px 9px rgba(31,82,140,0.07)",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 100,
                    border: `1.5px solid ${SECONDARY}11`,
                  }}
                >
                  <div
                    style={{
                      color: PRIMARY,
                      fontWeight: 700,
                      fontSize: 18,
                      marginBottom: 6,
                    }}
                  >
                    Package ID: {pkgId}
                  </div>
                  <button
                    onClick={() => onRegister && onRegister(pkgId)}
                    style={{
                      marginTop: "auto",
                      background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                      color: "#fff",
                      fontFamily: FONT_FAMILY,
                      fontWeight: 600,
                      fontSize: 16,
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 0",
                      cursor: "pointer",
                      boxShadow: "0 1px 5px rgba(62,106,167,0.11)",
                      transition: "background 0.2s",
                    }}
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            height: 6,
            background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
