import React from 'react';
import { useNavigate } from 'react-router-dom';
import realEstateImg from "../../Images/WhatsApp Image 2025-09-15 at 10.16.38 PM (1).jpeg"
import educationImg from "../../Images/WhatsApp Image 2025-09-15 at 10.16.48 PM (1).jpeg"
import ecommerceImg from "../../Images/WhatsApp Image 2025-09-15 at 10.16.44 PM (1).jpeg"

const AIServicesCards = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 1,
      date: "September 15, 2025",
      title: "Your AI Workforce for Real Estate",
      description: "Intelligent systems capable of analyzing markets, empowering your sales team, and enhancing property outcomes",
      image: realEstateImg,
      category: "AI",
      route: "/real-estate"
    },
    {
      id: 2,
      date: "September 15, 2025", 
      title: "Transform Your D2C Business with Intelligent AI Chatbots",
      description: "Teeny Tech Trek empowers D2C brands with cutting-edge chatbot solutions. Automate customer support, boost sales conversions, and scale your operations with our intelligent chatbots designed specifically for direct-to-consumer businesses.",
      image: ecommerceImg,
      category: "AI",
      route: "/ecommerce"
    },
    {
      id: 3,
      date: "September 15, 2025",
      title: "AI-Powered Education Solutions", 
      description: "Transform educational institutions through intelligent collaboration platforms and comprehensive AI workshops that empower educators and students.",
      image: educationImg,
      category: "AI",
      route: "/education"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900">
            Teeny Tech Trek
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Empowering businesses with intelligent AI solutions across industries
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleCardClick(service.route)}
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full opacity-80"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-blue-900 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-3 text-sm text-gray-600">
                  {service.date}
                </div>
                
                <h3 className="mb-4 text-xl font-bold leading-tight text-blue-900">
                  {service.title}
                </h3>
                
                <p className="mb-4 text-sm leading-relaxed text-black">
                  {service.description}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking read more
                    handleCardClick(service.route);
                  }}
                  className="flex items-center font-semibold text-blue-900 transition-colors duration-200 hover:text-blue-700 group"
                >
                  Read more 
                  <svg className="w-4 h-4 ml-1 transition-transform duration-200 transform group-hover:translate-x-1" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner
        <div className="p-8 mt-16 text-center bg-blue-900 rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 mr-3 bg-white rounded-full">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-medium text-white">
              LIVE Webinar on how AI transforms business operations—faster growth and better efficiency!
            </span>
          </div>
          <button className="px-8 py-3 font-semibold text-blue-900 transition-colors duration-200 bg-white rounded-lg hover:bg-gray-50">
            Register Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AIServicesCards;