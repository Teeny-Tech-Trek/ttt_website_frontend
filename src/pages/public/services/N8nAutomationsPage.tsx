import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  LayoutTemplate,
  Wrench,
  ServerCog,
  Cloud,
  Users,
  LifeBuoy,
  Wallet,
  ShieldCheck,
  Database,
  Ban,
  Github,
  GitBranch,
  Sparkles,
  Phone,
  CheckCircle2,
  Play,
  Zap,
  ShoppingCart,
  UserPlus,
  Headset,
  Share2,
  Receipt,
  ClipboardList,
  ArrowRight,
  Search,
  Plug,
  FileText,
  FlaskConical,
  Rocket,
  LayoutGrid,
  Calendar,
  Mail,
  BarChart3,
  Settings2,
} from 'lucide-react';
import {
  SiSlack,
  SiGmail,
  SiGooglesheets,
  SiHubspot,
  SiShopify,
  SiStripe,
  SiNotion,
  SiAirtable,
  SiPostgresql,
  SiTelegram,
  SiZendesk,
  SiMailchimp,
  SiZapier,
  SiN8N,
  SiOpenai,
  SiGoogle,
  SiGoogledrive,
  SiQuickbooks,
  SiBuffer,
  SiZoom,
} from 'react-icons/si';
import HashLink from '../../../components/ui/SectionLink';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../../utils/scrollToSection';
import n8nHeroImg from '../../../Images/services/n8n regenerated webp images/hero page.webp';
import builtToYourProcessImg from '../../../Images/services/n8n regenerated webp images/built to your process.webp';
import readyMadeImg from '../../../Images/services/n8n regenerated webp images/ready made.webp';
import selfHostedSetupImg from '../../../Images/services/n8n regenerated webp images/self hosted setup.webp';
import ongoingMaintenanceImg from '../../../Images/services/n8n regenerated webp images/ongoing maintenance.webp';
import liveInDaysImg from '../../../Images/services/n8n regenerated webp images/live in days, not in months.webp';
import noPerTaskPricingImg from '../../../Images/services/n8n regenerated webp images/no per task pricing.webp';
import youOwnTheWorkflowImg from '../../../Images/services/n8n regenerated webp images/you own the workflow.webp';
import readyToAutomateImg from '../../../Images/services/n8n regenerated webp images/ready to automate.webp';
import useReadyMadeTemplateImg from '../../../Images/services/n8n regenerated webp images/use a ready made template.png';
import getACustomBuildImg from '../../../Images/services/n8n regenerated webp images/get a custom build.png';

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// The hand-drawn marginal notes used throughout the reference design —
// a small rotated cursive aside next to a section heading. Desktop-only;
// there's no good place to put them without crowding mobile layouts.
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

const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode; light?: boolean }> = ({
  icon: Icon,
  children,
  light = false,
}) => (
  <div
    className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide uppercase rounded-full ${
      light ? 'bg-white/15 text-white' : 'bg-blue-50 text-blue-900'
    }`}
  >
    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
    {children}
  </div>
);

type AppIcon = { icon: React.ElementType; color: string };

const APP_ICONS: Record<string, AppIcon> = {
  Slack: { icon: SiSlack, color: '#4A154B' },
  Gmail: { icon: SiGmail, color: '#EA4335' },
  'Google Sheets': { icon: SiGooglesheets, color: '#0F9D58' },
  HubSpot: { icon: SiHubspot, color: '#FF7A59' },
  Shopify: { icon: SiShopify, color: '#95BF47' },
  Stripe: { icon: SiStripe, color: '#635BFF' },
  Notion: { icon: SiNotion, color: '#000000' },
  Airtable: { icon: SiAirtable, color: '#18BFFF' },
  Postgres: { icon: SiPostgresql, color: '#4169E1' },
  Telegram: { icon: SiTelegram, color: '#26A5E4' },
  Zendesk: { icon: SiZendesk, color: '#03363D' },
  Mailchimp: { icon: SiMailchimp, color: '#FFE01B' },
  QuickBooks: { icon: SiQuickbooks, color: '#2CA01C' },
  'Google Drive': { icon: SiGoogledrive, color: '#4285F4' },
  Buffer: { icon: SiBuffer, color: '#231F20' },
  Zoom: { icon: SiZoom, color: '#2D8CFF' },
  OpenAI: { icon: SiOpenai, color: '#000000' },
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
    <div
      className={`flex items-center justify-center ${dim} bg-white border border-gray-200 rounded-lg shadow-sm`}
      title={name}
    >
      <Icon className={iconDim} style={{ color: entry.color }} aria-hidden="true" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Live Demo — real n8n canvases per category                         */
/* ------------------------------------------------------------------ */

type N8nNode = {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, unknown>;
};
type N8nWorkflow = {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, { main: { node: string; type: 'main'; index: number }[][] }>;
};
type Scenario = {
  category: string;
  prompt: string;
  n8nWorkflow: N8nWorkflow;
  moreExamples: string[];
  bridge?: string;
  reverse?: boolean;
};

// Real n8n node types (n8n-nodes-base.*) so the embedded canvas renders
// correct icons — these are hand-built rather than literal exports, but the
// type strings match n8n's actual catalog. Swap in a real export any time by
// replacing the `n8nWorkflow` value below; the shape is unchanged.
const chain = (names: string[]): N8nWorkflow['connections'] =>
  Object.fromEntries(
    names.slice(0, -1).map((name, i) => [name, { main: [[{ node: names[i + 1], type: 'main' as const, index: 0 }]] }])
  );

const workflowScenarios: Scenario[] = [
  {
    category: 'E-commerce',
    prompt: 'A new Shopify order comes in — process it end-to-end.',
    moreExamples: [
      'Abandoned Cart Recovery',
      'Inventory Sync Across Channels',
      'Return & Refund Processing',
      'Product Review Requests',
      'Low Stock Alerts',
      'Multi-Warehouse Order Routing',
    ],
    n8nWorkflow: {
      name: 'E-Commerce Order Fulfillment',
      nodes: [
        { id: '1', name: 'Shopify Trigger', type: 'n8n-nodes-base.shopifyTrigger', typeVersion: 1, position: [240, 300], parameters: { topic: 'orders/create' } },
        { id: '2', name: 'Check Inventory', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: [460, 300], parameters: { url: 'https://api.example.com/inventory/check' } },
        { id: '3', name: 'Create Shipping Label', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: [680, 300], parameters: { url: 'https://api.shipstation.com/orders/createlabel' } },
        { id: '4', name: 'Send Confirmation Email', type: 'n8n-nodes-base.gmail', typeVersion: 2.1, position: [900, 300], parameters: { operation: 'send' } },
      ],
      connections: chain(['Shopify Trigger', 'Check Inventory', 'Create Shipping Label', 'Send Confirmation Email']),
    },
  },
  {
    category: 'Sales & CRM',
    prompt: 'Sync new website leads into the CRM automatically.',
    bridge: "Same engine, different job — here's the same kind of automation wired straight into your CRM.",
    reverse: true,
    moreExamples: [
      'Deal Stage Notifications',
      'Quote-to-Invoice Automation',
      'Meeting Scheduler Sync',
      'Lead Scoring & Routing',
      'Win/Loss Reporting',
      'Renewal Reminder Sequences',
    ],
    n8nWorkflow: {
      name: 'Lead Capture & CRM Sync',
      nodes: [
        { id: '1', name: 'New Lead Webhook', type: 'n8n-nodes-base.webhook', typeVersion: 2, position: [240, 300], parameters: { path: 'new-lead' } },
        { id: '2', name: 'Enrich Contact', type: 'n8n-nodes-base.httpRequest', typeVersion: 4.2, position: [460, 300], parameters: { url: 'https://api.example.com/enrich' } },
        { id: '3', name: 'Create HubSpot Deal', type: 'n8n-nodes-base.hubspot', typeVersion: 2, position: [680, 220], parameters: { resource: 'deal', operation: 'create' } },
        { id: '4', name: 'Notify Sales on Slack', type: 'n8n-nodes-base.slack', typeVersion: 2.2, position: [680, 380], parameters: { channel: '#sales' } },
      ],
      connections: {
        'New Lead Webhook': { main: [[{ node: 'Enrich Contact', type: 'main', index: 0 }]] },
        'Enrich Contact': {
          main: [
            [
              { node: 'Create HubSpot Deal', type: 'main', index: 0 },
              { node: 'Notify Sales on Slack', type: 'main', index: 0 },
            ],
          ],
        },
      },
    },
  },
  {
    category: 'Support',
    prompt: 'Triage overnight support tickets before the team logs in.',
    bridge: 'And when something needs a human, fast — here\'s how that gets flagged and routed.',
    moreExamples: [
      'CSAT Survey Automation',
      'SLA Breach Alerts',
      'Knowledge Base Auto-Suggestions',
      'Escalation Routing',
      'Ticket Backlog Digest',
      'After-Hours On-Call Paging',
    ],
    n8nWorkflow: {
      name: 'Support Ticket Triage',
      nodes: [
        { id: '1', name: 'New Zendesk Ticket', type: 'n8n-nodes-base.zendeskTrigger', typeVersion: 1, position: [240, 300], parameters: {} },
        { id: '2', name: 'Classify Ticket', type: 'n8n-nodes-base.openAi', typeVersion: 1.3, position: [460, 300], parameters: { resource: 'text', operation: 'classify' } },
        { id: '3', name: 'Route Ticket', type: 'n8n-nodes-base.if', typeVersion: 2, position: [680, 300], parameters: {} },
        { id: '4', name: 'Notify Support Slack', type: 'n8n-nodes-base.slack', typeVersion: 2.2, position: [900, 300], parameters: { channel: '#support-urgent' } },
      ],
      connections: {
        'New Zendesk Ticket': { main: [[{ node: 'Classify Ticket', type: 'main', index: 0 }]] },
        'Classify Ticket': { main: [[{ node: 'Route Ticket', type: 'main', index: 0 }]] },
        'Route Ticket': { main: [[{ node: 'Notify Support Slack', type: 'main', index: 0 }], []] },
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const HOW_WE_HELP = [
  { icon: Settings2, title: 'Custom n8n Workflows', desc: 'Design and build workflows specific to your business processes and goals.' },
  { icon: Plug, title: 'API & App Integrations', desc: 'Connect your favorite tools, APIs, and AI models seamlessly.' },
  { icon: Sparkles, title: 'AI-Powered Automation', desc: 'Integrate LLMs and AI services for intelligent workflows.' },
  { icon: BarChart3, title: 'Monitoring & Error Handling', desc: 'Set up logging, alerts, and recovery to keep your automations running.' },
];

type DeliverCard = {
  icon: React.ElementType;
  pill: string;
  title: string;
  desc: string;
  points?: string[];
  cta: string;
  image?: string;
};

const DELIVER_GROUPS: { label: string; cards: DeliverCard[] }[] = [
  {
    label: 'Build & Launch',
    cards: [
      {
        icon: LayoutTemplate,
        pill: 'Premade',
        title: 'Ready-Made Templates',
        desc: "Battle-tested workflows for common ops, sales, and support tasks — pick one from our library, we connect it to your accounts, and it's live the same week.",
        points: ['Pre-built and tested', 'Quick deployment', 'Works with your tools', 'Easy to customize'],
        cta: 'Browse Templates',
        image: readyMadeImg,
      },
      {
        icon: Wrench,
        pill: 'Custom',
        title: 'Custom Workflow Builds',
        desc: 'Nothing off-the-shelf fits? We design and build a custom n8n workflow around your exact process — with automatic error handling and status notifications built in from day one.',
        points: ['Tailored to your exact tools', 'Automatic retries and error handling', 'Real-time alerts to Slack, email, or SMS'],
        cta: 'Start a Custom Build',
        image: builtToYourProcessImg,
      },
    ],
  },
  {
    label: 'Host & Run',
    cards: [
      {
        icon: ServerCog,
        pill: 'Your Cloud',
        title: 'Self-Hosted on Your Cloud',
        desc: 'We set up and configure n8n on your own cloud infrastructure — documented and ready for your team to run day to day, no engineering background required.',
        points: ['Deployed on your cloud (AWS, GCP, DigitalOcean)', 'Access and permissions for your team', 'Full documentation for non-technical staff'],
        cta: 'View Deployment Options',
        image: selfHostedSetupImg,
      },
      {
        icon: Cloud,
        pill: 'Our Cloud',
        title: 'Fully-Managed Hosting',
        desc: 'Prefer we run the infrastructure too? We host and manage your n8n instance on our own servers — patched, monitored, and backed up.',
        points: ['Hosted and maintained on our infrastructure', 'Security patching, backups, and monitoring', 'You still own every workflow — fully exportable'],
        cta: 'Compare Hosting Options',
      },
    ],
  },
  {
    label: 'Keep It Going',
    cards: [
      {
        icon: LifeBuoy,
        pill: 'Support',
        title: 'Ongoing Workflow Management',
        desc: 'APIs change and edge cases appear. We proactively monitor every workflow we build or manage, fix what breaks, and extend it as your process evolves.',
        points: ['Proactive monitoring on every live workflow', 'Fast fixes when an integration breaks', 'Ongoing extensions as your process changes'],
        cta: 'Get Ongoing Support',
        image: ongoingMaintenanceImg,
      },
      {
        icon: Users,
        pill: 'Enablement',
        title: 'Team Enablement & Training',
        desc: 'Automation only pays off if your team can actually use it. Every build comes with hands-on training and clear documentation.',
        points: ['Live walkthroughs for your team', 'Written documentation for every workflow', 'Office-hours support after launch'],
        cta: "See What's Included",
      },
    ],
  },
];

const DELIVER_IMAGE_CARDS = DELIVER_GROUPS.flatMap((g) => g.cards).filter((c) => c.image);
const DELIVER_TEXT_CARDS = DELIVER_GROUPS.flatMap((g) => g.cards).filter((c) => !c.image);

type Template = {
  icon: React.ElementType;
  title: string;
  apps: string[];
  desc: string;
  price: string;
  category: string;
  popular?: boolean;
};

const TEMPLATES: Template[] = [
  {
    icon: ShoppingCart,
    title: 'E-Commerce Order Fulfillment',
    apps: ['Shopify', 'ShipStation', 'Gmail'],
    desc: 'New order triggers inventory check, shipping label creation, and a branded customer confirmation email.',
    price: 'From $149',
    category: 'E-commerce',
    popular: true,
  },
  {
    icon: UserPlus,
    title: 'Lead Capture & CRM Sync',
    apps: ['Airtable', 'HubSpot', 'Slack'],
    desc: 'Enriches every new lead automatically and drops a qualified summary straight into your CRM and sales channel.',
    price: 'From $129',
    category: 'Sales & CRM',
  },
  {
    icon: Headset,
    title: 'Support Ticket Triage',
    apps: ['Zendesk', 'OpenAI', 'Slack'],
    desc: 'Classifies incoming tickets by urgency and topic, routes them to the right queue, and flags anything urgent.',
    price: 'From $179',
    category: 'Support',
  },
  {
    icon: Mail,
    title: 'Email Marketing Automation',
    apps: ['Gmail', 'Mailchimp', 'Notion'],
    desc: 'Automatically segments contacts, sends personalized campaigns, and updates your CRM based on engagement.',
    price: 'From $99',
    category: 'Marketing',
  },
  {
    icon: Receipt,
    title: 'Invoice Processing',
    apps: ['Google Drive', 'QuickBooks', 'Slack'],
    desc: 'Extracts data from invoices, creates records in your accounting system, and notifies your team for review.',
    price: 'From $149',
    category: 'Finance',
  },
  {
    icon: Users,
    title: 'Employee Onboarding',
    apps: ['Google Drive', 'Slack', 'Notion'],
    desc: 'Creates accounts, sends welcome messages, assigns training, and tracks onboarding progress automatically.',
    price: 'From $119',
    category: 'HR',
  },
  {
    icon: Share2,
    title: 'Social Content Pipeline',
    apps: ['Notion', 'Buffer'],
    desc: 'Turns new blog posts or content briefs into scheduled social drafts across your channels automatically.',
    price: 'From $119',
    category: 'Marketing',
  },
  {
    icon: ClipboardList,
    title: 'Meeting Notes & Follow-Ups',
    apps: ['Zoom', 'OpenAI', 'Notion'],
    desc: 'Summarizes recorded meetings and emails action items to attendees within minutes of the call ending.',
    price: 'From $99',
    category: 'Operations',
  },
];

const CHANGES = [
  {
    title: 'Live in Days, Not Months',
    desc: 'Start from a premade template and go live this week, or scope a custom build that still ships in weeks — not a multi-month integration project.',
    image: liveInDaysImg,
  },
  {
    title: 'No Per-Task Pricing',
    desc: 'Self-hosted n8n means no metered "task" fees that scale with your volume — run 100 or 100,000 executions for the same infrastructure cost.',
    image: noPerTaskPricingImg,
  },
  {
    title: 'You Own the Workflow',
    desc: 'Every workflow is version-controlled and fully yours — export it, audit it, or hand it to an in-house team at any time.',
    image: youOwnTheWorkflowImg,
  },
];

const INTEGRATIONS: { name: string; categories: string[] }[] = [
  { name: 'Slack', categories: ['Popular', 'Communication'] },
  { name: 'Gmail', categories: ['Popular', 'Communication'] },
  { name: 'Google Sheets', categories: ['Popular', 'Productivity'] },
  { name: 'HubSpot', categories: ['Popular', 'CRM & Sales'] },
  { name: 'Shopify', categories: ['Popular', 'E-commerce'] },
  { name: 'Stripe', categories: ['Popular', 'Finance'] },
  { name: 'Notion', categories: ['Popular', 'Productivity'] },
  { name: 'Airtable', categories: ['Popular', 'Productivity'] },
  { name: 'Postgres', categories: ['Popular', 'Databases'] },
  { name: 'Telegram', categories: ['Popular', 'Communication'] },
  { name: 'Zendesk', categories: ['Popular', 'CRM & Sales'] },
  { name: 'Mailchimp', categories: ['Popular', 'Marketing'] },
];

const INTEGRATION_CATEGORIES = ['Popular', 'Productivity', 'CRM & Sales', 'Marketing', 'E-commerce', 'Finance', 'Communication', 'Databases', 'All'];

const WHY_SELF_HOSTED_1 = [
  { icon: Database, title: 'Full Data Ownership', desc: 'Your workflows and data live on infrastructure you control.', points: ['Keep your data private', 'Export, audit, and modify anytime', 'No vendor lock-in'] },
  { icon: Ban, title: 'No Per-Task Fees', desc: 'Self-hosted execution means no metered pricing as you scale.', points: ['Run 100 or 100,000 executions', 'Same infrastructure cost', 'Predictable and transparent'] },
  { icon: Github, title: 'Open-Source Core', desc: "Built on n8n — no proprietary black box locking you in.", points: ['Open and extensible', 'Access to 400+ community nodes', 'Customize for your exact needs'] },
  { icon: GitBranch, title: 'Version-Controlled', desc: 'Every workflow change is tracked, reviewable, and reversible.', points: ['Track changes over time', 'Collaborate with your team', 'Rollback when needed'] },
];

const HOW_IT_WORKS = [
  { icon: FileText, title: 'Pick or scope', desc: 'Choose a premade template, or tell us the process you want automated from scratch.' },
  { icon: Plug, title: 'Connect & build', desc: 'We wire up your accounts and build any custom logic your process needs.' },
  { icon: FlaskConical, title: 'Test on real data', desc: 'The workflow runs against real cases while you review the output before go-live.' },
  { icon: Rocket, title: 'Launch & support', desc: 'We flip it on, hand over documentation, and stay on for ongoing maintenance.' },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

const N8nAutomationsPage = () => {
  const navigate = useNavigate();
  const [integrationCategory, setIntegrationCategory] = useState('Popular');
  const [integrationSearch, setIntegrationSearch] = useState('');

  const handlePilotBtn = () => navigate('/pilot');

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS.filter((i) => {
      const matchesCategory = integrationCategory === 'All' || i.categories.includes(integrationCategory);
      const q = integrationSearch.trim().toLowerCase();
      const matchesSearch = !q || i.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [integrationCategory, integrationSearch]);

  return (
    <div className="min-h-screen bg-white mt-14">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 bg-blue-50 rounded-full w-96 h-96 blur-3xl opacity-60" />
        </div>

        <div className="relative px-6 pt-8 mx-auto max-w-7xl sm:pt-12 lg:pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-900 rounded-full bg-blue-50"
                variants={scaleIn}
              >
                <Workflow className="w-4 h-4" aria-hidden="true" />
                n8n Automations &amp; Workflows
              </motion.div>

              <motion.h1
                className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl"
                variants={fadeInUp}
              >
                Self-hosted automations —{' '}
                <span className="text-blue-900">ready-made or built for you</span>
              </motion.h1>

              <motion.p className="max-w-lg text-lg leading-relaxed text-gray-700 sm:text-xl" variants={fadeInUp}>
                Launch a proven n8n workflow from our library this week, or get one custom-built
                around your exact process — either way, you own the automation and the infrastructure
                it runs on.
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
                  onClick={() => scrollToSection('see-it-work')}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                >
                  <LayoutGrid className="w-5 h-5" aria-hidden="true" />
                  Browse templates
                </button>
              </motion.div>

              <motion.div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4" variants={staggerContainer}>
                {[
                  { icon: Zap, title: 'Faster', sub: 'Operations' },
                  { icon: Wallet, title: 'Lower', sub: 'Manual Effort' },
                  { icon: Settings2, title: 'Fully', sub: 'Customizable' },
                  { icon: ShieldCheck, title: 'You Own', sub: 'the Infrastructure' },
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
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <img
                src={n8nHeroImg}
                alt="n8n workflow editor showing a trigger processing data into an AI Agent, CRM update, and Slack notification, self-hosted with your data and control"
                className="w-full h-auto"
              />
            </motion.div>
          </div>

          {/* Trusted-by strip */}
          <motion.div
            className="flex flex-col items-center gap-4 p-6 mt-16 border border-blue-100 sm:flex-row bg-blue-50/60 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex-shrink-0 text-center sm:text-left">
              <div className="text-sm font-bold text-black">Trusted by innovative teams</div>
              <div className="text-xs text-gray-600">Building automation infrastructure for startups and enterprises</div>
            </div>
            <div className="flex flex-wrap items-center justify-center flex-1 gap-6 sm:justify-end opacity-80">
              <SiSlack className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <SiGoogle className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <SiOpenai className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <SiHubspot className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <SiNotion className="w-5 h-5 text-gray-500" aria-hidden="true" />
              <span className="text-xs text-gray-500">…and more</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HOW WE HELP ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="mb-2 text-2xl font-bold text-black sm:text-3xl">How We Help</h2>
            <p className="mb-8 text-gray-700">End-to-end n8n automation services tailored to your business processes and goals.</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_WE_HELP.map((item) => (
                <div key={item.title} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
                  <div className="flex items-center justify-center w-10 h-10 mb-3 bg-blue-100 rounded-lg">
                    <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 text-base font-bold text-black">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-10 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <HashLink smooth to="/book-consultation" className="block">
              <img
                src={readyToAutomateImg}
                alt="Ready to automate your workflow? Book a free consultation to discuss how n8n can streamline your operations"
                className="w-full h-auto rounded-2xl"
              />
            </HashLink>
          </motion.div>
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
            <Eyebrow icon={LayoutGrid}>What We Deliver</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Two ways to get automated — pick a template, or let us build one from scratch.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVER_IMAGE_CARDS.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
              >
                <HashLink to="/pilot" className="block">
                  <img src={item.image} alt={`${item.title} — ${item.desc}`} className="w-full h-auto rounded-2xl" />
                </HashLink>
              </motion.div>
            ))}
          </div>

          {DELIVER_TEXT_CARDS.length > 0 && (
            <div className="grid gap-6 mt-8 sm:grid-cols-2">
              {DELIVER_TEXT_CARDS.map((item) => (
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
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  {item.points && (
                    <ul className="mb-5 space-y-1.5">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <HashLink
                    to="/pilot"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </HashLink>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= ZAPIER / MAKE MIGRATION BANNER ================= */}
      <section className="py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col items-center justify-between gap-8 p-8 border-2 border-blue-900 border-dashed sm:flex-row bg-blue-50 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 hidden sm:flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm">
                <SiZapier className="w-6 h-6 text-orange-500" aria-hidden="true" />
                <ArrowRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <SiN8N className="w-6 h-6 text-[#EA4B71]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Already Running Zapier or Make?</h3>
                <p className="mt-1 text-gray-700">
                  If per-task pricing is eating into your automation budget as you scale, we'll rebuild your
                  existing automations in self-hosted n8n — same logic, no more metered fees.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePilotBtn}
              className="flex items-center justify-center flex-shrink-0 gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 whitespace-nowrap"
            >
              Scope a Migration
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= LIVE DEMO ================= */}
      <section id="see-it-work" className="relative py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <HandNote className="-top-2 left-6">Automate{'\n'}What Matters</HandNote>

          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Play}>Live Demo</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Watch a workflow take a <span className="text-blue-900">real task</span> from start to finish
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Real n8n canvases for the workflows we build most — with the templates already available in each category.
            </p>
          </motion.div>
        </div>

        <div className="space-y-16">
          {workflowScenarios.map((scenario, idx) => {
            const categoryTemplates = TEMPLATES.filter((t) => t.category === scenario.category);

            const demoContent = (
              <>
                <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold text-blue-900 uppercase bg-blue-100 rounded-full">
                  {scenario.category}
                </span>
                <h3 className="mb-4 text-xl font-bold text-black">"{scenario.prompt}"</h3>
                <div className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
                  <div style={{ '--n8n-workflow-min-height': '420px' } as React.CSSProperties}>
                    <n8n-demo
                      key={scenario.category}
                      workflow={JSON.stringify(scenario.n8nWorkflow)}
                      frame="true"
                      theme="light"
                      collapseformobile="true"
                    />
                  </div>
                </div>
              </>
            );

            const listContent = (
              <>
                <h4 className="mb-4 text-sm font-bold tracking-wide text-blue-900 uppercase">
                  Workflows we've already built
                </h4>
                <div className="space-y-4">
                  {categoryTemplates.map((tpl) => (
                    <div key={tpl.title} className="relative p-5 bg-white border border-gray-200 rounded-2xl">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center justify-center w-11 h-11 bg-blue-100 rounded-xl">
                          <tpl.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold text-blue-900 bg-blue-100 rounded-full whitespace-nowrap">
                          {tpl.price}
                        </span>
                      </div>
                      {tpl.popular && (
                        <span className="absolute inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 rounded-full top-4 left-[3.75rem]">
                          <Sparkles className="w-3 h-3" aria-hidden="true" />
                          Popular
                        </span>
                      )}
                      <h5 className="mb-1 text-base font-bold text-black">{tpl.title}</h5>
                      <div className="flex items-center gap-1.5 mb-2">
                        {tpl.apps.map((a) => (
                          <AppChip key={a} name={a} />
                        ))}
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{tpl.desc}</p>
                      <HashLink
                        smooth
                        to="/book-consultation"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
                      >
                        Get this workflow
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </HashLink>
                    </div>
                  ))}
                  {categoryTemplates.length === 0 && (
                    <p className="p-5 text-sm text-gray-500 bg-white border border-gray-200 border-dashed rounded-2xl">
                      More {scenario.category} workflows coming soon — tell us what you need on a call.
                    </p>
                  )}
                  {scenario.moreExamples.length > 0 && (
                    <div className="p-4 bg-white border border-gray-200 rounded-2xl">
                      <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        More {scenario.category} workflows
                      </div>
                      <div className="pr-2 space-y-2 overflow-y-auto max-h-36">
                        {scenario.moreExamples.map((name) => (
                          <div key={name} className="flex items-center gap-2 text-sm text-gray-600">
                            <Workflow className="flex-shrink-0 w-3.5 h-3.5 text-gray-300" aria-hidden="true" />
                            {name}
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-gray-400">
                        Illustrative examples — ask us about your specific process.
                      </p>
                    </div>
                  )}
                </div>
              </>
            );

            const [firstContent, secondContent] = scenario.reverse ? [listContent, demoContent] : [demoContent, listContent];
            const [firstSpan, secondSpan] = scenario.reverse ? ['lg:col-span-2', 'lg:col-span-3'] : ['lg:col-span-3', 'lg:col-span-2'];

            return (
              <div key={scenario.category}>
                {idx > 0 && scenario.bridge && (
                  <div className="py-12 bg-white border-t border-gray-200">
                    <div className="max-w-3xl px-6 mx-auto text-center">
                      <p className="text-lg font-medium leading-relaxed text-gray-700">{scenario.bridge}</p>
                    </div>
                  </div>
                )}
                <div className="px-6 mx-auto max-w-7xl">
                  <div className="grid items-start gap-10 lg:grid-cols-5">
                    <motion.div
                      className={firstSpan}
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      {firstContent}
                    </motion.div>

                    <motion.div
                      className={secondSpan}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      {secondContent}
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHAT CHANGES ================= */}
      <section className="relative py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <HandNote className="top-4 right-6">Less Busy Work.{'\n'}More Progress.</HandNote>

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
              <motion.div key={item.title} variants={fadeInUp}>
                <img src={item.image} alt={`${item.title} — ${item.desc}`} className="w-full h-auto rounded-2xl" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 p-6 border border-blue-100 sm:flex-row bg-blue-50 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center flex-shrink-0 gap-2">
              <BarChart3 className="w-5 h-5 text-blue-900" aria-hidden="true" />
              <div>
                <div className="text-sm font-bold text-black">Real Results</div>
                <div className="text-xs text-gray-600">Teams automate faster, reduce costs, and stay in control — without compromise.</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center flex-1 gap-8 sm:justify-end">
              {[
                { value: '50-80%', label: 'Faster execution' },
                { value: '40%+', label: 'Lower operational costs' },
                { value: '100%', label: 'Your data. Your control.' },
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

      {/* ================= INTEGRATIONS ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Plug}>Integrations</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Integr<span className="text-blue-900">ations</span>
            </h2>
            <p className="text-xl text-gray-700">n8n connects to hundreds of apps out of the box — and anything else via HTTP or webhook.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-4 top-1/2" aria-hidden="true" />
              <input
                type="text"
                value={integrationSearch}
                onChange={(e) => setIntegrationSearch(e.target.value)}
                placeholder="Search for an app (e.g. Slack, Gmail, Shopify...)"
                className="w-full py-3 pl-11 pr-4 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {INTEGRATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setIntegrationCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  integrationCategory === cat ? 'bg-blue-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:col-span-2">
              {filteredIntegrations.map((integration) => (
                <motion.div
                  key={integration.name}
                  className="flex flex-col items-center gap-2 p-4 text-center bg-white border border-gray-200 rounded-xl"
                  variants={scaleIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <AppChip name={integration.name} size="md" />
                  <span className="text-xs font-medium text-black">{integration.name}</span>
                </motion.div>
              ))}
              {filteredIntegrations.length === 0 && (
                <p className="col-span-full py-6 text-sm text-center text-gray-500">No apps match that search.</p>
              )}
            </div>

            <motion.div
              className="relative self-start flex flex-col p-6 overflow-hidden bg-blue-50 border border-blue-100 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center w-10 h-10 mb-4 bg-white rounded-full shadow-sm">
                <Plug className="w-5 h-5 text-blue-900" aria-hidden="true" />
              </div>
              <h3 className="mb-1 text-base font-bold text-black">Don't see your app?</h3>
              <p className="mb-4 text-sm text-gray-700">Connect to any app with an API or webhook — no limits.</p>
              <button
                type="button"
                onClick={handlePilotBtn}
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                <Plug className="w-4 h-4" aria-hidden="true" />
                Add any app
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <ul className="space-y-1.5">
                {['HTTP requests', 'Webhooks (inbound & outbound)', 'Custom API integrations', 'Build connectors for internal tools'].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 text-sm text-right text-blue-500"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                If it has an API, it works.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY SELF-HOSTED + HOW IT WORKS ================= */}
      <section className="relative py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <HandNote className="top-4 left-6">More control.{'\n'}More possibilities.</HandNote>
          <HandNote className="top-4 right-6" rotate={4}>
            Your workflows.{'\n'}Your infrastructure.
          </HandNote>

          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={ShieldCheck}>Built for Your Control</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Why <span className="text-blue-900">self-hosted n8n</span>
            </h2>
            <p className="text-xl text-gray-700">Ownership and cost control that hosted no-code tools can't match.</p>
          </motion.div>

          <motion.div
            className="grid gap-6 mb-20 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {WHY_SELF_HOSTED_1.map((item) => (
              <motion.div key={item.title} className="p-6 bg-white border border-gray-200 rounded-2xl" variants={fadeInUp}>
                <div className="flex items-center justify-center w-11 h-11 mb-4 bg-blue-100 rounded-xl">
                  <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold text-black">{item.title}</h3>
                <p className="mb-3 text-sm text-gray-600">{item.desc}</p>
                <ul className="space-y-1">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* HOW IT WORKS */}
          <div id="how-it-works" className="text-center">
            <Eyebrow icon={Settings2}>Simple Process</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              How it <span className="text-blue-900">works</span>
            </h2>
            <p className="mb-16 text-xl text-gray-700">From idea to impact — in just a few steps.</p>
          </div>

          <motion.div
            className="grid gap-8 mb-12 md:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div key={step.title} className="relative text-center" variants={fadeInUp}>
                {index < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight
                    className="absolute z-10 hidden w-5 h-5 text-blue-300 -translate-y-1/2 md:block top-9 -right-6"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-900 rounded-2xl shadow-md">
                  <span className="absolute flex items-center justify-center w-6 h-6 -mt-2 -ml-2 text-xs font-bold text-blue-900 bg-white rounded-full shadow top-2 left-1/2 -translate-x-8">
                    {index + 1}
                  </span>
                  <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-black">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <HashLink
              to="/pilot"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group"
            >
              Get started today
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </HashLink>
            <p className="mt-4 text-sm text-gray-500">Automate smarter. Stay in control.</p>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA — template vs. custom build ================= */}
      <section id="start-pilot" className="relative py-20 overflow-hidden bg-gray-50">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-30 blur-3xl" />
        </div>

        <div className="relative px-6 mx-auto max-w-7xl">
          <HandNote className="top-16 left-6" rotate={-5}>
            Same power.{'\n'}Your way.
          </HandNote>

          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Zap}>Ready to Automate?</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black lg:text-5xl">
              Start with a <span className="text-blue-900">template</span> or a{' '}
              <span className="text-blue-900">custom build</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-700">
              Get a proven workflow running this week, or scope a custom build around your process —
              either way, you walk away owning the automation.
            </p>
          </motion.div>

          <div className="grid max-w-5xl gap-6 mx-auto mb-12 lg:grid-cols-2">
            {/* Template path */}
            <motion.div
              className="p-8 bg-white border border-gray-200 rounded-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 bg-blue-100 rounded-xl">
                <LayoutGrid className="w-6 h-6 text-blue-900" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-black">Use a Ready-Made Template</h3>
              <p className="mb-5 text-sm text-gray-600">
                Browse our library of proven workflows for common business tasks. We'll connect it to
                your tools and get it running — fast.
              </p>
              <div className="grid items-center gap-4 mb-6 sm:grid-cols-2">
                <ul className="space-y-2">
                  {['Done in days, not months', 'Pre-built and battle-tested', 'We handle the setup', 'You own the workflow'].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <img
                  src={useReadyMadeTemplateImg}
                  alt="A premade workflow chaining Shopify to Slack to Gmail"
                  className="w-full h-auto border border-gray-100 rounded-xl"
                />
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('see-it-work')}
                className="flex items-center justify-center w-full gap-2 px-6 py-3.5 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Browse templates
              </button>
            </motion.div>

            {/* Custom build path */}
            <motion.div
              className="p-8 bg-white border border-gray-200 rounded-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 bg-blue-100 rounded-xl">
                <Wrench className="w-6 h-6 text-blue-900" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-black">Get a Custom Build</h3>
              <p className="mb-5 text-sm text-gray-600">
                Need something unique? We'll design and build a custom n8n workflow around your exact
                process, tools, and edge cases.
              </p>
              <div className="grid items-center gap-4 mb-6 sm:grid-cols-2">
                <ul className="space-y-2">
                  {['Tailored to your workflow', 'Integrates with any tool or API', 'Built for scale', 'Fully yours — no vendor lock-in'].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <img
                  src={getACustomBuildImg}
                  alt="n8n connecting to Slack, a database, cloud infrastructure, and custom code"
                  className="w-full h-auto border border-gray-100 rounded-xl"
                />
              </div>
              <HashLink
                smooth
                to="/book-consultation"
                className="flex items-center justify-center w-full gap-2 px-6 py-3.5 font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book a 45-min call
              </HashLink>
            </motion.div>
          </div>

          <motion.div
            className="grid max-w-4xl gap-6 mx-auto text-center sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {[
              { icon: Wallet, title: 'No per-task pricing', desc: 'Run 100 or 100,000 executions for the same cost.' },
              { icon: ShieldCheck, title: 'You own the infrastructure', desc: 'Your data, your workflows, your control.' },
              { icon: Users, title: 'Human-reviewed before launch', desc: "We test and validate every workflow to make sure it's production-ready." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <item.icon className="w-5 h-5 text-blue-900" aria-hidden="true" />
                </div>
                <div className="text-sm font-semibold text-black">{item.title}</div>
                <div className="text-xs text-gray-600">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default N8nAutomationsPage;
