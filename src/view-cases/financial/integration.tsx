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
    <div className="py-8 bg-white sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-4 text-2xl font-bold leading-tight text-black sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="text-blue-900">Enterprise-Grade Integrations</span>
            <span className="block sm:inline"> for Financial Systems</span>
          </h2>
          <p className="max-w-xs px-2 mx-auto text-sm leading-relaxed text-black sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Seamlessly connect with your existing financial infrastructure and regulatory systems
          </p>
        </div>
        
        {/* Main Integration Details */}
        <div className="grid gap-8 mb-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-2 lg:items-start sm:mb-12 md:mb-16">
          
          {/* Left Column - Feature Cards */}
          <div className="order-2 space-y-4 lg:order-1 sm:space-y-6 md:space-y-8">
            
            {/* Core Banking Systems Card */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 xl:p-8 sm:rounded-xl hover:shadow-lg hover:border-blue-300">
              <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center sm:justify-between sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-blue-100 rounded-lg shadow-sm sm:p-3">
                    <Database className="w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-black sm:text-xl md:text-2xl">Core Banking Systems</h3>
                </div>
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
              </div>
              <p className="text-sm leading-relaxed text-black sm:text-base md:text-lg">
                Direct integration with major core banking platforms including Temenos, FIS, Oracle FSS, and SAP Banking for real-time data synchronization.
              </p>
            </div>
            
            {/* Regulatory & Compliance Card */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 xl:p-8 sm:rounded-xl hover:shadow-lg hover:border-blue-300">
              <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center sm:justify-between sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-blue-100 rounded-lg shadow-sm sm:p-3">
                    <Shield className="w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-black sm:text-xl md:text-2xl">Regulatory & Compliance</h3>
                </div>
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
              </div>
              <p className="text-sm leading-relaxed text-black sm:text-base md:text-lg">
                Automated compliance reporting to regulatory bodies with built-in templates for FFIEC, OCC, FDIC, and international regulatory frameworks.
              </p>
            </div>
            
            {/* Real-Time Processing Card */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 xl:p-8 sm:rounded-xl hover:shadow-lg hover:border-blue-300">
              <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center sm:justify-between sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-blue-100 rounded-lg shadow-sm sm:p-3">
                    <Zap className="w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-black sm:text-xl md:text-2xl">Real-Time Processing</h3>
                </div>
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-900 sm:w-6 md:w-7 sm:h-6 md:h-7" />
              </div>
              <p className="text-sm leading-relaxed text-black sm:text-base md:text-lg">
                High-frequency transaction processing with sub-second latency for fraud detection, risk assessment, and compliance monitoring.
              </p>
            </div>
          </div>
          
          {/* Right Column - Ecosystem Display */}
          <div className="relative order-1 lg:order-2">
            <div className="p-4 bg-white border border-blue-200 shadow-lg sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl">
              
              {/* Header */}
              <div className="mb-6 text-center sm:mb-8">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white border border-blue-200 rounded-full shadow-lg sm:w-14 md:w-16 lg:w-18 xl:w-20 sm:h-14 md:h-16 lg:h-18 xl:h-20 sm:mb-4">
                  <Globe className="w-6 h-6 text-blue-900 sm:w-7 md:w-8 lg:w-9 xl:w-10 sm:h-7 md:h-8 lg:h-9 xl:h-10" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black sm:text-xl md:text-2xl lg:text-3xl">
                  Financial Platform Ecosystem
                </h3>
                <p className="text-xs text-black sm:text-sm md:text-base">
                  Connect with 100+ financial systems and platforms
                </p>
              </div>
              
              {/* Integration Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-4 sm:mb-6">
                {coreIntegrations.map((integration, index) => (
                  <div 
                    key={index} 
                    className="p-2 text-center transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-3 md:p-4 hover:shadow-md hover:border-blue-300 hover:scale-105"
                  >
                    <div className="mb-1 text-lg sm:mb-2 sm:text-xl md:text-2xl">{integration.logo}</div>
                    <div className="mb-1 text-xs font-medium leading-tight text-black sm:text-sm md:text-base">
                      {integration.name}
                    </div>
                    <div className="text-xs leading-tight text-black opacity-75">
                      {integration.category}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="p-3 bg-white border border-blue-200 rounded-lg sm:p-4 md:p-5">
                <div className="grid grid-cols-3 gap-2 text-center sm:gap-4">
                  <div>
                    <div className="mb-1 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-4xl">100+</div>
                    <div className="text-xs text-black sm:text-sm md:text-base">Integrations</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-4xl">99.9%</div>
                    <div className="text-xs text-black sm:text-sm md:text-base">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xl font-bold text-blue-900 sm:text-2xl md:text-3xl lg:text-4xl">&lt;100ms</div>
                    <div className="text-xs text-black sm:text-sm md:text-base">API Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API & Developer Tools Section */}
        <div className="p-4 bg-white border border-blue-200 shadow-lg sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl">
          
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8 md:mb-10">
            <h3 className="mb-3 text-xl font-bold text-black sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Developer-Friendly APIs
            </h3>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed text-black sm:text-base md:text-lg lg:text-xl">
              RESTful APIs, SDKs, and comprehensive documentation for seamless integration
            </p>
          </div>

          {/* API Cards Grid */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* RESTful APIs */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 sm:rounded-xl hover:shadow-lg hover:border-blue-300">
              <div className="flex items-center justify-center w-10 h-10 mb-3 bg-white border border-blue-200 rounded-lg shadow-sm sm:w-12 md:w-14 sm:h-12 md:h-14 sm:mb-4">
                <span className="text-sm font-bold text-blue-900 sm:text-base md:text-lg">REST</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-black sm:mb-3 sm:text-xl md:text-2xl">RESTful APIs</h4>
              <p className="mb-3 text-sm leading-relaxed text-black sm:mb-4 md:mb-5 sm:text-base md:text-lg">
                Standard HTTP endpoints with JSON responses for easy integration
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    OpenAPI 3.0 specification
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    Rate limiting & authentication
                  </span>
                </div>
              </div>
            </div>

            {/* Multiple SDKs */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 sm:rounded-xl hover:shadow-lg hover:border-blue-300">
              <div className="flex items-center justify-center w-10 h-10 mb-3 bg-white border border-blue-200 rounded-lg shadow-sm sm:w-12 md:w-14 sm:h-12 md:h-14 sm:mb-4">
                <span className="text-sm font-bold text-blue-900 sm:text-base md:text-lg">SDK</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-black sm:mb-3 sm:text-xl md:text-2xl">Multiple SDKs</h4>
              <p className="mb-3 text-sm leading-relaxed text-black sm:mb-4 md:mb-5 sm:text-base md:text-lg">
                Native libraries for popular programming languages
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    Python, Java, .NET, Node.js
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    Code samples & tutorials
                  </span>
                </div>
              </div>
            </div>

            {/* Developer Support */}
            <div className="p-4 transition-all duration-300 bg-white border border-blue-200 rounded-lg sm:p-5 md:p-6 lg:p-7 sm:rounded-xl hover:shadow-lg hover:border-blue-300 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center w-10 h-10 mb-3 bg-white border border-blue-200 rounded-lg shadow-sm sm:w-12 md:w-14 sm:h-12 md:h-14 sm:mb-4">
                <span className="text-sm font-bold text-blue-900 sm:text-base md:text-lg">24/7</span>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-black sm:mb-3 sm:text-xl md:text-2xl">Developer Support</h4>
              <p className="mb-3 text-sm leading-relaxed text-black sm:mb-4 md:mb-5 sm:text-base md:text-lg">
                Round-the-clock technical support for integration teams
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    Dedicated technical team
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed text-black sm:text-sm md:text-base">
                    Integration assistance
                  </span>
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