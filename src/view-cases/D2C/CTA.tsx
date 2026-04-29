import React from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const FinalCTASection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      company: 'Eco Beauty Co.',
      rating: 5,
      text: 'Teeny Tech Trek transformed our customer service. 40% increase in conversions within 3 months!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Rodriguez', 
      company: 'FitGear Direct',
      rating: 5,
      text: 'The chatbots handle 80% of our support tickets automatically. Amazing ROI!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Thompson',
      company: 'Home & Garden Plus',
      rating: 5,
      text: 'Setup was incredibly easy. Our sales team now focuses on high-value customers.',
      avatar: '👩‍🌾'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Ready to Transform Your <span className="text-blue-900">D2C Business</span>?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-black">
            Join thousands of D2C brands already using Teeny Tech Trek chatbots to automate customer service, boost sales, and scale their operations.
          </p>
          
          {/* <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row">
            <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800">
              Start Free 14-Day Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-black transition-colors bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:border-gray-400">
              Watch Demo Video
            </button>
          </div> */}
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 mb-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-blue-900">{testimonial.name}</div>
                  <div className="text-sm text-black">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-blue-900 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-black">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Final CTA Box */}
        <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl md:p-12">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-blue-900">Start Your Chatbot Transformation Today</h3>
            <p className="max-w-2xl mx-auto mb-8 text-black">
              No credit card required. Full access to all chatbot features during your 14-day trial.
            </p>
            
            <div className="grid gap-6 mb-8 md:grid-cols-3">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-900" />
                <span className="text-black">Free 14-day trial</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-900" />
                <span className="text-black">No setup fees</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-900" />
                <span className="text-black">Cancel anytime</span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {/* <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button> */}
              <HashLink 
                smooth 
                to="/#pricing"
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800">
                   Get Started Free <ArrowRight className="w-5 h-5" />
              </HashLink>
              {/* <button className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-black transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                Schedule Demo
              </button> */}
              <HashLink 
                smooth 
                to="/#pricing"
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-black transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                Schedule Demo
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;