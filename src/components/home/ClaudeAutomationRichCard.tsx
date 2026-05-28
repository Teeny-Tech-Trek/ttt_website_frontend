import React, { useEffect, useState } from 'react';

const ClaudeBurst: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    {Array.from({ length: 12 }).map((_, i) => (
      <rect
        key={i}
        x="46.5"
        y="6"
        width="7"
        height="38"
        rx="3.5"
        fill="#D97757"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
  </svg>
);

const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-900/15 bg-white">
    {children}
  </div>
);

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && count < text.length) {
      t = setTimeout(() => setCount((c) => c + 1), 48);
    } else if (!deleting && count === text.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && count > 0) {
      t = setTimeout(() => setCount((c) => c - 1), 26);
    } else {
      t = setTimeout(() => setDeleting(false), 500);
    }
    return () => clearTimeout(t);
  }, [count, deleting, text]);

  return (
    <span>
      {text.slice(0, count)}
      <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-[#0066dd] align-middle animate-[carcCaretBlink_0.9s_step-end_infinite]" />
    </span>
  );
};

const ClaudeAutomationRichCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <>
    <style>{`
      @keyframes carcCaretBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `}</style>
    <div
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 ring-1 ring-blue-900/10 shadow-md shadow-orange-500/20">
          <ClaudeBurst className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
            Claude Automation
          </h3>
          <p className="mt-1 min-h-[3.5rem] text-sm leading-snug text-slate-600">
            <TypewriterText text="Leverage Claude AI to automate complex tasks and drive smarter business operations." />
          </p>
        </div>
      </div>

      {/* flow diagram */}
      <div className="mt-5 rounded-xl border border-blue-900/15 bg-blue-50/60 p-4">
        <div className="flex items-center justify-between gap-1.5">
          <span className="rounded-md bg-blue-900 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white">
            Input
          </span>
          <svg
            className="h-4 w-5 shrink-0 text-blue-900/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-blue-900 ring-1 ring-blue-900/25">
            <ClaudeBurst className="h-4 w-4" />
            Claude AI
          </span>
          <svg
            className="h-4 w-5 shrink-0 text-blue-900/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white">
            Action
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-blue-900/20" />
            <IconBox>
              <svg
                className="h-5 w-5 text-blue-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
                <path d="M14 3v5h4" />
              </svg>
            </IconBox>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-blue-900/20" />
            <div className="flex gap-1.5">
              <IconBox>
                <svg
                  className="h-5 w-5 text-blue-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
                </svg>
              </IconBox>
              <IconBox>
                <svg
                  className="h-5 w-5 text-blue-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="6" rx="7" ry="3" />
                  <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                </svg>
              </IconBox>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-blue-900/20" />
            <IconBox>
              <svg
                className="h-5 w-5 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
              </svg>
            </IconBox>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ClaudeAutomationRichCard;
