import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Boxes,
  Bot,
  MessageSquare,
  Database,
  Workflow,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import servicesHeroImg from '../../Images/services/services page/hero page services.webp';
import aiAppsCardImg from '../../Images/services/services page/custom ai apps and micro saas.webp';
import autonomousAgentsCardImg from '../../Images/services/services page/autonomous ai agents.webp';
import virtualAssistantsCardImg from '../../Images/services/services page/ai virtual assistant.webp';
import customIntegrationsCardImg from '../../Images/services/services page/Custom AI Integrations.webp';
import automationsCardImg from '../../Images/services/services page/Automations.webp';

interface ServiceOption {
  id: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  title: string;
  tagline: string;
  description: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'ai-apps',
    route: '/services/ai-apps-micro-saas',
    icon: Boxes,
    image: aiAppsCardImg,
    title: 'Custom AI Apps & Micro-SaaS',
    tagline: 'A real product, sized right',
    description:
      "Full internal tools and micro-SaaS products — dashboards, billing, the works — built in weeks, with exactly the features your team needs and nothing more. A real product, sized right, not a stripped-down MVP.",
  },
  {
    id: 'agentic-agents',
    route: '/services/agentic-ai-workflows',
    icon: Sparkles,
    image: autonomousAgentsCardImg,
    title: 'Autonomous AI Agents',
    tagline: 'Plans its own next step',
    description:
      "AI agents that plan their own next step, take real action across your tools, and check in with you before anything risky happens — so complex, multi-step work gets done without you babysitting every step.",
  },
  {
    id: 'virtual-assistants',
    route: '/services/ai-chatbots',
    icon: MessageSquare,
    image: virtualAssistantsCardImg,
    title: 'AI Virtual Assistants',
    tagline: 'One AI presence, every channel',
    description:
      'Voice agents, retrieval-grounded chatbots that act on your real data, and live AI avatars — one AI presence across phone, chat, and screen.',
  },
  {
    id: 'custom-integrations',
    route: '/services/custom-ai-integrations',
    icon: Database,
    image: customIntegrationsCardImg,
    title: 'Custom AI Integrations',
    tagline: 'AI that knows your business',
    description:
      'Make any AI feature actually know your business — not guess. We connect AI models to your real data, so every answer is grounded in your documents, systems, and databases instead of generic training data.',
  },
  {
    id: 'automations',
    route: '/services/automations',
    icon: Workflow,
    image: automationsCardImg,
    title: 'Automations',
    tagline: '3 ways to automate your work',
    description:
      "Connect your apps, clear your inbox, and keep your back office running — automated. Choose the build that fits: self-hosted n8n workflows, Claude-powered document work, or back-office & systems automation.",
  },
];

const ServicesOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#f8fafc] min-h-screen">
      <Helmet>
        <title>Services | Teeny Tech Trek</title>
        <meta
          name="description"
          content="AI apps and micro-SaaS, autonomous agents, virtual assistants, custom AI integrations, and automation — explore what we build."
        />
      </Helmet>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* HERO                                                      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center pt-6 pb-12 sm:pb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs mb-5">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-5">
              What We <span className="text-[#1d4ed8]">Build</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              Five ways we put AI to work for you — pick the one that matches what you need, or talk to us if you're not sure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Built on your data</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Grounded, not generic</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Human-in-the-loop</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">You stay in control</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">5 ways to start</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Pick what fits your need</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={servicesHeroImg}
              alt="How our AI services connect your data, tools, and team into real impact"
              className="w-full h-auto max-w-lg mx-auto drop-shadow-[0_20px_45px_rgba(37,99,235,0.12)]"
              loading="eager"
            />
          </div>
        </div>

        {/* Mobile hero illustration */}
        <div className="lg:hidden -mt-4 mb-10">
          <img
            src={servicesHeroImg}
            alt="How our AI services connect your data, tools, and team into real impact"
            className="w-full h-auto max-w-md mx-auto"
            loading="eager"
          />
        </div>

        {/* ======================================================== */}
        {/* SERVICE CARDS                                             */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceOptions.map((option) => {
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
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 border border-blue-100/60 shadow-xs group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-7 h-7" />
                  </div>
                  <img
                    src={option.image}
                    alt=""
                    aria-hidden="true"
                    className="w-24 h-16 sm:w-28 sm:h-20 object-contain shrink-0"
                    loading="lazy"
                  />
                </div>

                <span className="text-[11px] font-bold tracking-wide text-[#2563eb] uppercase mb-1.5">
                  {option.tagline}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors tracking-tight mb-3">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 flex-1">
                  {option.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-[#2563eb]">
                    {option.id === 'automations' ? 'See 3 options' : 'Learn more'}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center border border-blue-100/60 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* CLOSING CTA                                               */}
        {/* ======================================================== */}
        <div className="relative mt-16 sm:mt-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.06)] p-7 sm:p-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50/80 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-7 h-7 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                  Not sure which one fits?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
                  Tell us what you're trying to solve and we'll point you to the right one — or build something that spans more than one.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewPage;
