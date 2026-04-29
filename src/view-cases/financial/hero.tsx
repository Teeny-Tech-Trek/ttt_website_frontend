import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight, PlayCircle, Shield, Star, Brain, CheckCircle } from 'lucide-react';

const FinancialHeroSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [processingMetric, setProcessingMetric] = useState(0);

  const processingSteps = [
    { label: 'Document Analysis', status: 'completed' },
    { label: 'Identity Verification', status: 'completed' },
    { label: 'Risk Assessment', status: 'processing' },
    { label: 'Compliance Check', status: 'pending' }
  ];

  const metrics = [
    { label: 'Documents Processed', value: '12,847', suffix: 'today' },
    { label: 'Processing Speed', value: '2.3', suffix: 'seconds' },
    { label: 'Accuracy Rate', value: '99.8', suffix: '%' },
    { label: 'Cost Savings', value: '80', suffix: '%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processingSteps.length);
      setProcessingMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-blue-900 text-white';
      case 'processing':
        return 'bg-blue-900 text-white animate-pulse';
      case 'pending':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative z-10 px-4 pt-16 pb-12 mx-auto sm:px-6 lg:px-8 sm:pt-20 sm:pb-16 max-w-7xl">
        <div className="grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-blue-900 rounded-full sm:px-4 sm:text-sm bg-blue-900/10">
                <Brain className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                <span>AI-Powered Financial Automation</span>
              </div>

              <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-black">Transform</span>
                <br />
                <span className="text-blue-900">Financial</span>
                <br />
                <span className="text-blue-900">Operations</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-black sm:text-lg lg:text-xl">
                Automate KYC processes, ensure regulatory compliance, and reduce operational costs by 80% with our enterprise-grade AI platform designed specifically for financial institutions.
              </p>
            </div>

            {/* Action buttons - Responsive */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a 
                href="#pricing"
                className="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-blue-900 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg rounded-xl hover:bg-blue-800 sm:w-auto"
              >
                <span>Get Free Assessment</span>
                <ArrowRight className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <button className="flex items-center justify-center w-full gap-3 px-6 py-3 font-semibold text-blue-900 transition-all duration-300 border border-blue-900 sm:justify-start sm:px-8 sm:py-4 rounded-xl hover:bg-blue-900/10 sm:w-auto">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-900/10">
                  <PlayCircle className="w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Key metrics preview - Responsive Grid */}
            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4 lg:gap-6 sm:pt-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-500 ${
                    processingMetric === index
                      ? 'bg-white shadow border-2 border-blue-900 scale-105'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="text-xl font-bold text-black sm:text-2xl">{metric.value}</div>
                  <div className="text-xs text-black sm:text-sm">{metric.label}</div>
                  <div className="text-xs font-medium text-blue-900">{metric.suffix}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right demo panel - Responsive */}
          <div className="relative">
            <div className="p-4 bg-white border border-gray-200 shadow sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl">
              {/* Header - Responsive */}
              <div className="flex items-center gap-3 mb-6 sm:gap-4 sm:mb-8">
                <div className="relative flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-900 shadow sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl">
                    <Brain className="w-6 h-6 text-white sm:w-7 sm:h-7" />
                  </div>
                  <div className="absolute w-3 h-3 bg-blue-900 border-2 border-white rounded-full sm:w-4 sm:h-4 -top-1 -right-1 animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-black truncate sm:text-lg lg:text-xl">FinanceAI Pro</h3>
                  <p className="text-xs text-black truncate sm:text-sm">Processing KYC Document #12847</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs font-bold text-blue-900 sm:text-sm">LIVE</div>
                  <div className="text-xs text-black">Real-time</div>
                </div>
              </div>

              {/* Processing flow - Responsive */}
              <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                <h4 className="mb-3 text-sm font-semibold text-black sm:mb-4 sm:text-base">Processing Pipeline</h4>
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg sm:gap-4 sm:p-4 sm:rounded-xl"
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 ${getStatusColor(
                        step.status
                      )}`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : step.status === 'processing' ? (
                        <div className="w-3 h-3 border-2 border-white rounded-full sm:w-4 sm:h-4 border-t-transparent animate-spin"></div>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-black truncate sm:text-base">{step.label}</div>
                      <div className="text-xs text-black capitalize sm:text-sm">{step.status}</div>
                    </div>
                    {step.status === 'completed' && (
                      <div className="flex-shrink-0 text-xs font-medium text-blue-900 sm:text-sm">✓ Done</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Results summary - Responsive */}
              <div className="p-4 border rounded-lg sm:p-6 sm:rounded-xl bg-blue-900/5 border-blue-900/20">
                <div className="flex items-center gap-2 mb-3 sm:gap-3">
                  <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-900 sm:w-6 sm:h-6" />
                  <h4 className="text-sm font-bold text-blue-900 sm:text-base">Processing Complete</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
                  <div>
                    <span className="text-black">Risk Score:</span>
                    <span className="ml-2 font-bold text-blue-900">Low (2.1/10)</span>
                  </div>
                  <div>
                    <span className="text-black">Compliance:</span>
                    <span className="ml-2 font-bold text-blue-900">Approved</span>
                  </div>
                  <div>
                    <span className="text-black">Processing Time:</span>
                    <span className="ml-2 font-bold text-blue-900">2.3 seconds</span>
                  </div>
                  <div>
                    <span className="text-black">Status:</span>
                    <span className="ml-2 font-bold text-blue-900">Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges - Responsive positioning */}
            <div className="absolute px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-blue-900 shadow -top-2 sm:-top-4 -right-2 sm:-right-4 rounded-lg sm:rounded-xl">
              99.8% Accurate
            </div>
            <div className="absolute px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-blue-900 shadow -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 rounded-lg sm:rounded-xl">
              80% Cost Reduction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHeroSection;