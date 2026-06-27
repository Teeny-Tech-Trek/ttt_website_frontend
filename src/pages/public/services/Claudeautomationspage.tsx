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
  MessageSquare,
  Star,
  FolderLock,
  FileText,
  EyeOff,
  BarChart3,
  Sparkles,
  Phone,
  CheckCircle2,
  Play,
  Calendar,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';
import { useNavigate } from 'react-router-dom';
import ClaudeAutomationRichCard from '../../../components/home/ClaudeAutomationRichCard';

// Animation variants (matched to the AI Chatbots page)
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

/* ------------------------------------------------------------------ */
/*  SECTION 5 — Task Runner Demo widget                                */
/*  Self-contained, front-end-only, scripted animation. NO API calls,  */
/*  NO storage. Starts on scroll-into-view, honors reduced-motion.     */
/* ------------------------------------------------------------------ */

const taskScenarios = [
  [
    { type: 'user', text: "Pull this week's metrics into the Friday report template." },
    { type: 'agent', text: 'Reading metrics from Google Sheets…', resolves: true },
    { type: 'agent', text: 'Populating Friday Report template…', resolves: true },
    { type: 'agent', text: 'Adding charts and formatting…', resolves: true },
    { type: 'final', text: 'Done. Friday-Report.docx is ready for your review.', approve: true },
  ],
  [
    { type: 'user', text: "Reconcile these 40 receipts into one expense sheet." },
    { type: 'agent', text: 'Reading 40 receipt images from /Expenses…', resolves: true },
    { type: 'agent', text: 'Extracting vendor, date, and amount from each…', resolves: true },
    { type: 'agent', text: 'Building Expense-Sheet-June.xlsx with totals…', resolves: true },
    { type: 'final', text: 'Done. 2 receipts flagged for manual review.', approve: true },
  ],
  [
    { type: 'user', text: "Draft replies to overnight support emails for my review." },
    { type: 'agent', text: 'Reading 12 support emails from inbox…', resolves: true },
    { type: 'agent', text: 'Classifying intent and urgency…', resolves: true },
    { type: 'agent', text: 'Drafting personalised reply for each…', resolves: true },
    { type: 'final', text: 'Done. 12 draft replies ready — 1 flagged as urgent.', approve: true },
  ],
];

const TaskRunnerDemo = ({ scenario = taskScenarios[0] }: { scenario?: typeof taskScenarios[0] }) => {
  const [statuses, setStatuses] = useState(scenario.map(() => 'hidden'));
  const containerRef = useRef(null);
  const timeouts = useRef<any[]>([]);
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
  }, [scenario]);

  const replay = () => {
    startedRef.current = false;
    run();
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl"
    >
      {/* Header bar */}
      <div className="p-6 text-white bg-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold">TeenyFlow Workspace</div>
              <div className="text-sm text-blue-100">Cowork Agent • Working</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live Demo</span>
          </div>
        </div>
      </div>

      {/* Step list */}
      <div className="p-6 min-h-[24rem] bg-gray-50" aria-live="polite">
        <div className="space-y-3">
          {scenario.map((step, idx) => {
            const status = statuses[idx];
            if (status === 'hidden') return null;

            if (step.type === 'user') {
              return (
                <motion.div
                  key={idx}
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="max-w-md p-4 text-black bg-gray-200 rounded-2xl rounded-tr-md">
                    <p className="text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            }

            if (step.type === 'final') {
              return (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white border border-blue-100 rounded-xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-black">{step.text}</p>
                    {step.approve && (
                      <button
                        type="button"
                        onClick={replay}
                        className="px-3 py-1 mt-2 text-xs font-medium text-blue-900 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                      >
                        Approve before send?
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            }

            // agent step
            return (
              <motion.div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {status === 'processing' ? (
                  <Loader2 className="w-5 h-5 text-blue-900 animate-spin flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700">{step.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Replay */}
      <div className="flex items-center justify-end px-6 py-3 bg-white border-t border-gray-100">
        <button
          type="button"
          onClick={replay}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Replay
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

const ClaudeAutomationsPage = () => {
  const navigate = useNavigate();
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const handle4WeekPilotBtn = () => {
    navigate('/pilot');
  };

  const deliverables = [
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
      desc: "When a ready-made connector doesn't exist, we build one. Bespoke MCP tools wire Claude into your internal systems, databases, and any tool with an API.",
    },
    {
      icon: Bot,
      pill: 'Automate',
      title: 'Cowork Setups',
      desc: 'We configure Claude on your desktop to handle real work end-to-end — sorting files, extracting data, drafting reports, multi-step jobs — with no coding on your side.',
    },
    {
      icon: CalendarClock,
      pill: 'Schedule',
      title: 'Recurring Runs',
      desc: 'Set-and-forget workflows on a cadence you pick: daily inbox triage, weekly metric reports, monthly reconciliations — Claude runs them, you review.',
    },
  ];

  const changes = [
    {
      icon: Gauge,
      pill: 'Capacity',
      title: 'Hours Back Every Week',
      desc: 'Repetitive admin, data entry, and reporting run automatically — freeing your team for the work that actually needs a human.',
    },
    {
      icon: Zap,
      pill: 'Speed',
      title: 'Afternoon Jobs in Minutes',
      desc: 'Multi-step tasks — reconciling files, compiling reports, triaging email — finish while you focus on something else.',
    },
    {
      icon: ShieldCheck,
      pill: 'Control',
      title: 'Human-in-the-Loop by Design',
      desc: 'Claude checks in before any significant action and logs every step, so you keep approval and a full audit trail.',
    },
  ];

  const demoTasks = [
    "Pull this week's metrics into the Friday report template.",
    'Reconcile these 40 receipts into one expense sheet.',
    'Draft replies to overnight support emails for my review.',
  ];

  const handleTaskClick = (index: number) => {
    setActiveTaskIndex(index);
  };

  // Real client testimonials only. Leave this empty until the client supplies a
  // genuine quote — the "What Users Say" card renders ONLY when this has at least
  // one entry, so no placeholder is ever shipped to production.
  // Shape: { quote: '...', name: 'Jane Doe', role: 'Head of Ops, Acme Co.' }
  const testimonials: Array<{ quote: string; name: string; role: string }> = [];

  const integrations = [
    'Gmail',
    'Google Drive',
    'Google Sheets',
    'Google Calendar',
    'Slack',
    'Notion',
    'HubSpot',
    'Outlook',
    'Excel',
    'Dropbox',
    'GitHub',
    'Airtable',
  ];

  const guardrails = [
    { icon: FolderLock, title: 'Scoped Access', subtitle: 'Claude only sees the folders and tools you explicitly grant' },
    { icon: ShieldCheck, title: 'Approval Gates', subtitle: 'Asks before any significant or irreversible action' },
    { icon: FileText, title: 'Full Audit Log', subtitle: 'Every tool call and file change is recorded' },
    { icon: EyeOff, title: 'Data Stays Yours', subtitle: "Your business data isn't used to train models" },
  ];

  const measures = [
    'Hours saved / week',
    'Tasks automated',
    'Average turnaround time',
    'Exception / error rate',
    'Approval-required rate',
    'Team adoption',
  ];

  const timeline = [
    { week: 'Week 1', title: 'Audit & map', desc: 'We review your repetitive workflows and pick the highest-ROI ones.' },
    { week: 'Week 2', title: 'Connect & build', desc: 'Set up connectors and build any custom MCP tools you need.' },
    { week: 'Week 3', title: 'Automate', desc: 'Configure Cowork runs and scheduled tasks; you test on real work.' },
    { week: 'Week 4', title: 'Handover & train', desc: 'Your team learns to trigger, review, and tweak — no engineer required.' },
  ];

  return (
    <div className="min-h-screen bg-white mt-14">
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
            <motion.div
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                className="items-center hidden gap-2 px-4 py-2 text-blue-900 bg-gray-100 rounded-full lg:inline-flex"
                variants={scaleIn}
              >
                <Workflow className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">Claude Automations &amp; Workflows</span>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold leading-tight text-black lg:text-6xl"
                variants={fadeInUp}
              >
                AI that actually <span className="text-blue-900">does the work</span> — across your files, apps, and inbox
              </motion.h1>

              <motion.p
                className="text-xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                We connect Claude to the tools you already use, build the custom integrations you don't have, and set up the automations — so your team gets finished work, not another app to learn.
              </motion.p>

              <motion.div className="flex flex-col gap-4 sm:flex-row" variants={fadeInUp}>
                <HashLink
                  smooth
                  to="/book-consultation"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                >
                  <Play className="w-5 h-5" aria-hidden="true" />
                  See it in action
                </HashLink>
                <button
                  type="button"
                  onClick={handle4WeekPilotBtn}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  See a 4-week setup plan
                </button>
              </motion.div>

              <motion.div
                className="p-4 border border-blue-200 rounded-lg bg-blue-50"
                variants={fadeInUp}
              >
                <p className="text-sm text-black">
                  <span className="font-semibold text-blue-900">For:</span> Ops, finance, marketing, and admin teams who want repetitive work handled automatically — no engineers to hire, no new software to manage, and a human always in the loop.
                </p>
              </motion.div>
            </motion.div>

            {/* Hero illustration (clone of chatbot hero image block) */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <motion.div
                className="pt-2 px-8 pb-8 rounded-2xl"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <ClaudeAutomationRichCard className="w-full max-w-xl mx-auto" />
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    Flow: Your tools → Claude + Cowork → Finished work
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DELIVER ================= */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="text-xl text-gray-700">
              Done-for-you Claude setups — connected, custom-built, and automated.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {deliverables.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="relative p-8 hover:bg-white rounded-2xl"
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * index }}
                    >
                      <Icon className="w-8 h-8 text-blue-900" aria-hidden="true" />
                    </motion.div>
                    <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                      {item.pill}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-black">{item.title}</h3>
                    <p className="leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
            <h2 className="mb-4 text-4xl font-bold text-black">
              What <span className="text-blue-900">Changes</span>
            </h2>
            <p className="text-xl text-gray-700">
              Measurable impact on your team's day-to-day operations.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {changes.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="relative p-8 hover:bg-white rounded-2xl"
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="flex items-center justify-center w-20 h-20 mb-4 bg-blue-100 rounded-2xl"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * index }}
                    >
                      <Icon className="w-8 h-8 text-blue-900" aria-hidden="true" />
                    </motion.div>
                    <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-900 bg-blue-100 rounded-full">
                      {item.pill}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-black">{item.title}</h3>
                    <p className="leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= SEE IT WORK ================= */}
      <section id="see-it-work" className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              Watch Claude take a <span className="text-blue-900">real task</span> from start to finish
            </h2>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Demo widget */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <TaskRunnerDemo scenario={taskScenarios[activeTaskIndex]} />
            </motion.div>

            {/* Tasks + testimonial */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold text-blue-900">Try these tasks:</h3>

              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {demoTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleTaskClick(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(index)}
                    className={`w-full p-4 text-left transition-colors cursor-pointer border rounded-lg ${
                      activeTaskIndex === index
                        ? 'bg-blue-900 border-blue-900'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className={`w-5 h-5 mt-0.5 ${activeTaskIndex === index ? 'text-white' : 'text-blue-900'}`} aria-hidden="true" />
                      <span className={activeTaskIndex === index ? 'text-white' : 'text-black'}>"{task}"</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* What Users Say — renders ONLY when a real client testimonial exists
                  (see the `testimonials` array above), so no placeholder ships. */}
              {testimonials.length > 0 && (
                <motion.div
                  className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-6 h-6 text-yellow-500" aria-hidden="true" />
                    <h4 className="text-lg font-semibold text-gray-900">What Users Say</h4>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((t, i) => (
                      <div key={i} className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                          ))}
                        </div>
                        <p className="text-sm italic text-gray-700">"{t.quote}"</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{t.name}</div>
                            <div className="text-xs text-gray-600">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INTEGRATIONS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-blue-900">Integrations</h2>
            <p className="text-xl text-gray-700">
              Works with the tools you already use — and anything else via custom MCP.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 font-medium text-black bg-white border border-gray-200 rounded-full"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#f0f9ff',
                  borderColor: '#3b82f6',
                  transition: { duration: 0.2 },
                }}
              >
                {integration}
              </motion.div>
            ))}
            {/* Highlighted custom-MCP pill */}
            <motion.div
              className="px-6 py-3 font-semibold text-white bg-blue-900 border border-blue-900 rounded-full"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              + Custom MCP for any tool with an API
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= GUARDRAILS & MEASURE ================= */}
     
      {/* ================= HOW THE 4-WEEK SETUP WORKS (timeline) ================= */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              How the <span className="text-blue-900">4-week setup</span> works
            </h2>
          </motion.div>

          <motion.div
            className="relative grid gap-8 md:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* connecting line (desktop) */}
            <div className="absolute top-7 left-0 right-0 hidden h-0.5 bg-blue-100 md:block" aria-hidden="true" />

            {timeline.map((step, index) => (
              <motion.div key={step.week} className="relative text-center" variants={fadeInUp}>
                <div className="relative z-10 flex items-center justify-center w-14 h-14 mx-auto mb-4 text-lg font-bold text-white bg-blue-900 rounded-full shadow-md">
                  {index + 1}
                </div>
                <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-blue-900 bg-blue-100 rounded-full">
                  {step.week}
                </div>
                <h3 className="mb-2 text-lg font-bold text-black">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section id="start-pilot" className="relative py-20 overflow-hidden text-black bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-10 blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl px-6 mx-auto text-center">
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
              Get Claude wired into your tools and running your first automations — with measurable results. No long commitments, just proven outcomes.
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
            className="grid max-w-2xl gap-6 mx-auto sm:grid-cols-3"
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
        </div>
      </section>
    </div>
  );
};

export default ClaudeAutomationsPage;