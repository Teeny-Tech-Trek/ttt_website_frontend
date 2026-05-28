import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const grad = {
  background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function WhyUsQuote() {
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 720;

  return (
    <section
      style={{
        padding: isMobile ? "0 16px 64px" : "0 24px 96px",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 940,
          margin: "0 auto",
          borderRadius: 28,
          overflow: "hidden",
          padding: isMobile ? "40px 24px" : "56px 56px",
          textAlign: "center",
          background: "#1e3a8a",
          border: "1px solid rgba(167,139,250,.28)",
          boxShadow: "0 40px 90px -40px rgba(99,102,241,.5)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,.35), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: 68,
            height: 68,
            margin: "0 auto 24px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(167,139,250,.4)",
          }}
        >
          <Quote size={30} color="#c4b5fd" />
        </div>
        <blockquote
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? 22 : 34,
            lineHeight: 1.3,
            color: "#fff",
            margin: "0 0 32px",
          }}
        >
          “We believe that <span style={grad}>lean teams</span> can move mountains
          when empowered by the <span style={grad}>right tools</span>. That’s why
          we build nimble, intelligent AI solutions designed for{" "}
          <span style={grad}>clarity, speed, and real-world results</span>.”
        </blockquote>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#8b5cf6,#38bdf8)",
              color: "#fff",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            T³
          </div>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                margin: "0 0 8px",
              }}
            >
              The Teeny Tech Trek Team
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {["Building small", "Launching fast", "Scaling smart"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#c7cdf0",
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(167,139,250,.25)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
