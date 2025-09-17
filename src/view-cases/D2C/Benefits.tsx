import React from 'react';
import { 
  CheckCircle,
  Database,
  Cog,
  Clock,
  FileText,
  Camera,
  Mic,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  BarChart3
} from 'lucide-react';

const BenefitsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            Maximize <span className="text-blue-900">ROI</span> with Smart <span className="text-blue-900">Automation</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Reduce operational costs while improving customer experience and driving revenue growth
          </p>
        </div>
        
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Database className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">Smart Knowledge Base</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="text-black">Import all your product catalogs, FAQs, support documents, and brand guidelines. Our chatbot learns your business inside-out.</p>
              </div>
              
              <div className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Cog className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">Seamless Platform Integration</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="text-black">Connect with Shopify, WooCommerce, Klaviyo, and 100+ other platforms your D2C business already uses.</p>
              </div>
              
              <div className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">Rapid Deployment</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-900" />
                </div>
                <p className="text-black">Launch your chatbots in days, not months. Pre-trained models specifically designed for D2C businesses.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-blue-900">Chatbot Integration Hub</h3>
                <p className="text-sm text-black">Connect all your business data sources</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: FileText, label: 'Docs' },
                    { icon: Camera, label: 'Media' },
                    { icon: Mic, label: 'Audio' },
                    { icon: Globe, label: 'Web' },
                    { icon: Mail, label: 'Email' },
                    { icon: MessageCircle, label: 'Chat' },
                    { icon: Phone, label: 'Calls' },
                    { icon: BarChart3, label: 'Analytics' }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-3 text-center text-white bg-blue-900 rounded-lg">
                      <item.icon className="w-5 h-5 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="mb-3 text-sm font-medium text-blue-900">Popular D2C Integrations</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">Shopify</span>
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">WooCommerce</span>
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">Klaviyo</span>
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">Mailchimp</span>
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">Facebook Ads</span>
                    <span className="px-3 py-1 text-xs text-white bg-blue-900 rounded-full">Google Analytics</span>
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