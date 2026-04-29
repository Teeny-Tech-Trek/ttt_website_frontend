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
      className="fixed bottom-6 right-6 z-[9998] text-white font-medium text-sm px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.32)] hover:shadow-[0_14px_36px_rgba(37,99,235,0.38)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.99] flex items-center gap-2 group bg-[linear-gradient(135deg,#2563EB,#4F46E5)]"
    >
      <MessageCircle size={20} className="transition-transform duration-300 group-hover:rotate-12" />
      <span className="hidden sm:inline">Chat with AI</span>
    </button>
  );
};

export default ChatbotButton;