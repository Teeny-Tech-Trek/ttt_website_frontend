import React from 'react';
import { ArrowRight, CheckCircle, Clock, Users, Settings, Rocket } from 'lucide-react';

const GettingStartedSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Setup & Configuration',
      description: 'Connect your existing D2C platforms and configure AI agents according to your brand voice and business requirements.',
      icon: Settings,
      color: 'blue'
    },
    {
      step: '02', 
      title: 'Knowledge Training',
      description: 'Upload your product catalogs, FAQs, and brand guidelines. Our AI learns your business to provide accurate customer support.',
      icon: Users,
      color: 'green'
    },
    {
      step: '03',
      title: 'Testing & Optimization',
      description: 'Test AI responses, fine-tune conversation flows, and optimize performance before going live with real customers.',
      icon: Clock,
      color: 'purple'
    },
    {
      step: '04',
      title: 'Launch & Scale',
      description: 'Deploy your AI agents across all channels and watch your customer engagement and sales conversions grow.',
      icon: Rocket,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500 border-blue-200',
    green: 'bg-green-500 border-green-200', 
    purple: 'bg-purple-500 border-purple-200',
    orange: 'bg-orange-500 border-orange-200'
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Get Started in <span className="text-blue-600">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined onboarding process gets your D2C AI agents up and running quickly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-center">
                    <div className={`w-12 h-12 ${colorClasses[step.color]} text-white rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-gray-300 mb-2">{step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your D2C Business?</h3>
              <p className="text-gray-600 mb-6">Join hundreds of successful D2C brands already using Teeny Tech Trek AI agents to boost sales and improve customer satisfaction.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Free 14-day trial with full access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">No setup fees or hidden costs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">24/7 dedicated support team</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Cancel anytime, no questions asked</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center bg-white">
                  Schedule Demo
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">What You Get</h4>
                <p className="text-gray-600 text-sm">Everything included in your trial</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">5 AI Agents</div>
                    <div className="text-sm text-gray-500">Customer support, sales, analytics</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">∞</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Unlimited Conversations</div>
                    <div className="text-sm text-gray-500">No limits on customer interactions</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">24</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">24/7 Support</div>
                    <div className="text-sm text-gray-500">Human support when you need it</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSection;