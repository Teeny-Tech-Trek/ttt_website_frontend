import React, { useEffect, useState } from 'react';

const PROMPTS = [
  'Embed our 1,248 knowledge docs for search',
  'Connect SQL DB to Claude with secure filters',
  'Deploy custom lead routing API endpoint',
];

const STREAM_OUTPUT = [
  'Initializing embedding model (text-embedding-3-small)…',
  '• Segmented 1,248 documents into 8,142 semantic chunks',
  '• Created and verified embeddings pipeline',
  '• 8,142 vectors successfully upserted to Pinecone index',
  '• Status: Vector search index live and querying',
];

const BARS = [45, 68, 82, 55, 90, 75, 60, 88, 70];

const CustomAiIntegrationsRichCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [promptIdx, setPromptIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [streamLines, setStreamLines] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'streaming' | 'rest'>('typing');

  const currentPrompt = PROMPTS[promptIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (typed < currentPrompt.length) {
        t = setTimeout(() => setTyped((c) => c + 1), 35);
      } else {
        t = setTimeout(() => {
          setStreamLines(0);
          setPhase('streaming');
        }, 500);
      }
    } else if (phase === 'streaming') {
      if (streamLines < STREAM_OUTPUT.length) {
        t = setTimeout(() => setStreamLines((c) => c + 1), 400);
      } else {
        t = setTimeout(() => setPhase('rest'), 2000);
      }
    } else {
      t = setTimeout(() => {
        setPromptIdx((p) => (p + 1) % PROMPTS.length);
        setTyped(0);
        setStreamLines(0);
        setPhase('typing');
      }, 600);
    }
    return () => clearTimeout(t);
  }, [phase, typed, streamLines, currentPrompt]);

  return (
    <>
      <style>{`
        @keyframes ciCaret { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes ciBarPulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes ciLineIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
      >
        {/* header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-600 shadow-md shadow-blue-900/30">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
              Custom AI Integrations
            </h3>
            <p className="mt-1 text-sm leading-snug text-slate-600">
              Securely connecting LLMs to your data infrastructure and APIs.
            </p>
          </div>
        </div>

        {/* mini app */}
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-900/15 bg-blue-50/60">
          {/* window chrome */}
          <div className="flex items-center justify-between border-b border-blue-900/10 bg-white/70 px-3 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[0.65rem] font-medium tracking-wide text-blue-900/60">
              pipeline-orchestrator.io
            </span>
            <div className="w-8" />
          </div>

          {/* prompt input */}
          <div className="px-3 pt-3">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-wider text-blue-900/70">
              Configuration Target
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-blue-900/15 bg-white px-2.5 py-2">
              <svg className="h-3.5 w-3.5 shrink-0 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="flex-1 text-sm text-slate-700 font-mono text-[0.8rem]">
                {currentPrompt.slice(0, typed)}
                {phase === 'typing' && (
                  <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-blue-900 align-middle animate-[ciCaret_0.9s_step-end_infinite]" />
                )}
              </span>
              <button className="flex h-6 shrink-0 items-center justify-center rounded-md bg-blue-900 px-2 text-[0.65rem] font-semibold text-white">
                Initialize
              </button>
            </div>
          </div>

          {/* output */}
          <div className="px-3 pb-3 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-900/70">
                Deployment Log
              </label>
              {phase === 'streaming' && (
                <span className="text-[0.6rem] font-medium text-emerald-600">● processing</span>
              )}
            </div>
            <div className="mt-1.5 min-h-[105px] rounded-lg bg-white px-2.5 py-2 ring-1 ring-blue-900/10">
              {streamLines === 0 && phase !== 'streaming' ? (
                <div className="grid h-[85px] grid-cols-9 items-end gap-1 px-2">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-gradient-to-t from-blue-900 to-indigo-400 animate-[ciBarPulse_2s_ease-in-out_infinite]"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : (
                <ul className="space-y-1 font-mono text-[0.7rem]">
                  {STREAM_OUTPUT.slice(0, streamLines).map((line, i) => (
                    <li
                      key={i}
                      className="leading-snug text-slate-700 animate-[ciLineIn_0.3s_ease-out]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomAiIntegrationsRichCard;
