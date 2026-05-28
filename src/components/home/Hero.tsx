import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatItem } from '../../types/hero.types';
import heroImg from '../../assets/AiHeroImage.png';
import heroImg2 from '../../assets/HeroImageForMobile.png';

gsap.registerPlugin(ScrollTrigger);

const STATS: StatItem[] = [
  { target: 5, unit: '+', label: 'Enterprises Served' },
  { target: 98, unit: '%', label: 'Client Retention' },
  { target: 85, unit: 'x', label: 'Avg. Efficiency Gain' },
  { target: 24, unit: '/7', label: 'Expert Support' },
];

/**
 * Floating cards around the brain.
 *   LEFT  -> 3 frosted-glass cards (AI Agents / Automation / Analytics)
 *   RIGHT -> 1 "rich-stack" entry = 2 white cards w/ blue-900 border
 *            (Chatbot Development [live typing chat] + Claude Automation [typing desc]).
 *
 * NOTE: `pos` / `tilt` ke class strings POORE literal hone chahiye (Tailwind JIT
 *       scan karke generate karta hai). Runtime pe concat / todna mat.
 */
type HeroCard = {
  title: string;
  desc: string;
  img: string;
  pos: string;
  tilt: string;
  side: 'left' | 'right';
  variant?: 'rich-stack';
};

const CARDS: HeroCard[] = [
  {
    title: 'AI Agents',
    desc: 'Intelligent agents that automate & assist.',
    img: './HeroPageCardsImages/Ai-Agents-Image.png',
    pos: 'left-[1%] top-[2%] lg:top-[-10%]',
    tilt: 'lg:[transform:perspective(750px)_rotateY(20deg)] lg:hover:[transform:perspective(750px)_rotateY(0deg)_translateY(-8px)_scale(1.04)]',
    side: 'left',
  },
  {
    title: 'Automation',
    desc: 'Streamline workflows and boost efficiency.',
    img: './HeroPageCardsImages/Dasboard-Image.png',
    pos: 'left-[1%] top-1/2 -translate-y-1/2 lg:top-[calc(50%_-_108px)] lg:translate-y-0',
    tilt: 'lg:[transform:perspective(750px)_rotateY(20deg)] lg:hover:[transform:perspective(750px)_rotateY(0deg)_translateY(-8px)_scale(1.04)]',
    side: 'left',
  },
  {
    title: 'Analytics',
    desc: 'Turn data into real-time insights.',
    img: './HeroPageCardsImages/Analytics-Image.png',
    pos: 'left-[1%] bottom-[2%] lg:bottom-[10%]',
    tilt: 'lg:[transform:perspective(750px)_rotateY(20deg)] lg:hover:[transform:perspective(750px)_rotateY(0deg)_translateY(-8px)_scale(1.04)]',
    side: 'left',
  },

  /* ── RIGHT SIDE — 2 white cards stacked (purane phone ki jagah) ── */
  {
    title: 'Right Showcase',
    desc: '',
    img: '',
    // tall stack -> vertically centered. Screen pe thoda upar/niche karna ho to ye value nudge karo.
    pos: 'right-[1%] top-1/2 -translate-y-1/2 lg:right-[-10%] lg:top-[calc(50%_-_310px)] lg:translate-y-0',
    tilt: '',
    side: 'right',
    variant: 'rich-stack',
  },
];

/* ── Continuous typewriter: types -> holds -> deletes -> retypes (loop) ── */
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && count < text.length) {
      t = setTimeout(() => setCount((c) => c + 1), 48); // typing speed
    } else if (!deleting && count === text.length) {
      t = setTimeout(() => setDeleting(true), 1800); // hold full text
    } else if (deleting && count > 0) {
      t = setTimeout(() => setCount((c) => c - 1), 26); // deleting speed
    } else {
      t = setTimeout(() => setDeleting(false), 500); // hold empty, then retype
    }
    return () => clearTimeout(t);
  }, [count, deleting, text]);

  return (
    <span>
      {text.slice(0, count)}
      <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-[#0066dd] align-middle animate-[caretBlink_0.9s_step-end_infinite]" />
    </span>
  );
};

/* ================================================================== */
/* Right-side white cards                                             */
/* ================================================================== */

// Claude-style terracotta sunburst
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
  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-900/15 bg-white">
    {children}
  </div>
);

/* ── Live "typing window" chat ── */
const CHAT_SCRIPT: { from: 'bot' | 'user'; text: string }[] = [
  { from: 'bot', text: 'Hi! How can I help you today?' },
  { from: 'user', text: 'I need help with my order.' },
  { from: 'bot', text: 'Sure! I can help you track your order. Please share your order ID.' },
];

const TypingDots: React.FC = () => (
  <span className="flex items-center gap-1 px-0.5 py-1">
    {[0, 1, 2].map((d) => (
      <span
        key={d}
        className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-[typingDot_1s_ease-in-out_infinite]"
        style={{ animationDelay: `${d * 0.15}s` }}
      />
    ))}
  </span>
);

const TypingChat: React.FC = () => {
  const [step, setStep] = useState(0); // active message index
  const [typed, setTyped] = useState(0); // chars typed in active message
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (step >= CHAT_SCRIPT.length) {
      // whole convo done -> hold, then loop
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
    <div className="flex h-[60px] sm:h-[100px] lg:h-[132px] flex-col justify-end gap-1 sm:gap-1.5 overflow-hidden">
      {CHAT_SCRIPT.map((m, idx) => {
        if (idx > step) return null;
        const active = idx === step;
        const isBot = m.from === 'bot';
        const shown = active ? m.text.slice(0, typed) : m.text;
        return (
          <div
            key={idx}
            className={`flex items-end gap-1 animate-[msgIn_0.3s_ease-out] ${isBot ? '' : 'justify-end'}`}
          >
            {isBot && <div className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 shrink-0 rounded-full bg-blue-900" />}
            <div
              className={`max-w-[82%] px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.42rem] sm:text-[0.55rem] lg:text-[0.62rem] leading-snug ${
                isBot
                  ? 'rounded-xl rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200'
                  : 'rounded-xl rounded-br-sm bg-blue-900 text-white'
              }`}
            >
              {active && thinking ? (
                <TypingDots />
              ) : (
                <>
                  {shown}
                  {active && (
                    <span
                      className={`ml-0.5 inline-block h-[0.85em] w-[1.5px] translate-y-[1px] align-middle animate-[caretBlink_0.9s_step-end_infinite] ${
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

const ChatbotRichCard: React.FC = () => (
  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-[1.5px] border-blue-900 bg-white p-1.5 sm:p-3 lg:p-4 shadow-[0_12px_40px_rgba(0,40,130,0.15)]">
    {/* header */}
    <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-xl bg-blue-900 shadow-md shadow-blue-900/30">
        <svg className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />
        </svg>
      </div>
      <div className="min-w-0">
        <h3 className="[font-family:Orbitron,sans-serif] text-[0.55rem] sm:text-[0.78rem] lg:text-[0.95rem] font-bold leading-tight tracking-wide text-blue-900">
          Chatbot Development
        </h3>
        <p className="mt-0.5 sm:mt-1 text-[0.42rem] sm:text-[0.58rem] lg:text-[0.72rem] leading-snug text-slate-600 line-clamp-2 sm:line-clamp-none">
          We build intelligent chatbots that enhance customer engagement and support.
        </p>
      </div>
    </div>

    {/* live typing window */}
    <div className="mt-1.5 sm:mt-2 lg:mt-3 flex overflow-hidden rounded-lg sm:rounded-xl border border-blue-900/15 bg-blue-50/60">
      <div className="hidden sm:flex w-6 lg:w-8 shrink-0 flex-col items-center gap-1.5 lg:gap-2 border-r border-blue-900/10 bg-blue-100/50 py-2 lg:py-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-2 w-2 lg:h-3 lg:w-3 rounded ${i === 0 ? 'bg-blue-900' : 'bg-blue-900/20'}`} />
        ))}
      </div>
      <div className="flex-1 p-1 sm:p-1.5 lg:p-2">
        <TypingChat />
        <div className="mt-1 sm:mt-1.5 lg:mt-2 flex items-center gap-1 sm:gap-1.5 rounded-full border border-blue-900/15 bg-white px-1.5 sm:px-2 lg:px-2.5 py-0.5 sm:py-1">
          <span className="flex-1 truncate text-[0.4rem] sm:text-[0.5rem] lg:text-[0.6rem] text-slate-400">Type a message...</span>
          <button className="flex h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full bg-blue-900">
            <svg className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 11l18-8-8 18-2-7-8-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ClaudeAutomationRichCard: React.FC = () => (
  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-[1.5px] border-blue-900 bg-white p-1.5 sm:p-3 lg:p-4 shadow-[0_12px_40px_rgba(0,40,130,0.15)]">
    {/* header */}
    <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 ring-1 ring-blue-900/10 shadow-md shadow-orange-500/20">
        <ClaudeBurst className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </div>
      <div className="min-w-0">
        <h3 className="[font-family:Orbitron,sans-serif] text-[0.55rem] sm:text-[0.78rem] lg:text-[0.95rem] font-bold leading-tight tracking-wide text-blue-900">
          Claude Automation
        </h3>
        {/* typing description */}
        <p className="mt-0.5 sm:mt-1 min-h-[1.4rem] sm:min-h-[2rem] lg:min-h-[2.6rem] text-[0.42rem] sm:text-[0.58rem] lg:text-[0.72rem] leading-snug text-slate-600">
          <TypewriterText text="Leverage Claude AI to automate complex tasks and drive smarter business operations." />
        </p>
      </div>
    </div>

    {/* flow diagram */}
    <div className="mt-1.5 sm:mt-2 lg:mt-3 rounded-lg sm:rounded-xl border border-blue-900/15 bg-blue-50/60 p-1.5 sm:p-2 lg:p-3">
      <div className="flex items-center justify-between gap-0.5">
        <span className="rounded sm:rounded-md bg-blue-900 px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 text-[0.4rem] sm:text-[0.5rem] lg:text-[0.58rem] font-semibold text-white">Input</span>
        <svg className="h-2 w-2.5 sm:h-2.5 sm:w-3 lg:h-3 lg:w-4 shrink-0 text-blue-900/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        <span className="flex items-center gap-0.5 sm:gap-1 rounded sm:rounded-md bg-white px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 text-[0.4rem] sm:text-[0.5rem] lg:text-[0.58rem] font-semibold text-blue-900 ring-1 ring-blue-900/25">
          <ClaudeBurst className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
          Claude AI
        </span>
        <svg className="h-2 w-2.5 sm:h-2.5 sm:w-3 lg:h-3 lg:w-4 shrink-0 text-blue-900/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        <span className="rounded sm:rounded-md bg-emerald-600 px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 text-[0.4rem] sm:text-[0.5rem] lg:text-[0.58rem] font-semibold text-white">Action</span>
      </div>

      <div className="mt-1.5 sm:mt-2 hidden sm:grid grid-cols-3 gap-1">
        <div className="flex flex-col items-center">
          <div className="h-2 lg:h-2.5 w-px bg-blue-900/20" />
          <IconBox>
            <svg className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" /><path d="M14 3v5h4" /></svg>
          </IconBox>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-2 lg:h-2.5 w-px bg-blue-900/20" />
          <div className="flex gap-1">
            <IconBox>
              <svg className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>
            </IconBox>
            <IconBox>
              <svg className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /></svg>
            </IconBox>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-2 lg:h-2.5 w-px bg-blue-900/20" />
          <IconBox>
            <svg className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 9l-3 3 3 3M16 9l3 3-3 3" /></svg>
          </IconBox>
        </div>
      </div>
    </div>
  </div>
);

/* Reusable simple frosted-glass card (used in both mobile flex layout and lg absolute layout) */
const SimpleCardVisual: React.FC<{ card: HeroCard }> = ({ card }) => (
  <div
    className={`group relative flex h-[72px] sm:h-[110px] lg:h-[136px] cursor-pointer flex-col justify-center rounded-xl sm:rounded-2xl border-[1.5px] border-[#0088ff] bg-white/15 p-1.5 sm:p-3 lg:p-4 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,80,200,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-[#33a3ff] hover:bg-white/25 hover:shadow-[0_14px_44px_rgba(0,90,220,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] hover:[transform:translateY(-6px)_scale(1.03)] ${card.tilt}`}
  >
    <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-70" />
    <div
      className={`relative flex items-start gap-1 sm:gap-2 lg:gap-3 ${
        card.side === 'right' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <img
        src={card.img}
        alt={card.title}
        className="h-6 w-6 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-[72px] lg:w-[72px] flex-shrink-0 object-contain mix-blend-multiply"
      />
      <div className="min-w-0 flex-1">
        <h3 className="[font-family:Orbitron,sans-serif] text-[0.48rem] sm:text-[0.7rem] lg:text-[0.92rem] font-bold leading-tight tracking-wide text-[#1e3a8a]">
          {card.title}
        </h3>
        <p className="mt-0.5 sm:mt-1 lg:mt-1.5 min-h-[1.3rem] sm:min-h-[2.4rem] lg:min-h-[3.3rem] text-[0.4rem] sm:text-[0.6rem] lg:text-[0.8rem] font-medium leading-snug text-slate-700">
          <TypewriterText text={card.desc} />
        </p>
      </div>
    </div>
  </div>
);

/* Right-side stack: 2 cards + subtle 3D bend toward the brain (lg only) */
const RightCardStack: React.FC = () => (
  <div className="lg:[transform:perspective(1100px)_rotateY(-14deg)] lg:transition-transform lg:duration-500 lg:ease-out lg:hover:[transform:perspective(1100px)_rotateY(0deg)]">
    <div className="flex flex-col gap-1.5 sm:gap-2.5 lg:gap-3.5">
      <ChatbotRichCard />
      <ClaudeAutomationRichCard />
    </div>
  </div>
);

type HeroProps = {
  onOpenChatbot?: () => void;
};

const Hero: React.FC<HeroProps> = ({ onOpenChatbot }) => {
  const heroRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statValRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Entrance timeline ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(
        cardRefs.current.filter(Boolean),
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        '-=0.4'
      )
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  /* ── Brain scroll parallax + scale ── */
  useEffect(() => {
    const heroEl = heroRef.current;
    const wrapEl = imageWrapRef.current;
    const imgEl = imageRef.current;
    if (!heroEl || !wrapEl || !imgEl) return;

    const ctx = gsap.context(() => {
      gsap.set([wrapEl, imgEl], { force3D: true });

      gsap.fromTo(
        wrapEl,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(wrapEl, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        imgEl,
        { scale: 1.06 },
        {
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  /* ── Animated stat counters ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      STATS.forEach((stat, i) => {
        const el = statValRefs.current[i];
        if (!el) return;

        gsap.to(
          { v: 0 },
          {
            v: stat.target,
            duration: 2,
            ease: 'power2.out',
            onUpdate(this: gsap.core.Tween) {
              const val = Math.round((this.targets()[0] as { v: number }).v);
              el.innerHTML = `${val}<span style="color:#00aaff">${stat.unit}</span>`;
            },
          }
        );
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* keyframes that pure Tailwind utilities can't express */}
      <style>{`
        @keyframes cgPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
          50%      { transform: translate(-50%, -50%) scale(1.3); opacity: 1;   }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30%           { opacity: 1;   transform: translateY(-3px); }
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-col items-center overflow-hidden pt-[52px]"
      >
        {/* ── Headline ── */}
        <div className="relative z-20 mt-[30px] px-5 text-center">
          <h1
            ref={titleRef}
            className="[font-family:Orbitron,sans-serif] text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.18] tracking-[-0.5px] text-[#1e3a8a] [text-shadow:0_0_60px_rgba(0,168,255,0.28)]"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Transform Your Business
            <br />
            with Enterprise{' '}
            <span className="bg-gradient-to-br from-[#00d4ff] to-[#0080ff] bg-clip-text text-transparent">
              AI
            </span>{' '}
            Solutions
          </h1>
          <p
            ref={subtextRef}
            className="mx-auto mt-[18px] max-w-[600px] text-base font-normal leading-[1.7] text-slate-600"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            Deploy intelligent automation, predictive analytics, and AI-driven insights that deliver
            measurable ROI. Purpose-built for enterprise scale, security, and compliance.
          </p>
        </div>

        {/* ── Scene: brain + floating cards (3 left, 2-card stack right) ── */}
        <div className="relative z-20 mx-auto w-full max-w-[1000px]">
          {/* ─── MOBILE & TABLET LAYOUT (uses heroImg2): flex row [left cards | brain | rich stack] ─── */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 mt-4 sm:mt-6 px-2 sm:px-4 lg:hidden">
            {/* Left column - 3 simple cards stacked */}
            <div className="flex flex-shrink-0 flex-col gap-1.5 sm:gap-2.5 w-[24vw] max-w-[105px] sm:w-[140px] sm:max-w-none md:w-[175px]">
              {CARDS.slice(0, 3).map((card, i) => (
                <div
                  key={card.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{ opacity: 0, transform: 'translateY(24px)' }}
                >
                  <div
                    className="animate-[cardFloat_6s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  >
                    <SimpleCardVisual card={card} />
                  </div>
                </div>
              ))}
            </div>

            {/* Brain image (mobile/tablet only - uses heroImg2) */}
            <div className="relative flex flex-shrink-0 items-center justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px] rounded-full animate-[cgPulse_4s_ease-in-out_infinite]"
                style={{
                  background: 'radial-gradient(circle, rgba(0,160,255,0.13) 0%, transparent 65%)',
                }}
              />
              <img
                src={heroImg2}
                alt="AI Brain Visualization"
                className="relative block h-auto w-[38vw] max-w-[170px] sm:w-[32vw] sm:max-w-[270px] md:w-[34vw] md:max-w-[320px]"
              />
            </div>

            {/* Right column - rich stack (chatbot + claude automation) */}
            <div
              className="flex-shrink-0 w-[30vw] max-w-[130px] sm:w-[180px] sm:max-w-none md:w-[220px]"
              ref={(el) => {
                cardRefs.current[3] = el;
              }}
              style={{ opacity: 0, transform: 'translateY(24px)' }}
            >
              <div
                className="animate-[cardFloat_6s_ease-in-out_infinite]"
                style={{ animationDelay: '2.1s' }}
              >
                <RightCardStack />
              </div>
            </div>
          </div>

          {/* ─── DESKTOP (LG+) LAYOUT (uses heroImg): brain centered + absolutely positioned cards ─── */}
          <div className="hidden lg:block">
            <div
              ref={imageWrapRef}
              className="relative mt-7 flex justify-center will-change-transform"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] rounded-full animate-[cgPulse_4s_ease-in-out_infinite]"
                style={{
                  background: 'radial-gradient(circle, rgba(0,160,255,0.13) 0%, transparent 65%)',
                }}
              />
              <img
                ref={imageRef}
                src={heroImg}
                alt="AI Brain Visualization"
                className="relative block h-auto w-[min(48vw,670px)] max-w-full will-change-transform"
              />
            </div>

            {/* lg cards: absolutely positioned around brain with 3D tilt */}
            <div className="absolute inset-0 pointer-events-none">
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  ref={(el) => {
                    cardRefs.current[i + 4] = el;
                  }}
                  className={`absolute pointer-events-auto ${
                    card.variant === 'rich-stack' ? 'w-[300px]' : 'w-[215px]'
                  } ${card.pos}`}
                  style={{ opacity: 0, transform: 'translateY(24px)' }}
                >
                  <div
                    className="animate-[cardFloat_6s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  >
                    {card.variant === 'rich-stack' ? (
                      <RightCardStack />
                    ) : (
                      <SimpleCardVisual card={card} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div
          ref={ctaRef}
          className="relative z-20 mt-7 flex gap-[14px] max-lg:w-[min(92vw,420px)] max-lg:flex-col max-lg:items-stretch max-lg:gap-3"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <button
            onClick={() => onOpenChatbot?.()}
            className="flex items-center justify-center gap-[9px] whitespace-nowrap rounded-full border border-[rgba(0,136,255,0.45)] bg-[rgba(10,24,56,0.72)] px-8 py-[13px] [font-family:Rajdhani,sans-serif] text-base font-bold tracking-wide text-[#eaf3ff] shadow-[0_8px_24px_rgba(0,36,108,0.25)] backdrop-blur-[10px] transition-all duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:border-[rgba(0,170,255,0.65)] hover:bg-[rgba(14,34,74,0.9)] max-lg:w-full max-lg:px-5 max-lg:py-3"
          >
            Chat with AI
          </button>
          <button className="flex items-center justify-center gap-[9px] whitespace-nowrap rounded-full bg-gradient-to-br from-[#003ccf] to-[#0088ff] px-8 py-[13px] [font-family:Rajdhani,sans-serif] text-base font-bold tracking-wide text-white shadow-[0_6px_28px_rgba(0,100,255,0.48)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_38px_rgba(0,100,255,0.65)] max-lg:w-full max-lg:px-5 max-lg:py-3">
            Book a Consultation
          </button>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef}
          className="relative z-20 mb-10 mt-8 flex gap-[52px] rounded-[14px] border border-[rgba(0,168,255,0.14)] bg-[rgba(5,14,38,0.62)] px-14 py-[22px] backdrop-blur-[16px] max-md:mx-auto max-md:grid max-md:w-[min(92vw,560px)] max-md:grid-cols-2 max-md:gap-[18px_22px] max-md:px-5 max-md:py-[18px]"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                ref={(el) => {
                  statValRefs.current[i] = el;
                }}
                className="[font-family:Orbitron,sans-serif] text-[1.75rem] font-extrabold text-white max-md:text-[1.5rem]"
              >
                0<span className="text-blue-900">{stat.unit}</span>
              </div>
              <div className="mt-0.5 text-[0.8rem] tracking-wide text-[#9cb3d9]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;