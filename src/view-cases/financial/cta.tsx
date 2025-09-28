import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, TrendingUp, Clock, Shield, Award, CheckCircle } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
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
    <div className="relative py-20 overflow-hidden bg-white">
      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold text-black">
            Ready to Transform Your <span className="text-blue-900">Financial Operations</span>?
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-black">
            Join leading financial institutions already using Teeny Tech Trek AI to automate operations, ensure compliance, and drive unprecedented growth.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 text-center bg-white border shadow-lg border-blue-900/20 rounded-2xl"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-2xl">
                  <IconComponent className="w-8 h-8 text-blue-900" />
                </div>
                <div className="mb-2 text-3xl font-bold text-black">{stat.value}</div>
                <div className="text-black">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white border shadow-lg border-blue-900/20 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <div className="text-sm text-black">{testimonial.title}</div>
                  <div className="text-xs text-black">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-blue-900 fill-blue-900 stroke-blue-900" 
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-black">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-12 text-center bg-white border shadow-xl border-blue-900/20 rounded-3xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="mb-6 text-3xl font-bold text-black">Start Your AI Transformation Today</h3>
            <p className="mb-8 text-xl leading-relaxed text-black">
              Schedule a personalized assessment and discover how our AI can revolutionize your financial operations in just 6 weeks.
            </p>
            
            <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
              {/* <button 
                aria-label="Schedule Free Assessment"
                className="flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-900 shadow-lg hover:bg-blue-800 rounded-xl hover:shadow-xl"
              >
                Schedule Free Assessment
                <ArrowRight className="w-6 h-6" />
              </button> */}
              <HashLink 
              smooth 
              to="/#pricing"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800 hover:bg-blue-900 hover:text-white"
            >
             Schedule Free Assessment
                <ArrowRight className="w-6 h-6" />
            </HashLink>
              {/* <button 
                aria-label="Download White Paper"
                className="px-10 py-5 text-lg font-bold text-black transition-all duration-300 border-2 border-blue-900 bg-blue-50 hover:border-blue-800 hover:bg-blue-100 rounded-xl"
              >
                Download White Paper
              </button> */}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-black">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-900" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-900" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-900" />
                <span>Success Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-900" />
                <span>6-Week Deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Trusted by logos */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-70">
          <img src="/logos/bank1.png" alt="Bank 1" className="h-8" />
          <img src="/logos/bank2.png" alt="Bank 2" className="h-8" />
          <img src="/logos/bank3.png" alt="Bank 3" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default CTASection;
