import React from 'react';
import { Bot, ArrowRight, PlayCircle, ShoppingCart, TrendingUp, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-40 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-40 translate-x-48 translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
              Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">D2C Business</span> with 
              <br />Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">AI Agents</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Teeny Tech Trek empowers D2C brands with cutting-edge AI solutions. Automate customer support, boost sales conversions, and scale your operations with our intelligent AI agents designed specifically for direct-to-consumer businesses.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center shadow-lg">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center bg-white">
              <PlayCircle className="w-5 h-5" />
              See Demo
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">TeenyBot Assistant</span>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl rounded-tl-none max-w-xs">
                Hi! I'm your AI sales assistant. I can help customers find products, track orders, and even handle returns. What would you like me to help with today?
              </div>
              <div className="text-gray-500 text-sm">Choose an action:</div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm border border-blue-200">Customer Support</div>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm border border-green-200">Sales Assistant</div>
                <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm border border-purple-200">Order Tracking</div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-orange-400 p-3 rounded-full animate-bounce shadow-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-green-400 p-3 rounded-full animate-pulse shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* Announcement Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">NEW</span>
            </div>
            <span className="text-sm">Launch your AI-powered D2C store in just 7 days with our rapid deployment program!</span>
          </div>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Learn More
          </button>
          <button className="text-white hover:text-gray-200 text-xl font-bold ml-4">
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;