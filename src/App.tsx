import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import ChatbotButton from './pages/ChatbotButton';
import AuthModal from './pages/public/AuthModel';
import { Toaster } from 'react-hot-toast';

// Component to handle the modal inside the AuthProvider context
const AppContent = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <HelmetProvider>
        <ChatbotButton />
        <AppRoutes />
      </HelmetProvider>
      <Footer />
      
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