import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Rocket,
  Brain,
  Target,
  Zap,
  Users,
  ShieldCheck,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * WhyUs — 3D coverflow redesign.
 * Center card sits forward and bright; the cards on either side rotate away in 3D
 * and fade out. Navigate with the arrows, the dots, arrow keys, or by clicking any
 * side card to pull it to the center. Autoplays gently, pauses on hover.
 *
 * No framer-motion / intersection-observer needed — pure CSS 3D + lucide-react.
 */

const FEATURES = [
  {
    icon: Rocket,
    title: "Build Small. Launch Fast.",
    category: "Speed",
    description:
      "We create lean AI solutions that get to market quickly without sacrificing quality.",
    accent: ["#8b5cf6", "#6366f1"],
  },
  {
    icon: Brain,
    title: "Intelligent Integration.",
    category: "Intelligence",
    description:
      "Our AI systems integrate seamlessly with your existing tools and workflows.",
    accent: ["#3b82f6", "#06b6d4"],
  },
  {
    icon: Target,
    title: "Clarity over Complexity",
    category: "Clarity",
    description:
      "No black boxes, just clean, understandable systems that make sense for your business.",
    accent: ["#14b8a6", "#22d3ee"],
  },
  {
    icon: Zap,
    title: "Scale Smart.",
    category: "Scale",
    description:
      "Solutions designed to grow efficiently alongside your business needs.",
    accent: ["#6366f1", "#a855f7"],
  },
  {
    icon: Users,
    title: "True Collaboration",
    category: "Partnership",
    description:
      "We integrate like a teammate, not a vendor, focusing on your goals and processes.",
    accent: ["#0ea5e9", "#6366f1"],
  },
  {
    icon: ShieldCheck,
    title: "Trust by Design.",
    category: "Security",
    description:
      "We prioritize security, privacy, and transparency in every AI solution we build.",
    accent: ["#7c3aed", "#2563eb"],
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(2);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [paused, setPaused] = useState(false);
  const count = FEATURES.length;

  // responsive geometry
  const isMobile = vw < 720;
  const cardW = isMobile ? 248 : 330;
  const cardH = isMobile ? 380 : 432;
  const gap = isMobile ? 130 : 232;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = useCallback(
    (dir) => setActive((a) => (a + dir + count) % count),
    [count]
  );

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // gentle autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go]);

  // shortest signed distance on the ring so wrap-around looks natural
  const offsetOf = (i) => {
    let off = i - active;
    if (off > count / 2) off -= count;
    if (off < -count / 2) off += count;
    return off;
  };

  const cardStyle = (i) => {
    const off = offsetOf(i);
    const abs = Math.abs(off);
    const visible = abs <= 2;
    const translate = off * gap;
    const rotate = Math.max(Math.min(-off * 40, 52), -52);
    const scale = Math.max(1 - abs * 0.13, 0.62);
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : abs === 2 ? 0.22 : 0;
    return {
      width: cardW,
      height: cardH,
      transform: `translateX(${translate}px) rotateY(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex: 50 - abs,
      pointerEvents: visible ? "auto" : "none",
    };
  };

  const touch = useRef({ x: 0 });

  return (
    <section
      className="relative overflow-hidden bg-gray-50"
      style={{
        padding: isMobile ? "72px 16px 64px" : "104px 24px 96px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/50" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');
        @keyframes wu-twinkle { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
        @keyframes wu-rise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wu-glow { 0%,100%{opacity:.5} 50%{opacity:.9} }
        .wu-rise{animation:wu-rise .8s cubic-bezier(.22,1,.36,1) both}
        .wu-card{transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .6s ease,filter .6s ease}
        .wu-ctrl{transition:transform .25s ease,background .25s ease,border-color .25s ease}
        .wu-ctrl:hover{transform:scale(1.08);background:rgba(139,92,246,.22);border-color:rgba(167,139,250,.7)}
        .wu-dot{transition:width .35s ease,background .35s ease,opacity .35s ease}
      `}</style>

      {/* header */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: isMobile ? 44 : 64 }}>
        <h2
          className="wu-rise"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontSize: isMobile ? 20 : 44,
            margin: 0,
            color: "#0f1535",
          }}
        >
          Why{" "}
          <span className="text-blue-900"
            style={{
              // background: "linear-gradient(90deg,#a78bfa 0%,#818cf8 45%,#38bdf8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              // color: "transparent",
            }}
          >
            Teeny Tech Trek?
          </span>
        </h2>
        <div
          className="wu-rise"
          style={{
            width: 160,
            height: 3,
            margin: "18px auto 22px",
            borderRadius: 4,
            background: "linear-gradient(90deg,transparent,#8b5cf6,#38bdf8,transparent)",
            animation: "wu-glow 3s ease-in-out infinite",
          }}
        />
        <p
          className="wu-rise"
          style={{
            maxWidth: 680,
            margin: "0 auto",
            color: "#5a6184",
            fontSize: isMobile ? 15 : 18,
            lineHeight: 1.6,
          }}
        >
          Empowering visionary teams with AI solutions that simplify complexity and
          amplify impact through speed, clarity, and true collaboration.
        </p>
      </div>

      {/* coverflow stage */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          setPaused(true);
          touch.current.x = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current.x;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        style={{
          position: "relative",
          zIndex: 10,
          height: cardH + 30,
          perspective: 1700,
          marginBottom: isMobile ? 30 : 42,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const isActive = offsetOf(i) === 0;
            return (
              <article
                key={f.title}
                className="wu-card"
                onClick={() => setActive(i)}
                style={{
                  position: "absolute",
                  cursor: isActive ? "default" : "pointer",
                  borderRadius: 22,
                  padding: isMobile ? "22px 20px" : "30px 28px",
                  boxSizing: "border-box",
                  textAlign: "center",
                  background: "#1e3a8a",
                  border: `1px solid ${isActive ? "rgba(167,139,250,.55)" : "rgba(120,120,180,.18)"}`,
                  boxShadow: isActive
                    ? `0 30px 70px -20px ${f.accent[0]}88, 0 0 0 1px ${f.accent[0]}33 inset`
                    : "0 24px 50px -28px rgba(0,0,0,.8)",
                  ...cardStyle(i),
                }}
              >
                {/* icon tile */}
                <div
                  style={{
                    width: isMobile ? 64 : 76,
                    height: isMobile ? 64 : 76,
                    borderRadius: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${f.accent[0]}, ${f.accent[1]})`,
                    boxShadow: `0 16px 34px -8px ${f.accent[0]}bb`,
                    margin: isMobile ? "0 auto 20px" : "0 auto 26px",
                  }}
                >
                  <Icon size={isMobile ? 34 : 42} color="#fff" strokeWidth={2} />
                </div>

                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: f.accent[1],
                    background: `${f.accent[0]}1f`,
                    border: `1px solid ${f.accent[0]}40`,
                    padding: "4px 10px",
                    borderRadius: 999,
                    marginBottom: 14,
                  }}
                >
                  {f.category}
                </span>

                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 20 : 24,
                    lineHeight: 1.2,
                    color: "#fff",
                    margin: "0 0 12px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? 14 : 15.5,
                    lineHeight: 1.6,
                    color: "#aeb6db",
                    margin: 0,
                  }}
                >
                  {f.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="wu-ctrl"
          style={ctrlBtn}
        >
          <ChevronLeft size={20} color="#4f46e5" />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {FEATURES.map((_, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className="wu-dot"
                style={{
                  height: 8,
                  width: on ? 28 : 8,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: on
                    ? "linear-gradient(90deg,#7c3aed,#0ea5e9)"
                    : "rgba(99,102,141,.30)",
                }}
              />
            );
          })}
        </div>

        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="wu-ctrl"
          style={ctrlBtn}
        >
          <ChevronRight size={20} color="#4f46e5" />
        </button>
      </div>

      {/* quote */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 940,
          margin: `${isMobile ? 64 : 96}px auto 0`,
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
            background: "radial-gradient(circle, rgba(139,92,246,.35), transparent 70%)",
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
          “We believe that <span style={grad}>lean teams</span> can move mountains when
          empowered by the <span style={grad}>right tools</span>. That’s why we build
          nimble, intelligent AI solutions designed for{" "}
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
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: "0 0 8px" }}>
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

const ctrlBtn = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "#fff",
  border: "1px solid rgba(99,102,241,.35)",
  boxShadow: "0 8px 20px -10px rgba(99,102,241,.5)",
};

const grad = {
  background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
