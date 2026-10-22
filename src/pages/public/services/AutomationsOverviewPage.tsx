import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Workflow,
  Sparkles,
  ClipboardList,
  Layers,
  Bot,
  ShieldCheck,
  Check,
  ChevronRight,
  Wrench,
  Gauge,
} from 'lucide-react';

import automationsHeroImg from '../../../Images/services/services page/automation hero page.webp';
import n8nCardImg from '../../../Images/services/services page/workflow and app automation.webp';
import claudeCardImg from '../../../Images/services/services page/ai work.webp';
import backOfficeCardImg from '../../../Images/services/services page/back office.webp';

interface AutomationOption {
  id: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  title: string;
  poweredBy: string;
  description: string;
  highlights: string[];
}

const automationOptions: AutomationOption[] = [
  {
    id: 'workflow-app',
    route: '/services/n8n-automations',
    icon: Workflow,
    image: n8nCardImg,
    title: 'Workflow & App Automation',
    poweredBy: 'Built on n8n',
    description:
      "Connect the apps you already use and automate the steps in between — from a ready-made workflow live this week, to a custom build around your exact process. Built on self-hosted n8n, so you own the infrastructure, not just the automation.",
    highlights: [
      'Connect the apps you already use',
      'Ready-made workflow live this week',
      'Self-hosted n8n — you own it',
      'Simple to complex workflows',
    ],
  },
  {
    id: 'ai-work-document',
    route: '/services/claude-automation',
    icon: Sparkles,
    image: claudeCardImg,
    title: 'AI Work & Document Automation',
    poweredBy: 'Built on Claude',
    description:
      "AI that clears your inbox, files, and busywork — connected to the tools you already use, so your team gets finished work, not another app to learn. Powered by Claude, Anthropic's AI assistant.",
    highlights: [
      'Clears inbox, files, and busywork',
      'Connects to the tools you already use',
      "Powered by Claude, Anthropic's AI",
      'Finished work, not another app to learn',
    ],
  },
  {
    id: 'back-office',
    route: '/services/smart-process-automation',
    icon: ClipboardList,
    image: backOfficeCardImg,
    title: 'Back-Office & Document Automation',
    poweredBy: 'Includes CRM & systems integration',
    description:
      "Turn messy emails, CSVs, and spreadsheets into clean data, automatic rules, and the right alert at the right time — so your back office runs itself, and your team only steps in for the exceptions that need a human.",
    highlights: [
      'Turns emails & CSVs into clean data',
      'Automatic rules and alerts',
      'CRM & systems integration included',
      'Your team only handles exceptions',
    ],
  },
];

const resultStats = [
  { value: '60–80%', label: 'Less manual work' },
  { value: 'Hours → minutes', label: 'Faster turnaround' },
  { value: 'Fewer errors', label: 'More accurate data' },
  { value: 'Happier teams', label: 'Focus on what matters' },
];

const AutomationsOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#f8fafc] min-h-screen">
      <Helmet>
        <title>Automations | Teeny Tech Trek</title>
        <meta
          name="description"
          content="Three ways to automate your work: self-hosted n8n workflows, Claude-powered document automation, and back-office & systems automation."
        />
      </Helmet>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* BREADCRUMB                                                */}
        {/* ======================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-2 text-xs sm:text-sm font-semibold text-slate-500"
        >
          <button
            onClick={() => {
              navigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#2563eb] transition-colors cursor-pointer"
          >
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0f172a]">Automations</span>
        </nav>

        {/* ======================================================== */}
        {/* HERO                                                      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center pt-6 pb-12 sm:pb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs mb-5">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Automations</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-5">
              Three Ways to <span className="text-[#1d4ed8]">Automate Your Work</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              Same goal — less busywork, more control — three different builds depending on what you're automating. Pick the one that matches your problem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Built for your tools</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Works with what you use</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">You stay in control</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Human-in-the-loop</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Production ready</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Built to run, not a demo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={automationsHeroImg}
              alt="Apps connected through an automation engine into completed actions"
              className="w-full h-auto max-w-lg mx-auto drop-shadow-[0_20px_45px_rgba(37,99,235,0.12)]"
              loading="eager"
            />
          </div>
        </div>

        {/* Mobile hero illustration */}
        <div className="lg:hidden -mt-4 mb-10">
          <img
            src={automationsHeroImg}
            alt="Apps connected through an automation engine into completed actions"
            className="w-full h-auto max-w-md mx-auto"
            loading="eager"
          />
        </div>

        {/* ======================================================== */}
        {/* AUTOMATION CARDS                                          */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {automationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <article
                key={option.id}
                onClick={() => handleCardClick(option.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(option.route)}
                className="group bg-white rounded-2xl border border-blue-50/70 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(30,58,138,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer p-6 sm:p-7"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 border border-blue-100/60 shadow-xs group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-200 mb-5">
                  <Icon className="w-7 h-7" />
                </div>

                <img
                  src={option.image}
                  alt={`${option.title} illustration`}
                  className="w-full h-auto rounded-xl mb-5"
                  loading="lazy"
                />

                <span className="inline-flex items-center w-fit px-2.5 py-0.5 mb-3 text-[11px] font-bold text-[#2563eb] uppercase tracking-wide bg-[#eff6ff] border border-blue-100/60 rounded-full">
                  {option.poweredBy}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors tracking-tight mb-3">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">
                  {option.description}
                </p>

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {option.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#eff6ff] text-[#2563eb] shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-slate-600 font-medium leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-[#2563eb]">Learn more</span>
                  <div className="w-9 h-9 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center border border-blue-100/60 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* THE RESULT                                                */}
        {/* ======================================================== */}
        <div className="relative mt-16 sm:mt-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0f172a] p-7 sm:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-300 mb-3 inline-block">
              The Result
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Less manual work. More progress.
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {resultStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-6 sm:py-7 text-center"
              >
                <div className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mb-1.5">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-blue-100/70 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CLOSING CTA                                               */}
        {/* ======================================================== */}
        <div className="relative mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.06)] p-7 sm:p-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50/80 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-7 h-7 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                  Not sure which build fits?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
                  Tell us what you're trying to automate and we'll recommend the right approach — n8n, Claude, or a back-office build.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2.5 shrink-0">
              <button
                onClick={() => {
                  navigate('/book-consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>
              <button
                onClick={() => {
                  navigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm text-slate-600 hover:text-[#2563eb] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer py-1 group"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563eb] transition-colors" />
                <span>See all services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationsOverviewPage;
