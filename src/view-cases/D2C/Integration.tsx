import React from 'react';
import { CheckCircle, ArrowRight, Globe, Zap, Shield, Users } from 'lucide-react';

const IntegrationsSection = () => {
  const integrations = [
    { name: 'Shopify', logo: '🛍️', category: 'E-commerce' },
    { name: 'WooCommerce', logo: '🛒', category: 'E-commerce' },
    { name: 'Klaviyo', logo: '📧', category: 'Marketing' },
    { name: 'Mailchimp', logo: '🐵', category: 'Marketing' },
    { name: 'Zendesk', logo: '🎧', category: 'Support' },
    { name: 'Intercom', logo: '💬', category: 'Support' },
    { name: 'WhatsApp', logo: '📱', category: 'Messaging' },
    { name: 'Slack', logo: '💼', category: 'Communication' },
    { name: 'Facebook', logo: '👤', category: 'Social' },
    { name: 'Instagram', logo: '📸', category: 'Social' },
    { name: 'Google Analytics', logo: '📊', category: 'Analytics' },
    { name: 'Stripe', logo: '💳', category: 'Payments' }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            <span className="text-purple-600">Seamless Integrations</span> with Your Favorite Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect Teeny Tech Trek with the platforms you already use to create a unified AI-powered ecosystem
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Instant Data Sync</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Real-time synchronization with 100+ data sources including CRM, inventory, customer data, and analytics platforms.</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Multi-Channel Experience</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Deploy AI agents across websites, mobile apps, social media, messaging platforms, and voice assistants from one central hub.</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Enterprise Security</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600">Bank-level encryption, GDPR compliance, and secure API connections ensure your customer data remains protected.</p>
              </div>
            </div>
            
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2">
              View All Integrations <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Integration Ecosystem</h3>
                <p className="text-gray-600 text-sm">Connect with 100+ popular platforms</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {integrations.map((integration, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-100">
                    <div className="text-2xl mb-2">{integration.logo}</div>
                    <div className="font-medium text-gray-800 text-sm">{integration.name}</div>
                    <div className="text-xs text-gray-500">{integration.category}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Total Integrations Available</div>
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