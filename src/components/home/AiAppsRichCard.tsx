import React, { useEffect, useState } from 'react';

const PROMPTS = [
  'Summarize this week\'s customer feedback',
  'Draft a 4-tweet thread for our launch',
  'Find top 5 high-intent leads from inbox',
];

const STREAM_OUTPUT = [
  'Analyzing 247 feedback entries…',
  '• Top theme: faster onboarding',
  '• Sentiment: 78% positive',
  '• Action: ship guided setup',
];

const BARS = [62, 78, 45, 88, 70, 92, 58];

const AiAppsRichCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [promptIdx, setPromptIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [streamLines, setStreamLines] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'streaming' | 'rest'>('typing');

  const currentPrompt = PROMPTS[promptIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (typed < currentPrompt.length) {
        t = setTimeout(() => setTyped((c) => c + 1), 38);
      } else {
        t = setTimeout(() => {
          setStreamLines(0);
          setPhase('streaming');
        }, 500);
      }
    } else if (phase === 'streaming') {
      if (streamLines < STREAM_OUTPUT.length) {
        t = setTimeout(() => setStreamLines((c) => c + 1), 420);
      } else {
        t = setTimeout(() => setPhase('rest'), 1800);
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
        @keyframes aaCaret { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes aaBarPulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes aaLineIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
      >
        {/* header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-600 shadow-md shadow-blue-900/30">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
              <path d="m12 3 2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
              Lightweight AI Apps
            </h3>
            <p className="mt-1 text-sm leading-snug text-slate-600">
              Purpose-built micro-SaaS that turns prompts into finished work.
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
              tenytech.app
            </span>
            <div className="w-8" />
          </div>

          {/* prompt input */}
          <div className="px-3 pt-3">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-wider text-blue-900/70">
              Prompt
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-blue-900/15 bg-white px-2.5 py-2">
              <svg className="h-3.5 w-3.5 shrink-0 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7M5 12h14" />
              </svg>
              <span className="flex-1 text-sm text-slate-700">
                {currentPrompt.slice(0, typed)}
                {phase === 'typing' && (
                  <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-blue-900 align-middle animate-[aaCaret_0.9s_step-end_infinite]" />
                )}
              </span>
              <button className="flex h-6 shrink-0 items-center justify-center rounded-md bg-blue-900 px-2 text-[0.65rem] font-semibold text-white">
                Run
              </button>
            </div>
          </div>

          {/* output */}
          <div className="px-3 pb-3 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-900/70">
                Output
              </label>
              {phase === 'streaming' && (
                <span className="text-[0.6rem] font-medium text-emerald-600">● generating</span>
              )}
            </div>
            <div className="mt-1.5 min-h-[88px] rounded-lg bg-white px-2.5 py-2 ring-1 ring-blue-900/10">
              {streamLines === 0 && phase !== 'streaming' ? (
                <div className="grid h-[68px] grid-cols-7 items-end gap-1">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-gradient-to-t from-blue-900 to-indigo-400 animate-[aaBarPulse_2s_ease-in-out_infinite]"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              ) : (
                <ul className="space-y-1">
                  {STREAM_OUTPUT.slice(0, streamLines).map((line, i) => (
                    <li
                      key={i}
                      className="text-[0.72rem] leading-snug text-slate-700 animate-[aaLineIn_0.3s_ease-out]"
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

export default AiAppsRichCard;
