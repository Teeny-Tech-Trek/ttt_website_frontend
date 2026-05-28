import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import RouteSeo from './seo/RouteSeo';
import ChatbotButton from './pages/ChatbotButton';
import ChatbotModal from './pages/ChatbotModal'; // Import your actual ChatbotModal
import AuthModal from './pages/public/AuthModel';
import { Toaster } from 'react-hot-toast';

// Component to handle the modal inside the AuthProvider context
const AppContent = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();
  const location = useLocation();

  // Standalone chatbot-only route (used by the QR code).
  // Renders just the chat UI as a full-screen page — no navbar, no footer,
  // no floating button — by reusing the existing ChatbotModal in fullPage mode.
  const isChatOnlyRoute = location.pathname === '/chat';

  // Shared chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Functions to control chatbot
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen((open) => !open);

  return (
    <div className="relative overflow-hidden">
      {!isChatOnlyRoute && <Navbar />}
      <RouteSeo />
      {!isChatOnlyRoute && <ChatbotButton onToggleChatbot={toggleChatbot} />}

      {/* Pass open function to AppRoutes (and subsequently to Hero) */}
      <AppRoutes onOpenChatbot={openChatbot} />
      {!isChatOnlyRoute && <Footer />}

      {/* Single ChatbotModal instance — full-page on /chat, floating elsewhere */}
      <ChatbotModal
        isOpen={isChatOnlyRoute ? true : isChatbotOpen}
        onClose={closeChatbot}
        fullPage={isChatOnlyRoute}
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
      <HelmetProvider>
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
