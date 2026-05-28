import React, { useEffect, useState } from 'react';

const TASKS = [
  { label: 'Retrieve customer data' },
  { label: 'Analyze patterns' },
  { label: 'Draft response email' },
  { label: 'Update CRM record' },
];

type TaskStatus = 'pending' | 'running' | 'done';

const useTaskCycle = () => {
  const [statuses, setStatuses] = useState<TaskStatus[]>(
    TASKS.map(() => 'pending')
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = 0;
    let phase: 'running' | 'completing' = 'running';
    const tick = setInterval(() => {
      setStatuses((prev) => {
        const next = [...prev];
        if (active >= TASKS.length) {
          for (let i = 0; i < next.length; i++) next[i] = 'pending';
          active = 0;
          phase = 'running';
          return next;
        }
        if (phase === 'running') {
          next[active] = 'running';
          phase = 'completing';
        } else {
          next[active] = 'done';
          active += 1;
          phase = 'running';
        }
        return next;
      });
    }, 850);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const doneCount = statuses.filter((s) => s === 'done').length;
    setProgress(Math.round((doneCount / TASKS.length) * 100));
  }, [statuses]);

  return { statuses, progress };
};

const StatusGlyph: React.FC<{ status: TaskStatus }> = ({ status }) => {
  if (status === 'done') {
    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
        <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (status === 'running') {
    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-900">
        <svg className="h-3 w-3 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-6.2-8.55" />
        </svg>
      </div>
    );
  }
  return <div className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300 bg-white" />;
};

const AgenticWorkflowRichCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { statuses, progress } = useTaskCycle();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900 shadow-md shadow-blue-900/30">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="5" cy="19" r="2.5" />
            <circle cx="19" cy="19" r="2.5" />
            <path d="M12 7.5v3M12 10.5l-5 6M12 10.5l5 6" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
            Agentic Workflows
          </h3>
          <p className="mt-1 text-sm leading-snug text-slate-600">
            Autonomous agents that plan, decide, and execute multi-step tasks.
          </p>
        </div>
      </div>

      {/* live task pipeline */}
      <div className="mt-5 rounded-xl border border-blue-900/15 bg-blue-50/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-900/70">
            Agent run
          </span>
          <span className="text-xs font-semibold text-blue-900">{progress}%</span>
        </div>
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-blue-900/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-900 to-emerald-500 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ul className="space-y-2.5">
          {TASKS.map((task, i) => {
            const status = statuses[i];
            return (
              <li key={task.label} className="flex items-center gap-3">
                <StatusGlyph status={status} />
                <span
                  className={`text-sm leading-snug transition-colors ${
                    status === 'done'
                      ? 'text-slate-400 line-through'
                      : status === 'running'
                      ? 'font-medium text-blue-900'
                      : 'text-slate-600'
                  }`}
                >
                  {task.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AgenticWorkflowRichCard;
