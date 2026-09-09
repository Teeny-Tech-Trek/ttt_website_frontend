import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearch,
  Cpu,
  Sliders,
  ShieldCheck,
  Rocket,
  Clock,
  CheckCircle2,
  Users2,
  ArrowRight,
  Headphones,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';

const ImplementationSection: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      num: '01',
      title: 'Discovery & Planning',
      duration: 'Week 1–2',
      icon: FileSearch,
      desc: 'In-depth analysis of existing core banking pipelines, document taxonomies, compliance reporting mandates, and integration specs.',
      deliverables: ['Architecture Blueprint', 'Risk & Regulatory Mapping', 'Security Scoping'],
    },
    {
      num: '02',
      title: 'System Integration',
      duration: 'Week 2–3',
      icon: Cpu,
      desc: 'Establish encrypted private interconnects (VPC Peering / TLS 1.3) with core banking nodes, document repositories, and ledger databases.',
      deliverables: ['API Endpoints Configured', 'Encrypted Data Pipes', 'Auth & RBAC Setup'],
    },
    {
      num: '03',
      title: 'Model Training & Customization',
      duration: 'Week 3–5',
      icon: Sliders,
      desc: 'Fine-tune OCR and biometric models against institutional historical documents; calibrate risk thresholds and automated acceptance rules.',
      deliverables: ['Custom Document Models', 'Threshold Calibration', 'Fraud Heuristics Ready'],
    },
    {
      num: '04',
      title: 'Testing & Validation',
      duration: 'Week 5–6',
      icon: ShieldCheck,
      desc: 'End-to-end sandbox validation, simulated penetration testing, stress testing for peak transaction volumes, and mock regulatory audits.',
      deliverables: ['Security Audit Signoff', 'Pen-Test Reports', 'Performance Benchmarks'],
    },
    {
      num: '05',
      title: 'Go-Live & Hypercare',
      duration: 'Week 6–8',
      icon: Rocket,
      desc: 'Phased rollout with shadow processing, continuous live telemetry, comprehensive team training workshops, and 24/7 dedicated hypercare.',
      deliverables: ['Production Cutover', 'Staff Certification', '24/7 Support Active'],
    },
  ];

  const supportFeatures = [
    {
      icon: Users2,
      title: 'Dedicated Project Manager',
      desc: 'Senior financial engineering specialist who coordinates technical, legal, and operational tracks.',
    },
    {
      icon: Headphones,
      title: '24/7 Technical Support',
      desc: 'Priority hotline with <15 min response time SLAs from dedicated infrastructure engineers.',
    },
    {
      icon: Award,
      title: 'Comprehensive Training',
      desc: 'Hands-on operational training and certification for compliance officers, fraud analysts, and IT leads.',
    },
    {
      icon: Sliders,
      title: 'Ongoing Optimization',
      desc: 'Quarterly model accuracy reviews, regulatory update patches, and automated policy refreshes.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>From Strategy to Scale · Expert Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            A Proven Path From <span className="text-[#1d4ed8]">Kickoff to Go-Live</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our dedicated implementation architects ensure your success every step of the way with white-glove engineering support, rigorous testing, and comprehensive team enablement.
          </p>
        </div>

        {/* 5 Implementation Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#eff6ff] text-[#2563eb] border border-blue-100">
                      {step.duration}
                    </span>
                    <span className="text-xs font-bold text-slate-300 font-mono">
                      STEP {step.num}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-slate-100 text-[#2563eb] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#0f172a] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Deliverables</div>
                  {step.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Stats Strip */}
        <div className="bg-white rounded-2xl border border-blue-100/90 shadow-sm p-6 mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">6–8 Weeks</div>
              <div className="text-xs text-slate-500 mt-0.5">Total Deployment Duration</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8]">Week 6</div>
              <div className="text-xs text-slate-500 mt-0.5">Go-Live Readiness</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">Week 8</div>
              <div className="text-xs text-slate-500 mt-0.5">Full Ecosystem Optimization</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Success Guarantee</div>
            </div>
          </div>
        </div>

        {/* Support Included Grid + Proof Points */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Support Pillars (8 Cols) */}
          <div className="lg:col-span-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-6">
              Expert Implementation Support Included
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supportFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-[#0f172a]">{feat.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Proof Point Card (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-blue-100 shadow-[0_4px_25px_rgba(30,58,138,0.06)] space-y-5">
            <div>
              <div className="text-4xl font-extrabold text-[#1d4ed8]">98%</div>
              <div className="text-sm font-bold text-[#0f172a] mt-1">Client Satisfaction Score</div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                95% of enterprise implementations are completed on time and within scope.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => navigate('/book-consultation')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-[0_4px_14px_rgba(29,78,216,0.3)] transition-all cursor-pointer"
              >
                <span>Talk to Implementation Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/book-consultation')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
              >
                <span>View Detailed Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationSection;