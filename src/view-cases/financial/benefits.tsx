import React from 'react';
import { CheckCircle, ArrowRight, DollarSign, Clock, Users, TrendingUp, Database, Shield, FileText, Zap } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
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
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            Transform Your <span className="text-blue-900">Financial Operations</span> with AI
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Deliver measurable results with intelligent automation that streamlines processes and reduces costs
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="p-6 text-center transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-900 bg-blue-100 rounded-xl">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black">{benefit.title}</h3>
                <p className="text-sm text-black">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ROI Metrics */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-black">Proven ROI & Performance</h3>
              <p className="mb-8 text-black">
                Financial institutions using our AI automation see immediate improvements in efficiency and cost reduction
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="mb-2 text-3xl font-bold text-blue-900">{metric.value}</div>
                  <div className="mb-1 font-semibold text-black">{metric.label}</div>
                  <div className="text-sm text-black">{metric.description}</div>
                </div>
              ))}
            </div>

            {/* <button className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800">
              Calculate Your ROI <ArrowRight className="w-5 h-5" />
            </button> */}
              <HashLink 
                            smooth 
                            to="/#pricing"
                           className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg w-60 hover:bg-blue-800">
                        Calculate Your ROI 
                        <ArrowRight className="w-5 h-5" />
                          </HashLink>
          </div>

          {/* Implementation Benefits */}
          <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
            <h3 className="mb-6 text-xl font-semibold text-black">Implementation Benefits</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-black">Seamless Integration</h4>
                  <p className="text-sm text-black">Connect with existing core banking systems, CRM platforms, and regulatory databases</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-black">Enterprise Security</h4>
                  <p className="text-sm text-black">Bank-grade encryption, SOC 2 compliance, and audit trails for all transactions</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-black">Rapid Deployment</h4>
                  <p className="text-sm text-black">Go live in 2-4 weeks with pre-trained models and configuration templates</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 p-2 text-blue-900 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-black">Regulatory Compliance</h4>
                  <p className="text-sm text-black">Built-in compliance for SOX, GDPR, AML, KYC, and other financial regulations</p>
                </div>
              </div>
            </div>

            <div className="p-4 mt-8 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-900" />
                <span className="font-semibold text-blue-900">Success Guarantee</span>
              </div>
              <p className="mt-1 text-sm text-black">We guarantee positive ROI within 6 months or we'll refund your implementation costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
