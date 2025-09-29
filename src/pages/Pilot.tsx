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
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4 mr-2" />
            4-Week Implementation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Rapid AI Validation for <br />
            <span className="text-blue-600">India-First Teams</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Skip the 6-month transformation cycles. Deploy, validate, and scale conversational AI 
            in 28 days with clear success metrics and the agility to pivot quickly if needed.
          </p>
        </div>

        {/* Subheader Philosophy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Fast-Fail Philosophy with Measurable Outcomes
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every sprint delivers measurable value with clear go/no-go criteria. If metrics don't meet 
                thresholds by day 14, pivot or terminate with minimal sunk cost. This approach prioritizes 
                rapid learning over perfect solutions, ideal for India's fast-moving business environment.
              </p>
            </div>
          </div>
        </div>

        {/* Sprint Structure */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Two-Sprint Execution Framework
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {sprints.map((sprint, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 rounded-lg p-2">
                      {sprint.icon}
                    </div>
                    <div className="text-blue-100 text-sm font-medium">
                      {sprint.timeline}
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{sprint.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {sprint.focus.map((focus, i) => (
                      <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Key Objectives
                    </h5>
                    <ul className="space-y-2">
                      {sprint.objectives.map((obj, i) => (
                        <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Settings className="w-4 h-4 text-purple-500 mr-2" />
                      Technical Backlog
                    </h5>
                    <ul className="space-y-2">
                      {sprint.backlog.map((task, i) => (
                        <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 text-orange-500 mr-2" />
                      Measurable Deliverables
                    </h5>
                    <ul className="space-y-2">
                      {sprint.deliverables.map((deliverable, i) => (
                        <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Lean Team Structure
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <div className="bg-blue-100 rounded-full p-3 w-fit mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{role.title}</h4>
                  <p className="text-sm text-blue-600 font-medium">{role.commitment}</p>
                </div>
                <ul className="space-y-2">
                  {role.responsibilities.map((resp, i) => (
                    <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Start Your 28-Day AI Validation
            </h3>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join 200+ India-first companies that have successfully validated their AI use cases 
              without the complexity of traditional enterprise transformations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                <Zap className="w-5 h-5" />
                <span>Schedule Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:bg-white/10 transition-colors duration-300">
                <MessageSquare className="w-5 h-5" />
                <span>View Implementation Guide</span>
              </button>
            </div>
            
            <p className="text-blue-200 text-sm">
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