import React from 'react';
import { CheckCircle, ArrowRight, Globe, Database, Shield, Zap } from 'lucide-react';

const IntegrationsSection = () => {
  const coreIntegrations = [
    { name: 'Temenos', logo: '🏦', category: 'Core Banking' },
    { name: 'FIS', logo: '💳', category: 'Banking Platform' },
    { name: 'Oracle FSS', logo: '⚡', category: 'Financial Software' },
    { name: 'SAP Banking', logo: '🔷', category: 'ERP System' },
    { name: 'Salesforce FSC', logo: '☁️', category: 'CRM Platform' },
    { name: 'Microsoft Dynamics', logo: '🔧', category: 'Business Apps' },
    { name: 'Workday', logo: '👥', category: 'HR & Finance' },
    { name: 'Murex', logo: '📊', category: 'Trading Platform' },
    { name: 'SWIFT', logo: '🌐', category: 'Messaging' },
    { name: 'Reuters Eikon', logo: '📈', category: 'Market Data' },
    { name: 'Bloomberg Terminal', logo: '📺', category: 'Financial Data' },
    { name: "Moody's Analytics", logo: '📋', category: 'Risk Management' }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            <span className="text-blue-900">Enterprise-Grade Integrations</span> for Financial Systems
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Seamlessly connect with your existing financial infrastructure and regulatory systems
          </p>
        </div>
        
        {/* Integration Details */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="p-6 bg-white border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Database className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Core Banking Systems</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="leading-relaxed text-black">
                  Direct integration with major core banking platforms including Temenos, FIS, Oracle FSS, and SAP Banking for real-time data synchronization.
                </p>
              </div>
              
              <div className="p-6 bg-white border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Shield className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Regulatory & Compliance</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="leading-relaxed text-black">
                  Automated compliance reporting to regulatory bodies with built-in templates for FFIEC, OCC, FDIC, and international regulatory frameworks.
                </p>
              </div>
              
              <div className="p-6 bg-white border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Zap className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Real-Time Processing</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="leading-relaxed text-black">
                  High-frequency transaction processing with sub-second latency for fraud detection, risk assessment, and compliance monitoring.
                </p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-8 py-4 font-semibold text-blue-900 transition-all duration-300 border border-blue-900 rounded-lg hover:bg-blue-900 hover:text-white">
              View Integration Guide <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Right Side */}
          <div className="relative">
            <div className="p-8 bg-white border border-blue-200 rounded-2xl">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white border border-blue-200 rounded-full shadow-lg">
                  <Globe className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black">Financial Platform Ecosystem</h3>
                <p className="text-sm text-black">Connect with 100+ financial systems and platforms</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {coreIntegrations.map((integration, index) => (
                  <div key={index} className="p-4 text-center transition-all duration-300 bg-white border border-blue-200 rounded-lg hover:shadow-md hover:border-blue-300">
                    <div className="mb-2 text-2xl">{integration.logo}</div>
                    <div className="text-sm font-medium text-black">{integration.name}</div>
                    <div className="text-xs text-black">{integration.category}</div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-white border border-blue-200 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="mb-1 text-2xl font-bold text-blue-900">100+</div>
                    <div className="text-xs text-black">Integrations</div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-bold text-blue-900">99.9%</div>
                    <div className="text-xs text-black">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-bold text-blue-900">&lt;100ms</div>
                    <div className="text-xs text-black">API Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API & Developer Tools */}
        <div className="p-8 mt-16 bg-white border border-blue-200 rounded-2xl">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-black">Developer-Friendly APIs</h3>
            <p className="text-black">
              RESTful APIs, SDKs, and comprehensive documentation for seamless integration
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white border border-blue-200 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-900">REST</span>
              </div>
              <h4 className="mb-2 font-semibold text-black">RESTful APIs</h4>
              <p className="mb-4 text-sm leading-relaxed text-black">
                Standard HTTP endpoints with JSON responses for easy integration
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">OpenAPI 3.0 specification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">Rate limiting & authentication</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-blue-200 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-900">SDK</span>
              </div>
              <h4 className="mb-2 font-semibold text-black">Multiple SDKs</h4>
              <p className="mb-4 text-sm leading-relaxed text-black">
                Native libraries for popular programming languages
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">Python, Java, .NET, Node.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">Code samples & tutorials</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-blue-200 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-900">24/7</span>
              </div>
              <h4 className="mb-2 font-semibold text-black">Developer Support</h4>
              <p className="mb-4 text-sm leading-relaxed text-black">
                Round-the-clock technical support for integration teams
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">Dedicated technical team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-black">Integration assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
