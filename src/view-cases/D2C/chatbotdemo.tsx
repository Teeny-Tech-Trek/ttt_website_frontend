import React, { useState, useEffect } from 'react';
import { Bot, Eye } from 'lucide-react';

const ChatbotDemoSection = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const demoMessages = [
    { type: 'bot', text: "Hi! I'm your AI shopping assistant. I noticed you're browsing our wireless headphones. Can I help you find the perfect pair?" },
    { type: 'user', text: "I'm looking for headphones under $200 with good noise cancellation." },
    { type: 'bot', text: "Perfect! Based on your budget and preferences, I recommend our SoundMax Pro headphones. They're $179, have excellent noise cancellation, and 40-hour battery life. Plus, they have a 30-day money-back guarantee!" },
    { type: 'user', text: "That sounds great! Do you have any customer reviews?" },
    { type: 'bot', text: "Absolutely! The SoundMax Pro has a 4.8/5 star rating with over 1,200 reviews. Customers especially love the comfort and sound quality. Would you like me to add them to your cart with a 10% first-time buyer discount?" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < demoMessages.length - 1) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
          return prev + 1;
        }
        return 0;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            See Our <span className="text-blue-900">Chatbot</span> in Action
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Watch how our AI chatbot engages customers and drives sales conversions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-2xl">
            {/* Chat Header */}
            <div className="p-6 text-white bg-blue-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="absolute w-4 h-4 bg-green-300 border-2 border-white rounded-full -bottom-1 -right-1"></div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">TeenyBot Sales Assistant</div>
                    <div className="text-sm text-white/80">AI Shopping Helper • Online</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-white/60" />
                  <span className="text-sm text-white/80">Live Demo</span>
                </div>
              </div>
            </div>
            
            {/* Chat Interface */}
            <div className="p-6 overflow-y-auto bg-white min-h-96 max-h-96">
              <div className="space-y-4">
                {demoMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        message.type === 'user' 
                          ? 'bg-gray-100 text-black rounded-tr-md' 
                          : 'bg-blue-900 text-white rounded-tl-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <div className="px-2 mt-1 text-xs text-gray-500">
                        {message.type === 'bot' ? 'TeenyBot' : 'Customer'} • Just now
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mr-12">
                    <div className="p-4 text-white bg-blue-900 rounded-2xl rounded-tl-md">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemoSection;