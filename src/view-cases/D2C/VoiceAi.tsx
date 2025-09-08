import React, { useState } from 'react';
import { Bot, CheckCircle, TrendingUp, MessageCircle, Users, ShoppingCart, BarChart3, Headphones } from 'lucide-react';

const AIVoiceAgents = () => {
  const [expandedSection, setExpandedSection] = useState('sales-boost');
  
  const sections = {
    'sales-boost': {
      title: 'Boost Sales Conversion',
      description: 'Our AI agents help D2C brands increase conversion rates by providing personalized product recommendations and intelligent sales assistance.',
      icon: TrendingUp,
      color: 'green'
    },
    'customer-support': {
      title: 'Smart Customer Support',
      description: 'Deploy 24/7 AI customer service agents that understand your products and provide instant, accurate support to your customers.',
      icon: Headphones,
      color: 'blue'
    },
    'engagement': {
      title: 'Enhanced Customer Engagement',
      description: 'Create meaningful conversations with customers through AI-powered chatbots that build relationships and drive loyalty.',
      icon: MessageCircle,
      color: 'purple'
    },
    'analytics': {
      title: 'Advanced Analytics & Insights',
      description: 'Get deep insights into customer behavior, sales patterns, and performance metrics to optimize your D2C strategy.',
      icon: BarChart3,
      color: 'orange'
    }
  };
  
  const colorClasses = {
    green: 'bg-green-100 text-green-600 border-green-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200'
  };
  
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Empower Your D2C Brand with <span className="text-blue-600">AI-Powered Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teeny Tech Trek provides specialized AI agents designed to accelerate growth for direct-to-consumer businesses
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {Object.entries(sections).map(([key, section]) => {
              const IconComponent = section.icon;
              return (
                <div 
                  key={key}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md ${
                    expandedSection === key 
                      ? `border-${section.color}-300 ${colorClasses[section.color].replace('text-', 'bg-').replace('100', '50')}` 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${colorClasses[section.color]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                    </div>
                    <CheckCircle className={`w-6 h-6 transition-colors ${
                      expandedSection === key ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  {expandedSection === key && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600">{section.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Easy Integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Custom Training</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Analytics Dashboard</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">TeenyBot</div>
                    <div className="text-sm text-gray-500">AI Sales Assistant</div>
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-gray-600">
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl rounded-bl-sm max-w-xs">
                    I noticed you're interested in our wireless headphones! Based on your browsing history, I recommend our premium model with noise cancellation. It's perfect for your daily commute.
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl max-w-xs ml-auto">
                    What's the battery life?
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl rounded-bl-sm max-w-xs">
                    Great question! The battery lasts 40 hours with ANC off and 30 hours with noise cancellation on. Plus, a 15-minute quick charge gives you 3 hours of playback. Would you like to see customer reviews?
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                      Add to Cart
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                      Compare Models
                    </button>
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

export default AIVoiceAgents;