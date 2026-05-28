import React, { useEffect, useState } from 'react';

const CHAT_SCRIPT: { from: 'bot' | 'user'; text: string }[] = [
  { from: 'bot', text: 'Hi! How can I help you today?' },
  { from: 'user', text: 'I need help with my order.' },
  { from: 'bot', text: 'Sure! I can help you track your order. Please share your order ID.' },
];

const TypingDots: React.FC = () => (
  <span className="flex items-center gap-1 px-1 py-1.5">
    {[0, 1, 2].map((d) => (
      <span
        key={d}
        className="h-2 w-2 rounded-full bg-slate-400 animate-[crcTypingDot_1s_ease-in-out_infinite]"
        style={{ animationDelay: `${d * 0.15}s` }}
      />
    ))}
  </span>
);

const TypingChat: React.FC = () => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (step >= CHAT_SCRIPT.length) {
      t = setTimeout(() => {
        setStep(0);
        setTyped(0);
        setThinking(true);
      }, 2400);
    } else if (thinking) {
      t = setTimeout(() => setThinking(false), CHAT_SCRIPT[step].from === 'bot' ? 700 : 450);
    } else if (typed < CHAT_SCRIPT[step].text.length) {
      t = setTimeout(() => setTyped((c) => c + 1), 30);
    } else {
      t = setTimeout(() => {
        setStep((s) => s + 1);
        setTyped(0);
        setThinking(true);
      }, 600);
    }
    return () => clearTimeout(t);
  }, [step, typed, thinking]);

  return (
    <div className="flex h-[210px] sm:h-[240px] flex-col justify-end gap-2 overflow-hidden">
      {CHAT_SCRIPT.map((m, idx) => {
        if (idx > step) return null;
        const active = idx === step;
        const isBot = m.from === 'bot';
        const shown = active ? m.text.slice(0, typed) : m.text;
        return (
          <div
            key={idx}
            className={`flex items-end gap-2 animate-[crcMsgIn_0.3s_ease-out] ${isBot ? '' : 'justify-end'}`}
          >
            {isBot && <div className="h-5 w-5 shrink-0 rounded-full bg-blue-900" />}
            <div
              className={`max-w-[78%] px-3 py-2 text-sm leading-snug ${
                isBot
                  ? 'rounded-2xl rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200'
                  : 'rounded-2xl rounded-br-sm bg-blue-900 text-white'
              }`}
            >
              {active && thinking ? (
                <TypingDots />
              ) : (
                <>
                  {shown}
                  {active && (
                    <span
                      className={`ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] align-middle animate-[crcCaretBlink_0.9s_step-end_infinite] ${
                        isBot ? 'bg-blue-700' : 'bg-white'
                      }`}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ChatbotRichCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <>
    <style>{`
      @keyframes crcCaretBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes crcMsgIn { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes crcTypingDot { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
    `}</style>
    <div
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-blue-900 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,40,130,0.15)] ${className}`}
    >
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900 shadow-md shadow-blue-900/30">
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="[font-family:Orbitron,sans-serif] text-lg sm:text-xl font-bold leading-tight tracking-wide text-blue-900">
            Chatbot Development
          </h3>
          <p className="mt-1 text-sm leading-snug text-slate-600">
            We build intelligent chatbots that enhance customer engagement and support.
          </p>
        </div>
      </div>

      {/* live typing window */}
      <div className="mt-4 flex overflow-hidden rounded-xl border border-blue-900/15 bg-blue-50/60">
        <div className="flex w-10 shrink-0 flex-col items-center gap-2.5 border-r border-blue-900/10 bg-blue-100/50 py-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded ${i === 0 ? 'bg-blue-900' : 'bg-blue-900/20'}`}
            />
          ))}
        </div>
        <div className="flex-1 p-3">
          <TypingChat />
          <div className="mt-2.5 flex items-center gap-2 rounded-full border border-blue-900/15 bg-white px-3 py-1.5">
            <span className="flex-1 truncate text-xs text-slate-400">Type a message...</span>
            <button
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-900"
              aria-label="Send message"
            >
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11l18-8-8 18-2-7-8-3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ChatbotRichCard;
