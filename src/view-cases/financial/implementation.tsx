import React from 'react';
import { ArrowRight, CheckCircle, Clock, Users, Settings, Rocket, Shield, FileText } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
const ImplementationSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Assessment & Planning',
      description: 'Comprehensive analysis of your current systems, processes, and regulatory requirements to create a tailored implementation roadmap.',
      icon: FileText,
      duration: '1-2 weeks'
    },
    {
      step: '02', 
      title: 'System Integration',
      description: 'Secure connection to your core banking systems, databases, and third-party platforms with thorough testing protocols.',
      icon: Settings,
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Model Training & Customization',
      description: 'Train AI models on your historical data and customize workflows to match your specific business processes and compliance needs.',
      icon: Users,
      duration: '1-2 weeks'
    },
    {
      step: '04',
      title: 'Testing & Validation',
      description: 'Comprehensive testing including security audits, compliance validation, and performance optimization before go-live.',
      icon: Shield,
      duration: '1 week'
    },
    {
      step: '05',
      title: 'Deployment & Go-Live',
      description: 'Phased deployment with real-time monitoring, staff training, and immediate support to ensure smooth transition.',
      icon: Rocket,
      duration: '1 week'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            Seamless <span className="text-blue-900">Implementation Process</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Our proven methodology ensures rapid deployment with minimal disruption to your operations
          </p>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-16 space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex items-center gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 mb-2 text-white bg-blue-900 rounded-full">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="text-2xl font-bold text-gray-400">{step.step}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 bg-white border border-gray-300 shadow-sm rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">{step.title}</h3>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-black">{step.description}</p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute w-px h-12 bg-gray-300 left-8 top-20"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Implementation Support */}
        <div className="p-8 bg-white border border-gray-300 shadow-lg rounded-2xl md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-blue-900">Expert Implementation Support</h3>
              <p className="mb-6 text-black">Our dedicated implementation team ensures your success every step of the way with comprehensive support and guidance.</p>
              
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900" />
                  <span className="text-black">Dedicated project manager assigned to your implementation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900" />
                  <span className="text-black">24/7 technical support during deployment phase</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900" />
                  <span className="text-black">Comprehensive staff training and documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-900" />
                  <span className="text-black">Ongoing optimization and performance monitoring</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800">
                  Schedule Implementation Call <ArrowRight className="w-5 h-5" />
                </button> */}

                <HashLink 
                  smooth 
                  to="/#pricing"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
                >
                  Schedule Implementation Call <ArrowRight className="w-5 h-5" />
                </HashLink>
                {/* <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-black transition-colors bg-white border border-gray-400 rounded-lg hover:border-gray-500">
                  Download Implementation Guide
                </button> */}
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-300 rounded-xl">
              <div className="mb-6 text-center">
                <h4 className="mb-2 text-lg font-semibold text-blue-900">Implementation Timeline</h4>
                <p className="text-sm text-black">Typical deployment schedule</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg">
                  <span className="font-medium text-black">Total Duration</span>
                  <span className="font-semibold text-blue-900">6-8 weeks</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg">
                  <span className="font-medium text-black">Go-Live Ready</span>
                  <span className="font-semibold text-blue-900">Week 6</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg">
                  <span className="font-medium text-black">Full Optimization</span>
                  <span className="font-semibold text-blue-900">Week 8</span>
                </div>
              </div>

              <div className="p-4 mt-6 bg-white border rounded-lg border-blue-900/40">
                <div className="flex items-center gap-2 text-blue-900">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Success Guarantee</span>
                </div>
                <p className="mt-1 text-xs text-black">We guarantee successful implementation or full refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationSection;
