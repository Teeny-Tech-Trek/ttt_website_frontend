// import React, { useState, useEffect } from 'react';
// import { 
//   Phone, 
//   Database, 
//   Users, 
//   BarChart3, 
//   Hotel, 
//   Coffee, 
//   ArrowRight, 
//   Building2,
//   Target,
//   Clock,
//   DollarSign,
//   Eye,
//   Sparkles,
//   Brain,
//   Rocket,
//   Globe,
//   Activity,
//   MessageCircle,
//   Zap,
//   FileText,
//   TrendingUp,
//   Settings,
//   Shield,
//   Calendar,
//   Headphones,
//   Star,
//   Wifi,
//   MapPin,
//   CheckCircle,
//   Home
// } from 'lucide-react';

// // Clean Split-Screen Hero for Hospitality
// const Hero: React.FC = () => {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-white">
//       <div className="px-6 py-20 mx-auto max-w-7xl">
//         <div className="grid items-center gap-16 lg:grid-cols-2">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <h1 className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl">
//               Your AI Voice Receptionist
//               <br />
//               <span className="text-blue-900">for Hospitality</span>
//             </h1>
            
//             <p className="max-w-lg text-xl leading-relaxed text-gray-700">
//               Intelligent voice assistance and seamless data management 
//               that enhances guest experience while streamlining 
//               your operations 24/7.
//             </p>

//             <div className="flex flex-col gap-4 sm:flex-row">
//               <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//                 Start Free Trial
//                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//               </button>
              
//               <button className="flex items-center justify-center px-8 py-4 font-semibold text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:border-blue-900 hover:text-blue-900">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Try Voice Demo
//               </button>
//             </div>
//           </div>

//           {/* Right Visual - Simple Hotel Image */}
//           <div className="relative">
//             <img 
//               src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
//               alt="Luxury hotel lobby and hospitality"
//               className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Vertical Service Showcase
// const CoreServices: React.FC = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="px-6 mx-auto max-w-7xl">
//         <div className="mb-16 text-center">
//           <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
//             Hospitality Solutions
//           </h2>
//           <p className="max-w-3xl mx-auto text-xl text-gray-700">
//             AI-powered tools designed specifically for hotels, restaurants, and hospitality businesses
//           </p>
//         </div>

//         {/* Vertical Layout */}
//         <div className="space-y-20">
//           {/* Voice Receptionist */}
//           <div className="flex flex-col items-center gap-12 lg:flex-row">
//             <div className="lg:w-1/2">
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center justify-center w-16 h-16 mr-4 bg-blue-100 rounded-2xl">
//                   <Phone className="w-8 h-8 text-blue-900" />
//                 </div>
//                 <div>
//                   <h3 className="text-3xl font-bold text-blue-900">AI Voice Receptionist</h3>
//                   <p className="font-medium text-blue-900">24/7 Guest Communication</p>
//                 </div>
//               </div>
              
//               <p className="mb-8 text-lg leading-relaxed text-black">
//                 Human-like voice assistance that handles guest inquiries, bookings, and requests with professional hospitality expertise.
//               </p>

//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className="p-4 text-center rounded-lg bg-blue-50">
//                   <div className="mb-1 text-2xl font-bold text-blue-900">24/7</div>
//                   <div className="text-sm text-gray-600">Available</div>
//                 </div>
//                 <div className="p-4 text-center rounded-lg bg-blue-50">
//                   <div className="mb-1 text-2xl font-bold text-blue-900">50+</div>
//                   <div className="text-sm text-gray-600">Languages</div>
//                 </div>
//               </div>

//               <button className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//                 Try Voice Demo
//                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>

//             <div className="lg:w-1/2">
//               <div className="p-8 bg-blue-50 rounded-2xl">
//                 <div className="p-6 bg-white shadow-lg rounded-xl">
//                   <div className="flex items-center mb-4">
//                     <div className="w-3 h-3 mr-3 bg-blue-900 rounded-full animate-pulse"></div>
//                     <span className="font-semibold text-blue-900">Voice AI Active</span>
//                   </div>
//                   <div className="space-y-3">
//                     <div className="p-3 bg-gray-100 rounded-lg">
//                       <div className="text-sm text-black">"Hello! How can I assist you today?"</div>
//                     </div>
//                     <div className="p-3 ml-8 bg-blue-100 rounded-lg">
//                       <div className="text-sm text-blue-900">"I'd like to book a spa appointment"</div>
//                     </div>
//                     <div className="p-3 bg-gray-100 rounded-lg">
//                       <div className="text-sm text-black">"Perfect! I can help you with that. What service would you prefer?"</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Data Management */}
//           <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
//             <div className="lg:w-1/2">
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center justify-center w-16 h-16 mr-4 bg-blue-100 rounded-2xl">
//                   <Database className="w-8 h-8 text-blue-900" />
//                 </div>
//                 <div>
//                   <h3 className="text-3xl font-bold text-blue-900">Smart Data Management</h3>
//                   <p className="font-medium text-blue-900">Intelligent Operations</p>
//                 </div>
//               </div>
              
//               <p className="mb-8 text-lg leading-relaxed text-black">
//                 Intelligent data organization and insights that help you understand guests better and optimize operations.
//               </p>

//               <div className="mb-8 space-y-4">
//                 <div className="flex items-center p-4 rounded-lg bg-blue-50">
//                   <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
//                   <span className="text-black">Guest preference tracking</span>
//                 </div>
//                 <div className="flex items-center p-4 rounded-lg bg-blue-50">
//                   <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
//                   <span className="text-black">Real-time analytics dashboard</span>
//                 </div>
//                 <div className="flex items-center p-4 rounded-lg bg-blue-50">
//                   <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
//                   <span className="text-black">Automated reporting</span>
//                 </div>
//               </div>

//               <button className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//                 View Dashboard
//                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>

//             <div className="lg:w-1/2">
//               <div className="p-8 bg-blue-50 rounded-2xl">
//                 <div className="p-6 bg-white shadow-lg rounded-xl">
//                   <div className="mb-4 text-center">
//                     <h4 className="mb-2 font-semibold text-blue-900">Guest Analytics</h4>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-black">Occupancy Rate</span>
//                       <span className="font-bold text-blue-900">87%</span>
//                     </div>
//                     <div className="w-full h-2 bg-gray-200 rounded-full">
//                       <div className="h-2 bg-blue-900 rounded-full" style={{width: '87%'}}></div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-black">Guest Satisfaction</span>
//                       <span className="font-bold text-blue-900">4.8/5</span>
//                     </div>
//                     <div className="flex space-x-1">
//                       {[1,2,3,4,5].map(i => (
//                         <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'text-blue-900 fill-current' : 'text-gray-300'}`} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Horizontal Cards Layout
// const HospitalityBenefits: React.FC = () => {
//   const [counters, setCounters] = useState({ satisfaction: 0, response: 0, efficiency: 0 });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setCounters(prev => ({
//           satisfaction: Math.min(prev.satisfaction + 2, 96),
//           response: Math.min(prev.response + 1, 24),
//           efficiency: Math.min(prev.efficiency + 2, 73)
//         }));
//       }, 50);
      
//       setTimeout(() => clearInterval(interval), 2000);
//     }, 500);
    
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className="py-20 bg-white">
//       <div className="px-6 mx-auto max-w-7xl">
//         <div className="mb-16 text-center">
//           <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
//             Transform Your 
//             <span className="text-blue-900"> Guest Experience</span>
//           </h2>
//           <p className="max-w-3xl mx-auto text-xl text-gray-700">
//             See how AI voice assistance and data management improve hospitality operations
//           </p>
//         </div>

//         {/* Horizontal Card Layout */}
//         <div className="grid gap-8 mb-16 md:grid-cols-3">
//           <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
//             <div className="text-center">
//               <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
//                 <Star className="w-10 h-10 text-blue-900" />
//               </div>
//               <div className="mb-2 text-4xl font-black text-blue-900">
//                 {counters.satisfaction}%
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-blue-900">
//                 Guest Satisfaction
//               </h3>
//               <p className="text-black">
//                 Improved guest experience ratings with AI assistance
//               </p>
//             </div>
//           </div>

//           <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
//             <div className="text-center">
//               <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
//                 <Zap className="w-10 h-10 text-blue-900" />
//               </div>
//               <div className="mb-2 text-4xl font-black text-blue-900">
//                 {counters.response}s
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-blue-900">
//                 Response Time
//               </h3>
//               <p className="text-black">
//                 Lightning-fast guest assistance and support
//               </p>
//             </div>
//           </div>

//           <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
//             <div className="text-center">
//               <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
//                 <TrendingUp className="w-10 h-10 text-blue-900" />
//               </div>
//               <div className="mb-2 text-4xl font-black text-blue-900">
//                 {counters.efficiency}%
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-blue-900">
//                 Efficiency Boost
//               </h3>
//               <p className="text-black">
//                 Increase in overall operational productivity
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Single Large Testimonial */}
//         <div className="p-12 text-center text-white bg-blue-900 rounded-3xl">
//           <div className="max-w-4xl mx-auto">
//             <div className="mb-6 text-6xl">💬</div>
//             <blockquote className="mb-8 text-2xl italic font-medium">
//               "Our AI Voice Receptionist handles 80% of guest inquiries automatically. Our staff can now focus on providing exceptional in-person service."
//             </blockquote>
//             <div className="flex items-center justify-center">
//               <div>
//                 <div className="text-xl font-bold">Jennifer Martinez</div>
//                 <div className="text-blue-100">General Manager, Luxury Resort & Spa</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Light Background CTA
// const LightCTA: React.FC = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-4xl px-6 mx-auto text-center">
//         <div>
//           <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
//             Ready to Elevate Your Guest Experience?
//           </h2>
          
//           <p className="mb-12 text-xl leading-relaxed text-gray-700">
//             Join hospitality businesses already using AI voice receptionist and data management to enhance guest satisfaction with Teeny Tech Trek.
//           </p>

//           <button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
//             <Hotel className="w-5 h-5 mr-2" />
//             Transform Your Hospitality Business
//             <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
//           </button>

//           {/* Feature Pills */}
//           <div className="flex flex-wrap justify-center gap-4 mt-8">
//             <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
//               🗣️ AI Voice Receptionist
//             </span>
//             <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
//               📊 Smart Data Management
//             </span>
//             <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
//               🌟 24/7 Guest Support
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Main Index
// const HospitalityIndex: React.FC = () => {
//   return (
//     <div className="min-h-screen">
//       <Hero />
//       <CoreServices />
//       <HospitalityBenefits />
//       <LightCTA />
//     </div>
//   );
// };

// export default HospitalityIndex;

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Database, 
  Users, 
  BarChart3, 
  Hotel, 
  Coffee, 
  ArrowRight, 
  Building2,
  Target,
  Clock,
  DollarSign,
  Eye,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Activity,
  MessageCircle,
  Zap,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  Calendar,
  Headphones,
  Star,
  Wifi,
  MapPin,
  CheckCircle,
  Home
} from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import hospitalityImage from "../../Images/Case Studies/Hospitality.png"

// Clean Split-Screen Hero for Hospitality
const Hero: React.FC = () => {
  const [message, setMessage] = useState("");
  
        const handleClick = () => {
            setMessage("Thank you for your interest! Please proceed by clicking on 'Call with AI' to explore the live demo.");
            setTimeout(() => setMessage(""), 5000); // Auto-hide after 5s
          };
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-black leading-tight text-black md:text-6xl lg:text-7xl">
              Your AI Voice Receptionist
              <br />
              <span className="text-blue-900">for Hospitality</span>
            </h1>
            
            <p className="max-w-lg text-xl leading-relaxed text-gray-700">
              Intelligent voice assistance and seamless data management 
              that enhances guest experience while streamlining 
              your operations 24/7.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              {/* <button className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button> */}
              <HashLink 
                smooth 
                to="/#pricing"
                className="flex items-center justify-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group"
              >
                Start Free Trial
                 <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </HashLink>
              
              {/* <button className="flex items-center justify-center px-8 py-4 font-semibold text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:border-blue-900 hover:text-blue-900">
                <Phone className="w-5 h-5 mr-2" />
                Try Voice Demo
              </button> */}
               <div className="flex flex-col items-center ">
                  {/* Wrap in relative container */}
                  <div className="relative flex flex-col items-center w-full">
                    <motion.button 
                    className="flex items-center justify-center px-8 py-4 text-gray-700 transition-colors border-2 border-gray-300 rounded-lg border-blue-900font-semibold hover:border-blue-900 hover:text-blue-900"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClick}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                Try Voice Demo
                    </motion.button>

                    {/* Absolutely positioned message */}
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute max-w-md px-4 py-2 mt-20 text-sm text-center text-gray-700 bg-gray-200 rounded-lg shadow-md w-max"
                      >
                        {message}
                      </motion.div>
                    )}
                  </div>
                </div>
            </div>
          </div>

          {/* Right Visual - Simple Hotel Image */}
          <div className="relative">
            <img 
              src={hospitalityImage}
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Vertical Service Showcase
const CoreServices: React.FC = () => {
    const [message, setMessage] = useState("");
  
        const handleClick = () => {
            setMessage("Thank you for your interest! Please proceed by clicking on 'Call with AI' to explore the live demo.");
            setTimeout(() => setMessage(""), 5000); // Auto-hide after 5s
          };
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Hospitality Solutions
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700">
            AI-powered tools designed specifically for hotels, restaurants, and hospitality businesses
          </p>
        </div>

        {/* Vertical Layout */}
        <div className="space-y-20">
          {/* Voice Receptionist */}
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 mr-4 bg-blue-100 rounded-2xl">
                  <Phone className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-900">AI Voice Receptionist</h3>
                  <p className="font-medium text-blue-900">24/7 Guest Communication</p>
                </div>
              </div>
              
              <p className="mb-8 text-lg leading-relaxed text-black">
                Human-like voice assistance that handles guest inquiries, bookings, and requests with professional hospitality expertise.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 text-center rounded-lg bg-blue-50">
                  <div className="mb-1 text-2xl font-bold text-blue-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="p-4 text-center rounded-lg bg-blue-50">
                  <div className="mb-1 text-2xl font-bold text-blue-900">50+</div>
                  <div className="text-sm text-gray-600">Languages</div>
                </div>
              </div>

              {/* <button className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
                Try Voice Demo
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button> */}
              <div className="flex flex-col items-center ">
                  {/* Wrap in relative container */}
                  <div className="relative flex flex-col items-center w-full">
                    <motion.button 
                    className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group"
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClick}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                Try Voice Demo
                    </motion.button>

                    {/* Absolutely positioned message */}
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute max-w-md px-4 py-2 mt-20 text-sm text-center text-gray-700 bg-gray-200 rounded-lg shadow-md w-max"
                      >
                        {message}
                      </motion.div>
                    )}
                  </div>
                </div>
            </div>

            <div className="lg:w-1/2">
              <div className="p-8 bg-blue-50 rounded-2xl">
                <div className="p-6 bg-white shadow-lg rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 mr-3 bg-blue-900 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-blue-900">Voice AI Active</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <div className="text-sm text-black">"Hello! How can I assist you today?"</div>
                    </div>
                    <div className="p-3 ml-8 bg-blue-100 rounded-lg">
                      <div className="text-sm text-blue-900">"I'd like to book a spa appointment"</div>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <div className="text-sm text-black">"Perfect! I can help you with that. What service would you prefer?"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 mr-4 bg-blue-100 rounded-2xl">
                  <Database className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-900">Smart Data Management</h3>
                  <p className="font-medium text-blue-900">Intelligent Operations</p>
                </div>
              </div>
              
              <p className="mb-8 text-lg leading-relaxed text-black">
                Intelligent data organization and insights that help you understand guests better and optimize operations.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center p-4 rounded-lg bg-blue-50">
                  <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
                  <span className="text-black">Guest preference tracking</span>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-blue-50">
                  <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
                  <span className="text-black">Real-time analytics dashboard</span>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-blue-50">
                  <CheckCircle className="w-6 h-6 mr-3 text-blue-900" />
                  <span className="text-black">Automated reporting</span>
                </div>
              </div>

              {/* <button className="flex items-center px-8 py-4 font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button> */}
            </div>

            <div className="lg:w-1/2">
              <div className="p-8 bg-blue-50 rounded-2xl">
                <div className="p-6 bg-white shadow-lg rounded-xl">
                  <div className="mb-4 text-center">
                    <h4 className="mb-2 font-semibold text-blue-900">Guest Analytics</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-black">Occupancy Rate</span>
                      <span className="font-bold text-blue-900">87%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-900 rounded-full" style={{width: '87%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black">Guest Satisfaction</span>
                      <span className="font-bold text-blue-900">4.8/5</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'text-blue-900 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Horizontal Cards Layout
const HospitalityBenefits: React.FC = () => {
  const [counters, setCounters] = useState({ satisfaction: 0, response: 0, efficiency: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          satisfaction: Math.min(prev.satisfaction + 2, 96),
          response: Math.min(prev.response + 1, 24),
          efficiency: Math.min(prev.efficiency + 2, 73)
        }));
      }, 50);
      
      setTimeout(() => clearInterval(interval), 2000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Transform Your 
            <span className="text-blue-900"> Guest Experience</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700">
            See how AI voice assistance and data management improve hospitality operations
          </p>
        </div>

        {/* Horizontal Card Layout */}
        <div className="grid gap-8 mb-16 md:grid-cols-3">
          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
                <Star className="w-10 h-10 text-blue-900" />
              </div>
              <div className="mb-2 text-4xl font-black text-blue-900">
                {counters.satisfaction}%
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">
                Guest Satisfaction
              </h3>
              <p className="text-black">
                Improved guest experience ratings with AI assistance
              </p>
            </div>
          </div>

          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
                <Zap className="w-10 h-10 text-blue-900" />
              </div>
              <div className="mb-2 text-4xl font-black text-blue-900">
                {counters.response}s
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">
                Response Time
              </h3>
              <p className="text-black">
                Lightning-fast guest assistance and support
              </p>
            </div>
          </div>

          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full">
                <TrendingUp className="w-10 h-10 text-blue-900" />
              </div>
              <div className="mb-2 text-4xl font-black text-blue-900">
                {counters.efficiency}%
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">
                Efficiency Boost
              </h3>
              <p className="text-black">
                Increase in overall operational productivity
              </p>
            </div>
          </div>
        </div>

        {/* Single Large Testimonial */}
        <div className="p-12 text-center text-white bg-blue-900 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-6xl">💬</div>
            <blockquote className="mb-8 text-2xl italic font-medium">
              "Our AI Voice Receptionist handles 80% of guest inquiries automatically. Our staff can now focus on providing exceptional in-person service."
            </blockquote>
            <div className="flex items-center justify-center">
              <div>
                <div className="text-xl font-bold">Jennifer Martinez</div>
                <div className="text-blue-100">General Manager, Luxury Resort & Spa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Light Background CTA
const LightCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl px-6 mx-auto text-center">
        <div>
          <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Ready to Elevate Your Guest Experience?
          </h2>
          
          <p className="mb-12 text-xl leading-relaxed text-gray-700">
            Join hospitality businesses already using AI voice receptionist and data management to enhance guest satisfaction with Teeny Tech Trek.
          </p>

          {/* <button className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group">
            <Hotel className="w-5 h-5 mr-2" />
            Transform Your Hospitality Business
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button> */}
          <HashLink 
            smooth 
            to="/#pricing"
            className="flex items-center justify-center px-12 py-4 mx-auto text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800 group"
          >
           <Hotel className="w-5 h-5 mr-2" />
            Transform Your Hospitality Business
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </HashLink>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              🗣️ AI Voice Receptionist
            </span>
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              📊 Smart Data Management
            </span>
            <span className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-full">
              🌟 24/7 Guest Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Index
const HospitalityIndex: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CoreServices />
      <HospitalityBenefits />
      <LightCTA />
    </div>
  );
};

export default HospitalityIndex;