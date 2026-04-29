// import React, { useState } from 'react';
// import { MessageCircle, X } from 'lucide-react';

// export default function TeenyBotAssistant() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [selectedAction, setSelectedAction] = useState(null);

//   const actions = [
//     { id: 'support', label: 'Customer Support', color: 'bg-sky-100 text-sky-700 border-sky-200' },
//     { id: 'sales', label: 'Sales Assistant', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
//     { id: 'tracking', label: 'Order Tracking', color: 'bg-violet-100 text-violet-700 border-violet-200' }
//   ];

//   return (
//     <div className="fixed z-50 bottom-6 right-6">
//       {/* Chat Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="p-4 text-white transition-all duration-300 rounded-full shadow-lg bg-sky-500 hover:bg-sky-600 hover:scale-105"
//         >
//           <MessageCircle size={24} />
//         </button>
//       )}

//       {/* Chat Widget */}
//       {isOpen && (
//         <div className="max-w-sm bg-white border shadow-2xl rounded-2xl w-80 border-sky-100">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-sky-400 to-sky-500 rounded-t-2xl">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
//                 <div className="flex items-center justify-center w-4 h-4 rounded-full bg-sky-200">
//                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                 </div>
//               </div>
//               <span className="font-semibold">TeenyBot Assistant</span>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="transition-colors text-white/80 hover:text-white"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Message */}
//           <div className="p-4">
//             <div className="p-4 mb-4 text-white rounded-tl-sm shadow-sm bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl">
//               <p className="text-sm leading-relaxed">
//                 Hi! I'm your AI chatbot. I can help customers find products, track orders, and even handle returns. What would you like me to help with today?
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <p className="text-sm font-medium text-gray-600">Choose an action:</p>
//               <div className="flex flex-wrap gap-2">
//                 {actions.map((action) => (
//                   <button
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${
//                       selectedAction === action.id
//                         ? 'bg-sky-100 text-sky-700 border-sky-300 ring-2 ring-sky-200'
//                         : action.color + ' hover:shadow-md'
//                     }`}
//                   >
//                     {action.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Input Area */}
//             <div className="pt-4 mt-4 border-t border-gray-100">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Type your message..."
//                   className="flex-1 px-3 py-2 text-sm border rounded-lg border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
//                 />
//                 <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-sky-500 hover:bg-sky-600">
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Status Indicator */}
//           <div className="absolute -top-1 -left-1">
//             <div className="w-4 h-4 border-2 border-white rounded-full bg-emerald-400 animate-pulse"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle, TrendingUp, MessageCircle, Users, ShoppingCart, BarChart3, Headphones, Zap, Target, Brain, Eye, Star, ArrowRight } from 'lucide-react';

const AIAgentsSection = () => {
  const [activeAgent, setActiveAgent] = useState('sales');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const agents = {
    sales: {
      title: 'AI Sales Conversion Agent',
      description: 'Advanced AI that analyzes customer behavior in real-time to maximize conversions through personalized recommendations and dynamic pricing strategies.',
      icon: TrendingUp,
      badge: 'Conversion Optimizer',
      metrics: { conversion: '+47%', revenue: '+32%', aov: '+23%' },
      features: [
        'Real-time behavior analysis',
        'Dynamic pricing optimization', 
        'Personalized product bundles',
        'Predictive cart abandonment prevention',
        'A/B testing automation',
        'Revenue forecasting'
      ],
      demo: {
        messages: [
          { type: 'system', text: 'Customer Profile: Returning visitor, high-value segment, browsing premium headphones' },
          { type: 'bot', text: "Hi Emma! Welcome back. I see you're interested in our new Sony WH-1000XM5. Based on your previous purchases, I think you'd love the upgraded noise cancellation - perfect for your daily commute." },
          { type: 'user', text: "The price seems a bit high..." },
          { type: 'bot', text: "I understand! As a valued customer, I can offer you an exclusive 15% discount today. Plus, if you bundle it with our premium case, you'll save an additional $25. That brings your total to $279 instead of $349." },
          { type: 'analytics', text: 'Conversion probability increased from 23% to 78% with personalized offer' }
        ]
      }
    },
    support: {
      title: 'AI Customer Success Agent',
      description: 'Intelligent support system that resolves 90% of queries instantly while learning from every interaction to improve customer satisfaction.',
      icon: Headphones,
      badge: 'Success Optimizer',
      metrics: { resolution: '90%', satisfaction: '4.9/5', time: '<30s' },
      features: [
        'Natural language understanding',
        'Sentiment analysis & empathy',
        'Multi-channel integration',
        'Smart escalation protocols',
        'Knowledge base auto-updates',
        'Proactive issue detection'
      ],
      demo: {
        messages: [
          { type: 'user', text: "I'm really frustrated. My order was supposed to arrive yesterday but I haven't received it." },
          { type: 'system', text: 'Sentiment: Frustrated | Priority: High | Order #TTT-4721 status: In transit' },
          { type: 'bot', text: "I completely understand your frustration, and I sincerely apologize for this delay. Let me immediately check your order #TTT-4721... I can see it's currently at the local facility and will definitely arrive by 3 PM today. I'm upgrading you to express delivery for your next order at no cost." },
          { type: 'user', text: "Thank you, that really helps!" },
          { type: 'analytics', text: 'Customer satisfaction score: 5/5 | Issue escalation avoided' }
        ]
      }
    },
    analytics: {
      title: 'AI Business Intelligence Agent',
      description: 'Advanced analytics engine that provides real-time insights, predictive modeling, and automated optimization recommendations for your D2C operations.',
      icon: BarChart3,
      badge: 'Intelligence Engine',
      metrics: { accuracy: '94%', insights: '50+/day', roi: '+156%' },
      features: [
        'Predictive customer analytics',
        'Revenue optimization models',
        'Automated A/B testing',
        'Competitor intelligence',
        'Inventory forecasting',
        'Customer lifetime value prediction'
      ],
      demo: {
        messages: [
          { type: 'system', text: 'Daily Intelligence Report - December 15, 2024' },
          { type: 'bot', text: "Morning briefing: Yesterday's conversion rate hit 4.2% (+0.8% vs last week). Your top performer: Wireless Earbuds category with $12,450 revenue. Prediction: 23% spike expected this weekend due to trending TikTok mention." },
          { type: 'bot', text: "Strategic insight: Customers who buy headphones have 73% probability of purchasing phone cases within 30 days. Recommend: Create targeted bundle campaign. Estimated additional revenue: $8,200/month." },
          { type: 'analytics', text: 'Recommendation implemented automatically | Expected ROI: 340%' }
        ]
      }
    },
    engagement: {
      title: 'AI Relationship Manager',
      description: 'Sophisticated engagement system that builds long-term customer relationships through personalized journeys and predictive communication strategies.',
      icon: MessageCircle,
      badge: 'Loyalty Builder',
      metrics: { retention: '+65%', ltv: '+89%', engagement: '+124%' },
      features: [
        'Behavioral trigger automation',
        'Personalized content creation',
        'Loyalty program optimization',
        'Churn prediction & prevention',
        'Cross-channel orchestration',
        'Emotional intelligence modeling'
      ],
      demo: {
        messages: [
          { type: 'system', text: 'Customer Journey: Sarah Chen | VIP Tier | 47 days since last purchase' },
          { type: 'bot', text: "Hi Sarah! I noticed you loved your last skincare order. Our new Vitamin C serum just launched - it's getting incredible reviews and would pair perfectly with your routine. As a VIP member, you get early access!" },
          { type: 'bot', text: "Plus, I've prepared a personalized bundle based on your skin type analysis from our AI consultant. Want to see your custom recommendations?" },
          { type: 'user', text: "Yes, I'm curious!" },
          { type: 'analytics', text: 'Engagement success | Customer moved from "at-risk" to "highly engaged" segment' }
        ]
      }
    }
  };
  
  // Unified light blue color scheme
  const lightBlueColors = {
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-sky-200',
    button: 'bg-sky-500',
    gradient: 'from-sky-400 to-sky-500',
    glow: 'shadow-sky-200',
    darkText: 'text-sky-700',
    lightBg: 'bg-sky-100'
  };

  // Auto-play demo messages
  useEffect(() => {
    const currentAgent = agents[activeAgent];
    const totalMessages = currentAgent.demo.messages.length;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < totalMessages - 1) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
          return prev + 1;
        }
        return 0; // Reset to beginning
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeAgent]);

  // Reset messages when agent changes
  useEffect(() => {
    setCurrentMessageIndex(0);
    setIsTyping(false);
  }, [activeAgent]);
  
  return (
    <div className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-sky-100 text-sky-700">
            <Brain className="w-4 h-4" />
            Next-Generation AI Agents
          </div>
          <h2 className="mb-6 text-5xl font-bold text-gray-900">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">AI Dream Team</span>
          </h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
            Each AI agent is powered by advanced machine learning models, designed to excel in specific areas of your D2C business while working together seamlessly.
          </p>
        </div>
        
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* Agent Selection */}
          <div className="space-y-4 lg:col-span-1">
            {Object.entries(agents).map(([key, agent]) => {
              const IconComponent = agent.icon;
              const isActive = activeAgent === key;
              
              return (
                <div 
                  key={key}
                  className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? `${lightBlueColors.border} ${lightBlueColors.bg} shadow-xl ${lightBlueColors.glow}` 
                      : 'border-gray-200 hover:border-sky-200 bg-white hover:shadow-lg hover:bg-sky-50/30'
                  }`}
                  onClick={() => setActiveAgent(key)}
                >
                  {/* Animated background gradient for active state */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${lightBlueColors.gradient} opacity-5 animate-pulse`}></div>
                  )}
                  
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`relative p-3 rounded-xl ${isActive ? lightBlueColors.bg : 'bg-gray-50'} ${lightBlueColors.border} border transition-all duration-300`}>
                        <IconComponent className={`w-6 h-6 ${isActive ? lightBlueColors.text : 'text-gray-600'} transition-colors duration-300`} />
                        {isActive && (
                          <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${lightBlueColors.gradient} opacity-30 blur animate-pulse`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{agent.title}</h3>
                          {isActive && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
                              <span className="text-xs font-medium text-sky-600">ACTIVE</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                          isActive ? `${lightBlueColors.lightBg} ${lightBlueColors.darkText}` : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Star className="w-3 h-3" />
                          {agent.badge}
                        </div>
                        
                        <p className="text-sm leading-relaxed text-gray-600">{agent.description}</p>
                        
                        {isActive && (
                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                              {Object.entries(agent.metrics).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className={`text-lg font-bold ${lightBlueColors.text}`}>{value}</div>
                                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Demo Interface */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-2xl">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${lightBlueColors.gradient} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="absolute w-4 h-4 border-2 border-white rounded-full -bottom-1 -right-1 bg-sky-300"></div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">TeenyBot {agents[activeAgent].badge}</div>
                      <div className="text-sm text-white/80">Advanced AI Agent • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-white/60" />
                    <span className="text-sm text-white/80">Live Demo</span>
                  </div>
                </div>
              </div>
              
              {/* Chat Interface */}
              <div className="p-6 overflow-y-auto min-h-96 max-h-96 bg-gray-50">
                <div className="space-y-4">
                  {agents[activeAgent].demo.messages.slice(0, currentMessageIndex + 1).map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'system' && (
                        <div className="w-full p-3 text-center border rounded-lg bg-sky-100 border-sky-200">
                          <div className="text-xs font-medium text-sky-600">{message.text}</div>
                        </div>
                      )}
                      
                      {message.type === 'analytics' && (
                        <div className="w-full p-3 border rounded-lg bg-sky-100 border-sky-200">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-sky-600" />
                            <div className="text-xs font-medium text-sky-700">{message.text}</div>
                          </div>
                        </div>
                      )}
                      
                      {(message.type === 'bot' || message.type === 'user') && (
                        <div className={`max-w-md ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                          <div className={`p-4 rounded-2xl shadow-sm ${
                            message.type === 'user' 
                              ? 'bg-gray-200 text-gray-800 rounded-tr-md' 
                              : `bg-gradient-to-r ${lightBlueColors.gradient} text-white rounded-tl-md`
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <div className="px-2 mt-1 text-xs text-gray-500">
                            {message.type === 'bot' ? 'TeenyBot' : 'Customer'} • Just now
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start mr-12">
                      <div className={`p-4 rounded-2xl rounded-tl-md bg-gradient-to-r ${lightBlueColors.gradient} text-white`}>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Feature Pills */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {agents[activeAgent].features.slice(0, 6).map((feature, index) => (
                    <div key={index} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${lightBlueColors.bg} ${lightBlueColors.text} border ${lightBlueColors.border}`}>
                      <Zap className="w-3 h-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Ready to Deploy Your AI Dream Team?</h3>
            <p className="max-w-2xl mx-auto mb-6 text-gray-600">
              Start with one agent or deploy the full suite. Each AI agent learns and improves automatically, delivering better results over time.
            </p>
            <button className="flex items-center gap-2 px-8 py-4 mx-auto font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 hover:shadow-xl">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentsSection;