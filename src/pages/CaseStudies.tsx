import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Zap, 
  Home,
  Truck,
  Stethoscope,
  Hotel,
  BookOpen,
  Globe ,
} from 'lucide-react';

interface CaseStudyProps {
  id?: string;
  className?: string;
}

const caseStudyOptions = [
   
  {
    id: 'aeo-geo',
    route: '/aeo-geo',
    icon: Globe,
    title: 'AEO/GEO',
    description: 'AI-powered global trade compliance ',
    highlight: '40% faster clearance ',
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
    id: 'healthcare',
    route: '/healthcare',
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Pre-Op Intake & Scheduling',
    highlight: '28% fewer no-shows'
  },
  {
    id: 'ecommerce',
    route: '/ecommerce',
    icon: MessageCircle,
    title: 'D2C E-commerce',
    description: 'AI Support & WhatsApp Assistant',
    highlight: '68% faster response times'
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
    id: 'hospitality',
    route: '/hospitality',
    icon: Hotel,
    title: 'Hospitality',
    description: 'AI Concierge & Itinerary Builder',
    highlight: '19% more direct bookings'
  },
  {
    id: 'education',
    route: '/education',
    icon: BookOpen, // <-- choose a suitable icon from lucide-react
    title: 'Education',
    description: 'Institutional Collaboration & Workshops',
    highlight: 'Better learning outcomes'
  },
   {
    id: 'financial',
    route: '/financial-services',
    icon: Zap,
    title: 'Financial Services',
    description: 'Back-Office Smart Automations',
    highlight: '20-25 hours/week saved'
  },
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
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Industry Case Studies
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-600">
            Explore our AI solutions across different industries and see real results from our implementations
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="max-w-md mx-auto mb-16">
          <label className="block mb-3 text-sm font-medium text-center text-gray-700">
            Select Industry Case Study
          </label>
          <select
            value={selectedOption}
            onChange={(e) => handleSelectionChange(e.target.value)}
            className="block w-full p-4 text-gray-900 bg-white border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectionChange(option.id)}
              className="p-8 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-2xl hover:shadow-lg hover:scale-105 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 transition-colors bg-blue-100 rounded-xl group-hover:bg-blue-200">
                  <option.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                </div>
              </div>
              
              <p className="mb-4 text-gray-600">{option.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-sm font-medium text-blue-600 rounded-full bg-blue-50">
                  {option.highlight}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 transition-all group-hover:text-blue-600 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl p-8 mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Ready to Transform Your Business?
            </h3>
            <p className="mb-6 text-gray-600">
              See how AI can revolutionize your industry with our proven solutions
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:scale-105"
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