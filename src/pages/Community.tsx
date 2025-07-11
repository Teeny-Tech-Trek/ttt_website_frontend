// src/pages/Community.tsx
import React, { useEffect, useRef, useState } from 'react';
import { 
  Users, MessageCircle, Globe, Share2, 
  Award, BookOpen, Zap, GitBranch, Mail,
  Twitter, Linkedin, Github, Code, BrainCircuit, 
  Rocket, Palette, Server, Database, Check, ArrowRight
} from 'lucide-react';

const Community = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Updated team members data
  const teamMembers = [
  
    { 
      name: "Anisha Singla", 
      role: "Business & AI Consultancy", 
      bio: "Drives business growth through AI solutions and strategic consulting. Specializes in aligning technology with business goals.",
      color: "from-indigo-500 to-indigo-600",
      skills: ["Business Strategy", "AI Consulting", "Client Solutions","Marketing"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    { 
      name: "Shaivik Semwal", 
      role: "Blockchain & Web3 Specialist", 
      bio: "Develops decentralized applications and smart contracts. Proficient in Golang and blockchain technologies.",
      color: "from-blue-400 to-indigo-500",
      skills: ["Blockchain", "Web3", "Golang", "Smart Contracts"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    { 
      name: "Ekshika Sharma", 
      role: "Design & Architecture Expert", 
      bio: "Creates intuitive user experiences and robust system architectures. Focused on scalable and maintainable design patterns.",
      color: "from-pink-500 to-pink-600",
      skills: ["System Design", "UX/UI", "Software Architecture", "Design Patterns"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    },  { 
      name: "Pawan Sharma", 
      role: "Backend & DevOps Engineer", 
      bio: "Expert in full-stack development with MERN and .NET. Implements robust DevOps practices for scalable applications.",
      color: "from-blue-500 to-blue-600",
      skills: ["MERN Stack", ".NET", "DevOps","OPEN AI","Scalable Web Applications", "Cloud Infrastructure"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    }
  ];

  // Community benefits
  const communityBenefits = [
    {
      icon: Code,
      title: "Code Collaboration",
      description: "Join forces on open-source AI projects and libraries"
    },
    {
      icon: BrainCircuit,
      title: "Knowledge Sharing",
      description: "Access exclusive workshops and learning resources"
    },
    {
      icon: Rocket,
      title: "Project Incubation",
      description: "Get support for your AI ideas from concept to deployment"
    },
    {
      icon: Palette,
      title: "Design Integration",
      description: "Learn how to blend AI capabilities with beautiful UX"
    },
    {
      icon: Server,
      title: "Infrastructure Tips",
      description: "Optimize your AI deployment pipelines"
    },
    {
      icon: Database,
      title: "Data Strategies",
      description: "Master data collection and preprocessing techniques"
    }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: (touch.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animateElements = () => {
      const nodes = document.querySelectorAll('.community-node');
      const shapes = document.querySelectorAll('.bg-shape');
      const cards = document.querySelectorAll('.floating-card');
      
      nodes.forEach((node, index) => {
        const element = node as HTMLElement;
        const intensity = (index % 3 + 1) * (isMobile ? 0.3 : 0.5);
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 4 : 8);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 4 : 8);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const intensity = (index + 1) * 0.3;
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 3 : 6);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 3 : 6);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${index * 25}px)`;
      });

      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const intensity = 0.5;
        const offsetX = mouseRef.current.x * intensity * (isMobile ? 2 : 4);
        const offsetY = mouseRef.current.y * intensity * (isMobile ? 2 : 4);
        
        element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotateY(${mouseRef.current.x * 5}deg) rotateX(${mouseRef.current.y * -5}deg)`;
      });

      requestAnimationFrame(animateElements);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    animateElements();

    // Auto-cycle active member
    const memberInterval = setInterval(() => {
      setActiveMember(prev => (prev + 1) % teamMembers.length);
    }, 4000);

    // Auto-cycle benefits
    const benefitInterval = setInterval(() => {
      setActiveBenefit(prev => (prev + 1) % communityBenefits.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkIfMobile);
      clearInterval(memberInterval);
      clearInterval(benefitInterval);
    };
  }, [isMobile, teamMembers.length]);

  // Handle email submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Save to localStorage
      const existingEmails = JSON.parse(localStorage.getItem('communityEmails') || '[]');
      const updatedEmails = [...existingEmails, { email, timestamp: new Date().toISOString() }];
      localStorage.setItem('communityEmails', JSON.stringify(updatedEmails));
      
      // Log to console
      console.log('New community member:', email);
      console.log('All community emails:', updatedEmails);
      
      // Show success
      setIsSubmitted(true);
    } catch (error) {
      setFormError('Failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-shape absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/20 blur-3xl opacity-50"></div>
        <div className="bg-shape absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-100/25 to-blue-100/30 blur-3xl opacity-40"></div>
        <div className="bg-shape absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-100/20 to-indigo-100/20 blur-3xl opacity-30"></div>
        
        {/* Connection Lines */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: '2px',
              background: `linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${3 + (Math.random() * 2)}s infinite alternate`
            }}
          ></div>
        ))}
        
        {/* Floating Nodes */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="community-node absolute w-3 h-3 bg-indigo-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 pt-16 pb-32 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 mt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            <span className="block">AI Innovation</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Community Hub
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with our team of experts, share knowledge, and collaborate on the future of intelligent systems.
          </p>
          
          {/* Animated scroll indicator */}
          <div className="mt-12 flex justify-center">
            <div className="animate-bounce w-10 h-16 border-2 border-blue-400/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Team Spotlight */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-gray-800">
            Meet Our Expert Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`floating-card relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/30 shadow-xl transition-all duration-500 ${
                  activeMember === index ? 'scale-105 shadow-blue-500/20' : 'scale-100'
                }`}
                onMouseEnter={() => setActiveMember(index)}
              >
                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-r ${member.color} relative`}>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-white border-4 border-white overflow-hidden shadow-lg">
                    <div className={`bg-gradient-to-br ${member.color} w-full h-full flex items-center justify-center text-white text-3xl font-bold`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-16 px-6 pb-8 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 min-h-[60px]">{member.bio}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.social.github} className="text-gray-700 hover:text-black transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Benefits */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Community Benefits
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-16">
            Join our community to unlock these resources and opportunities
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
                    activeBenefit === index ? 'ring-2 ring-blue-500/30' : ''
                  }`}
                  onMouseEnter={() => setActiveBenefit(index)}
                >
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/10 blur-xl opacity-50"></div>
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                    <Icon className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Collection Section */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-white/30 rounded-3xl overflow-hidden backdrop-blur-sm p-8 md:p-12 max-w-4xl mx-auto shadow-xl relative">
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-300/10 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-300/10 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-blue-100/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Join Our AI Community</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get exclusive access to community events, project updates, and AI resources. 
                  Connect with innovators like Pawan, Anisha, Sahiavik, and Ekshika.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Weekly AI insights newsletter</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Early access to new tools</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    <span>Invites to live workshops</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      You've been added to our community list. We'll notify you about upcoming events.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail('');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      Add Another Email
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Stay Updated</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="consent" className="ml-2 block text-sm text-gray-600">
                          I agree to receive emails about community updates
                        </label>
                      </div>
                      
                      {formError && (
                        <div className="mb-4 text-red-500 text-sm">{formError}</div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-3 transition-all ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <span>Join Community</span>
                            <Zap size={20} />
                          </>
                        )}
                      </button>
                      
                      <p className="mt-4 text-xs text-gray-500 text-center">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global Network Visualization */}
        <div className="relative rounded-3xl overflow-hidden border border-white/30 bg-gradient-to-br from-blue-50/30 to-indigo-50/40 backdrop-blur-sm p-8 mb-24 h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated Globe */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/40 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <Globe className="text-indigo-500/30" size={120} />
              </div>
              
              {/* Connection Lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                    animation: `pulse ${3 + (i % 3)}s infinite alternate`
                  }}
                ></div>
              ))}
              
              {/* Community Nodes */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div
                    key={i}
                    className={`absolute w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold transform-gpu transition-all duration-1000`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      animation: `pulse ${2 + (i % 3)}s infinite alternate`
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute left-8 bottom-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 max-w-xs shadow-lg border border-white/30">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Our Global Community</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">850+</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">42</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">120+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-500">24</div>
                <div className="text-sm text-gray-600">Experts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Transform Your Ideas into AI Solutions
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join innovators like Pawan, Anisha, Sahiavik, and Ekshika in building the future of AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </a>
             
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} AI Innovation Community. All rights reserved.</p>

      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
          .bg-shape {
            opacity: 0.2 !important;
            filter: blur(2rem) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Community;