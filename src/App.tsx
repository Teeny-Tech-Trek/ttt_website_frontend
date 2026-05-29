import { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import RouteSeo from './seo/RouteSeo';
import ChatbotButton from './pages/ChatbotButton';
import ChatbotModal from './pages/ChatbotModal';
import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  const location = useLocation();

  // Standalone chatbot-only route (used by the QR code).
  const isChatOnlyRoute = location.pathname === '/chat';

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen((open) => !open);

  return (
    <div className="relative overflow-hidden">
      {!isChatOnlyRoute && <Navbar />}
      <RouteSeo />
      {!isChatOnlyRoute && <ChatbotButton onToggleChatbot={toggleChatbot} isOpen={isChatbotOpen} />}

      <AppRoutes onOpenChatbot={openChatbot} />
      {!isChatOnlyRoute && <Footer />}

      <ChatbotModal
        isOpen={isChatOnlyRoute ? true : isChatbotOpen}
        onClose={closeChatbot}
        fullPage={isChatOnlyRoute}
      />

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
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
