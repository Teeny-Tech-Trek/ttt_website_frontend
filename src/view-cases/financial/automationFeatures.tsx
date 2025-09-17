import React, { useState, useEffect } from 'react';
import { Shield, FileText, Users, AlertTriangle, BarChart3, Clock, CheckCircle, Bot, Zap, Brain, Eye, Star, Activity, Layers, Cpu } from 'lucide-react';

const AutomationFeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [liveMetrics, setLiveMetrics] = useState({});
  
  const automationSuite = [
    {
      id: 'kyc',
      title: 'KYC Document Intelligence',
      subtitle: 'Revolutionary Identity Verification',
      description: 'AI-powered document processing that understands context, detects fraud, and verifies identities with superhuman accuracy.',
      icon: FileText,
      iconBg: 'from-blue-900 to-blue-900',
      metrics: {
        'Processing Speed': { value: '1.2s', change: '+156%', type: 'time' },
        'Accuracy Rate': { value: '99.94%', change: '+0.12%', type: 'percentage' },
        'Cost Reduction': { value: '87%', change: '+12%', type: 'savings' },
        'Fraud Detection': { value: '99.7%', change: '+2.1%', type: 'security' }
      },
      capabilities: [
        'Multi-language document OCR',
        'Biometric verification matching', 
        'Real-time fraud pattern detection',
        'Automated compliance scoring',
        'Cross-reference validation',
        'Regulatory reporting automation'
      ],
      visualization: {
        type: 'flow',
        steps: ['Document Upload', 'AI Analysis', 'Fraud Check', 'Compliance Validation', 'Approval']
      }
    },
    {
      id: 'risk',
      title: 'Predictive Risk Engine',
      subtitle: 'Advanced Threat Intelligence',
      description: 'Machine learning models that predict financial risks before they materialize, protecting your institution proactively.',
      icon: AlertTriangle,
      iconBg: 'from-blue-900 to-blue-900',
      metrics: {
        'Risk Prediction': { value: '94.2%', change: '+8.7%', type: 'accuracy' },
        'Threat Prevention': { value: '847', change: '+23', type: 'count' },
        'Model Accuracy': { value: '96.8%', change: '+1.4%', type: 'percentage' },
        'Response Time': { value: '47ms', change: '-23ms', type: 'time' }
      },
      capabilities: [
        'Portfolio risk assessment',
        'Market volatility prediction',
        'Credit risk modeling',
        'Operational risk monitoring',
        'Stress testing automation',
        'Regulatory capital optimization'
      ],
      visualization: {
        type: 'network',
        nodes: ['Market Data', 'Portfolio Analysis', 'Risk Models', 'Predictions', 'Alerts']
      }
    },
    {
      id: 'compliance',
      title: 'Intelligent Compliance Hub',
      subtitle: 'Automated Regulatory Management',
      description: 'Comprehensive compliance automation that monitors regulations across jurisdictions and ensures continuous adherence.',
      icon: Shield,
      iconBg: 'from-blue-900 to-blue-900',
      metrics: {
        'Compliance Score': { value: '98.9%', change: '+1.2%', type: 'percentage' },
        'Regulations Tracked': { value: '247', change: '+18', type: 'count' },
        'Reports Generated': { value: '1,456', change: '+34%', type: 'count' },
        'Audit Readiness': { value: '100%', change: '0%', type: 'percentage' }
      },
      capabilities: [
        'Multi-jurisdiction monitoring',
        'Automated report generation',
        'Regulation change detection',
        'Audit trail management',
        'Policy update automation',
        'Penalty risk assessment'
      ],
      visualization: {
        type: 'dashboard',
        widgets: ['Compliance Score', 'Active Regulations', 'Risk Alerts', 'Report Status']
      }
    },
    {
      id: 'fraud',
      title: 'Advanced Fraud Defense',
      subtitle: 'Real-time Threat Detection',
      description: 'AI sentinels that monitor every transaction, learning patterns and stopping sophisticated fraud attempts instantly.',
      icon: Activity,
      iconBg: 'from-blue-900 to-blue-900',
      metrics: {
        'Fraud Detection': { value: '99.91%', change: '+0.23%', type: 'percentage' },
        'False Positives': { value: '0.08%', change: '-0.15%', type: 'percentage' },
        'Response Time': { value: '23ms', change: '-45ms', type: 'time' },
        'Threats Blocked': { value: '12,847', change: '+1,234', type: 'count' }
      },
      capabilities: [
        'Real-time transaction monitoring',
        'Behavioral pattern analysis',
        'Network fraud detection',
        'Account takeover prevention',
        'Synthetic identity detection',
        'Money laundering prevention'
      ],
      visualization: {
        type: 'radar',
        metrics: ['Transaction Volume', 'Risk Score', 'Alert Level', 'Pattern Match', 'Geographic Risk']
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex(prev => (prev + 1) % 4);
      setLiveMetrics(prev => ({
        ...prev,
        [`metric_${Date.now()}`]: Math.random()
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentFeature = automationSuite[selectedFeature];

  return (
    <div className="relative py-24 bg-white">
      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-blue-900 bg-white border border-blue-200 rounded-2xl">
            <Cpu className="w-5 h-5" />
            <span className="font-bold">AI-Powered Financial Automation Suite</span>
          </div>
          
          <h2 className="mb-6 text-6xl font-black">
            <span className="text-black">INTELLIGENT</span>
            <br />
            <span className="text-blue-900">AUTOMATION</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-black">
            Deploy specialized AI systems that revolutionize every aspect of your financial operations with unprecedented intelligence and efficiency.
          </p>
        </div>

        {/* Feature selector */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-4 p-2 bg-white border border-blue-200 shadow-xl rounded-3xl">
            {automationSuite.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(index)}
                  className={`relative flex flex-col items-center gap-3 px-8 py-6 rounded-2xl transition-all duration-300 ${
                    selectedFeature === index 
                      ? 'bg-white shadow-lg scale-105' 
                      : 'hover:bg-white/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center shadow-lg ${
                    selectedFeature === index ? 'scale-110' : ''
                  } transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-sm ${selectedFeature === index ? 'text-black' : 'text-gray-600'}`}>
                      {feature.title.split(' ')[0]}
                    </div>
                    <div className={`text-xs ${selectedFeature === index ? 'text-gray-600' : 'text-gray-400'}`}>
                      {feature.title.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                  {selectedFeature === index && (
                    <div className="absolute w-2 h-2 transform -translate-x-1/2 bg-blue-900 rounded-full -bottom-2 left-1/2"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Feature details */}
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-900 shadow-2xl rounded-3xl">
                <currentFeature.icon className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="mb-2 text-3xl font-bold text-black">{currentFeature.title}</h3>
                <p className="mb-4 text-lg font-semibold text-blue-900">{currentFeature.subtitle}</p>
                <p className="leading-relaxed text-black">{currentFeature.description}</p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-black">Core Capabilities</h4>
              <div className="grid grid-cols-1 gap-3">
                {currentFeature.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-md">
                    <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                    <span className="font-medium text-black">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-3xl">
              <div className="relative p-6 overflow-hidden text-white bg-blue-900">
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{currentFeature.title} Dashboard</h4>
                      <p className="text-white/80">Real-time Analytics & Performance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {Object.entries(currentFeature.metrics).map(([label, data], index) => (
                    <div key={label} className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                      animationIndex === index 
                        ? `border-blue-300 bg-blue-50 shadow-lg scale-105` 
                        : 'border-gray-200 bg-white hover:shadow-md'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-bold tracking-wide text-black uppercase">{label}</h5>
                        <div className="px-2 py-1 text-xs font-bold text-blue-900 bg-blue-100 rounded-full">
                          {data.change}
                        </div>
                      </div>
                      <div className="mb-2 text-3xl font-black text-black">{data.value}</div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 transition-all duration-1000 bg-blue-900 rounded-full"
                          style={{ width: animationIndex === index ? '95%' : '75%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance indicator */}
                <div className="p-6 border border-blue-200 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-900 rounded-2xl">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-black">System Performance</h5>
                      <p className="text-black">All systems operational • 99.9% uptime • Real-time processing</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">98.7%</div>
                      <div className="text-sm text-black">Optimal</div>
                    </div>
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

export default AutomationFeaturesSection;
