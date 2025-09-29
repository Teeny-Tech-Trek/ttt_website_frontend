import React from 'react';
import { CheckCircle, ArrowRight, DollarSign, Clock, Users, TrendingUp, Database, Shield, FileText, Zap } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Cost Reduction',
      description: 'Reduce operational costs by up to 80% through intelligent automation of manual processes.',
    },
    {
      icon: Clock,
      title: 'Processing Speed',
      description: 'Process KYC documents in seconds instead of days with 99.8% accuracy.',
    },
    {
      icon: Users,
      title: 'Enhanced Customer Experience',
      description: 'Faster onboarding and instant responses improve customer satisfaction scores.',
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Handle 10x more transactions without proportional staff increases.',
    }
  ];

  const metrics = [
    { label: 'Cost Reduction', value: '80%', description: 'Average operational cost savings' },
    { label: 'Processing Speed', value: '95%', description: 'Faster document processing' },
    { label: 'Accuracy Rate', value: '99.8%', description: 'AI verification accuracy' },
    { label: 'ROI Timeline', value: '3 months', description: 'Time to see positive ROI' }
  ];

  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-black sm:mb-6 sm:text-4xl lg:text-5xl">
            Transform Your <span className="text-blue-900">Financial Operations</span> with AI
          </h2>
          <p className="max-w-3xl px-4 mx-auto text-base text-black sm:text-lg lg:text-xl">
            Deliver measurable results with intelligent automation that streamlines processes and reduces costs
          </p>
        </div>

        {/* Key Benefits - Responsive Grid */}
        <div className="grid grid-cols-1 gap-4 mb-12 sm:gap-6 lg:gap-8 sm:mb-16 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="p-5 text-center transition-shadow bg-white border border-gray-200 shadow-sm sm:p-6 rounded-xl hover:shadow-md">
                <div className="flex items-center justify-center mx-auto mb-3 text-blue-900 bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 sm:mb-4 rounded-xl">
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-black sm:text-lg">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-black">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid items-start gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
          {/* ROI Metrics */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="mb-3 text-xl font-bold text-black sm:mb-4 sm:text-2xl">Proven ROI & Performance</h3>
              <p className="mb-6 text-sm leading-relaxed text-black sm:mb-8 sm:text-base">
                Financial institutions using our AI automation see immediate improvements in efficiency and cost reduction
              </p>
            </div>

            {/* Metrics Grid - Responsive */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="p-4 transition-shadow bg-white border border-gray-200 rounded-lg sm:p-6 hover:shadow-md">
                  <div className="mb-2 text-2xl font-bold text-blue-900 sm:text-3xl">{metric.value}</div>
                  <div className="mb-1 text-sm font-semibold text-black sm:text-base">{metric.label}</div>
                  <div className="text-xs leading-relaxed text-black sm:text-sm">{metric.description}</div>
                </div>
              ))}
            </div>

            {/* CTA Button - Responsive */}
            <a 
              href="#pricing"
              className="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-900 rounded-lg sm:px-8 sm:py-4 sm:text-base hover:bg-blue-800 sm:w-auto sm:inline-flex"
            >
              Calculate Your ROI 
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Implementation Benefits Card - Responsive */}
          <div className="p-6 bg-white border border-gray-200 shadow-lg sm:p-8 rounded-2xl">
            <h3 className="mb-5 text-lg font-semibold text-black sm:mb-6 sm:text-xl">Implementation Benefits</h3>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-black sm:text-base">Seamless Integration</h4>
                  <p className="text-xs leading-relaxed text-black sm:text-sm">Connect with existing core banking systems, CRM platforms, and regulatory databases</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-black sm:text-base">Enterprise Security</h4>
                  <p className="text-xs leading-relaxed text-black sm:text-sm">Bank-grade encryption, SOC 2 compliance, and audit trails for all transactions</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-black sm:text-base">Rapid Deployment</h4>
                  <p className="text-xs leading-relaxed text-black sm:text-sm">Go live in 2-4 weeks with pre-trained models and configuration templates</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-black sm:text-base">Regulatory Compliance</h4>
                  <p className="text-xs leading-relaxed text-black sm:text-sm">Built-in compliance for SOX, GDPR, AML, KYC, and other financial regulations</p>
                </div>
              </div>
            </div>

            {/* Success Guarantee Box - Responsive */}
            <div className="p-4 mt-6 border border-blue-200 rounded-lg sm:mt-8 bg-blue-50">
              <div className="flex items-start gap-2 mb-2 sm:items-center">
                <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm font-semibold text-blue-900 sm:text-base">Success Guarantee</span>
              </div>
              <p className="text-xs leading-relaxed text-black sm:text-sm pl-7">
                We guarantee positive ROI within 6 months or we'll refund your implementation costs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;