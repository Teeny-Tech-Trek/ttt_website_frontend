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
      description: "Teeny Tech Trek helps D2C brands automate support, boost sales, and scale with intelligent chatbots.",
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
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24 2xl:px-16 2xl:py-28">
      <div className="mx-auto max-w-none
                      sm:max-w-7xl
                      2xl:max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24">
          <h1 className="mb-3 text-2xl font-bold text-blue-900 sm:text-3xl sm:mb-4 md:text-4xl lg:text-5xl lg:mb-6 xl:text-6xl xl:mb-8 2xl:text-7xl 2xl:mb-10">
            Use Cases
          </h1>
          <p className="max-w-2xl mx-auto text-base text-black sm:text-lg sm:max-w-3xl md:text-xl lg:text-2xl lg:max-w-4xl xl:text-2xl xl:max-w-5xl 2xl:text-3xl 2xl:max-w-6xl">
            Empowering businesses with intelligent AI solutions across industries
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12 2xl:gap-16">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleCardClick(service.route)}
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:transform hover:-translate-y-2 sm:rounded-2xl lg:hover:-translate-y-3 xl:rounded-3xl 2xl:hover:-translate-y-4"
            >
             {/* Image Section */}
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-300 opacity-80 hover:scale-105"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 xl:top-6 xl:left-6">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-blue-900 rounded-full sm:px-3 sm:text-sm lg:px-4 lg:py-2 xl:text-base xl:px-5 xl:py-2 2xl:text-lg 2xl:px-6 2xl:py-3">
                    {service.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
                
                
                <h3 className="mb-3 text-lg font-bold leading-tight text-blue-900 sm:text-xl sm:mb-4 md:text-xl lg:text-2xl lg:mb-5 xl:text-3xl xl:mb-6 2xl:text-4xl 2xl:mb-8">
                  {service.title}
                </h3>
                
                <p className="mb-3 text-sm leading-relaxed text-black sm:text-base sm:mb-4 lg:text-lg lg:mb-6 xl:text-xl xl:mb-8 2xl:text-2xl 2xl:mb-10">
                  {service.description}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(service.route);
                  }}
                  className="flex items-center text-sm font-semibold text-blue-900 transition-all duration-200 hover:text-blue-700 group sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                >
                  Read more 
                  <svg className="w-3 h-3 ml-1 transition-transform duration-200 transform group-hover:translate-x-1 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" 
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

        {/* Optional: Bottom Banner - Uncommented and made responsive */}
        {/* <div className="p-6 mt-12 text-center bg-blue-900 rounded-xl sm:mt-16 sm:p-8 sm:rounded-2xl lg:mt-20 lg:p-10 xl:mt-24 xl:p-12 xl:rounded-3xl 2xl:mt-28 2xl:p-16">
          <div className="flex flex-col items-center justify-center mb-4 sm:flex-row sm:mb-6 lg:mb-8 2xl:mb-10">
            <div className="p-2 mb-3 bg-white rounded-full sm:mr-3 sm:mb-0 lg:p-3 xl:p-4 2xl:p-5">
              <svg className="w-5 h-5 text-blue-900 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-center text-white sm:text-base sm:text-left lg:text-lg xl:text-xl 2xl:text-2xl">
              LIVE Webinar on how AI transforms business operations—faster growth and better efficiency!
            </span>
          </div>
          <button className="px-6 py-2 text-sm font-semibold text-blue-900 transition-colors duration-200 bg-white rounded-lg hover:bg-gray-50 sm:px-8 sm:py-3 sm:text-base lg:px-10 lg:py-4 lg:text-lg xl:px-12 xl:py-5 xl:text-xl xl:rounded-xl 2xl:px-16 2xl:py-6 2xl:text-2xl 2xl:rounded-2xl">
            Register Now
          </button>
        </div> */}
      </div> 
    </div>
  );
};

export default AIServicesCards;