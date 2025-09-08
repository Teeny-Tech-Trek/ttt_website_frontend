import React from 'react';
import { RefreshCw, Handshake, DollarSign, BarChart3, Users, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    { icon: RefreshCw, text: "Enhance patient outcomes" },
    { icon: Handshake, text: "Strengthen patient relationships" },
    { icon: DollarSign, text: "Accelerate revenue" },
    { icon: BarChart3, text: "Increase efficiency and reduce costs" },
    { icon: Users, text: "Empower your human workforce" }
  ];

  const deliveryPoints = [
    "Role-specific AI agents",
    "Autonomous task execution and results", 
    "AI co-pilot to superpower your humans",
    "Seamless integration with your existing systems",
    "Self-learning and continuous improvement"
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            How We Help Scale Your Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            AI voice, SMS-text, analytical, and program-specific AI Agents that enhance your patient 
            interactions and streamline your operations
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits to You */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-30"></div>
            
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Benefits to You
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We design, customize, and deploy digital workers to transform your business
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How We Deliver Them */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-200 rounded-full opacity-30"></div>
            
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              How We Deliver Them
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Machine learning, natural language processing, and scalable automation
            </p>

            <div className="space-y-6">
              {deliveryPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;