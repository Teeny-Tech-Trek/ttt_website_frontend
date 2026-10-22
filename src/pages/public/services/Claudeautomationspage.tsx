import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  Plug,
  Wrench,
  Bot,
  CalendarClock,
  Gauge,
  Zap,
  ShieldCheck,
  FileText,
  EyeOff,
  Sparkles,
  Phone,
  CheckCircle2,
  Play,
  Calendar,
  RotateCcw,
  Loader2,
  ArrowRight,
  Users,
  Mail,
  BarChart3,
  FlaskConical,
  Rocket,
  Settings2,
  Table2,
  Newspaper,
  UserCircle2,
  DollarSign,
  Megaphone,
  Cog,
} from 'lucide-react';
import {
  SiGmail,
  SiGoogledrive,
  SiGooglesheets,
  SiGooglecalendar,
  SiSlack,
  SiNotion,
  SiHubspot,
  SiDropbox,
  SiGithub,
  SiAirtable,
} from 'react-icons/si';
import HashLink from '../../../components/ui/SectionLink';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../../utils/scrollToSection';
import claudeAutomationHeroImg from '../../../Images/services/web p claude automation service/claude automation image 1 regenerated.webp';
import claudeSetupTimelineImg from '../../../Images/services/web p claude automation service/claude automation image 5 regenerated.webp';

/* ------------------------------------------------------------------ */
/*  Shared bits (same pattern as the n8n page)                         */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: 'easeOut' },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const HandNote: React.FC<{ className?: string; children: React.ReactNode; rotate?: number }> = ({
  className = '',
  children,
  rotate = -4,
}) => (
  <div
    className={`hidden lg:block absolute text-blue-400 text-xl leading-snug pointer-events-none select-none ${className}`}
    style={{ fontFamily: "'Caveat', cursive", transform: `rotate(${rotate}deg)` }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full">
    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
    {children}
  </div>
);

type AppIcon = { icon: React.ElementType; color: string };

const APP_ICONS: Record<string, AppIcon> = {
  Gmail: { icon: SiGmail, color: '#EA4335' },
  'Google Drive': { icon: SiGoogledrive, color: '#4285F4' },
  'Google Sheets': { icon: SiGooglesheets, color: '#0F9D58' },
  'Google Calendar': { icon: SiGooglecalendar, color: '#4285F4' },
  Slack: { icon: SiSlack, color: '#4A154B' },
  Notion: { icon: SiNotion, color: '#000000' },
  HubSpot: { icon: SiHubspot, color: '#FF7A59' },
  Outlook: { icon: Mail, color: '#0078D4' },
  Excel: { icon: Table2, color: '#217346' },
  Dropbox: { icon: SiDropbox, color: '#0061FF' },
  GitHub: { icon: SiGithub, color: '#181717' },
  Airtable: { icon: SiAirtable, color: '#18BFFF' },
};

const AppChip: React.FC<{ name: string; size?: 'sm' | 'md' }> = ({ name, size = 'sm' }) => {
  const entry = APP_ICONS[name];
  const dim = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const iconDim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  if (!entry) {
    return (
      <div className={`flex items-center justify-center ${dim} bg-gray-100 border border-gray-200 rounded-lg`} title={name}>
        <span className="text-[9px] font-bold text-gray-500">{name.slice(0, 1)}</span>
      </div>
    );
  }
  const Icon = entry.icon;
  return (
    <div className={`flex items-center justify-center ${dim} bg-white border border-gray-200 rounded-lg shadow-sm`} title={name}>
      <Icon className={iconDim} style={{ color: entry.color }} aria-hidden="true" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Live Demo — TeenyFlow Workspace scripted runner                    */
/* ------------------------------------------------------------------ */

type DemoTaskDef = { icon: React.ElementType; text: string; flow: string };

const demoTasks: DemoTaskDef[] = [
  { icon: FileText, text: "Pull this week's metrics into the Friday report template.", flow: 'Google Sheets → Claude → Formatted report' },
  { icon: Table2, text: 'Reconcile these 40 receipts into one expense sheet.', flow: 'Gmail → OCR → Google Sheets' },
  { icon: Mail, text: 'Draft replies to overnight support emails for my review.', flow: 'Gmail → Claude → Draft responses' },
];

const taskScenarios = [
  [
    { type: 'user', text: "Pull this week's metrics into the Friday report template." },
    { type: 'agent', text: 'Reading metrics from Google Sheets…', resolves: true },
    { type: 'agent', text: 'Analyzing and summarizing key trends…', resolves: true },
    { type: 'agent', text: 'Populating Friday Report template…', resolves: true },
    { type: 'agent', text: 'Adding charts and formatting…', resolves: true },
    { type: 'final', text: 'Done. Friday-Report.docx is ready for your review.', approve: true },
  ],
  [
    { type: 'user', text: 'Reconcile these 40 receipts into one expense sheet.' },
    { type: 'agent', text: 'Reading 40 receipt images from /Expenses…', resolves: true },
    { type: 'agent', text: 'Extracting vendor, date, and amount from each…', resolves: true },
    { type: 'agent', text: 'Building Expense-Sheet-June.xlsx with totals…', resolves: true },
    { type: 'final', text: 'Done. 2 receipts flagged for manual review.', approve: true },
  ],
  [
    { type: 'user', text: 'Draft replies to overnight support emails for my review.' },
    { type: 'agent', text: 'Reading 12 support emails from inbox…', resolves: true },
    { type: 'agent', text: 'Classifying intent and urgency…', resolves: true },
    { type: 'agent', text: 'Drafting personalised reply for each…', resolves: true },
    { type: 'final', text: 'Done. 12 draft replies ready — 1 flagged as urgent.', approve: true },
  ],
];

const TaskRunnerDemo = ({ scenario = taskScenarios[0] }: { scenario?: typeof taskScenarios[0] }) => {
  const [statuses, setStatuses] = useState(scenario.map(() => 'hidden'));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startedRef = useRef(false);
  const reducedMotion = useRef(false);

  const clearTimers = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  const run = () => {
    clearTimers();
    if (reducedMotion.current) {
      setStatuses(scenario.map(() => 'done'));
      return;
    }
    setStatuses(scenario.map(() => 'hidden'));
    let delay = 350;
    scenario.forEach((step, idx) => {
      timeouts.current.push(
        setTimeout(() => {
          setStatuses((prev) => {
            const next = [...prev];
            next[idx] = step.type === 'agent' && step.resolves ? 'processing' : 'done';
            return next;
          });
        }, delay)
      );
      delay += 850;
      if (step.type === 'agent' && step.resolves) {
        timeouts.current.push(
          setTimeout(() => {
            setStatuses((prev) => {
              const next = [...prev];
              next[idx] = 'done';
              return next;
            });
          }, delay)
        );
        delay += 550;
      }
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  const replay = () => {
    startedRef.current = false;
    run();
  };

  return (
    <div ref={containerRef} className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
      <div className="p-6 text-white bg-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
              <Bot className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-lg font-bold">TeenyFlow Workspace</div>
              <div className="text-sm text-blue-100">Claude Agent • Cowork Automation</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Live Demo</span>
          </div>
        </div>
      </div>

      <div className="p-6 min-h-[24rem] bg-gray-50" aria-live="polite">
        <div className="space-y-3">
          {scenario.map((step, idx) => {
            const status = statuses[idx];
            if (status === 'hidden') return null;

            if (step.type === 'user') {
              return (
                <motion.div key={idx} className="flex justify-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="max-w-md p-4 text-black bg-gray-200 rounded-2xl">
                    <p className="text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            }

            if (step.type === 'final') {
              return (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white border border-green-200 rounded-xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black">{step.text}</p>
                    {step.approve && (
                      <div className="flex items-center justify-between gap-3 p-3 mt-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="flex-shrink-0 w-4 h-4 text-blue-900" aria-hidden="true" />
                          <div>
                            <div className="text-xs font-semibold text-black">Friday-Report.docx</div>
                            <div className="text-[11px] text-gray-500">Generated by Claude</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={replay}
                          className="px-3 py-1.5 text-xs font-medium text-blue-900 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors whitespace-nowrap"
                        >
                          Approve before send?
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-100 rounded-xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-sm text-gray-700">{step.text}</span>
                {status === 'processing' ? (
                  <Loader2 className="w-5 h-5 text-blue-900 animate-spin flex-shrink-0" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end px-6 py-3 bg-white border-t border-gray-100">
        <button
          type="button"
          onClick={replay}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Replay
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

type DeliverCard = { icon: React.ElementType; pill: string; title: string; desc: string; points?: string[] };

const DELIVER_GROUPS: { label: string; cards: DeliverCard[] }[] = [
  {
    label: 'Connect & Configure',
    cards: [
      {
        icon: Plug,
        pill: 'Connect',
        title: 'Tool Connections',
        desc: 'We link Claude to the apps you already run — Gmail, Drive, Sheets, Slack, Notion, HubSpot and 200+ more — using secure connectors with permissions you control.',
      },
      {
        icon: Wrench,
        pill: 'Build',
        title: 'Custom MCP Tools',
        desc: "When a ready-made connector doesn't exist, we build one. Bespoke MCP tools wire Claude into your internal systems, databases, and any tool with an API — and we maintain them as your systems change.",
        points: ['Built for your exact internal tools and data', 'Secure, reusable, and yours to keep', 'Maintained as your APIs and systems evolve'],
      },
    ],
  },
  {
    label: 'Build & Automate',
    cards: [
      {
        icon: Sparkles,
        pill: 'Personalize',
        title: 'Claude Setup & Personalization',
        desc: "We set up Claude with your company's context built in — custom instructions, your key documents and templates, and reusable Skills for the tasks your team repeats — so responses sound like they came from someone who already knows your business.",
        points: ['Custom instructions matched to your tone and policies', 'Your key documents and templates loaded as context', 'Reusable Skills built for tasks your team does every week'],
      },
      {
        icon: Bot,
        pill: 'Automate',
        title: 'Cowork Setups',
        desc: 'We configure Claude on your desktop to handle real work end-to-end — sorting files, extracting data, drafting reports, multi-step jobs — with no coding on your side.',
        points: ['Handles multi-step jobs across files and apps in one run', 'Checks in before anything significant happens', 'No engineering required to run day to day'],
      },
    ],
  },
  {
    label: 'Run & Support',
    cards: [
      {
        icon: CalendarClock,
        pill: 'Schedule',
        title: 'Recurring Runs',
        desc: 'Set-and-forget workflows on a cadence you pick: daily inbox triage, weekly metric reports, monthly reconciliations — Claude runs them, you review.',
      },
      {
        icon: Cog,
        pill: 'Support',
        title: 'Ongoing Optimization & Support',
        desc: "Your business changes, and your setup should too. We check in on how your automations are performing, update instructions and Skills as your process evolves, and fix any connector that breaks when a tool updates its API.",
        points: ['Regular check-ins to refine instructions and Skills', 'Fast fixes if a connector or MCP tool breaks', "Updates as your team's tools and processes change"],
      },
    ],
  },
];

type GalleryItem = { icon: React.ElementType; title: string; flow: string; desc: string };

const POPULAR_AUTOMATIONS: GalleryItem[] = [
  { icon: FileText, title: 'Friday Report Automation', flow: 'Google Sheets → Claude → Formatted report', desc: "Pulls this week's metrics into your report template, charts included." },
  { icon: Table2, title: 'Receipt & Expense Reconciliation', flow: 'Gmail → OCR → Google Sheets', desc: 'Reconciles a stack of receipts into one clean expense sheet.' },
  { icon: Mail, title: 'Overnight Support Email Triage', flow: 'Gmail → Claude → Draft responses', desc: 'Drafts replies to overnight support emails, ready for review each morning.' },
  { icon: FileText, title: 'Meeting Notes & Action Items', flow: 'Transcript → Claude → Notion + Email', desc: 'Summarizes a call and emails action items to attendees within minutes.' },
  { icon: Newspaper, title: 'Competitor & Market Digest', flow: 'Web research → Claude → Slack/Doc', desc: 'Pulls together a weekly digest of competitor moves and market news.' },
  { icon: UserCircle2, title: 'New-Hire Onboarding Pack', flow: 'HR templates → Claude → Personalized doc', desc: 'Builds a tailored onboarding document for each new hire from your templates.' },
];

const CHANGES = [
  {
    icon: Gauge,
    pill: 'Capacity',
    badge: '↑ 10–20 hrs/week',
    title: 'Hours Back Every Week',
    desc: 'Repetitive admin, data entry, and reporting run automatically — freeing your team for the work that actually needs a human.',
    tag: { icon: Users, text: 'Focus your team on higher-value work.' },
  },
  {
    icon: Zap,
    pill: 'Speed',
    badge: '↑ Minutes, not hours',
    title: 'Afternoon Jobs in Minutes',
    desc: 'Multi-step tasks — reconciling files, compiling reports, triaging email — finish while you focus on something else.',
    tag: { icon: FlaskConical, text: 'Get time back, every single day.' },
  },
  {
    icon: ShieldCheck,
    pill: 'Control',
    badge: '↑ More visibility',
    title: 'Human-in-the-Loop by Design',
    desc: 'Claude checks in before any significant action and logs every step, so you keep approval and a full audit trail.',
    tag: { icon: FileText, text: 'You stay in control, always.' },
  },
];

const integrations = ['Gmail', 'Google Drive', 'Google Sheets', 'Google Calendar', 'Slack', 'Notion', 'HubSpot', 'Outlook', 'Excel', 'Dropbox', 'GitHub', 'Airtable'];

const dataGuardrails = [
  { icon: ShieldCheck, title: 'Permission-Scoped Connectors', subtitle: "Claude only sees what you explicitly allow — never blanket account access" },
  { icon: EyeOff, title: 'Human Review Before Any Action', subtitle: 'Nothing significant happens — sending, posting, updating records — without your review' },
  { icon: FileText, title: 'Full Audit Trail', subtitle: 'Every step Claude takes is logged and reviewable' },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

const ClaudeAutomationsPage = () => {
  const navigate = useNavigate();
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const handle4WeekPilotBtn = () => navigate('/pilot');
  const handleTaskClick = (index: number) => setActiveTaskIndex(index);

  return (
    <div className="min-h-screen bg-white mt-14">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap" rel="stylesheet" />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 bg-gray-100 rounded-full w-96 h-96 blur-3xl opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-gray-50 blur-3xl opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </div>

        <div className="relative px-6 pt-8 mx-auto max-w-7xl sm:pt-12 lg:pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div
                className="items-center hidden gap-2 px-4 py-2 text-blue-900 bg-gray-100 rounded-full lg:inline-flex"
                variants={scaleIn}
              >
                <Workflow className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">Claude Automations &amp; Workflows</span>
              </motion.div>

              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black" variants={fadeInUp}>
                AI that actually <span className="text-blue-900">does the work</span> — across your files, apps, and inbox
              </motion.h1>

              <motion.p className="text-xl leading-relaxed text-gray-700" variants={fadeInUp}>
                We connect Claude to the tools you already use, build the custom integrations you don't have, and set up the
                automations — so your team gets finished work, not another app to learn.
              </motion.p>

              <motion.div className="flex flex-col gap-4 sm:flex-row" variants={fadeInUp}>
                <button
                  type="button"
                  onClick={() => scrollToSection('see-it-work')}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                >
                  <Play className="w-5 h-5" aria-hidden="true" />
                  See it in action
                </button>
                <button
                  type="button"
                  onClick={handle4WeekPilotBtn}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  See a 4-week setup plan
                </button>
              </motion.div>

              <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-3" variants={staggerContainer}>
                {[
                  { icon: DollarSign, title: 'No per-task pricing', sub: 'Predictable, scalable costs' },
                  { icon: ShieldCheck, title: 'You own the infrastructure', sub: 'Your data, your control' },
                  { icon: Users, title: 'Human-reviewed before launch', sub: 'Built for real business use' },
                ].map((item) => (
                  <motion.div key={item.title} className="flex items-start gap-2" variants={fadeInUp}>
                    <item.icon className="flex-shrink-0 w-4 h-4 mt-0.5 text-blue-600" aria-hidden="true" />
                    <div className="text-xs leading-tight text-gray-700">
                      <div className="font-semibold text-black">{item.title}</div>
                      {item.sub}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <img
                src={claudeAutomationHeroImg}
                alt="Claude Automation live workflow: input turns into Claude AI processing then action, connected to 500+ apps"
                className="w-full h-auto"
              />
              <HandNote className="-top-6 right-0" rotate={4}>
                From context{'\n'}to completed work.
              </HandNote>
            </motion.div>
          </div>

          {/* Built for teams band */}
          <motion.div
            className="flex flex-col items-center gap-6 p-6 mt-16 border border-blue-100 lg:flex-row bg-blue-50/60 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-start flex-shrink-0 gap-3 lg:max-w-md">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full">
                <Users className="w-5 h-5 text-blue-900" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-bold text-black">Built for teams that want real results</div>
                <div className="text-xs text-gray-600">
                  For ops, finance, marketing, and admin teams who want repetitive work handled automatically — no engineers to
                  hire, no new software to manage, and a human always in the loop.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center flex-1 gap-8 lg:justify-end">
              {[
                { value: '50+', label: 'Workflows deployed' },
                { value: '4 weeks', label: 'Typical setup time' },
                { value: '100%', label: 'Yours to own' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-lg font-bold text-blue-900">{s.value}</div>
                  <div className="text-xs text-gray-600 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHAT WE DELIVER ================= */}
      <section id="what-we-deliver" className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Bot}>Done For You</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="text-xl text-gray-700">Done-for-you Claude setups — connected, configured, and kept running.</p>
          </motion.div>

          <div className="space-y-14">
            {DELIVER_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="mb-6 text-sm font-bold tracking-wide text-blue-900 uppercase">{group.label}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {group.cards.map((item) => (
                    <motion.div
                      key={item.title}
                      className="p-6 bg-white border border-gray-200 rounded-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-xl">
                        <item.icon className="w-6 h-6 text-blue-900" aria-hidden="true" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 mb-3 text-xs font-semibold text-blue-900 bg-blue-50 rounded-full">
                        {item.pill}
                      </span>
                      <h4 className="mb-2 text-lg font-bold text-black">{item.title}</h4>
                      <p className={item.points ? 'mb-4 text-sm leading-relaxed text-gray-600' : 'text-sm leading-relaxed text-gray-600'}>
                        {item.desc}
                      </p>
                      {item.points && (
                        <ul className="space-y-1.5">
                          {item.points.map((p) => (
                            <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR AUTOMATIONS GALLERY ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Sparkles}>Real Examples</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Popular Automations Teams Build <span className="text-blue-900">With Claude</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Real examples, not hypotheticals — pick one closest to your process, or tell us what's different about yours.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {POPULAR_AUTOMATIONS.map((item) => (
              <motion.div
                key={item.title}
                className="p-6 bg-gray-50 border border-gray-200 rounded-2xl"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-xl">
                  <item.icon className="w-6 h-6 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-black">{item.title}</h3>
                <p className="mb-3 text-xs font-medium tracking-wide text-blue-900 uppercase">{item.flow}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-10 text-sm text-center text-gray-500">
            Don't see your process here? We'll build it — see{' '}
            <button
              type="button"
              onClick={() => scrollToSection('what-we-deliver')}
              className="font-semibold text-blue-900 underline hover:text-blue-700"
            >
              Custom MCP Tools and Cowork Setups
            </button>{' '}
            above.
          </p>
        </div>
      </section>

      {/* ================= WHAT CHANGES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={BarChart3}>Real Impact</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              What <span className="text-blue-900">Changes</span>
            </h2>
            <p className="text-xl text-gray-700">Measurable impact on your team's day-to-day operations.</p>
          </motion.div>

          <motion.div
            className="grid gap-6 mb-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {CHANGES.map((item) => (
              <motion.div key={item.title} className="p-8 bg-white border border-gray-200 rounded-2xl" variants={fadeInUp}>
                <div className="relative flex items-center justify-center w-16 h-16 mb-5 bg-blue-100 rounded-2xl">
                  <item.icon className="w-8 h-8 text-blue-900" aria-hidden="true" />
                  <span className="absolute inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full shadow-sm -right-6 -top-3 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 mb-3 text-xs font-medium text-blue-900 bg-blue-100 rounded-full">
                  {item.pill}
                </span>
                <h3 className="mb-3 text-xl font-bold text-black">{item.title}</h3>
                <p className="mb-4 leading-relaxed text-gray-600">{item.desc}</p>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                  <item.tag.icon className="flex-shrink-0 w-4 h-4 text-blue-900" aria-hidden="true" />
                  <span className="text-sm font-medium text-blue-900">{item.tag.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {['Higher productivity', 'Fewer manual errors', 'More time for what matters'].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
                {p}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SEE IT WORK ================= */}
      <section id="see-it-work" className="relative py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Play}>Live Workflow Demo</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Watch Claude take a <span className="text-blue-900">real task</span> from start to finish
            </h2>
            <p className="text-lg text-gray-700">See how a multi-step workflow runs — from input to completed work.</p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <TaskRunnerDemo scenario={taskScenarios[activeTaskIndex]} />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold text-blue-900">Try these tasks:</h3>

              <motion.div className="space-y-4" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
                {demoTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleTaskClick(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(index)}
                    className={`flex items-start gap-3 w-full p-4 text-left transition-colors cursor-pointer border rounded-lg ${
                      activeTaskIndex === index ? 'bg-blue-900 border-blue-900' : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <task.icon className={`flex-shrink-0 w-5 h-5 mt-0.5 ${activeTaskIndex === index ? 'text-white' : 'text-blue-900'}`} aria-hidden="true" />
                    <div>
                      <div className={`text-sm font-semibold ${activeTaskIndex === index ? 'text-white' : 'text-black'}`}>{task.text}</div>
                      <div className={`text-xs ${activeTaskIndex === index ? 'text-blue-200' : 'text-gray-500'}`}>{task.flow}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Zap, title: 'Real workflows', desc: 'See actual steps, not just a static demo.' },
                  { icon: ShieldCheck, title: 'Your data stays private', desc: 'Runs on your infrastructure with your tools.' },
                  { icon: Users, title: 'Human-in-the-loop', desc: 'You review and approve before anything is sent.' },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                    </div>
                    <div className="text-xs font-semibold text-black">{item.title}</div>
                    <div className="text-[11px] text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INTEGRATIONS ================= */}
      <section className="relative py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <HandNote className="top-24 left-6">Your tools.{'\n'}Your workflows.</HandNote>
          <HandNote className="top-24 right-6" rotate={4}>
            And{'\n'}anything else.
          </HandNote>

          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Plug}>Integrations</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-blue-900">Integrations</h2>
            <p className="text-xl text-gray-700">Works with the tools you already use — and anything else via custom MCP.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-3 max-w-3xl mx-auto sm:grid-cols-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {integrations.map((integration) => (
              <motion.div
                key={integration}
                className="flex flex-col items-center gap-2 p-4 text-center bg-white border border-gray-200 rounded-xl"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <AppChip name={integration} size="md" />
                <span className="text-xs font-medium text-black">{integration}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handle4WeekPilotBtn}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-full hover:bg-blue-800"
            >
              + Custom MCP for any tool with an API
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm">
            {['200+ apps and counting', 'Secure, permission-based connectors', 'Or connect any tool via API or MCP'].map((p) => (
              <div key={p} className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= YOUR DATA STAYS YOURS ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={ShieldCheck}>Data & Security</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Your Data <span className="text-blue-900">Stays Yours</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Every connector we set up uses scoped, permission-based access — Claude only sees what you explicitly allow.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {dataGuardrails.map((item) => (
              <motion.div key={item.title} className="p-6 text-center bg-gray-50 border border-gray-200 rounded-2xl" variants={fadeInUp}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl">
                  <item.icon className="w-6 h-6 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold text-black">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= HOW THE 4-WEEK SETUP WORKS ================= */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src={claudeSetupTimelineImg}
              alt="How the 4-week setup works: Week 1 audit and map, Week 2 connect and build, Week 3 automate, Week 4 handover and train"
              className="w-full h-auto"
            />
          </motion.div>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-100 rounded-full">
              <Rocket className="w-4 h-4" aria-hidden="true" />
              Go from idea to impact in 4 weeks.
            </span>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section id="start-pilot" className="relative py-20 overflow-hidden text-black bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-10 blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl px-6 mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-blue-100 border border-blue-200 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-blue-900" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-900">Ready to automate?</span>
            </motion.div>

            <motion.h2
              className="mb-6 text-4xl font-bold text-black lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              Start a <span className="text-blue-900">4-week setup</span>
            </motion.h2>

            <motion.p
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
              Get Claude wired into your tools and running your first automations — with measurable results. No long
              commitments, just proven outcomes.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-4 mb-8 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-900 shadow-lg rounded-xl hover:bg-blue-800 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handle4WeekPilotBtn}
            >
              <Zap className="w-5 h-5" aria-hidden="true" />
              Start a 4-week pilot
            </motion.button>

            <HashLink
              smooth
              to="/book-consultation"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Book a 45-min call
            </HashLink>
          </motion.div>

          <motion.div
            className="grid max-w-2xl gap-6 mx-auto mb-14 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
          >
            {['No setup fees', 'Works with your stack', 'You stay in control'].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 text-black">
                <CheckCircle2 className="w-5 h-5 text-blue-900" aria-hidden="true" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4 pt-10 border-t border-gray-100 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {[
              { icon: Calendar, title: 'Clear timeline', desc: 'Working automations in 4 weeks.' },
              { icon: BarChart3, title: 'Measurable results', desc: 'Focus on high-ROI use cases.' },
              { icon: Plug, title: 'Works with your tools', desc: 'Connect your existing apps and data.' },
              { icon: ShieldCheck, title: 'You stay in control', desc: 'Your data, your infrastructure, your decisions.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 text-left bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-blue-100 rounded-lg">
                  <item.icon className="w-4.5 h-4.5 text-blue-900" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black">{item.title}</div>
                  <div className="text-xs text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-100 lg:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Trusted by teams across functions</span>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Users, label: 'Operations' },
                { icon: BarChart3, label: 'Finance' },
                { icon: Megaphone, label: 'Marketing' },
                { icon: Settings2, label: 'Admin' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-gray-600">
                  <item.icon className="w-4 h-4 text-blue-900" aria-hidden="true" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ClaudeAutomationsPage;
