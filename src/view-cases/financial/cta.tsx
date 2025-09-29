import React from 'react';
import { ArrowRight, Star, Users, TrendingUp, Clock, Shield, Award, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const testimonials = [
    {
      name: 'Robert Chen',
      company: 'First National Bank',
      title: 'Chief Risk Officer',
      rating: 5,
      text: 'Teeny Tech Trek reduced our KYC processing time from 3 days to 90 seconds. The compliance accuracy is phenomenal.',
      avatar: '👨‍💼'
    },
    {
      name: 'Maria Rodriguez', 
      company: 'Global Credit Union',
      title: 'Head of Operations',
      rating: 5,
      text: 'We cut operational costs by 75% while improving customer satisfaction. The ROI was evident within 2 months.',
      avatar: '👩‍💼'
    },
    {
      name: 'David Thompson',
      company: 'Regional Investment Bank',
      title: 'Technology Director',
      rating: 5,
      text: 'Implementation was seamless. Their team understood our regulatory requirements perfectly.',
      avatar: '👨‍💻'
    }
  ];

  const stats = [
    { label: 'Financial Institutions', value: '500+', icon: Users },
    { label: 'Cost Savings Generated', value: '$2.4B', icon: TrendingUp },
    { label: 'Average ROI', value: '340%', icon: Award },
    { label: 'Implementation Time', value: '6 weeks', icon: Clock }
  ];

  return (
    <div className="relative py-12 overflow-hidden bg-white sm:py-16 lg:py-20">
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="px-4 mb-4 text-3xl font-bold leading-tight text-black sm:mb-6 sm:text-4xl lg:text-5xl">
            Ready to Transform Your <span className="text-blue-900">Financial Operations</span>?
          </h2>
          <p className="max-w-4xl px-4 mx-auto text-base leading-relaxed text-black sm:text-lg lg:text-xl">
            Join leading financial institutions already using Teeny Tech Trek AI to automate operations, ensure compliance, and drive unprecedented growth.
          </p>
        </div>

        {/* Stats Section - Responsive Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12 sm:gap-6 lg:gap-8 sm:mb-16 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="p-4 text-center transition-transform bg-white border shadow-lg sm:p-6 border-blue-900/20 rounded-xl sm:rounded-2xl hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 sm:w-16 sm:h-16 sm:mb-4 bg-blue-50 rounded-xl sm:rounded-2xl">
                  <IconComponent className="w-6 h-6 text-blue-900 sm:w-8 sm:h-8" />
                </div>
                <div className="mb-1 text-2xl font-bold text-black sm:mb-2 sm:text-3xl">{stat.value}</div>
                <div className="text-xs text-black sm:text-sm lg:text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials - Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:gap-8 sm:mb-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-5 transition-transform bg-white border shadow-lg sm:p-6 border-blue-900/20 rounded-xl sm:rounded-2xl hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 text-xl sm:text-2xl">{testimonial.avatar}</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-black truncate sm:text-base">{testimonial.name}</div>
                  <div className="text-xs text-black truncate sm:text-sm">{testimonial.title}</div>
                  <div className="text-xs text-black truncate">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-3 h-3 text-blue-900 sm:w-4 sm:h-4 fill-blue-900 stroke-blue-900" 
                  />
                ))}
              </div>
              <p className="text-xs leading-relaxed text-black sm:text-sm">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Call to Action - Responsive Card */}
        <div className="p-6 text-center bg-white border shadow-xl sm:p-8 lg:p-12 border-blue-900/20 rounded-2xl sm:rounded-3xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="mb-4 text-2xl font-bold text-black sm:mb-6 sm:text-3xl">Start Your AI Transformation Today</h3>
            <p className="mb-6 text-base leading-relaxed text-black sm:mb-8 sm:text-lg lg:text-xl">
              Schedule a personalized assessment and discover how our AI can revolutionize your financial operations in just 6 weeks.
            </p>
            
            {/* CTA Button - Responsive */}
            <div className="flex flex-col justify-center gap-4 mb-6 sm:mb-8">
              <a 
                href="#pricing"
                className="flex items-center justify-center w-full gap-2 px-6 py-4 text-base font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg sm:gap-3 sm:px-8 lg:px-10 sm:py-5 sm:text-lg rounded-xl hover:bg-blue-50 hover:border-blue-800 hover:bg-blue-900 hover:text-white sm:w-auto sm:mx-auto"
              >
                Schedule Free Assessment
                <ArrowRight className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* Trust indicators - Responsive Layout */}
            <div className="flex flex-col flex-wrap justify-center gap-4 text-xs text-black sm:flex-row sm:gap-6 lg:gap-8 sm:text-sm">
              <div className="flex items-center justify-center gap-2">
                <Shield className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
                <span>Success Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="flex-shrink-0 w-4 h-4 text-blue-900 sm:w-5 sm:h-5" />
                <span>6-Week Deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Trusted by logos - Hidden on very small screens */}
        <div className="flex-wrap justify-center hidden gap-6 mt-8 sm:flex sm:gap-8 sm:mt-12 opacity-70">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;