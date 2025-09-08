import React from 'react';
import { ArrowRight, Star, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const CTASection = () => {
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
      text: 'The AI agents handle 80% of our support tickets automatically. Amazing ROI!',
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
    <div className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-30 translate-x-48 translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Transform Your <span className="text-blue-600">D2C Business</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of D2C brands already using Teeny Tech Trek AI to automate customer service, boost sales, and scale their operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center shadow-lg">
              Start Free 14-Day Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center shadow-sm">
              Watch Demo Video
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
            <div className="text-gray-600">D2C Brands</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">85%</div>
            <div className="text-gray-600">Avg Revenue Increase</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">7 Days</div>
            <div className="text-gray-600">Average Setup Time</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Final CTA Box */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your AI Transformation Today</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              No credit card required. Full access to all features during your 14-day trial.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">No setup fees</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center shadow-lg">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;