import React, { useState } from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  TrendingUp, 
  Shield,
  Clock,
  Users,
  CheckCircle,
  Calendar,
  BarChart3,
  Smartphone,
  HeadphonesIcon,
  Home,
  Truck,
  Stethoscope,
  Hotel
} from 'lucide-react';

interface CaseStudyProps {
  id?: string;
  className?: string;
}

const caseStudiesData = [
  {
    id: 'case-study-01',
    tag: { icon: MessageCircle, text: 'D2C E-commerce' },
    title: 'AI Support & WhatsApp Assistant',
    subtitle: '24/7 customer support automation that reduced response times by 68% and increased CSAT by 1.2 points',
    stats: [
      { icon: TrendingUp, value: '40-55%', label: 'Ticket Deflection' },
      { icon: Clock, value: '68%', label: 'Faster Response Time' },
      { icon: BarChart3, value: '1.2', label: 'CSAT Improvement' },
      { icon: Users, value: '18%', label: 'Reduced Returns' }
    ],
    problem: [
      '60-70% repetitive queries (order status, returns, warranty)',
      '20-25 minute first response times during peaks',
      'Agent fatigue from repetitive macros and missing insights',
      'Weekend CSAT dips due to delayed responses'
    ],
    solution: [
      'WhatsApp + Web Widget omnichannel assistant',
      'RAG system with product manuals and policy documents',
      'Secure order lookup with OTP verification',
      'Automated returns eligibility checking',
      'Weekly FAQ insights for continuous improvement'
    ],
    results: [
      '40-55% ticket deflection within 60 days',
      '68% faster first response time',
      '1.2 point CSAT improvement on weekends',
      '18% reduction in preventable return requests',
      'Cleaner escalations with full context transfer'
    ],
    timeline: [
      { week: 1, title: 'Discovery & Planning', description: 'Requirement gathering and flow mapping' },
      { week: 2, title: 'RAG Integration', description: 'Document processing and order system integration' },
      { week: 3, title: 'Testing & Refinement', description: 'UAT, guardrails, and analytics setup' },
      { week: 4, title: 'Deployment', description: 'Rollout, training, and hypercare' }
    ],
    feedback: '“24×7 coverage without hiring more agents. Our weekend CSAT finally stabilized.”',
    cost: '₹3.5L–₹6L',
    ctaText: 'Implement Similar Solution'
  },
  {
    id: 'case-study-02',
    tag: { icon: Zap, text: 'Financial Services' },
    title: 'Back-Office Smart Automations',
    subtitle: '20–25 hours/week saved and 70% faster month-end reporting with audit-ready logs',
    stats: [
      { icon: Clock, value: '20-25', label: 'Hours/Week Saved' },
      { icon: TrendingUp, value: '70%', label: 'Faster Month-End' },
      { icon: Shield, value: '-92%', label: 'Data Errors' },
      { icon: BarChart3, value: '+18%', label: 'SLA Adherence' }
    ],
    problem: [
      'Manual reconciliations and copy-paste errors',
      'Unstructured email inflow causing missed SLAs',
      'Slow compliance reviews'
    ],
    solution: [
      'Python ETL for data normalization and anomaly detection',
      'Email intent/entity extraction with auto-routing',
      'Automated report generator with charts and commentary'
    ],
    results: [
      '20–25 hours/week saved on operations',
      '70% faster month-end reporting',
      '92% reduction in data formatting errors',
      '18% improvement in SLA adherence'
    ],
    timeline: [
      { week: 1, title: 'Data Study', description: 'Mapping and email taxonomy' },
      { week: 2, title: 'ETL Build', description: 'Data processing and triage setup' },
      { week: 3, title: 'Report Packs', description: 'Automated report generation' },
      { week: 4, title: 'Testing', description: 'UAT and refinement' },
      { week: 5, title: 'Deployment', description: 'Go-live and training' }
    ],
    feedback: '“The audit logs saved us days during reviews. Reporting is finally a click.”',
    cost: '₹3L–₹5.5L',
    ctaText: 'Request an AI Readiness Audit'
  },
  {
    id: 'case-study-03',
    tag: { icon: Home, text: 'Real Estate' },
    title: 'Agentic AI for Listing Prep',
    subtitle: 'Same-day listing packages with consistent tone and less grunt work',
    stats: [
      { icon: Clock, value: '50-60%', label: 'Faster Prep Time' },
      { icon: Calendar, value: 'Majority', label: 'Same-Day Proposals' },
      { icon: TrendingUp, value: '-35%', label: 'Revision Loops' }
    ],
    problem: [
      'Inconsistent listing quality and tone',
      'Error-prone and slow manual CMS work'
    ],
    solution: [
      'Agentic workflow for comps, summaries, and SEO-ready copy',
      'Human approve-publish gate with QA checklist'
    ],
    results: [
      '50–60% reduction in listing prep time',
      'Majority of new mandates turned around same-day',
      '35% fewer revision loops due to standardization'
    ],
    timeline: [
      { week: 1, title: 'Discovery', description: 'Comps sources and tone library' },
      { week: 2, title: 'Agent Tools', description: 'Build comps and copywriter tools' },
      { week: 3, title: 'CMS Integration', description: 'Publishing and QA setup' },
      { week: 4, title: 'Testing', description: 'UAT and refinement' },
      { week: 5, title: 'Rollout', description: 'Training and go-live' },
      { week: 6, title: 'Hypercare', description: 'Support and optimization' }
    ],
    feedback: '“We’re pitching faster without sacrificing quality. The tone finally feels on-brand.”',
    cost: '₹3.5L–₹6L',
    ctaText: 'Book a Starter Strategy Call'
  },
  {
    id: 'case-study-04',
    tag: { icon: Truck, text: 'Logistics' },
    title: 'Driver WhatsApp Bot + ETA & Dock Flow',
    subtitle: '17% lower dwell time and 80% fewer driver support calls',
    stats: [
      { icon: Clock, value: '-17%', label: 'Dwell Time' },
      { icon: TrendingUp, value: '+9%', label: 'On-Time Departures' },
      { icon: Smartphone, value: '-80%', label: 'Driver Calls' }
    ],
    problem: [
      'Paper gate passes and scattered instructions',
      'Dispatch overwhelmed with status calls',
      'No single source of truth for dock slots'
    ],
    solution: [
      'Multilingual WhatsApp bot for gate passes and updates',
      'ETA prediction with GPS and traffic data',
      'Dynamic dock slotting with real-time adjustments'
    ],
    results: [
      '17% reduction in dwell time',
      '9% improvement in on-time departures',
      '80% reduction in driver support calls',
      'Digitized gate logs for chargeback clarity'
    ],
    timeline: [
      { week: 1, title: 'Process Study', description: 'WMS/TMS mapping' },
      { week: 2, title: 'Bot Build', description: 'WhatsApp bot and middleware' },
      { week: 3, title: 'ETA Setup', description: 'ETA model and dashboard' },
      { week: 4, title: 'Pilot', description: 'Testing and refinement' },
      { week: 5, title: 'Training', description: 'Driver and staff training' },
      { week: 6, title: 'Scale', description: 'Full rollout and hypercare' }
    ],
    feedback: '“Our gate finally flows. Drivers don’t need to call for every update.”',
    cost: '₹4L–₹7L',
    ctaText: 'Request an AI Readiness Audit'
  },
  {
    id: 'case-study-05',
    tag: { icon: Stethoscope, text: 'Healthcare' },
    title: 'Pre-Op Intake & Scheduling on WhatsApp',
    subtitle: '28% fewer no-shows and 35% fewer inbound calls',
    stats: [
      { icon: Users, value: '-28%', label: 'No-Shows' },
      { icon: Smartphone, value: '-35%', label: 'Inbound Calls' },
      { icon: Clock, value: '50%', label: 'Faster Intake Time' },
      { icon: BarChart3, value: '+14', label: 'Patient NPS' }
    ],
    problem: [
      'Patients forgot fasting windows, meds, or documents',
      'Staff stuck on calls, causing appointment gaps'
    ],
    solution: [
      'WhatsApp bot for triage, checklists, and booking',
      'Nurse console for real-time readiness tracking'
    ],
    results: [
      '28% reduction in no-shows',
      '35% reduction in inbound calls',
      'Intake time halved',
      '14-point increase in patient NPS'
    ],
    timeline: [
      { week: 1, title: 'Flow Design', description: 'Consent and language mapping' },
      { week: 2, title: 'Bot Build', description: 'Bot and scheduler integration' },
      { week: 3, title: 'Console Setup', description: 'Nurse console development' },
      { week: 4, title: 'Testing', description: 'UAT with nurses' },
      { week: 5, title: 'Deployment', description: 'Go-live and coaching' }
    ],
    feedback: '“Checklists on WhatsApp changed everything. Fewer surprises on surgery day.”',
    cost: '₹3L–₹5L',
    ctaText: 'Book a Starter Strategy Call'
  },
  {
    id: 'case-study-06',
    tag: { icon: Hotel, text: 'Hospitality' },
    title: 'AI Concierge & Itinerary Builder',
    subtitle: '19% more direct bookings and 11% higher upsell revenue',
    stats: [
      { icon: TrendingUp, value: '+19%', label: 'Direct Bookings' },
      { icon: BarChart3, value: '+11%', label: 'Upsell Revenue' },
      { icon: Clock, value: '<10s', label: 'Median Response' },
      { icon: Users, value: '-45%', label: 'Repetitive Workload' }
    ],
    problem: [
      'High OTA dependence hurt margins',
      'Repetitive guest queries and manual itinerary planning'
    ],
    solution: [
      'AI concierge for FAQs, availability, and itineraries',
      'Pre-arrival upsell flows with payment links'
    ],
    results: [
      '19% increase in direct bookings',
      '11% increase in upsell revenue',
      'Median response time under 10 seconds',
      '45% reduction in front-desk repetitive workload'
    ],
    timeline: [
      { week: 1, title: 'Discovery', description: 'PMS mapping and requirements' },
      { week: 2, title: 'Concierge Build', description: 'AI concierge and PMS bridge' },
      { week: 3, title: 'Upsell Flows', description: 'Payment and upsell integration' },
      { week: 4, title: 'Deployment', description: 'UAT and launch' }
    ],
    feedback: '“Our online concierge paid for itself in the first month.”',
    cost: '₹3L–₹5.5L',
    ctaText: 'Request an AI Readiness Audit'
  }
];

const CaseStudies: React.FC<CaseStudyProps> = ({ id = 'case-studies', className = '' }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState(caseStudiesData[0].id);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'results'>('problem');

  const currentCaseStudy = caseStudiesData.find(cs => cs.id === activeCaseStudy) || caseStudiesData[0];

  return (
    <section id={id} className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Case Study Selector */}
        <div className="mb-12">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Case Study</label>
          <select
            value={activeCaseStudy}
            onChange={(e) => {
              setActiveCaseStudy(e.target.value);
              setActiveTab('problem'); // Reset tab when switching case study
            }}
            className="block w-full max-w-xs mx-auto p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {caseStudiesData.map(cs => (
              <option key={cs.id} value={cs.id}>{cs.tag.text}</option>
            ))}
          </select>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6">
            <currentCaseStudy.tag.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{currentCaseStudy.tag.text}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {currentCaseStudy.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentCaseStudy.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentCaseStudy.stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-1 shadow-sm border border-gray-200">
            {[
              { id: 'problem', label: 'Challenge' },
              { id: 'solution', label: 'Solution' },
              { id: 'results', label: 'Results' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            {activeTab === 'problem' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Challenges</h3>
                <div className="space-y-4">
                  {currentCaseStudy.problem.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Solution</h3>
                <div className="space-y-4">
                  {currentCaseStudy.solution.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>
                <div className="space-y-4">
                  {currentCaseStudy.results.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Implementation Timeline</h4>
                <p className="text-gray-600">{currentCaseStudy.timeline.length} weeks with 3-person team</p>
              </div>
            </div>

            <div className="space-y-8">
              {currentCaseStudy.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold">{item.week}</span>
                    </div>
                    {index < currentCaseStudy.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-blue-200 my-1"></div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Client Feedback</h5>
                  <p className="text-gray-700 italic">{currentCaseStudy.feedback}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
          >
            <span>{currentCaseStudy.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-600 mt-4">{currentCaseStudy.timeline.length}-week implementation • Starts at {currentCaseStudy.cost}</p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;