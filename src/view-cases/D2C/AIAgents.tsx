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
      color: 'emerald',
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
      color: 'blue',
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
      color: 'purple',
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
      color: 'rose',
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
  
  const colorClasses = {
    emerald: { 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-600', 
      border: 'border-emerald-200', 
      button: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-green-500',
      glow: 'shadow-emerald-200'
    },
    blue: { 
      bg: 'bg-blue-50', 
      text: 'text-blue-600', 
      border: 'border-blue-200', 
      button: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-200'
    },
    purple: { 
      bg: 'bg-purple-50', 
      text: 'text-purple-600', 
      border: 'border-purple-200', 
      button: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-200'
    },
    rose: { 
      bg: 'bg-rose-50', 
      text: 'text-rose-600', 
      border: 'border-rose-200', 
      button: 'bg-rose-500',
      gradient: 'from-rose-500 to-pink-500',
      glow: 'shadow-rose-200'
    }
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
    <div className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Next-Generation AI Agents
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Dream Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Each AI agent is powered by advanced machine learning models, designed to excel in specific areas of your D2C business while working together seamlessly.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Agent Selection */}
          <div className="lg:col-span-1 space-y-4">
            {Object.entries(agents).map(([key, agent]) => {
              const IconComponent = agent.icon;
              const colors = colorClasses[agent.color];
              const isActive = activeAgent === key;
              
              return (
                <div 
                  key={key}
                  className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? `${colors.border} ${colors.bg} shadow-xl ${colors.glow}` 
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                  }`}
                  onClick={() => setActiveAgent(key)}
                >
                  {/* Animated background gradient for active state */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-5 animate-pulse`}></div>
                  )}
                  
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`relative p-3 rounded-xl ${isActive ? colors.bg : 'bg-gray-50'} ${colors.border} border transition-all duration-300`}>
                        <IconComponent className={`w-6 h-6 ${isActive ? colors.text : 'text-gray-600'} transition-colors duration-300`} />
                        {isActive && (
                          <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-30 blur animate-pulse`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{agent.title}</h3>
                          {isActive && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-600 font-medium">ACTIVE</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                          isActive ? `${colors.bg} ${colors.text}` : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Star className="w-3 h-3" />
                          {agent.badge}
                        </div>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">{agent.description}</p>
                        
                        {isActive && (
                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                              {Object.entries(agent.metrics).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
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
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${colorClasses[agents[activeAgent].color].gradient} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">TeenyBot {agents[activeAgent].badge}</div>
                      <div className="text-white/80 text-sm">Advanced AI Agent • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-white/60" />
                    <span className="text-white/80 text-sm">Live Demo</span>
                  </div>
                </div>
              </div>
              
              {/* Chat Interface */}
              <div className="p-6 min-h-96 max-h-96 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {agents[activeAgent].demo.messages.slice(0, currentMessageIndex + 1).map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'system' && (
                        <div className="w-full bg-blue-100 border border-blue-200 rounded-lg p-3 text-center">
                          <div className="text-xs text-blue-600 font-medium">{message.text}</div>
                        </div>
                      )}
                      
                      {message.type === 'analytics' && (
                        <div className="w-full bg-green-100 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-green-600" />
                            <div className="text-xs text-green-700 font-medium">{message.text}</div>
                          </div>
                        </div>
                      )}
                      
                      {(message.type === 'bot' || message.type === 'user') && (
                        <div className={`max-w-md ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                          <div className={`p-4 rounded-2xl shadow-sm ${
                            message.type === 'user' 
                              ? 'bg-gray-200 text-gray-800 rounded-tr-md' 
                              : `bg-gradient-to-r ${colorClasses[agents[activeAgent].color].gradient} text-white rounded-tl-md`
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 px-2">
                            {message.type === 'bot' ? 'TeenyBot' : 'Customer'} • Just now
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start mr-12">
                      <div className={`p-4 rounded-2xl rounded-tl-md bg-gradient-to-r ${colorClasses[agents[activeAgent].color].gradient} text-white`}>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                    <div key={index} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colorClasses[agents[activeAgent].color].bg} ${colorClasses[agents[activeAgent].color].text} border ${colorClasses[agents[activeAgent].color].border}`}>
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
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Deploy Your AI Dream Team?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start with one agent or deploy the full suite. Each AI agent learns and improves automatically, delivering better results over time.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentsSection;