import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileCheck, Users, BarChart3, CheckCircle, Globe, Award, Layers, Target } from 'lucide-react';

const ComplianceRiskSection = () => {
  const [activeRegulation, setActiveRegulation] = useState(0);
  const [riskLevel, setRiskLevel] = useState('low');
  const [complianceScore, setComplianceScore] = useState(98.7);
  
  const regulations = [
    { name: 'SOX', fullName: 'Sarbanes-Oxley Act', status: 'Compliant', score: 99.2, lastAudit: '2 days ago', nextReview: 'Q1 2025' },
    { name: 'GDPR', fullName: 'General Data Protection Regulation', status: 'Compliant', score: 98.8, lastAudit: '1 week ago', nextReview: 'Q2 2025' },
    { name: 'PCI DSS', fullName: 'Payment Card Industry Data Security', status: 'Compliant', score: 97.5, lastAudit: '3 days ago', nextReview: 'Q1 2025' },
    { name: 'Basel III', fullName: 'International Banking Regulations', status: 'Monitoring', score: 94.2, lastAudit: '1 month ago', nextReview: 'Q3 2025' },
    { name: 'AML/KYC', fullName: 'Anti-Money Laundering', status: 'Compliant', score: 99.8, lastAudit: '5 days ago', nextReview: 'Q1 2025' },
    { name: 'MiFID II', fullName: 'Markets in Financial Instruments', status: 'Compliant', score: 96.3, lastAudit: '2 weeks ago', nextReview: 'Q2 2025' }
  ];

  const riskMetrics = [
    { label: 'Overall Risk Score', value: '2.1/10', status: 'low', icon: Shield },
    { label: 'Market Risk', value: 'Moderate', status: 'moderate', icon: BarChart3 },
    { label: 'Operational Risk', value: 'Low', status: 'low', icon: Target },
    { label: 'Credit Risk', value: 'Low', status: 'low', icon: Users },
    { label: 'Liquidity Risk', value: 'Very Low', status: 'low', icon: Layers },
    { label: 'Compliance Risk', value: 'Minimal', status: 'low', icon: FileCheck }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegulation(prev => (prev + 1) % regulations.length);
      setComplianceScore(prev => prev + (Math.random() - 0.5) * 0.1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (status: string) => {
    return 'text-blue-900 bg-blue-50 border-blue-200';
  };

  return (
    <div className="relative py-8 bg-white sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-black bg-white border-2 border-black rounded-full sm:gap-3 sm:px-6 sm:py-3 sm:mb-8 sm:text-base">
            <Award className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
            <span className="font-bold text-blue-900">Advanced Compliance & Risk Management</span>
          </div>
          
          <h2 className="mb-4 text-2xl font-black leading-tight text-blue-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            REGULATORY EXCELLENCE
          </h2>
          
          <p className="max-w-xs px-2 mx-auto text-sm leading-relaxed text-black sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Stay ahead of evolving regulations with AI-powered compliance monitoring that ensures adherence across all jurisdictions while minimizing operational risk.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-7 lg:items-start">
          
          {/* Left Column - Risk Overview */}
          <div className="order-2 space-y-6 lg:order-1 sm:space-y-8 lg:col-span-3">
            
            {/* Compliance Score Card */}
            <div className="p-4 bg-white border-2 border-black sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-bold text-blue-900 sm:mb-4 sm:text-xl md:text-2xl">
                  Compliance Score
                </h3>
                
                {/* Circular Progress */}
                <div className="relative w-24 h-24 mx-auto mb-4 sm:w-28 md:w-32 lg:w-36 sm:h-28 md:h-32 lg:h-36 sm:mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <circle 
                      cx="50" cy="50" r="40" 
                      stroke="#1e3a8a"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${complianceScore * 2.51} 251`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-black text-blue-900 sm:text-2xl md:text-3xl">
                        {complianceScore.toFixed(1)}%
                      </div>
                      <div className="text-xs text-black sm:text-sm">EXCELLENT</div>
                    </div>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-blue-900 border border-blue-200 rounded-full bg-blue-50">
                  <CheckCircle className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs font-semibold sm:text-sm">Audit Ready</span>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg font-bold text-blue-900 sm:text-xl md:text-2xl">Risk Assessment</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {riskMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={index} className="p-3 transition-all duration-300 bg-white border border-black sm:p-4 md:p-5 rounded-xl sm:rounded-2xl hover:shadow-md touch-manipulation">
                      <div className="flex items-start gap-2 mb-2 sm:items-center sm:gap-3 sm:mb-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg sm:w-7 md:w-8 sm:h-7 md:h-8 bg-blue-50">
                          <IconComponent className="w-3 h-3 text-blue-900 sm:w-4 md:w-5 sm:h-4 md:h-5" />
                        </div>
                        <div className="text-xs font-semibold leading-tight text-black sm:text-sm md:text-base">
                          {metric.label}
                        </div>
                      </div>
                      <div className="mb-2 text-sm font-bold text-blue-900 sm:text-base md:text-lg lg:text-xl">
                        {metric.value}
                      </div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Regulations Dashboard */}
          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="overflow-hidden bg-white border-2 border-black rounded-2xl sm:rounded-3xl">
              
              {/* Dashboard Header */}
              <div className="p-4 text-white bg-blue-900 sm:p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold leading-tight sm:text-xl md:text-2xl">
                      Regulatory Compliance Dashboard
                    </h3>
                    <p className="text-sm leading-relaxed sm:text-base text-white/80">
                      Real-time monitoring across 247 active regulations
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-center sm:text-right">
                    <div className="text-2xl font-bold sm:text-3xl md:text-4xl">
                      {regulations.filter(r => r.status === 'Compliant').length}
                    </div>
                    <div className="text-xs sm:text-sm text-white/90">Compliant</div>
                  </div>
                </div>
              </div>

              {/* Regulations Grid */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 sm:gap-6 sm:mb-8">
                  {regulations.map((regulation, index) => (
                    <div 
                      key={regulation.name}
                      className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-500 touch-manipulation ${
                        activeRegulation === index 
                          ? 'border-blue-900 bg-blue-50 shadow-md transform scale-105' 
                          : 'border-black bg-white hover:shadow-md hover:border-blue-900 active:scale-95'
                      }`}
                      onClick={() => setActiveRegulation(index)}
                    >
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-900 rounded-full sm:w-3 sm:h-3"></div>
                          <div className="text-sm font-bold text-blue-900 sm:text-base md:text-lg">
                            {regulation.name}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-black sm:text-xl md:text-2xl">
                          {regulation.score}%
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                          {regulation.fullName}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-shrink-0 px-2 py-1 text-xs font-bold text-blue-900 rounded-full sm:px-3 bg-blue-50">
                            {regulation.status}
                          </div>
                          <div className="text-xs text-right text-black">
                            Updated {regulation.lastAudit}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Coverage Section */}
        <div className="relative p-6 mt-8 bg-white border-2 border-black sm:p-8 md:p-10 lg:p-12 xl:p-16 sm:mt-12 md:mt-16 lg:mt-20 rounded-2xl sm:rounded-3xl">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h3 className="mb-4 text-2xl font-bold leading-tight text-blue-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                Global Regulatory Coverage
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-black sm:mb-8 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                Our AI continuously monitors regulatory changes across 50+ jurisdictions, ensuring your institution remains compliant with evolving requirements worldwide.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {[
                  { value: '247', label: 'Active Regulations' },
                  { value: '50+', label: 'Jurisdictions' },
                  { value: '99.9%', label: 'Accuracy Rate' },
                  { value: '24/7', label: 'Monitoring' }
                ].map((stat, index) => (
                  <div key={index} className="p-3 text-center border border-blue-200 sm:p-4 rounded-xl bg-blue-50">
                    <div className="mb-1 text-2xl font-bold text-blue-900 sm:text-3xl md:text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="text-xs leading-tight text-black sm:text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Feature Cards */}
            <div className="order-1 space-y-4 lg:order-2 sm:space-y-6">
              {[
                {
                  icon: Globe,
                  title: 'Multi-Jurisdiction Monitoring',
                  description: 'Real-time updates from regulatory bodies worldwide'
                },
                {
                  icon: AlertTriangle,
                  title: 'Proactive Risk Alerts',
                  description: 'Early warning system for regulatory changes'
                },
                {
                  icon: FileCheck,
                  title: 'Automated Reporting',
                  description: 'Generate compliant reports in multiple formats'
                }
              ].map((feature, index) => (
                <div key={index} className="p-4 transition-colors duration-300 border border-blue-200 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-blue-50 hover:bg-blue-100">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <feature.icon className="flex-shrink-0 w-6 h-6 mt-1 text-blue-900 sm:w-7 md:w-8 sm:h-7 md:h-8" />
                    <div className="flex-1">
                      <h4 className="mb-1 text-sm font-bold leading-tight text-blue-900 sm:text-base md:text-lg sm:mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRiskSection;