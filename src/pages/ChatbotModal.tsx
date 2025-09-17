import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp: Date }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Send message to API
  const sendMessageToAPI = async (userMessage: string) => {
    try {
      setIsTyping(true);
      
      // Simulate API delay for realistic typing experience
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://ttt-backend-fzbp.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      return data.response || 'I encountered an issue processing your request. Please try again.';
    } catch (error) {
      console.error('API Error:', error);
      return 'Sorry, I\'m having trouble connecting to the service right now. Please try again later.';
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = { 
      text: message, 
      isUser: true, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Add AI response after processing
    const aiResponse = await sendMessageToAPI(message);
    setMessages(prev => [...prev, { 
      text: aiResponse, 
      isUser: false,
      timestamp: new Date()
    }]);
  };

  // Handle sidebar open/close and greeting
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // Add greeting message with delay
      setTimeout(() => {
        setMessages([{
          text: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }]);
      }, 300);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.ctrlKey && e.key === '/') inputRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Overlay for mobile - only show on smaller screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[9999]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col border-l border-gray-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-white border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-white/20">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Assistant</h2>
              <p className="flex items-center text-xs opacity-80">
                {isTyping ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Typing</span>
                    <span className="flex ml-1">
                      <span className="animate-bounce">.</span>
                      <span className="delay-100 animate-bounce">.</span>
                      <span className="delay-200 animate-bounce">.</span>
                    </span>
                  </span>
                ) : 'Online • Ready to help'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white transition-all duration-200 rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex max-w-[85%] gap-2">
                {!msg.isUser && (
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-full w-7 h-7">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                
                <div 
                  className={`p-3 rounded-2xl text-sm ${
                    msg.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className={`mt-2 text-xs ${msg.isUser ? 'text-blue-100' : 'text-gray-500'} flex justify-end`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {msg.isUser && (
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-blue-500 rounded-full w-7 h-7">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex max-w-[85%] gap-2">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-full w-7 h-7">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="p-3 text-gray-700 bg-white border border-gray-200 rounded-bl-none shadow-sm rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-150 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-300 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-3 text-sm transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="flex items-center justify-center px-4 py-3 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="mt-2 text-xs text-center text-gray-500">
            Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatbotModal;