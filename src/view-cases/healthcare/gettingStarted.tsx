import React from 'react';
import { List, Settings, Monitor, Database, TrendingUp } from 'lucide-react';

const GettingStartedSection = () => {
  const steps = [
    {
      number: "1)",
      title: "Define Strategy & Scope",
      icon: List,
      points: [
        "We work with you to identify specific business problems the AI agent will solve (e.g. customer response times)",
        "Together, we establish success metrics that align with your business objectives"
      ]
    },
    {
      number: "2)",
      title: "We Customize the AI Agent for You", 
      icon: Settings,
      points: [
        "We define the agent's personality, tone, and interaction style to align with your practice voice and patient expectations",
        "We map out task-specific workflows, decision trees, and interface logic to guide agent interactions and behavior"
      ]
    },
    {
      number: "3)",
      title: "Develop & Train the Agent",
      icon: Monitor,
      points: [
        "We configure model parameters, prompts, and logic tailored to your use cases",
        "We train the agent with business-specific data and iterative feedback loops"
      ]
    },
    {
      number: "4)",
      title: "Integrate & Deploy",
      icon: Database,
      points: [
        "We seamlessly embed the AI agent into current workflows, tools, and platforms",
        "We conduct pilot testing and staged rollouts to validate functionality and performance"
      ]
    },
    {
      number: "5)",
      title: "Self Learning & Optimization",
      icon: TrendingUp,
      points: [
        "We track agent performance to match your business KPIs",
        "The AI agent and our team refines the model continuously using live data and user feedback"
      ]
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            Getting Started is Easy
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our streamlined process gets your AI workforce up and running quickly with minimal 
            disruption to your operations.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-600"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{step.number}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <div className="space-y-3">
                {step.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSection;