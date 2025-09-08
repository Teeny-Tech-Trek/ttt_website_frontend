import React from 'react';
import specialtyPractices from "./images/medic-team-discussing-germs-clinic.jpg";

const AIAgentsSection = () => {
  const practices = [
    {
      title: "Urgent Care Providers",
      description: "Expand patient relationships with targeted programs",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Surgery Centers", 
      description: "Enhance patient care while optimizing the procedure calendar",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Hospitals & Specialty Practices",
      description: "Support value-based care with personalized patient engagement", 
      image: specialtyPractices
    },
    {
      title: "IV Infusion Centers",
      description: "Drive consistency and patient follow-through with treatment plans",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            AI Agents for Your Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our digital workers are designed specifically for your practice, with comprehensive 
            programs tailored to meet your unique patient needs
          </p>
        </div>

        {/* Practice cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {practices.map((practice, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={practice.image} 
                  alt={practice.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    // Fallback to a placeholder
                    e.target.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {practice.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {practice.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAgentsSection;