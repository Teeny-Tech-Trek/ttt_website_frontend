import React from 'react';
import { ArrowRight, CheckCircle, Clock, Users, Settings, Rocket, Shield, FileText } from 'lucide-react';

// Mock HashLink component for demo purposes
const HashLink = ({ children, to, className, smooth }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

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
    <div className="py-8 bg-white sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-4 text-2xl font-bold leading-tight text-black sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Seamless <span className="text-blue-900">Implementation Process</span>
          </h2>
          <p className="max-w-xs px-2 mx-auto text-sm leading-relaxed text-black sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Our proven methodology ensures rapid deployment with minimal disruption to your operations
          </p>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-8 space-y-4 sm:mb-12 md:mb-16 sm:space-y-6 md:space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Mobile Layout (stacked) */}
                <div className="block sm:hidden">
                  <div className="flex flex-col items-center p-4 text-center bg-white border border-gray-300 shadow-sm rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 text-white bg-blue-900 rounded-full">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="mb-2 text-lg font-bold text-gray-400">{step.step}</div>
                    <h3 className="mb-2 text-lg font-semibold text-blue-900">{step.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-3 h-3 text-gray-600" />
                      <span className="text-xs text-gray-600">{step.duration}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-black">{step.description}</p>
                  </div>
                  {/* Mobile Connector */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-px h-6 my-2 bg-gray-300"></div>
                    </div>
                  )}
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="items-start hidden gap-4 sm:flex md:gap-6 lg:gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 mb-2 text-white bg-blue-900 rounded-full sm:w-14 md:w-16 lg:w-18 xl:w-20 sm:h-14 md:h-16 lg:h-18 xl:h-20">
                      <IconComponent className="w-5 h-5 sm:w-6 md:w-7 lg:w-8 xl:w-9 sm:h-6 md:h-7 lg:h-8 xl:h-9" />
                    </div>
                    <div className="text-lg font-bold text-gray-400 sm:text-xl md:text-2xl lg:text-3xl">{step.step}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4 bg-white border border-gray-300 shadow-sm sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl">
                    <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-start sm:justify-between sm:mb-4 sm:gap-4">
                      <h3 className="text-lg font-semibold leading-tight text-blue-900 sm:text-xl md:text-2xl lg:text-3xl">
                        {step.title}
                      </h3>
                      <div className="flex items-center flex-shrink-0 gap-2">
                        <Clock className="w-3 h-3 text-gray-600 sm:w-4 md:w-5 sm:h-4 md:h-5" />
                        <span className="text-xs text-gray-600 sm:text-sm md:text-base whitespace-nowrap">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-black sm:text-base md:text-lg lg:text-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Desktop Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute hidden w-px h-8 bg-gray-300 sm:block sm:h-10 md:h-12 left-6 sm:left-7 md:left-8 lg:left-9 xl:left-10 top-16 sm:top-18 md:top-20 lg:top-22 xl:top-24"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Implementation Support */}
        <div className="p-4 bg-white border border-gray-300 shadow-lg sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl">
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              <h3 className="mb-3 text-xl font-bold leading-tight text-blue-900 sm:mb-4 md:mb-6 sm:text-2xl md:text-3xl lg:text-4xl">
                Expert Implementation Support
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-black sm:mb-6 md:mb-8 sm:text-base md:text-lg lg:text-xl">
                Our dedicated implementation team ensures your success every step of the way with comprehensive support and guidance.
              </p>
              
              <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                {[
                  'Dedicated project manager assigned to your implementation',
                  '24/7 technical support during deployment phase',
                  'Comprehensive staff training and documentation',
                  'Ongoing optimization and performance monitoring'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed text-black sm:text-base md:text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <HashLink 
                  smooth 
                  to="/#pricing"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-lg sm:rounded-xl hover:bg-blue-50 hover:border-blue-800 min-h-[48px] touch-manipulation"
                >
                  <span>Schedule Implementation Call</span> 
                  <ArrowRight className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                </HashLink>
              </div>
            </div>

            {/* Right Column - Timeline Box */}
            <div className="order-1 p-4 bg-white border border-gray-300 rounded-lg lg:order-2 sm:p-6 sm:rounded-xl">
              <div className="mb-4 text-center sm:mb-6">
                <h4 className="mb-2 text-lg font-semibold text-blue-900 sm:text-xl md:text-2xl">
                  Implementation Timeline
                </h4>
                <p className="text-xs text-black sm:text-sm md:text-base">
                  Typical deployment schedule
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Total Duration', value: '6-8 weeks' },
                  { label: 'Go-Live Ready', value: 'Week 6' },
                  { label: 'Full Optimization', value: 'Week 8' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg sm:p-4">
                    <span className="text-sm font-medium text-black sm:text-base">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-blue-900 sm:text-base">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 mt-4 bg-white border rounded-lg sm:p-4 sm:mt-6 border-blue-900/40">
                <div className="flex items-start gap-2 mb-1 text-blue-900">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium sm:text-base">Success Guarantee</span>
                </div>
                <p className="pl-6 text-xs leading-relaxed text-black sm:text-sm">
                  We guarantee successful implementation or full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationSection;