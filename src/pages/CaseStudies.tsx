import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  BarChart3,
  Globe,
  ShieldCheck,
  Home,
  Stethoscope,
  MessageSquare,
  Truck,
  Hotel,
  BookOpen,
  Zap,
  Layers,
  Users,
} from 'lucide-react';

interface CaseStudyOption {
  id: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
  image: string;
}

const caseStudyOptions: CaseStudyOption[] = [
  {
    id: 'realestate',
    route: '/real-estate',
    icon: Home,
    title: 'Real Estate',
    description: 'Agentic AI for Listing Prep',
    highlight: '50-60% faster prep time',
    image: '/images/case-studies/real_estate.jpg',
  },
  {
    id: 'healthcare',
    route: '/healthcare',
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Pre-Op Intake & Scheduling',
    highlight: '28% fewer no-shows',
    image: '/images/case-studies/healthcare.jpg',
  },
  {
    id: 'ecommerce',
    route: '/ecommerce',
    icon: MessageSquare,
    title: 'D2C E-commerce',
    description: 'AI Support & WhatsApp Assistant',
    highlight: '68% faster response times',
    image: '/images/case-studies/ecommerce.jpg',
  },
  {
    id: 'logistics',
    route: '/logistics',
    icon: Truck,
    title: 'Manufacturing & Logistics',
    description: 'Driver WhatsApp Bot + ETA Flow',
    highlight: '17% lower dwell time',
    image: '/images/case-studies/logistics.jpg',
  },
  {
    id: 'hospitality',
    route: '/hospitality',
    icon: Hotel,
    title: 'Hospitality',
    description: 'AI Concierge & Itinerary Builder',
    highlight: '19% more direct bookings',
    image: '/images/case-studies/hospitality.jpg',
  },
  {
    id: 'education',
    route: '/education',
    icon: BookOpen,
    title: 'Education',
    description: 'Institutional Collaboration & Workshops',
    highlight: 'Better learning outcomes',
    image: '/images/case-studies/education.jpg',
  },
  {
    id: 'financial',
    route: '/financial-services',
    icon: Zap,
    title: 'Financial Services',
    description: 'Back-Office Smart Automations',
    highlight: '20-25 hours/week saved',
    image: '/images/case-studies/financial.jpg',
  },
];

interface CaseStudiesProps {
  id?: string;
  className?: string;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ id = 'case-studies', className = '' }) => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id={id} className={`pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#f8fafc] ${className}`}>
      <Helmet>
        <title>Industry Case Studies | Teeny Tech Trek</title>
        <meta
          name="description"
          content="Explore how leading organizations across real estate, healthcare, e-commerce, and finance use our AI solutions to streamline operations, reduce costs, and deliver better outcomes."
        />
      </Helmet>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* 1. HERO SECTION (2-COL WITH FLOATING 3D VISUALS)         */}
        {/* ======================================================== */}
        <div className="relative pt-6 pb-12 sm:pb-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Column: Heading & Value Props */}
          <div className="flex-1 max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs mb-5">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>INDUSTRY SOLUTIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-5">
              Real-World Impact
              <br />
              <span className="text-[#1d4ed8]">Across Every Industry</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10 max-w-xl">
              Explore how leading organizations use our AI solutions to streamline operations, reduce costs, and deliver better outcomes.
            </p>

            {/* 3 Metric / Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 border-t border-slate-200/70">
              {/* Item 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Proven Results</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Measurable impact</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Multiple Industries</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">From SMBs to enterprises</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Trusted Worldwide</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">By industry leaders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Modern Glass Towers & Floating Analytics Cards */}
          <div className="relative w-full max-w-[480px] lg:w-[480px] h-[320px] sm:h-[350px] shrink-0 select-none">
            {/* Main Hero Visual Card with Building Architecture */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(30,58,138,0.08)] border border-blue-50/80 relative bg-white">
              <img
                src="/images/case-studies/hero_building.jpg"
                alt="Corporate Modern High-Rise Towers"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating Card 1: Real Business Outcomes (Top Left) */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-blue-50/80 w-48 sm:w-52 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#0f172a] tracking-tight leading-tight">
                    Real Business
                    <br />
                    Outcomes
                  </div>
                </div>
                {/* Visual Line Chart Graphic */}
                <svg className="w-full h-12" viewBox="0 0 160 50" fill="none">
                  <defs>
                    <linearGradient id="chartGradHero" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 40 L 45 32 L 80 36 L 115 18 L 150 8 L 150 50 L 10 50 Z" fill="url(#chartGradHero)" />
                  <path
                    d="M 10 40 L 45 32 L 80 36 L 115 18 L 150 8"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="40" r="2.5" fill="#2563eb" />
                  <circle cx="45" cy="32" r="2.5" fill="#2563eb" />
                  <circle cx="80" cy="36" r="2.5" fill="#2563eb" />
                  <circle cx="115" cy="18" r="2.5" fill="#2563eb" />
                  <circle cx="150" cy="8" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Floating Card 2: 7 Industries Badge (Bottom Right) */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-blue-50/80 flex items-center gap-3 z-10">
                <div className="w-8 h-8 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-extrabold text-[#0f172a] leading-none">
                    7
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium leading-tight">
                    Industries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CHOOSE YOUR INDUSTRY SECTION                          */}
        {/* ======================================================== */}
        <div id="choose-industry" className="mt-14 sm:mt-20">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-extrabold tracking-widest text-[#2563eb] uppercase block mb-2">
              EXPLORE BY INDUSTRY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
              Choose Your Industry
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Discover use cases, results, and real customer success stories.
            </p>
          </div>

          {/* 7 Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {caseStudyOptions.map((option, index) => {
              const Icon = option.icon;
              const isLastItem = index === caseStudyOptions.length - 1;

              return (
                <article
                  key={option.id}
                  onClick={() => handleCardClick(option.route)}
                  className={`group bg-white rounded-2xl border border-blue-50/70 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(30,58,138,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
                    isLastItem ? 'md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none' : ''
                  }`}
                >
                  {/* Card Cover Image with smooth bottom white fade */}
                  <div className="h-40 sm:h-44 overflow-hidden relative bg-slate-100">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Soft white gradient fade at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Body overlapping the fade */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col flex-1 justify-between -mt-8 relative z-10">
                    <div>
                      {/* Icon Squircle & Title Row */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 border border-blue-100/60 shadow-xs group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors tracking-tight">
                          {option.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-4 pl-0.5">
                        {option.description}
                      </p>
                    </div>

                    {/* Footer Row: Metric pill and circular arrow button */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="px-3 py-1 text-xs font-semibold text-[#2563eb] bg-[#eff6ff] border border-blue-100/60 rounded-full">
                        {option.highlight}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center border border-blue-100/60 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. READY TO SEE WHAT'S POSSIBLE? BOTTOM CTA BANNER       */}
        {/* ======================================================== */}
        <div className="relative mt-16 sm:mt-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.06)] p-7 sm:p-10">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50/80 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            {/* Left Content with BarChart Icon */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 flex items-center justify-center shrink-0 shadow-xs">
                <BarChart3 className="w-7 h-7 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                  Ready to See What's Possible?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl">
                  Let's discuss how our AI solutions can create similar results for your organization.
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
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
                  const el = document.getElementById('choose-industry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm text-slate-600 hover:text-[#2563eb] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer py-1 group"
              >
                <span>View All Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;