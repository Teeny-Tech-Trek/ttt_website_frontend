import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  LayoutTemplate,
  Wrench,
  ServerCog,
  LifeBuoy,
  Gauge,
  Wallet,
  ShieldCheck,
  MessageSquare,
  Star,
  Database,
  Ban,
  GitBranch,
  Github,
  Sparkles,
  Phone,
  CheckCircle2,
  Play,
  Zap,
  RotateCcw,
  Loader2,
  ShoppingCart,
  UserPlus,
  Headset,
  Share2,
  Receipt,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../../utils/scrollToSection';
import N8nAutomationRichCard from '../../../components/home/N8nAutomationRichCard';

// Animation variants (matched to the other service pages)
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
/*  SECTION 5 — Workflow Runner Demo widget                            */
/*  Self-contained, front-end-only, scripted animation. NO API calls,  */
/*  NO storage. Starts on scroll-into-view, honors reduced-motion.     */
/* ------------------------------------------------------------------ */

const workflowScenarios = [
  [
    { type: 'user', text: 'A new Shopify order comes in — process it end-to-end.' },
    { type: 'agent', text: 'Reading order details from Shopify…', resolves: true },
    { type: 'agent', text: 'Checking inventory and reserving stock…', resolves: true },
    { type: 'agent', text: 'Creating a shipping label via ShipStation…', resolves: true },
    { type: 'final', text: 'Done. Order #4821 is packed and the customer has been emailed.', approve: true },
  ],
  [
    { type: 'user', text: 'Sync new website leads into the CRM automatically.' },
    { type: 'agent', text: 'Reading new submissions from the web form…', resolves: true },
    { type: 'agent', text: 'Enriching contact data via Clearbit…', resolves: true },
    { type: 'agent', text: 'Creating a deal in HubSpot and pinging #sales on Slack…', resolves: true },
    { type: 'final', text: 'Done. 8 leads synced — 2 flagged as high-priority.', approve: true },
  ],
  [
    { type: 'user', text: 'Triage overnight support tickets before the team logs in.' },
    { type: 'agent', text: 'Reading new tickets from Zendesk…', resolves: true },
    { type: 'agent', text: 'Classifying urgency and topic…', resolves: true },
    { type: 'agent', text: 'Routing tickets and drafting first responses…', resolves: true },
    { type: 'final', text: 'Done. 14 tickets routed — 3 marked urgent for review.', approve: true },
  ],
];

const WorkflowRunnerDemo = ({ scenario = workflowScenarios[0] }: { scenario?: typeof workflowScenarios[0] }) => {
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
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold">n8n Workflow Engine</div>
              <div className="text-sm text-blue-100">Automation • Running</div>
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
                        Replay this workflow
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

const N8nAutomationsPage = () => {
  const navigate = useNavigate();
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const handlePilotBtn = () => {
    navigate('/pilot');
  };

  const deliverables = [
    {
      icon: LayoutTemplate,
      pill: 'Premade',
      title: 'Ready-Made Templates',
      desc: "Battle-tested workflows for common ops, sales, and support tasks — pick one from our library, we connect it to your accounts, and it's live the same week.",
    },
    {
      icon: Wrench,
      pill: 'Custom',
      title: 'Built to Your Process',
      desc: "Nothing off-the-shelf fits? We design and build a custom n8n workflow around your exact process, tools, and edge cases — from scratch.",
    },
    {
      icon: ServerCog,
      pill: 'Deploy',
      title: 'Self-Hosted Setup',
      desc: 'Your workflows run on infrastructure you control — no per-task pricing, no vendor lock-in, and full ownership of your automation logic and data.',
    },
    {
      icon: LifeBuoy,
      pill: 'Support',
      title: 'Ongoing Maintenance',
      desc: 'APIs change and edge cases appear. We monitor your workflows, fix breakages, and extend them as your process evolves.',
    },
  ];

  const changes = [
    {
      icon: Gauge,
      pill: 'Speed',
      title: 'Live in Days, Not Months',
      desc: 'Start from a premade template and go live this week, or scope a custom build that still ships in weeks — not a multi-month integration project.',
    },
    {
      icon: Wallet,
      pill: 'Cost',
      title: 'No Per-Task Pricing',
      desc: 'Self-hosted n8n means no metered "task" fees that scale with your volume — run 100 or 100,000 executions for the same infrastructure cost.',
    },
    {
      icon: ShieldCheck,
      pill: 'Control',
      title: 'You Own the Workflow',
      desc: 'Every workflow is version-controlled and fully yours — export it, audit it, or hand it to an in-house team at any time.',
    },
  ];

  const demoTasks = [
    'A new Shopify order comes in — process it end-to-end.',
    'Sync new website leads into the CRM automatically.',
    'Triage overnight support tickets before the team logs in.',
  ];

  const handleTaskClick = (index: number) => {
    setActiveTaskIndex(index);
  };

  // Real client testimonials only. Leave this empty until the client supplies a
  // genuine quote — the "What Users Say" card renders ONLY when this has at least
  // one entry, so no placeholder is ever shipped to production.
  const testimonials: Array<{ quote: string; name: string; role: string }> = [];

  // Demo catalog data — replace with real templates/pricing before launch.
  const premadeTemplates = [
    {
      icon: ShoppingCart,
      title: 'E-Commerce Order Fulfillment',
      apps: 'Shopify → ShipStation → Gmail',
      desc: 'New order triggers inventory check, shipping label creation, and a branded customer confirmation email.',
      price: 'From $149',
    },
    {
      icon: UserPlus,
      title: 'Lead Capture & CRM Sync',
      apps: 'Web Form → Clearbit → HubSpot + Slack',
      desc: 'Enriches every new lead automatically and drops a qualified summary straight into your CRM and sales channel.',
      price: 'From $129',
    },
    {
      icon: Headset,
      title: 'Support Ticket Triage',
      apps: 'Zendesk → Classifier → Slack',
      desc: 'Classifies incoming tickets by urgency and topic, routes them to the right queue, and flags anything urgent.',
      price: 'From $179',
    },
    {
      icon: Share2,
      title: 'Social Content Pipeline',
      apps: 'RSS/Notion → Draft → Buffer',
      desc: 'Turns new blog posts or content briefs into scheduled social drafts across your channels automatically.',
      price: 'From $119',
    },
    {
      icon: Receipt,
      title: 'Invoice & Expense Automation',
      apps: 'Gmail → OCR → Sheets/QuickBooks',
      desc: 'Extracts vendor, date, and amount from incoming receipts and reconciles them into your books automatically.',
      price: 'From $159',
    },
    {
      icon: ClipboardList,
      title: 'Meeting Notes & Follow-Ups',
      apps: 'Recorder → Transcribe → Notion + Email',
      desc: 'Summarizes recorded meetings and emails action items to attendees within minutes of the call ending.',
      price: 'From $99',
    },
  ];

  const integrations = [
    'Slack',
    'Gmail',
    'Google Sheets',
    'HubSpot',
    'Shopify',
    'Stripe',
    'Notion',
    'Airtable',
    'Postgres',
    'Telegram',
    'Zendesk',
    'Mailchimp',
  ];

  const guardrails = [
    { icon: Database, title: 'Full Data Ownership', subtitle: 'Your workflows and data live on infrastructure you control' },
    { icon: Ban, title: 'No Per-Task Fees', subtitle: 'Self-hosted execution means no metered pricing as you scale' },
    { icon: Github, title: 'Open-Source Core', subtitle: 'Built on n8n — no proprietary black box locking you in' },
    { icon: GitBranch, title: 'Version-Controlled', subtitle: 'Every workflow change is tracked, reviewable, and reversible' },
  ];

  const timeline = [
    { week: 'Step 1', title: 'Pick or scope', desc: 'Choose a premade template, or tell us the process you want automated from scratch.' },
    { week: 'Step 2', title: 'Connect & build', desc: 'We wire up your accounts and build any custom logic your process needs.' },
    { week: 'Step 3', title: 'Test on real data', desc: 'The workflow runs against real cases while you review the output before go-live.' },
    { week: 'Step 4', title: 'Launch & support', desc: 'We flip it on, hand over documentation, and stay on for ongoing maintenance.' },
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
                <span className="text-sm font-medium">n8n Automations &amp; Workflows</span>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold leading-tight text-black lg:text-6xl"
                variants={fadeInUp}
              >
                Self-hosted automations — <span className="text-blue-900">ready-made or built for you</span>
              </motion.h1>

              <motion.p
                className="text-xl leading-relaxed text-gray-700"
                variants={fadeInUp}
              >
                Launch a proven n8n workflow from our library this week, or get one custom-built around your exact process — either way, you own the automation and the infrastructure it runs on.
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
                  onClick={() => scrollToSection('premade-library')}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                >
                  <LayoutTemplate className="w-5 h-5" aria-hidden="true" />
                  Browse templates
                </button>
              </motion.div>

              <motion.div
                className="p-4 border border-blue-200 rounded-lg bg-blue-50"
                variants={fadeInUp}
              >
                <p className="text-sm text-black">
                  <span className="font-semibold text-blue-900">For:</span> Ops, sales, and support teams who want automations live fast — a premade template off the shelf, or a custom build wired to a process nothing generic can cover.
                </p>
              </motion.div>
            </motion.div>

            {/* Hero illustration */}
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
                <N8nAutomationRichCard className="w-full max-w-xl mx-auto" />
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    Flow: Your apps → n8n → Finished action
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
              Two ways to get automated — pick a template, or let us build one from scratch.
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

      {/* ================= PREMADE AUTOMATION LIBRARY ================= */}
      <section id="premade-library" className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              Premade <span className="text-blue-900">Automation Library</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Proven workflows for the tasks every team repeats. Pick one, we connect it to your accounts, and it's running within days.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Illustrative catalog and pricing — confirm current templates and rates with our team.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {premadeTemplates.map((tpl) => {
              const Icon = tpl.icon;
              return (
                <motion.div
                  key={tpl.title}
                  className="flex flex-col p-6 bg-gray-50 border border-gray-200 rounded-2xl"
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center justify-center rounded-xl w-14 h-14 bg-blue-100">
                      <Icon className="w-7 h-7 text-blue-900" aria-hidden="true" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-900 bg-blue-100 rounded-full whitespace-nowrap">
                      {tpl.price}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-black">{tpl.title}</h3>
                  <p className="mb-3 text-xs font-medium tracking-wide text-blue-900 uppercase">{tpl.apps}</p>
                  <p className="flex-1 mb-4 text-sm leading-relaxed text-gray-600">{tpl.desc}</p>
                  <HashLink
                    smooth
                    to="/book-consultation"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
                  >
                    Get this workflow
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </HashLink>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Custom build callout */}
          <motion.div
            className="flex flex-col items-center justify-between gap-6 p-8 mt-12 border-2 border-blue-900 border-dashed sm:flex-row bg-blue-50 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 bg-white rounded-full w-14 h-14">
                <Wrench className="w-6 h-6 text-blue-900" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Don't see your process on the shelf?</h3>
                <p className="mt-1 text-gray-700">
                  We design and build a custom n8n workflow around your exact tools, data, and edge cases — no template required.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePilotBtn}
              className="flex items-center justify-center flex-shrink-0 gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 whitespace-nowrap"
            >
              Scope a custom build
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
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
              Watch a workflow take a <span className="text-blue-900">real task</span> from start to finish
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
              <WorkflowRunnerDemo scenario={workflowScenarios[activeTaskIndex]} />
            </motion.div>

            {/* Tasks + testimonial */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold text-blue-900">Try these workflows:</h3>

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
              n8n connects to hundreds of apps out of the box — and anything else via HTTP or webhook.
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
            {/* Highlighted custom-connector pill */}
            <motion.div
              className="px-6 py-3 font-semibold text-white bg-blue-900 border border-blue-900 rounded-full"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              + Any app with an API or webhook
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= GUARDRAILS ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              Why <span className="text-blue-900">self-hosted n8n</span>
            </h2>
            <p className="text-xl text-gray-700">
              Ownership and cost control that hosted no-code tools can't match.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {guardrails.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="p-6 text-center border border-gray-200 rounded-2xl"
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-900" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-black">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (timeline) ================= */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              How it <span className="text-blue-900">works</span>
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
              Start with a <span className="text-blue-900">template or a custom build</span>
            </motion.h2>

            <motion.p
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
              Get a proven workflow running this week, or scope a custom build around your process — either way, you walk away owning the automation.
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
              onClick={handlePilotBtn}
            >
              <Zap className="w-5 h-5" aria-hidden="true" />
              Start a pilot workflow
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
            {['No per-task pricing', 'You own the infrastructure', 'Human-reviewed before launch'].map((item) => (
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

export default N8nAutomationsPage;
