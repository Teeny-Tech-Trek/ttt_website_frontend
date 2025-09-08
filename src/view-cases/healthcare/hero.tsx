import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import robotImage from "./images/robot-performing-surgery-patient.jpg"

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side content */}
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Your AI Workforce
              <span className="block text-blue-600">for Healthcare</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Digital workers capable of engaging patients, empowering your human 
              workforce, and enhancing health outcomes
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                Talk with an AI Agent
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Right side visualization */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              {/* Chat bubble */}
              <div className="absolute -top-4 left-8 bg-blue-600 text-white px-6 py-3 rounded-2xl rounded-bl-none shadow-lg">
                <p className="text-sm font-medium">How are you feeling since your last visit?</p>
              </div>
              
              {/* Dashboard mockup */}
              <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                
                {/* Chart area with image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden">
                  {/* Image that fills the chart area */}
                  <img 
                    src={robotImage} 
                    alt="Robot performing surgery on patient" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Floating metrics */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                    <div className="text-2xl font-bold text-green-600">-65%</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                </div>
                
                {/* Bottom metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-blue-50 rounded-lg flex flex-col justify-center items-center">
                    <div className="text-lg font-bold text-blue-600">1,247</div>
                    <div className="text-xs text-gray-500">Patients</div>
                  </div>
                  <div className="h-16 bg-green-50 rounded-lg flex flex-col justify-center items-center">
                    <div className="text-lg font-bold text-green-600">24/7</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                  <div className="h-16 bg-purple-50 rounded-lg flex flex-col justify-center items-center">
                    <div className="text-lg font-bold text-purple-600">5.2s</div>
                    <div className="text-xs text-gray-500">Avg Response</div>
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

export default HeroSection;