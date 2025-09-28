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
    <div className="relative py-24 bg-white">
      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-black bg-white border-2 border-black rounded-full">
            <Award className="w-5 h-5 text-blue-900" />
            <span className="font-bold text-blue-900">Advanced Compliance & Risk Management</span>
          </div>
          
          <h2 className="mb-6 text-5xl font-black text-blue-900">REGULATORY EXCELLENCE</h2>
          
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-black">
            Stay ahead of evolving regulations with AI-powered compliance monitoring that ensures adherence across all jurisdictions while minimizing operational risk.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-7">
          {/* Risk Overview */}
          <div className="space-y-8 lg:col-span-3">
            {/* Compliance score */}
            <div className="p-8 bg-white border-2 border-black rounded-3xl">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-blue-900">Compliance Score</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle 
                      cx="50" cy="50" r="40" 
                      stroke="#1e3a8a"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${complianceScore * 2.51} 251`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-black text-blue-900">{complianceScore.toFixed(1)}%</div>
                      <div className="text-xs text-black">EXCELLENT</div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 text-blue-900 border border-blue-200 rounded-full bg-blue-50">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Audit Ready</span>
                </div>
              </div>
            </div>

            {/* Risk metrics */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-blue-900">Risk Assessment</h4>
              <div className="grid grid-cols-2 gap-4">
                {riskMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div key={index} className="p-4 bg-white border border-black rounded-2xl hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                          <IconComponent className="w-4 h-4 text-blue-900" />
                        </div>
                        <div className="text-sm font-semibold text-black">{metric.label}</div>
                      </div>
                      <div className="mb-2 text-lg font-bold text-blue-900">{metric.value}</div>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Regulations */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden bg-white border-2 border-black rounded-3xl">
              <div className="p-8 text-white bg-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Regulatory Compliance Dashboard</h3>
                    <p className="text-white/80">Real-time monitoring across 247 active regulations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{regulations.filter(r => r.status === 'Compliant').length}</div>
                    <div className="text-sm">Compliant</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {regulations.map((regulation, index) => (
                    <div 
                      key={regulation.name}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                        activeRegulation === index 
                          ? 'border-blue-900 bg-blue-50 shadow-md scale-105' 
                          : 'border-black bg-white hover:shadow-md hover:border-blue-900'
                      }`}
                      onClick={() => setActiveRegulation(index)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                          <div className="font-bold text-blue-900">{regulation.name}</div>
                        </div>
                        <div className="text-2xl font-bold text-black">{regulation.score}%</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm text-black">{regulation.fullName}</div>
                        <div className="flex items-center justify-between">
                          <div className="px-3 py-1 text-xs font-bold text-blue-900 rounded-full bg-blue-50">
                            {regulation.status}
                          </div>
                          <div className="text-xs text-black">Updated {regulation.lastAudit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="flex gap-4">
                  <button className="flex-1 px-6 py-4 font-bold text-white transition-all duration-300 bg-blue-900 hover:bg-blue-800 rounded-2xl">
                    Generate Compliance Report
                  </button>
                  <button className="flex-1 px-6 py-4 font-bold text-blue-900 transition-all duration-300 border-2 border-blue-900 rounded-2xl hover:bg-blue-50">
                    Schedule Audit Review
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Global coverage */}
        <div className="relative p-12 mt-20 bg-white border-2 border-black rounded-3xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-4xl font-bold text-blue-900">Global Regulatory Coverage</h3>
              <p className="mb-8 text-xl leading-relaxed text-black">
                Our AI continuously monitors regulatory changes across 50+ jurisdictions, ensuring your institution remains compliant with evolving requirements worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">247</div>
                  <div className="text-black">Active Regulations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">50+</div>
                  <div className="text-black">Jurisdictions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">99.9%</div>
                  <div className="text-black">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">24/7</div>
                  <div className="text-black">Monitoring</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 border border-blue-200 rounded-2xl bg-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="w-8 h-8 text-blue-900" />
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">Multi-Jurisdiction Monitoring</h4>
                    <p className="text-sm text-black">Real-time updates from regulatory bodies worldwide</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border border-blue-200 rounded-2xl bg-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8 text-blue-900" />
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">Proactive Risk Alerts</h4>
                    <p className="text-sm text-black">Early warning system for regulatory changes</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border border-blue-200 rounded-2xl bg-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <FileCheck className="w-8 h-8 text-blue-900" />
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">Automated Reporting</h4>
                    <p className="text-sm text-black">Generate compliant reports in multiple formats</p>
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

export default ComplianceRiskSection;
