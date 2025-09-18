import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: "text" | "service";
  services?: { title: string; description: string; price?: string }[];
}

const ServiceCard: React.FC<{ title: string; description: string; price?: string }> = ({ title, description, price }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
    <h3 className="text-sm font-semibold text-indigo-600">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
    {price && <p className="mt-2 text-sm font-bold text-gray-800">{price}</p>}
    <button className="mt-3 w-full px-3 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700">
      Learn More
    </button>
  </div>
);

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🟢 Parse services out of backend reply text
  const parseServices = (reply: string) => {
    const regex = /\d+\.\s\*\*(.*?)\*\*:\s(.*?)(?:starts at\s\*\*(.*?)\*\*)/gs;
    const matches = [...reply.matchAll(regex)];
    return matches.map(m => ({
      title: m[1].trim(),
      description: m[2].trim(),
      price: m[3]?.trim()
    }));
  };

  // Fetch intro message from backend
  const fetchIntroMessage = async () => {
    try {
      const res = await fetch("http://13.60.236.70/api/chatbot/intro");
      const data = await res.json();
      setMessages([{
        text: data.message || "Hello! I'm your AI assistant.",
        isUser: false,
        timestamp: new Date(),
        type: "text"
      }]);
    } catch (error) {
      console.error("Intro API Error:", error);
      setMessages([{
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
        type: "text"
      }]);
    }
  };

  // Send message to chat API
  const sendMessageToAPI = async (userMessage: string) => {
    try {
      setIsTyping(true);

      const response = await fetch("http://13.60.236.70/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      return data; // Keep full object (with reply string)
    } catch (error) {
      console.error("Chat API Error:", error);
      return { reply: "Sorry, I'm having trouble connecting right now." };
    } finally {
      setIsTyping(false);
    }
  };

  // Handle sending user message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = { text: message, isUser: true, timestamp: new Date(), type: "text" };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    const aiResponse = await sendMessageToAPI(message);

    // Try parsing services
    const services = parseServices(aiResponse.reply || "");
    const isService = services.length > 0;

    setMessages(prev => [...prev, { 
      text: aiResponse.reply, 
      isUser: false,
      timestamp: new Date(),
      type: isService ? "service" : "text",
      services
    }]);
  };

  // On open → fetch intro from backend
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      fetchIntroMessage();
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  // Scroll when messages update
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
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
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

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.type === "service" ? (
                <div className="flex flex-col gap-3 max-w-[85%]">
                  {/* Intro text */}
                  <div className="p-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm">
                    {msg.text.split("\n\n")[0]}
                  </div>
                  {/* Service cards */}
                  <div className="grid gap-3">
                    {msg.services?.map((srv, i) => (
                      <ServiceCard key={i} title={srv.title} description={srv.description} price={srv.price} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex max-w-[85%] gap-2">
                  {!msg.isUser && (
                    <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-full w-7 h-7">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}>
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
              )}
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

        {/* Input */}
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
