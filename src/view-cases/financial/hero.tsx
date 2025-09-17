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
      <div className="relative z-10 px-6 pt-20 pb-16 mx-auto max-w-7xl">
        {/* Trust badge */}
        {/* <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 text-black bg-white border border-gray-200 rounded-full shadow">
            <Shield className="w-5 h-5 text-blue-900" />
            <span className="font-semibold">Trusted by 500+ Financial Institutions</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-blue-900 fill-blue-900" />
              ))}
            </div>
          </div>
        </div> */}

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 rounded-full bg-blue-900/10">
                <Brain className="w-4 h-4" />
                AI-Powered Financial Automation
              </div>

              <h1 className="text-6xl font-black leading-tight lg:text-7xl">
                <span className="text-black">Transform</span>
                <br />
                <span className="text-blue-900">Financial</span>
                <br />
                <span className="text-blue-900">Operations</span>
              </h1>

              <p className="max-w-xl text-xl leading-relaxed text-black">
                Automate KYC processes, ensure regulatory compliance, and reduce operational costs by 80% with our enterprise-grade AI platform designed specifically for financial institutions.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-900 rounded-xl hover:bg-blue-800">
                <span>Get Free Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-3 px-8 py-4 font-semibold text-blue-900 transition-all duration-300 border border-blue-900 rounded-xl hover:bg-blue-900/10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900/10">
                  <PlayCircle className="w-5 h-5 text-blue-900" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Key metrics preview */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-500 ${
                    processingMetric === index
                      ? 'bg-white shadow border-2 border-blue-900 scale-105'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="text-2xl font-bold text-black">{metric.value}</div>
                  <div className="text-sm text-black">{metric.label}</div>
                  <div className="text-xs font-medium text-blue-900">{metric.suffix}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right demo panel */}
          <div className="relative">
            <div className="p-8 bg-white border border-gray-200 shadow rounded-3xl">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="flex items-center justify-center bg-blue-900 shadow w-14 h-14 rounded-2xl">
                    <Brain className="text-white w-7 h-7" />
                  </div>
                  <div className="absolute w-4 h-4 bg-blue-900 border-2 border-white rounded-full -top-1 -right-1 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">FinanceAI Pro</h3>
                  <p className="text-black">Processing KYC Document #12847</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm font-bold text-blue-900">LIVE</div>
                  <div className="text-xs text-black">Real-time</div>
                </div>
              </div>

              {/* Processing flow */}
              <div className="mb-8 space-y-4">
                <h4 className="mb-4 font-semibold text-black">Processing Pipeline</h4>
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStatusColor(
                        step.status
                      )}`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === 'processing' ? (
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-black">{step.label}</div>
                      <div className="text-sm text-black capitalize">{step.status}</div>
                    </div>
                    {step.status === 'completed' && (
                      <div className="text-sm font-medium text-blue-900">✓ Done</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Results summary */}
              <div className="p-6 border rounded-xl bg-blue-900/5 border-blue-900/20">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                  <h4 className="font-bold text-blue-900">Processing Complete</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
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

            {/* Floating badges */}
            <div className="absolute px-4 py-2 text-sm font-bold text-white bg-blue-900 shadow -top-4 -right-4 rounded-xl">
              99.8% Accurate
            </div>
            <div className="absolute px-4 py-2 text-sm font-bold text-white bg-blue-900 shadow -bottom-4 -left-4 rounded-xl">
              80% Cost Reduction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHeroSection;
