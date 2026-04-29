import React from 'react';
import { ArrowRight, Settings, Users, Clock, Rocket } from 'lucide-react';

const GettingStartedSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Setup & Configuration',
      description: 'Connect your existing D2C platforms and configure chatbots according to your brand voice and business requirements.',
      icon: Settings,
    },
    {
      step: '02', 
      title: 'Knowledge Training',
      description: 'Upload your product catalogs, FAQs, and brand guidelines. Our chatbot learns your business to provide accurate customer support.',
      icon: Users,
    },
    {
      step: '03',
      title: 'Testing & Optimization',
      description: 'Test chatbot responses, fine-tune conversation flows, and optimize performance before going live with real customers.',
      icon: Clock,
    },
    {
      step: '04',
      title: 'Launch & Scale',
      description: 'Deploy your chatbots across all channels and watch your customer engagement and sales conversions grow.',
      icon: Rocket,
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            Get Started in <span className="text-blue-900">4 Simple Steps</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Our streamlined onboarding process gets your D2C chatbots up and running quickly
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:-translate-y-1">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white bg-blue-900 rounded-full">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="mb-2 text-3xl font-bold text-blue-900">{step.step}</div>
                    <h3 className="mb-3 text-lg font-semibold text-blue-900">{step.title}</h3>
                    <p className="text-sm text-black">{step.description}</p>
                  </div>
                </div>
                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute hidden transform -translate-y-1/2 lg:block top-1/2 -right-4">
                    <ArrowRight className="w-6 h-6 text-blue-900" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSection;
