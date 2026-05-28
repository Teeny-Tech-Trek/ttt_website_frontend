import React from 'react';
import { MessageCircle, X } from 'lucide-react';

// Floating launcher. When the chat is open it morphs into a compact close
// button so it stops sitting redundantly beside the open widget.
const ChatbotButton = ({ onToggleChatbot, isOpen = false }) => {
  const toggleModal = (e) => {
    e.stopPropagation(); // Prevent any parent click handlers
    if (onToggleChatbot) {
      onToggleChatbot();
    }
  };

  return (
    <button
      onClick={toggleModal}
<<<<<<< HEAD
      className="fixed bottom-6 right-6 z-[9998] text-white font-medium text-sm px-3 py-2 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.32)] hover:shadow-[0_14px_36px_rgba(37,99,235,0.38)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.99] flex items-center gap-2 group bg-[linear-gradient(135deg,#2563EB,#4F46E5)]"
=======
      aria-label={isOpen ? 'Close chat' : 'Open chat with AI'}
      aria-expanded={isOpen}
      className={`fixed bottom-6 right-6 z-[9998] text-white font-medium text-sm rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.32)] hover:shadow-[0_14px_36px_rgba(37,99,235,0.38)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 group bg-[linear-gradient(135deg,#2563EB,#4F46E5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
        isOpen ? 'w-12 h-12 p-0' : 'px-5 py-3'
      }`}
>>>>>>> 7a5defedc5f8f010374fb84b1d42b82dd76ae522
    >
      {isOpen ? (
        <X size={20} />
      ) : (
        <>
          <MessageCircle size={20} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden sm:inline">Chat with AI</span>
        </>
      )}
    </button>
  );
};

export default ChatbotButton;
