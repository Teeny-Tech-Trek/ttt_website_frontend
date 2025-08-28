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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Handle modal open/close and greeting
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
      document.body.style.overflow = 'unset';
      setMessages([]);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
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
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <Bot size={24} className="bg-white/20 p-1 rounded-full" />
            <div>
              <h2 className="text-xl font-bold">AI Assistant</h2>
              <p className="text-xs opacity-80 flex items-center">
                {isTyping ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Typing</span>
                    <span className="ml-1 flex">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </span>
                  </span>
                ) : 'Online • Ready to help'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex max-w-[85%] gap-3">
                {!msg.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mt-1">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                
                <div 
                  className={`p-4 rounded-2xl ${
                    msg.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className={`mt-2 text-xs ${msg.isUser ? 'text-blue-100' : 'text-gray-500'} flex justify-end`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {msg.isUser && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && !messages.some(msg => !msg.isUser && msg.text === '...') && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex max-w-[85%] gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mt-1">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="p-4 rounded-2xl bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-inner"
              autoFocus
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-indigo-200 disabled:hover:shadow-none"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-2">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs border">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs border">/</kbd> to focus
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;