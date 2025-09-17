import React from 'react';
import { 
  ArrowRight, 
  PlayCircle, 
  ShoppingCart, 
  TrendingUp, 
  Sparkles
} from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative flex items-center min-h-screen pt-20 overflow-hidden bg-white">
      <div className="grid items-center gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-2">
        {/* Left content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight text-black lg:text-6xl">
              Transform Your <span className="text-blue-900">D2C Business</span> with 
              <br />Intelligent <span className="text-blue-900">AI Chatbots</span>
            </h1>
            <p className="text-xl leading-relaxed text-black">
              Teeny Tech Trek empowers D2C brands with cutting-edge chatbot solutions. Automate customer support, boost sales conversions, and scale your operations with our intelligent chatbots designed specifically for direct-to-consumer businesses.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-black transition-colors bg-white border border-black rounded-lg hover:bg-gray-100">
              <PlayCircle className="w-5 h-5" />
              See Demo
            </button>
          </div>
        </div>
        
        {/* Right content */}
        <div className="relative">
          <div className="p-6 bg-white border border-gray-300 shadow-xl rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-blue-900">TeenyBot Assistant</span>
            </div>
            <div className="space-y-4">
              <div className="max-w-xs p-4 text-white bg-blue-900 rounded-tl-none rounded-xl">
                Hi! I'm your AI chatbot. I can help customers find products, track orders, and even handle returns. What would you like me to help with today?
              </div>
              <div className="text-sm text-black">Choose an action:</div>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-2 text-sm text-blue-900 bg-white border rounded-full border-blue-900/40">
                  Customer Support
                </div>
                <div className="px-3 py-2 text-sm text-blue-900 bg-white border rounded-full border-blue-900/40">
                  Sales Assistant
                </div>
                <div className="px-3 py-2 text-sm text-blue-900 bg-white border rounded-full border-blue-900/40">
                  Order Tracking
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute p-3 bg-blue-900 rounded-full shadow-lg -top-4 -right-4 animate-bounce">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div className="absolute p-3 bg-blue-900 rounded-full shadow-lg -bottom-4 -left-4 animate-pulse">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
