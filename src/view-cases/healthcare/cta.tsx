import React from 'react';
import { ArrowRight } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">
          Ready to Transform Patient Care?
        </h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Join the companies already using AI agents to engage patients and scale their 
          practice with Thinknetic.
        </p>
        
        <button className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-3 shadow-lg">
          Hire Your First AI Agent
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FinalCTASection;