import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import ChatbotButton from './pages/ChatbotButton';
import ChatbotModal from './pages/ChatbotModal'; // Import your actual ChatbotModal
import AuthModal from './pages/public/AuthModel';
import { Toaster } from 'react-hot-toast';

// Component to handle the modal inside the AuthProvider context
const AppContent = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();
  
  // Shared chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Functions to control chatbot
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <HelmetProvider>
        {/* Pass toggle function to ChatbotButton */}
        <ChatbotButton onToggleChatbot={toggleChatbot} />
        
        {/* Pass open function to AppRoutes (and subsequently to Hero) */}
        <AppRoutes onOpenChatbot={openChatbot} />
      </HelmetProvider>
      <Footer />
      
      {/* Single ChatbotModal instance shared by both buttons */}
      <ChatbotModal 
        isOpen={isChatbotOpen}
        onClose={closeChatbot}
      />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultMode={authModalMode}
      />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;