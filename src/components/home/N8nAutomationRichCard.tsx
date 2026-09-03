import React, { useEffect, useState } from 'react';

const N8N_PINK = '#EA4B71';

const N8nNodesMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <g stroke={N8N_PINK} strokeWidth="3.5" strokeOpacity="0.55" fill="none">
      <path d="M22 50 L55 25" />
      <path d="M22 50 L55 75" />
      <path d="M55 25 L85 50" />
      <path d="M55 75 L85 50" />
    </g>
    <circle cx="22" cy="50" r="11" fill={N8N_PINK} />
    <circle cx="55" cy="25" r="9" fill={N8N_PINK} />
    <circle cx="55" cy="75" r="9" fill={N8N_PINK} />
    <circle cx="85" cy="50" r="11" fill="#059669" />
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
      <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-[#0066dd] align-middle animate-[narcCaretBlink_0.9s_step-end_infinite]" />
    </span>
  );
};

const N8nAutomationRichCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <>
    <style>{`
      @keyframes narcCaretBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `}</style>
    <div
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 ring-1 ring-blue-900/10 shadow-md shadow-pink-500/20">
          <N8nNodesMark className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
            n8n Automations
          </h3>
          <p className="mt-1 min-h-[3.5rem] text-sm leading-snug text-slate-600">
            <TypewriterText text="Premade workflows ready to launch, or a custom build wired to your exact process." />
          </p>
        </div>
      </div>

      {/* flow diagram */}
      <div className="mt-5 rounded-xl border border-blue-900/15 bg-blue-50/60 p-4">
        <div className="flex items-center justify-between gap-1.5">
          <span className="rounded-md bg-blue-900 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white">
            Trigger
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
            <N8nNodesMark className="h-4 w-4" />
            n8n
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
              {/* webhook / lightning trigger */}
              <svg
                className="h-5 w-5 text-blue-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </IconBox>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-blue-900/20" />
            <div className="flex gap-1.5">
              <IconBox>
                {/* apps / integrations */}
                <svg
                  className="h-5 w-5 text-blue-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </IconBox>
              <IconBox>
                {/* data sheet */}
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
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-px bg-blue-900/20" />
            <IconBox>
              {/* checkmark / done action */}
              <svg
                className="h-5 w-5 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </IconBox>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default N8nAutomationRichCard;
