import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingDown,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Shield,
  Zap,
  Target,
  Quote,
} from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: 'Cost Reduction',
      description:
        'Reduce operational costs by up to 80% through intelligent automation of manual document reviews.',
      badge: 'Up to 80%',
    },
    {
      icon: Clock,
      title: 'Processing Speed',
      description:
        'Process complex KYC and onboarding dossiers in seconds instead of days with 99.8% audit accuracy.',
      badge: 'Seconds, not days',
    },
    {
      icon: Users,
      title: 'Enhanced Experience',
      description:
        'Frictionless customer onboarding and real-time approvals dramatically elevate client retention.',
      badge: '98% Satisfaction',
    },
    {
      icon: TrendingUp,
      title: 'Enterprise Scalability',
      description:
        'Scale from 10,000 to 10M+ documents without adding headcount or sacrificing risk controls.',
      badge: '10x Volume',
    },
  ];

  const roiStats = [
    { value: '80%', label: 'Cost Reduction', detail: '↑32% vs industry average' },
    { value: '95%', label: 'Processing Speed', detail: '↑28% turnaround improvement' },
    { value: '99.8%', label: 'Accuracy Rate', detail: '↑0.3% error reduction' },
    { value: '3 months', label: 'ROI Timeline', detail: '↓50% faster payback period' },
  ];

  const roadmap = [
    { week: 'Week 1', title: 'Seamless Integration', desc: 'Connect core banking & KYC pipelines via pre-built connectors.' },
    { week: 'Week 2', title: 'Enterprise Security', desc: 'Enforce AES-256 encryption, HSM key vaulting, and role isolation.' },
    { week: 'Week 3', title: 'Rapid Deployment', desc: 'Deploy tailored models configured to institutional risk appetite.' },
    { week: 'Week 4', title: 'Regulatory Compliance', desc: 'Full audit validation across US, UK, Canada, and EU standards.' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Real Results. Smarter Finance.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            Transform Your <span className="text-[#1d4ed8]">Financial Operations</span> with AI
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Deliver measurable results with intelligent automation that streamlines processes and reduces costs without compromising risk posture.
          </p>
        </div>

        {/* 4 Key Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(30,58,138,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1d4ed8] border border-blue-100">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column Grid: Left Analytics & Testimonial, Right Visual */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Metrics & Implementation Roadmap (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                Proven ROI & Performance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Financial institutions using our AI automation suite report immediate improvements in turnaround efficiency and quantifiable cost reductions.
              </p>
            </div>

            {/* 4 ROI Stat Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {roiStats.map((st) => (
                <div
                  key={st.label}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-blue-100/80 shadow-2xs"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">
                    {st.value}
                  </div>
                  <div className="text-xs font-bold text-[#0f172a] mt-1">{st.label}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    {st.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* 4-Week Implementation Roadmap Preview */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                4-Week Accelerated Deployment
              </div>
              <div className="space-y-2.5">
                {roadmap.map((step) => (
                  <div key={step.week} className="flex items-start gap-3 text-xs">
                    <span className="font-extrabold text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded border border-blue-100 shrink-0">
                      {step.week}
                    </span>
                    <div>
                      <span className="font-bold text-[#0f172a]">{step.title} — </span>
                      <span className="text-slate-500">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Testimonial Card */}
            <div className="p-5 rounded-2xl bg-[#eff6ff]/70 border border-blue-100 relative">
              <Quote className="w-8 h-8 text-blue-200 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-3 relative z-10">
                &ldquo;The AI automation suite reduced our operational costs by 70% and cut onboarding time from days to minutes. The ROI was visible within 3 months.&rdquo;
              </p>
              <div className="text-xs font-bold text-[#0f172a]">
                Head of Operations, Global Financial Bank
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => navigate('/book-consultation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-[0_4px_14px_rgba(29,78,216,0.3)] transition-all cursor-pointer"
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual proven roi and performance.png (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden bg-white border border-blue-100/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-3 sm:p-5">
              <div className="rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center bg-slate-50">
                <img
                  src="/images/finance/proven roi and performance.png"
                  alt="Proven ROI and Performance Metrics chart"
                  className="w-full h-full object-contain rounded-xl hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;