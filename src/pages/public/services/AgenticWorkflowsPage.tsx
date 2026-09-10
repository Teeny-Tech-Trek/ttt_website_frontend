import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Check,
  Zap,
  Play,
  FileText,
  Mail,
  RotateCcw,
  Plus,
  Eye,
  ShieldCheck,
  Shield,
  Lock,
  Database,
  Users,
  TrendingUp,
  Headphones,
  Sparkles,
  Bot,
  Brain,
  Activity,
  Layers,
  AlertTriangle,
  Search,
  GitBranch,
  DollarSign,
  PenTool,
  UserPlus,
  Filter,
  Server,
  MessageCircle,
  CheckSquare,
  RefreshCw,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import HashLink from '../../../components/ui/SectionLink';

interface AgenticWorkflowsPageProps {
  onOpenChatbot?: () => void;
}

const AgenticWorkflowsPage: React.FC<AgenticWorkflowsPageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();

  // Interactive Live Demo State
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [approvalState, setApprovalState] = useState<'idle' | 'approved' | 'declined'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handle4WeekPilotBtn = () => {
    navigate('/pilot');
  };

  const handleTryDemo = (e?: React.MouseEvent) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      const demoSec = document.getElementById('live-demo');
      if (demoSec) {
        demoSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleApproveAction = () => {
    setApprovalState('approved');
    showToast('✓ Approved: Lead score updated to 85, status set to Qualified, demo call scheduled.');
  };

  const handleDeclineAction = () => {
    setApprovalState('declined');
    showToast('✕ Declined: Action cancelled, lead remains in review queue.');
  };

  // Section 1: Hero Capability Cards
  const heroCapabilities = [
    {
      icon: Zap,
      title: 'Plans and executes',
      desc: 'Breaks down complex tasks and runs multi-step workflows.'
    },
    {
      icon: Database,
      title: 'Uses your tools',
      desc: 'Connects to 200+ apps via API or custom MCP.'
    },
    {
      icon: Shield,
      title: 'Built-in guardrails',
      desc: 'Human approval for key actions and full audit logs.'
    },
    {
      icon: TrendingUp,
      title: 'Real results',
      desc: 'Faster resolution times, lower manual work, and happier customers.'
    }
  ];

  // Section 3: Where Teams Use Agentic Workflows (CHANGE 2 - 6 Real-world use cases)
  const useCasesGallery = [
    {
      icon: Headphones,
      title: 'Customer Support Resolution',
      tag: 'Support Ops',
      desc: 'Retrieves customer data, diagnoses the issue, drafts a response, and updates the ticket — with approval before anything sends.'
    },
    {
      icon: TrendingUp,
      title: 'Sales Lead Qualification',
      tag: 'Revenue Ops',
      desc: 'Pulls lead data, scores it, drafts outreach, and updates the CRM — approval before anything sends.'
    },
    {
      icon: DollarSign,
      title: 'Finance Reconciliation',
      tag: 'Finance & Accounting',
      desc: 'Pulls transactions, matches them against invoices, flags discrepancies, and drafts a summary for review.'
    },
    {
      icon: Sparkles,
      title: 'Marketing Content Pipeline',
      tag: 'Marketing & Brand',
      desc: 'Researches a topic, drafts a post, checks it against brand guidelines, and queues it for approval.'
    },
    {
      icon: Users,
      title: 'HR Onboarding',
      tag: 'People Ops',
      desc: "Creates accounts, assigns training, sends welcome materials, and confirms everything's ready before a new hire's first day."
    },
    {
      icon: Database,
      title: 'Ops Data Entry & Cleanup',
      tag: 'Internal Ops',
      desc: 'Pulls records from multiple systems, normalizes and deduplicates them, and flags anything that needs a human decision.'
    }
  ];

  // Section 4: Live Demo Workflows
  const demoWorkflows = [
    {
      id: 0,
      title: 'Qualify this lead and create a HubSpot task for Friday',
      icon: Users,
      pipelineTitle: 'Sales Agent Workflow',
      pipelineSub: 'Lead Qualification Pipeline',
      currentStep: 'Step 3 of 5 (Processing...)',
      steps: [
        { num: '1', title: 'Retrieve', desc: 'Pull lead data from CRM (HubSpot)', time: '12s', status: 'done' },
        { num: '2', title: 'Analyze', desc: 'Score and qualify lead with AI', time: '18s', status: 'done' },
        { num: '3', title: 'Generate', desc: 'Draft personalized email', time: 'Processing...', status: 'active' },
        { num: '4', title: 'Human Approval', desc: 'Review and approve before sending', time: 'Pending', status: 'pending' },
        { num: '5', title: 'Execute', desc: 'Send email and log to HubSpot', time: 'Pending', status: 'pending' }
      ],
      output: {
        subject: 'Excited to explore how we can help, {{first_name}}',
        body: 'Hi {{first_name}},\n\nBased on your interest in {{product}}, I wanted to share a quick overview of how our agents integrate directly into your CRM to automate repetitive tasks.'
      },
      approval: {
        agentGoal: 'Agent wants to update CRM record for "Acme Corp"',
        changes: [
          { label: 'Lead Score', val: '45 → 85' },
          { label: 'Status', val: 'New → Qualified' },
          { label: 'Next Action', val: 'Schedule demo call' },
          { label: 'Owner', val: 'Sales Team' },
          { label: 'Tags', val: 'High Intent • Enterprise' }
        ]
      }
    },
    {
      id: 1,
      title: 'Summarize this email thread and log a follow-up',
      icon: Mail,
      pipelineTitle: 'Email Intelligence Agent',
      pipelineSub: 'Customer Inbox Triaging',
      currentStep: 'Step 3 of 4 (Reviewing...)',
      steps: [
        { num: '1', title: 'Read Thread', desc: 'Extract message history & attachments', time: '8s', status: 'done' },
        { num: '2', title: 'Synthesize', desc: 'Identify 3 action items & deadlines', time: '14s', status: 'done' },
        { num: '3', title: 'Human Approval', desc: 'Confirm drafted calendar invites', time: 'Pending', status: 'active' },
        { num: '4', title: 'Sync CRM', desc: 'Log thread summary to account record', time: 'Pending', status: 'pending' }
      ],
      output: {
        subject: 'Executive Summary: Q3 Strategy Call Follow-up',
        body: 'Key Decisions:\n• Agreed on 4-week pilot scope\n• Security review scheduled for Thursday\n• Next sync booked for Friday 2:00 PM EST'
      },
      approval: {
        agentGoal: 'Agent wants to schedule follow-up calendar event & log summary',
        changes: [
          { label: 'Event', val: 'Pilot Kickoff Sync' },
          { label: 'Attendees', val: '3 team leads + Acme VP' },
          { label: 'Date/Time', val: 'Friday at 2:00 PM EST' },
          { label: 'CRM Link', val: 'Acme Corp / Opportunity #942' },
          { label: 'Tags', val: 'Meeting Scheduled' }
        ]
      }
    },
    {
      id: 2,
      title: 'Parse this CSV and append normalized rows to our sheet',
      icon: FileText,
      pipelineTitle: 'Data Normalization Agent',
      pipelineSub: 'Bulk Ingestion & Schema Mapper',
      currentStep: 'Step 3 of 4 (Validating...)',
      steps: [
        { num: '1', title: 'Parse CSV', desc: 'Extract 450 raw customer records', time: '6s', status: 'done' },
        { num: '2', title: 'Normalize', desc: 'Deduplicate & validate email formats', time: '22s', status: 'done' },
        { num: '3', title: 'Human Approval', desc: 'Verify 3 flagged anomaly records', time: 'Pending', status: 'active' },
        { num: '4', title: 'Append Rows', desc: 'Write 447 clean rows to Google Sheet', time: 'Pending', status: 'pending' }
      ],
      output: {
        subject: 'Batch Schema Normalization Report',
        body: '450 records processed:\n• 447 records validated successfully\n• 3 records flagged for duplicate tax ID numbers\n• Ready to append to Master Accounts Sheet'
      },
      approval: {
        agentGoal: 'Agent wants to write 447 verified rows to Google Sheet',
        changes: [
          { label: 'Target Sheet', val: 'Master Accounts Database' },
          { label: 'New Rows', val: '+447 verified rows' },
          { label: 'Deduplicated', val: '12 duplicate entries merged' },
          { label: 'Audit Log', val: 'Uploaded by Ops Team' },
          { label: 'Tags', val: 'Batch Processed' }
        ]
      }
    }
  ];

  // Section 5: What the Agent Can — and Can't — Do Without You (CHANGE 3)
  const guardrailsCards = [
    {
      icon: ShieldCheck,
      title: 'Action Allow-Lists',
      desc: "The agent can only call the tools and take the actions you've explicitly approved — nothing more.",
      badge: 'Strict Boundaries'
    },
    {
      icon: Eye,
      title: 'Approval Gates',
      desc: 'Anything with real consequences (sending an email, updating a record, spending money) pauses for your review by default.',
      badge: 'Human in the Loop'
    },
    {
      icon: FileText,
      title: 'Full Audit Log',
      desc: 'Every step, decision, and approval is logged, so you can see exactly what happened and why.',
      badge: 'Complete Transparency'
    },
    {
      icon: RotateCcw,
      title: 'Reversible by Design',
      desc: 'Wherever possible, actions are built to be undone, not just monitored after the fact.',
      badge: 'Safety First'
    }
  ];

  // Section 6: 4-Week Pilot Steps (Image 4)
  const pilotSteps = [
    {
      week: 'Week 1',
      title: 'Discovery',
      image: '/images/services/agentic-workflows/pilot-step-1.webp',
      desc: 'Map workflows, identify tools, set success criteria, and define use cases.'
    },
    {
      week: 'Week 2',
      title: 'Tools + Tests',
      image: '/images/services/agentic-workflows/pilot-step-2.webp',
      desc: 'Build connectors, create test scenarios, and validate logic.'
    },
    {
      week: 'Week 3',
      title: 'Approvals + UAT',
      image: '/images/services/agentic-workflows/pilot-step-3.webp',
      desc: 'Add human gates, run user acceptance testing, and refine based on feedback.'
    },
    {
      week: 'Week 4',
      title: 'Launch + Hypercare',
      image: '/images/services/agentic-workflows/pilot-step-4.webp',
      desc: 'Go live with monitoring, support, and performance tracking.'
    }
  ];

  // Section 7: Integrations List (Image 4)
  const integrationList = [
    { name: 'HubSpot', logo: '🟧' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'Zendesk', logo: '⚡' },
    { name: 'Slack', logo: '💬' },
    { name: 'Gmail', logo: '✉️' },
    { name: 'Sheets', logo: '📊' },
    { name: 'Notion', logo: '📝' },
    { name: 'Calendly', logo: '📅' },
    { name: 'WhatsApp', logo: '🟢' },
    { name: 'Intercom', logo: '💬' },
    { name: 'Teams', logo: '👥' },
    { name: 'Shopify', logo: '🛍️' },
    { name: 'WooCommerce', logo: '🛒' },
    { name: 'Custom REST', logo: '🌐' },
    { name: 'GraphQL', logo: '◈' }
  ];

  // Section 8: FAQs (Expanded from 3 to 6 + Website Default Signature Accordion)
  const faqItems = [
    {
      q: "What makes an AI workflow 'agentic'?",
      a: 'Unlike linear automations that run the exact same rigid sequence every time, an agentic workflow evaluates a high-level goal, dynamically selects the appropriate tools, adapts to intermediate outputs, and only pauses for human approval when predefined risk thresholds are reached.'
    },
    {
      q: 'What if a step is risky?',
      a: 'Anything with real consequences—such as sending an external email, altering a CRM record, or modifying sensitive financial data—is held at an approval gate where a human must review the proposed changes before execution.'
    },
    {
      q: 'Do you support our custom API?',
      a: 'Yes. We integrate via standard REST, GraphQL, Model Context Protocol (MCP), or custom webhook connectors so agents can use your proprietary internal databases and tools.'
    },
    {
      /* TODO: Real positioning decision needed across n8n, Claude Automations, and Agentic Workflows.
         Placeholder question flagged as requested in Part 1 Content Plan. */
      q: 'How is this different from your n8n or Claude Automations service?',
      a: 'Different projects call for different architectures: n8n excels at scheduled deterministic pipelines, Claude Automations handles deep document reasoning and code workflows, while Agentic Workflows are autonomous systems designed for dynamic multi-step goals that decide their own actions across tools with human approval gates.'
    },
    {
      q: 'What happens if the agent gets something wrong?',
      a: 'Every risky action requires your approval before it happens, and everything is logged — so mistakes are catchable, and reversible, before they cause damage.'
    },
    {
      q: 'Can we set limits on what it is allowed to do?',
      a: 'Yes — every agent runs inside an explicit allow-list of tools and actions you define upfront.'
    }
  ];

  const currentWf = demoWorkflows[activeWorkflowIndex];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 text-sm font-medium"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (Image 2 Reference)                                */}
      {/* ========================================================================= */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-indigo-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-7 text-left">
              {/* Category Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#2563eb] text-xs sm:text-sm font-semibold tracking-wide"
              >
                <Workflow className="w-4 h-4 text-[#2563eb]" />
                <span>Agentic AI Workflows</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08]"
              >
                Agents that don't <br className="hidden sm:inline" />
                just answer — <br className="hidden sm:inline" />
                <span className="text-[#2563eb]">they act</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed"
              >
                Multi-step workflows that retrieve data, call tools, and finish tasks with guardrails and approvals.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleTryDemo}
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-base sm:text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all duration-200 cursor-pointer text-center"
                >
                  <Play className="w-5 h-5 fill-white shrink-0" />
                  <span>Try a workflow demo</span>
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto"
                >
                  <HashLink
                    smooth
                    to="/book-consultation"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 bg-white hover:bg-blue-50/50 text-[#1d4ed8] border-2 border-[#1d4ed8] text-base sm:text-lg font-bold rounded-2xl shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
                  >
                    <Calendar className="w-5 h-5 text-[#1d4ed8] shrink-0" />
                    <span>Book a 45-min call</span>
                  </HashLink>
                </motion.div>
              </motion.div>

              {/* 3 Trust Checkmarks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-5 pt-3 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>Works with your tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>Human-in-the-loop</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  <span>Measurable results</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Graphic (Customer Support Agent Mockup) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100/90 bg-white group hover:shadow-3xl transition-shadow duration-500">
                <img
                  src="/images/services/agentic-workflows/hero-agent-mockup.webp"
                  alt="Customer Support Agent live execution dashboard with Salesforce, Zendesk, Slack, Gmail, and Notion"
                  className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            </motion.div>

          </div>

          {/* 4 Capability Cards Row below Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 mt-16 border-t border-slate-100">
            {heroCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{cap.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: NOT JUST A CHATBOT. NOT JUST A WORKFLOW. (CHANGE 1 Repurposed)  */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <Brain className="w-3.5 h-3.5" />
              <span>THE AGENT ADVANTAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Not Just a Chatbot. <br className="hidden sm:inline" />
              <span className="text-[#2563eb]">Not Just a Workflow.</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 font-medium mb-6">
              An agent plans its own steps, decides what to do next, and only stops to ask when it matters.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              A chatbot answers questions. A scheduled workflow runs the same steps every time, in the same order. An agent sits in between — it looks at a goal, figures out what steps get there, calls the tools it needs along the way, and checks in with you before anything risky happens.
            </p>
          </div>

          {/* 3 Conceptual Difference Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1: Chatbot */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tier 1</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Chatbots</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Passively answer questions inside a chat bubble. Good for FAQ lookups, but cannot execute actions, call APIs, or handle complex multi-system handoffs.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Limit: Answers words, doesn't take action.
              </div>
            </div>

            {/* Card 2: Scheduled Workflow */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                  <GitBranch className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tier 2</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Linear Workflows</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Executes step A → B → C in exact deterministic order. Great for rigid predictable pipelines, but breaks if unexpected outputs or edge cases appear.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Limit: Rigid steps, cannot adapt dynamically.
              </div>
            </div>

            {/* Card 3: Agentic Workflows (Active Featured Card) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1d4ed8] shadow-xl shadow-blue-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#1d4ed8] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                Autonomous & Safe
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d4ed8]">Tier 3 — The Agent</span>
                <h3 className="text-2xl font-bold text-slate-950 mt-1 mb-3">Agentic AI Workflows</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Given a high-level objective, it analyzes context, decides the optimal sequence of tools, retrieves data, iterates, and asks for approval before impactful steps.
                </p>
              </div>
              <div className="pt-4 border-t border-blue-100 text-xs font-bold text-[#1d4ed8] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Full autonomy with built-in human guardrails</span>
              </div>
            </div>
          </div>

          {/* Neutral Illustrative Mini-Run (Generic Example) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-700">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm font-semibold text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2563eb] shrink-0" />
                <span>Example agent run:</span>
              </div>
              <span className="font-mono text-[11px] sm:text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-800 max-w-full break-words">
                Retrieve → Analyze → Draft → Update (with human approval gate)
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Runs in seconds • 100% audit logged
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WHERE TEAMS USE AGENTIC WORKFLOWS (CHANGE 2 - 🆕 Gallery)      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>USE CASES ACROSS TEAMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Where Teams Use <span className="text-[#2563eb]">Agentic Workflows</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Real examples, not hypotheticals.
            </p>
          </div>

          {/* 6-Card Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {useCasesGallery.map((uc, idx) => {
              const Icon = uc.icon;
              return (
                <div
                  key={idx}
                  className="p-7 sm:p-8 rounded-3xl bg-[#fcfdff] border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {uc.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 mb-3 leading-snug">
                      {uc.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#1d4ed8]">
                    <Check className="w-4 h-4" />
                    <span>Approval before anything sends</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WATCH AGENTS WORK (LIVE DEMO - Image 3 Reference)               */}
      {/* ========================================================================= */}
      <section id="live-demo" className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <Play className="w-3.5 h-3.5 fill-[#2563eb]" />
              <span>LIVE DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Watch Agents <span className="text-[#2563eb]">Work</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              See how multi-step workflows execute with human approval gates
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Live Agent Execution Window */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden bg-white">
                {/* Header Banner */}
                <div className="p-6 bg-[#1d4ed8] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{currentWf.pipelineTitle}</h3>
                      <p className="text-xs text-blue-100">{currentWf.pipelineSub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-blue-50">{currentWf.currentStep}</span>
                  </div>
                </div>

                {/* Step List */}
                <div className="p-6 space-y-3.5 bg-slate-50/70">
                  {currentWf.steps.map((st, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-sm ${
                        st.status === 'done'
                          ? 'bg-white border-emerald-200/80 shadow-xs'
                          : st.status === 'active'
                          ? 'bg-blue-50/90 border-[#1d4ed8] shadow-sm'
                          : 'bg-white/60 border-slate-200/60 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                            st.status === 'done'
                              ? 'bg-emerald-500 text-white'
                              : st.status === 'active'
                              ? 'bg-[#1d4ed8] text-white animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {st.status === 'done' ? <Check className="w-4 h-4" /> : st.num}
                        </div>
                        <div>
                          <span className={`font-bold ${st.status === 'active' ? 'text-[#1d4ed8]' : 'text-slate-900'}`}>
                            {st.num}. {st.title}
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold font-mono ${
                          st.status === 'done'
                            ? 'text-slate-500'
                            : st.status === 'active'
                            ? 'text-[#1d4ed8]'
                            : 'text-slate-400'
                        }`}
                      >
                        {st.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Agent Output Draft Preview */}
                <div className="p-6 border-t border-slate-100 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#2563eb]" />
                      Agent Output (Draft)
                    </span>
                    <span className="text-[#1d4ed8] normal-case cursor-pointer hover:underline">
                      View full output →
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    <span className="font-bold text-slate-950">{currentWf.output.subject}</span>
                    {'\n\n'}
                    {currentWf.output.body}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Workflow Switchers + Approval Gate Card */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Box 1: Try These Workflows */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1d4ed8] uppercase tracking-wider">
                  <Zap className="w-4 h-4 fill-[#1d4ed8]" />
                  <span>Try these workflows:</span>
                </div>

                <div className="space-y-3">
                  {demoWorkflows.map((wf, idx) => {
                    const Icon = wf.icon;
                    const isActive = activeWorkflowIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveWorkflowIndex(idx);
                          setApprovalState('idle');
                        }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-md shadow-blue-500/10'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#1d4ed8]'}`} />
                          <span>{wf.title}</span>
                        </div>
                        <ArrowRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Human Approval Required Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="font-bold text-base text-slate-950">Human Approval Required</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Today at 10:24 AM</span>
                </div>

                <p className="text-sm font-medium text-slate-700">
                  {currentWf.approval.agentGoal}
                </p>

                {/* Proposed Changes Table */}
                <div className="p-4 rounded-2xl bg-[#f0f7ff] border border-blue-200/70 space-y-2">
                  <div className="text-[11px] font-bold text-[#1d4ed8] uppercase tracking-wider mb-2">
                    PROPOSED CHANGES
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-800">
                    {currentWf.approval.changes.map((ch, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-slate-500">{ch.label}:</span>
                        <span className="font-bold text-slate-900">{ch.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {approvalState === 'idle' ? (
                  <div className="flex gap-3 pt-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleApproveAction}
                      className="flex-1 py-3.5 px-5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/15 cursor-pointer transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleDeclineAction}
                      className="flex-1 py-3.5 px-5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>✕ Decline</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl flex items-center justify-between gap-4 border ${
                      approvalState === 'approved'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {approvalState === 'approved' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <RotateCcw className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm font-semibold">
                        {approvalState === 'approved'
                          ? 'Action approved — executed & logged to audit trail.'
                          : 'Action declined — execution cancelled safely.'}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setApprovalState('idle')}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Works With Your Tools Logo Row */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              WORKS WITH YOUR TOOLS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">🟧 HubSpot</span>
              <span className="flex items-center gap-2">☁️ Salesforce</span>
              <span className="flex items-center gap-2">✉️ Gmail</span>
              <span className="flex items-center gap-2">💬 Slack</span>
              <span className="flex items-center gap-2">📊 Google Sheets</span>
              <span className="flex items-center gap-2">📝 Notion</span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1d4ed8] text-xs font-bold">
                + 200+ more
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: WHAT THE AGENT CAN — AND CAN'T — DO WITHOUT YOU (CHANGE 3 🆕)   */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SAFETY & LIMITS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              What the Agent Can — and Can't — <span className="text-[#2563eb]">Do Without You</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Every agent runs inside limits you set, not limits it decides for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {guardrailsCards.map((gd, idx) => {
              const Icon = gd.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#fcfdff] rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] mb-5 group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold tracking-wide uppercase mb-3">
                      {gd.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mb-2.5 leading-snug">
                      {gd.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {gd.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: 4-WEEK PILOT (Image 4 Reference)                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>4-WEEK PILOT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            From discovery to launch with <span className="text-[#2563eb]">proven methodology</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10">
            A structured 4-week pilot to deliver real value, fast.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center items-center">
            {pilotSteps.map((step, idx) => (
              <div key={idx} className="relative group max-w-[230px] mx-auto w-full">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200/80 transition-all duration-300 bg-white">
                  <img
                    src={step.image}
                    alt={`${step.week}: ${step.title}`}
                    className="w-full h-auto max-h-[310px] object-contain block group-hover:scale-[1.02] transition-transform duration-300 mx-auto"
                  />
                </div>

                {/* Connecting Arrow for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-400 pointer-events-none">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: INTEGRATIONS (Image 4 Reference)                                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INTEGRATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Connect with your <span className="text-[#2563eb]">existing tools</span> and systems
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            Works with 200+ tools out of the box, or any tool via custom API or MCP.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {integrationList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 font-semibold text-xs sm:text-sm text-slate-800"
              >
                <span className="text-2xl">{item.logo}</span>
                <span className="truncate w-full text-center">{item.name}</span>
              </div>
            ))}

            {/* + 200+ More Card */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100/70 transition-all flex flex-col items-center justify-center gap-1 font-bold text-xs sm:text-sm text-[#1d4ed8]">
              <span className="text-lg font-extrabold">+</span>
              <span>200+ more</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (CHANGE 4 - 6 FAQs + Signature FAQ)  */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#f8faff] border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-4">
              <span>❓ FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
              Frequently Asked <span className="text-[#2563eb]">Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Plain-English technical answers about autonomy, safety, and integrations.
            </p>
          </div>

          {/* Signature Website Accordion with Rotating + */}
          <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg cursor-pointer"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[#1d4ed8]' : 'text-slate-900 group-hover:text-[#1d4ed8]'
                      }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white rotate-45'
                          : 'border-slate-300 text-slate-400 group-hover:border-[#1d4ed8] group-hover:text-[#1d4ed8] bg-white shadow-xs'
                      }`}
                    >
                      <Plus className="w-4 h-4 transition-transform duration-300" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pr-4 sm:pr-10 text-slate-600 text-sm leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Support Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <MessageCircle className="w-5 h-5 text-[#2563eb] shrink-0" />
              <span>Have another question? Let's talk.</span>
            </div>
            <HashLink
              smooth
              to="/book-consultation"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1d4ed8] hover:text-[#1e40af] hover:underline"
            >
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4" />
            </HashLink>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: FINAL CTA (Image 1 Reference + CHANGE 5)                        */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-100/70 border border-blue-200/60 text-[#2563eb] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 fill-[#2563eb]" />
            <span>READY TO GET STARTED?</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-6">
            Start a <span className="text-[#2563eb]">4-week pilot</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            Get your AI assistant up and running with measurable results. No long commitments, just proven outcomes.
          </p>

          {/* CTA Buttons Container with Curved Hand-drawn Annotation */}
          <div className="relative inline-block w-full max-w-2xl mx-auto mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Primary: Start a 4-week pilot */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handle4WeekPilotBtn}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 text-base sm:text-lg font-bold text-white transition-colors bg-[#1d4ed8] hover:bg-[#1e40af] rounded-2xl shadow-xl shadow-blue-500/20 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Start a 4-week pilot</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Secondary: Book a 45-min call (Updated from Book a consultation) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto"
              >
                <HashLink
                  smooth
                  to="/book-consultation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4.5 text-base sm:text-lg font-bold text-[#1d4ed8] transition-all duration-300 bg-white border-2 border-[#1d4ed8] shadow-md rounded-2xl hover:bg-blue-50 hover:border-[#1e40af] cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#1d4ed8]" />
                  <span>Book a 45-min call</span>
                </HashLink>
              </motion.div>
            </div>

            {/* Hand-drawn Annotation Callout from Image 1 */}
            <div className="hidden xl:block absolute -right-16 top-1 transform -translate-y-4 text-left pointer-events-none">
              <span className="font-serif italic text-sm font-semibold text-[#1d4ed8] leading-tight block">
                See real <br /> results in <br /> 4 weeks
              </span>
              <svg
                className="w-12 h-12 text-[#1d4ed8] -mt-1 transform -rotate-12"
                fill="none"
                viewBox="0 0 48 48"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M38 10 C 25 15, 12 25, 10 38" strokeDasharray="3 3" />
                <path d="M6 34 L 10 40 L 16 36" />
              </svg>
            </div>
          </div>

          {/* 3 Value Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-8 border-t border-slate-100 max-w-3xl mx-auto text-sm font-semibold text-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span>No setup fees</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span>Quick deployment</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span>Proven results</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AgenticWorkflowsPage;