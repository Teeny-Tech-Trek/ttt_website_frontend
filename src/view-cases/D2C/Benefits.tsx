import React from 'react';
import { CheckCircle, ArrowRight, Database, Cog, Clock, DollarSign, FileText, Camera, Mic, Globe, Mail, MessageCircle, Phone, BarChart3 } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Maximize <span className="text-blue-600">ROI</span> with Smart <span className="text-purple-600">Automation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reduce operational costs while improving customer experience and driving revenue growth
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Smart Knowledge Base</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Import all your product catalogs, FAQs, support documents, and brand guidelines. Our AI learns your business inside-out.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Cog className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Seamless Platform Integration</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Connect with Shopify, WooCommerce, Klaviyo, and 100+ other platforms your D2C business already uses.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Rapid Deployment</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Launch your AI agents in days, not months. Pre-trained models specifically designed for D2C businesses.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Cost Optimization</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Reduce customer service costs by up to 70% while improving response times and customer satisfaction.</p>
              </div>
            </div>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">AI Knowledge Integration Hub</h3>
                <p className="text-gray-600 text-sm">Connect all your business data sources</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: FileText, label: 'Docs', color: 'bg-blue-500' },
                    { icon: Camera, label: 'Media', color: 'bg-green-500' },
                    { icon: Mic, label: 'Audio', color: 'bg-purple-500' },
                    { icon: Globe, label: 'Web', color: 'bg-orange-500' },
                    { icon: Mail, label: 'Email', color: 'bg-red-500' },
                    { icon: MessageCircle, label: 'Chat', color: 'bg-yellow-500' },
                    { icon: Phone, label: 'Calls', color: 'bg-pink-500' },
                    { icon: BarChart3, label: 'Analytics', color: 'bg-cyan-500' }
                  ].map((item, index) => (
                    <div key={index} className={`${item.color} p-3 rounded-lg flex flex-col items-center text-center text-white`}>
                      <item.icon className="w-5 h-5 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-700 mb-3 font-medium">Popular D2C Integrations</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Shopify</span>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">WooCommerce</span>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">Klaviyo</span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">Mailchimp</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">Facebook Ads</span>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">Google Analytics</span>
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs">Zendesk</span>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs">Stripe</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Auto-Scaling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Multi-Channel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Personalized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Real-time</span>
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

export default BenefitsSection;