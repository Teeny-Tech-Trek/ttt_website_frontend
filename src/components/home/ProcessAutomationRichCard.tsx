import React, { useEffect, useState } from 'react';

const STAGES = [
  { label: 'Trigger', tone: 'bg-blue-900 text-white' },
  { label: 'Process', tone: 'bg-white text-blue-900 ring-1 ring-blue-900/25' },
  { label: 'Action', tone: 'bg-emerald-600 text-white' },
] as const;

const INTEGRATIONS = [
  { name: 'CRM', icon: 'crm' },
  { name: 'Email', icon: 'mail' },
  { name: 'Sheets', icon: 'sheet' },
  { name: 'Slack', icon: 'slack' },
];

const useAutoCounter = (target: number, step: number, intervalMs: number) => {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => v + step), intervalMs);
    return () => clearInterval(id);
  }, [step, intervalMs]);
  return value;
};

const IntegrationIcon: React.FC<{ kind: string }> = ({ kind }) => {
  const c = 'h-3.5 w-3.5 text-blue-900';
  if (kind === 'mail') {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  if (kind === 'sheet') {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    );
  }
  if (kind === 'slack') {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="6" height="2" rx="1" />
        <rect x="14" y="13" width="6" height="2" rx="1" />
        <rect x="9" y="4" width="2" height="6" rx="1" />
        <rect x="13" y="14" width="2" height="6" rx="1" />
      </svg>
    );
  }
  // crm / users
  return (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

const ProcessAutomationRichCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const tasks = useAutoCounter(1247, 3, 1100);
  const hours = useAutoCounter(86, 1, 4200);
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulseIdx((i) => (i + 1) % STAGES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900 shadow-md shadow-blue-900/30">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
            Smart Automation
          </h3>
          <p className="mt-1 text-sm leading-snug text-slate-600">
            Pipelines that wire CRM, email, and apps end-to-end without manual lifting.
          </p>
        </div>
      </div>

      {/* pipeline */}
      <div className="mt-5 rounded-xl border border-blue-900/15 bg-blue-50/60 p-4">
        <div className="flex items-center justify-between gap-1.5">
          {STAGES.map((s, i) => (
            <React.Fragment key={s.label}>
              <span
                className={`rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold transition-shadow ${s.tone} ${
                  pulseIdx === i ? 'shadow-[0_0_0_4px_rgba(30,58,138,0.18)]' : ''
                }`}
              >
                {s.label}
              </span>
              {i < STAGES.length - 1 && (
                <svg className="h-4 w-5 shrink-0 text-blue-900/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* integrations row */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {INTEGRATIONS.map((it) => (
            <div
              key={it.name}
              className="flex flex-col items-center gap-1 rounded-lg border border-blue-900/10 bg-white px-1 py-2"
            >
              <IntegrationIcon kind={it.icon} />
              <span className="text-[0.65rem] font-medium text-slate-600">{it.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* live stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-900 px-3 py-2.5 text-white">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-200">
            Tasks automated
          </div>
          <div className="mt-0.5 [font-family:Orbitron,sans-serif] text-xl font-bold tabular-nums">
            {tasks.toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg bg-emerald-600 px-3 py-2.5 text-white">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-100">
            Hours saved / wk
          </div>
          <div className="mt-0.5 [font-family:Orbitron,sans-serif] text-xl font-bold tabular-nums">
            {hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessAutomationRichCard;
