import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Home,
  Truck,
  Stethoscope,
  Hotel
} from 'lucide-react';

interface CaseStudyProps {
  id?: string;
  className?: string;
}

const caseStudyOptions = [
  {
    id: 'ecommerce',
    route: '/ecommerce',
    icon: MessageCircle,
    title: 'D2C E-commerce',
    description: 'AI Support & WhatsApp Assistant',
    highlight: '68% faster response times'
  },
  {
    id: 'financial',
    route: '/financial-services',
    icon: Zap,
    title: 'Financial Services',
    description: 'Back-Office Smart Automations',
    highlight: '20-25 hours/week saved'
  },
  {
    id: 'realestate',
    route: '/real-estate',
    icon: Home,
    title: 'Real Estate',
    description: 'Agentic AI for Listing Prep',
    highlight: '50-60% faster prep time'
  },
  {
    id: 'logistics',
    route: '/logistics',
    icon: Truck,
    title: 'Manufacturing & Logistics',
    description: 'Driver WhatsApp Bot + ETA Flow',
    highlight: '17% lower dwell time'
  },
  {
    id: 'healthcare',
    route: '/healthcare',
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Pre-Op Intake & Scheduling',
    highlight: '28% fewer no-shows'
  },
  {
    id: 'hospitality',
    route: '/hospitality',
    icon: Hotel,
    title: 'Hospitality',
    description: 'AI Concierge & Itinerary Builder',
    highlight: '19% more direct bookings'
  }
];

const CaseStudies: React.FC<CaseStudyProps> = ({ id = 'case-studies', className = '' }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectionChange = (optionId: string) => {
    if (optionId === '') {
      setSelectedOption('');
      return;
    }

    const selectedCase = caseStudyOptions.find(option => option.id === optionId);
    if (selectedCase) {
      setSelectedOption(optionId);
      // Navigate to the corresponding route
      navigate(selectedCase.route);
    }
  };

  return (
    <section id={id} className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Industry Case Studies
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our AI solutions across different industries and see real results from our implementations
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="max-w-md mx-auto mb-16">
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Select Industry Case Study
          </label>
          <select
            value={selectedOption}
            onChange={(e) => handleSelectionChange(e.target.value)}
            className="block w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
          >
            <option value="">Choose an industry...</option>
            {caseStudyOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.title} - {option.highlight}
              </option>
            ))}
          </select>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectionChange(option.id)}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <option.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{option.title}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{option.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {option.highlight}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-6">
              See how AI can revolutionize your industry with our proven solutions
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;