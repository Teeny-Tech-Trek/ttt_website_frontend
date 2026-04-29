import React from 'react';
import { Clock, Target, Users, CheckCircle, ArrowRight, Zap, BarChart3, Settings, MessageSquare, Database, Shield, Rocket } from 'lucide-react';

function Pilot() {
  const sprints = [
    {
      title: "Foundation Sprint",
      timeline: "Days 1-14",
      focus: ["Setup", "Define", "Build", "Validate"],
      objectives: [
        "Deploy production-ready conversational interface",
        "Define 8-10 core intents with India-market context",
        "Implement RAG system with PGVector for document retrieval",
        "Establish 95% uptime SLA with basic monitoring"
      ],
      backlog: [
        "Setup Supabase/PostgreSQL with PGVector extension",
        "Configure WhatsApp Business API or web chat widget",
        "Build document ingestion pipeline for knowledge base",
        "Implement conversation logging and basic analytics",
        "Create guardrails for inappropriate content filtering"
      ],
      deliverables: [
        "Live conversational AI responding to 8-10 defined intents",
        "RAG system processing company documents with citations",
        "Basic evaluation framework with precision/recall metrics",
        "WhatsApp/web integration handling 100+ daily conversations"
      ],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Production Sprint", 
      timeline: "Days 15-28",
      focus: ["Scale", "Monitor", "Integrate", "Launch"],
      objectives: [
        "Implement seamless human agent handoff workflow",
        "Deploy comprehensive analytics and conversation monitoring", 
        "Achieve production-grade security and performance standards",
        "Execute controlled soft launch with 500+ target users"
      ],
      backlog: [
        "Build agent dashboard for conversation takeovers",
        "Implement conversation analytics with sentiment analysis",
        "Setup production monitoring (latency, error rates, costs)",
        "Configure load testing for 1000+ concurrent users",
        "Create go/no-go decision framework with clear KPIs"
      ],
      deliverables: [
        "Human handoff system with <30 second transfer time",
        "Analytics dashboard tracking resolution rates and satisfaction",
        "Production deployment handling 1000+ daily active users",
        "Go/no-go recommendation based on performance metrics"
      ],
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  const roles = [
    {
      title: "AI Product Lead",
      responsibilities: [
        "Define use cases and success metrics",
        "Stakeholder alignment and progress communication", 
        "Go/no-go decision making",
        "User experience and conversation flow design"
      ],
      commitment: "Full-time (40hrs/week)"
    },
    {
      title: "Backend Engineer", 
      responsibilities: [
        "RAG system implementation and optimization",
        "Database setup and vector search configuration",
        "API integrations and webhook management",
        "Performance monitoring and scaling"
      ],
      commitment: "Full-time (40hrs/week)"
    },
    {
      title: "Frontend Developer",
      responsibilities: [
        "Chat interface development and testing",
        "Agent dashboard creation",
        "Analytics visualization and reporting",
        "Mobile responsiveness and accessibility"
      ],
      commitment: "Part-time (20hrs/week)"
    },
    {
      title: "QA & Operations",
      responsibilities: [
        "Conversation testing and quality assurance", 
        "Production monitoring and incident response",
        "User feedback collection and analysis",
        "Documentation and process optimization"
      ],
      commitment: "Part-time (15hrs/week)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container max-w-6xl px-6 py-16 mx-auto">
        
        {/* Main Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            <Clock className="w-4 h-4 mr-2" />
            4-Week Implementation
          </div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Rapid AI Validation for <br />
            <span className="text-blue-900">India-First Teams</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Skip the 6-month transformation cycles. Deploy, validate, and scale conversational AI 
            in 28 days with clear success metrics and the agility to pivot quickly if needed.
          </p>
        </div>

        {/* Subheader Philosophy */}
        <div className="p-8 mb-16 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-900 rounded-full">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Fast-Fail Philosophy with Measurable Outcomes
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                Every sprint delivers measurable value with clear go/no-go criteria. If metrics don't meet 
                thresholds by day 14, pivot or terminate with minimal sunk cost. This approach prioritizes 
                rapid learning over perfect solutions, ideal for India's fast-moving business environment.
              </p>
            </div>
          </div>
        </div>

        {/* Sprint Structure */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-center text-gray-900">
            Two-Sprint Execution Framework
          </h3>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {sprints.map((sprint, index) => (
              <div key={index} className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
                <div className="p-6 text-white bg-blue-900 ">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-white/20">
                      {sprint.icon}
                    </div>
                    <div className="text-sm font-medium text-blue-100">
                      {sprint.timeline}
                    </div>
                  </div>
                  <h4 className="mb-2 text-2xl font-bold">{sprint.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {sprint.focus.map((focus, i) => (
                      <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-white/20">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h5 className="flex items-center mb-3 font-semibold text-gray-900">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-900" />
                      Key Objectives
                    </h5>
                    <ul className="space-y-2">
                      {sprint.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start text-sm leading-relaxed text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="flex items-center mb-3 font-semibold text-gray-900">
                      <Settings className="w-4 h-4 mr-2 text-blue-900" />
                      Technical Backlog
                    </h5>
                    <ul className="space-y-2">
                      {sprint.backlog.map((task, i) => (
                        <li key={i} className="flex items-start text-sm leading-relaxed text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="flex items-center mb-3 font-semibold text-gray-900">
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-900" />
                      Measurable Deliverables
                    </h5>
                    <ul className="space-y-2">
                      {sprint.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start text-sm leading-relaxed text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Roles */}
        <div className="mb-16">
          <h3 className="mb-8 text-3xl font-bold text-center text-gray-900">
            Lean Team Structure
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, index) => (
              <div key={index} className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg">
                <div className="mb-4">
                  <div className="p-3 mb-3 bg-blue-100 rounded-full w-fit">
                    <Users className="w-6 h-6 text-blue-900" />
                  </div>
                  <h4 className="mb-1 text-lg font-semibold text-gray-900">{role.title}</h4>
                  <p className="text-sm font-medium text-blue-900">{role.commitment}</p>
                </div>
                <ul className="space-y-2">
                  {role.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start text-sm leading-relaxed text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 text-center text-white bg-blue-900 rounded-2xl md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="mb-4 text-3xl font-bold">
              Start Your 28-Day AI Validation
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">
              Join 200+ India-first companies that have successfully validated their AI use cases 
              without the complexity of traditional enterprise transformations.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row">
              <button className="flex items-center px-8 py-4 space-x-2 font-semibold text-blue-700 transition-colors duration-300 bg-white shadow-lg rounded-xl hover:bg-gray-50">
                <Zap className="w-5 h-5" />
                <span>Schedule Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center px-8 py-4 space-x-2 font-semibold text-white transition-colors duration-300 border-2 border-white rounded-xl hover:bg-white/10">
                <MessageSquare className="w-5 h-5" />
                <span>View Implementation Guide</span>
              </button>
            </div>
            
            <p className="text-sm text-blue-200">
              <strong>Transparent Pricing:</strong> ₹4.5-8L total program cost includes our expertise. 
              Third-party costs (OpenAI API, WhatsApp Business, cloud hosting) billed separately at actual usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pilot;