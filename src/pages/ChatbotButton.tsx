import React from 'react';
import { MessageCircle } from 'lucide-react';

// Updated ChatbotButton that accepts chatbot controls as props
const ChatbotButton = ({ onToggleChatbot }) => {
  const toggleModal = (e) => {
    e.stopPropagation(); // Prevent any parent click handlers
    if (onToggleChatbot) {
      onToggleChatbot();
    }
  };

  return (
    <button
      onClick={toggleModal}
      className="fixed bottom-6 right-6 z-[9998] bg-gradient-to-r from-blue-800 to-blue-900 text-white font-medium text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 flex items-center gap-2 group"
    >
      <MessageCircle size={20} className="transition-transform duration-300 group-hover:rotate-12" />
      <span className="hidden sm:inline">Chat with AI</span>
    </button>
  );
};

export default ChatbotButton;