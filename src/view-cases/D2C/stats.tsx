import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Star, Clock } from 'lucide-react';

const StatsSection = () => {
  const [counters, setCounters] = useState({ brands: 0, increase: 0, rating: 0, setup: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          brands: Math.min(prev.brands + 25, 500),
          increase: Math.min(prev.increase + 3, 85),
          rating: Math.min(prev.rating + 0.1, 4.9),
          setup: Math.min(prev.setup + 1, 7)
        }));
      }, 50);
      
      setTimeout(() => clearInterval(interval), 2000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-blue-900">
            Why Choose <span className="text-blue-900">Teeny Tech Trek</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Trusted by D2C brands worldwide to deliver exceptional chatbot experiences
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="grid gap-8 mb-16 md:grid-cols-4">
          <div className="p-6 text-center bg-white border border-gray-300 shadow-sm rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.brands}+</div>
            <div className="text-black">D2C Brands</div>
          </div>
          
          <div className="p-6 text-center bg-white border border-gray-300 shadow-sm rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <TrendingUp className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.increase}%</div>
            <div className="text-black">Avg Revenue Increase</div>
          </div>
          
          <div className="p-6 text-center bg-white border border-gray-300 shadow-sm rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Star className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.rating.toFixed(1)}/5</div>
            <div className="text-black">Customer Rating</div>
          </div>
          
          <div className="p-6 text-center bg-white border border-gray-300 shadow-sm rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Clock className="w-8 h-8 text-blue-900" />
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">{counters.setup} Days</div>
            <div className="text-black">Average Setup Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
