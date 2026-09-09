import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Shield,
  Zap,
  Code2,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  Globe,
  Layers,
  FileCode,
  Lock,
} from 'lucide-react';

const IntegrationsSection: React.FC = () => {
  const navigate = useNavigate();

  const corePlatforms = [
    { name: 'Temenos', category: 'Core Banking' },
    { name: 'FIS', category: 'Banking Platform' },
    { name: 'Oracle FSS', category: 'Financial Software' },
    { name: 'SAP Banking', category: 'ERP System' },
    { name: 'Salesforce FSC', category: 'CRM' },
    { name: 'Microsoft Dynamics', category: 'ERP & CRM' },
    { name: 'Workday', category: 'Financial Mgmt' },
    { name: 'Murex', category: 'Trading & Capital' },
    { name: 'SWIFT', category: 'Interbank Messaging' },
    { name: 'Reuters Eikon', category: 'Market Data' },
    { name: 'Bloomberg', category: 'Financial Telemetry' },
    { name: "Moody's Analytics", category: 'Risk & Credit' },
  ];

  const deploymentSteps = [
    { step: '01', title: 'Connect', duration: '1–3 Days', desc: 'Securely link to core banking nodes and data repositories via pre-built micro-connectors.' },
    { step: '02', title: 'Configure', duration: '3–7 Days', desc: 'Define institutional risk tolerance thresholds, OCR models, and compliance rules.' },
    { step: '03', title: 'Test', duration: '1–2 Days', desc: 'Perform sandbox validation, end-to-end stress testing, and mock regulatory audits.' },
    { step: '04', title: 'Go Live', duration: '2–4 Weeks Total', desc: 'Seamless production transition with zero downtime and real-time shadow monitoring.' },
  ];

  const apiFeatures = [
    {
      icon: FileCode,
      title: 'RESTful APIs',
      desc: 'OpenAPI 3.0 compliant endpoints, OAuth 2.0 authentication, and granular webhook triggers for real-time lifecycle event handling.',
    },
    {
      icon: Terminal,
      title: 'Production SDKs',
      desc: 'Native client libraries for Python, Java, .NET, Node.js, and Go with typed interfaces and automatic retry backoff.',
    },
    {
      icon: Cpu,
      title: '24/7 Developer Support',
      desc: 'Interactive sandbox environments, comprehensive Postman collections, and dedicated engineering Slack channels.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 6: ENTERPRISE-GRADE INTEGRATIONS                                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Open. Secure. Built for Enterprise.</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Enterprise-Grade Integrations for{' '}
              <span className="text-[#1d4ed8]">Financial Systems</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Seamlessly connect with your existing financial infrastructure and regulatory systems to accelerate value, without disrupting your day-to-day operations.
            </p>
          </div>

          {/* Two-Column Grid: Left Feature Cards & Deployment, Right Visual */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            {/* Left Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Feature 1: Core Banking Systems */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">Core Banking Systems</h3>
                    <p className="text-xs text-slate-400">Plug-and-play synchronization</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Direct bidirectional sync with Temenos, FIS, Oracle FSS, and SAP Banking for real-time document and ledger updates.
                </p>
              </div>

              {/* Feature 2: Regulatory & Compliance Connectors */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">Regulatory & Compliance</h3>
                    <p className="text-xs text-slate-400">Automated agency submission</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pre-configured reporting pipes for US FFIEC, OCC, FDIC, UK FCA, Canada FINTRAC, and EU supervisory registries.
                </p>
              </div>

              {/* Feature 3: Real-Time High-Frequency Processing */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f172a]">Real-Time Processing</h3>
                    <p className="text-xs text-slate-400">Sub-second event streaming</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High-throughput transactional queue processing with sub-100ms latency for real-time fraud alerts and risk scoring.
                </p>
              </div>

              {/* Ecosystem Micro-Badges */}
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Supported Ecosystem Partners
                </div>
                <div className="flex flex-wrap gap-2">
                  {corePlatforms.map((p) => (
                    <span
                      key={p.name}
                      className="px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 text-xs font-semibold hover:bg-[#eff6ff] hover:text-[#2563eb] transition-colors cursor-default"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual enterprise grade integration.png (6 Cols) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(30,58,138,0.08)] group">
                <img
                  src="/images/finance/enterprise grade integration.png"
                  alt="Enterprise Grade Integrations circular hub connecting core banking, ERP, and messaging networks"
                  className="w-full h-auto block object-contain transform group-hover:scale-[1.01] transition-transform duration-500 select-none"
                />
              </div>
            </div>
          </div>

          {/* Deployment Journey Timeline (4 Steps) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f172a]">
                  Streamlined Deployment Journey
                </h3>
                <p className="text-xs text-slate-500">From zero to full production in 2 to 4 weeks</p>
              </div>
              <span className="text-xs font-bold text-[#2563eb] bg-[#eff6ff] px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
                Total Time: 2–4 Weeks
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deploymentSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-extrabold text-[#1d4ed8]">{s.step}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1d4ed8] border border-blue-100">
                        {s.duration}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#0f172a] mb-1">{s.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
              <div className="text-2xl font-extrabold text-[#0f172a]">100+</div>
              <div className="text-xs text-slate-500 mt-0.5">Pre-Built Connectors</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
              <div className="text-2xl font-extrabold text-[#1d4ed8]">99.9%</div>
              <div className="text-xs text-slate-500 mt-0.5">Uptime SLA Guaranteed</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-blue-50/80 shadow-2xs text-center">
              <div className="text-2xl font-extrabold text-[#0f172a]">&lt; 100ms</div>
              <div className="text-xs text-slate-500 mt-0.5">Average API Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: DEVELOPER-FRIENDLY APIS                                        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#eff6ff] text-[#2563eb] border border-blue-100/80 shadow-2xs">
              <Code2 className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>Build. Integrate. Innovate.</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Developer-Friendly <span className="text-[#1d4ed8]">APIs</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              RESTful APIs, idiomatic SDKs, and comprehensive interactive documentation engineered for swift, friction-free institutional integration.
            </p>
          </div>

          {/* Two-Column Grid: Left Visual, Right API Feature Pillars */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
            {/* Left Column: Visual developer friendly api.png (6 Cols) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] border border-slate-200/80 bg-[#071330] group">
                <img
                  src="/images/finance/developer friendly api.png"
                  alt="Developer friendly API explorer, code editor, and live sandbox"
                  className="w-full h-auto block object-contain transform group-hover:scale-[1.01] transition-transform duration-500 select-none"
                />
              </div>
            </div>

            {/* Right Column: 3 Feature Cards & Actions (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              {apiFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#0f172a]">{feat.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}

              {/* Developer Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => navigate('/book-consultation')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#1d4ed8] hover:bg-[#1e40af] shadow-[0_4px_14px_rgba(29,78,216,0.3)] transition-all cursor-pointer"
                >
                  <span>View API Documentation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/book-consultation')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-[#2563eb]" />
                  <span>Try in API Explorer</span>
                </button>
              </div>
            </div>
          </div>

          {/* API Stat Strip */}
          <div className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">OpenAPI 3.0</div>
                <div className="text-xs text-slate-500 mt-0.5">Standard Specification</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1d4ed8]">99.9%</div>
                <div className="text-xs text-slate-500 mt-0.5">API Uptime SLA</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">&lt; 100ms</div>
                <div className="text-xs text-slate-500 mt-0.5">Average Response Time</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1d4ed8]">Global</div>
                <div className="text-xs text-slate-500 mt-0.5">Multi-Region Endpoints</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntegrationsSection;