import React from 'react';
import { Shield, Clock, Globe, Award, Users, TrendingUp, Zap, Target } from 'lucide-react';

const TrustedSection = () => {
  const stats = [
    { 
      label: 'Efficiency Boost', 
      value: '75%', 
      description: 'Average increase in operational efficiency for D2C brands using our AI agents.', 
      color: 'red',
      icon: Zap
    },
    { 
      label: 'Customer Satisfaction', 
      value: '4.9/5', 
      description: 'Average customer satisfaction rating across all our D2C implementations.', 
      color: 'purple',
      icon: Users
    },
    { 
      label: 'Revenue Growth', 
      value: '45%', 
      description: 'Average revenue increase within 6 months of deploying our AI solutions.', 
      color: 'yellow',
      icon: TrendingUp
    },
    { 
      label: 'Response Time', 
      value: '<5sec', 
      description: 'Lightning-fast AI responses ensuring customers never wait for support.', 
      color: 'blue',
      icon: Clock
    }
  ];
  
  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600', 
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600'
  };
  
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-purple-600">Teeny Tech Trek</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by D2C brands worldwide to deliver exceptional AI-powered experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 ${colorClasses[stat.color]} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Quick Setup, Maximum Impact
              </h3>
              <p className="text-lg mb-6 text-blue-100">
                No complex training required. Our AI agents are ready to deploy and can be customized for your brand voice in minutes, not months.
              </p>
              <div className="flex items-center gap-4 text-yellow-300">
                <Award className="w-6 h-6" />
                <span className="font-semibold">Go live in just 7 days</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="font-bold text-xl">7 Days</div>
                <div className="text-sm text-blue-100">Deployment Time</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-300" />
                <div className="font-bold text-xl">99.9%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                <div className="font-bold text-xl">50+</div>
                <div className="text-sm text-blue-100">Languages</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-purple-300" />
                <div className="font-bold text-xl">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-400/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default TrustedSection;