// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import ChatbotButton from './pages/ChatbotButton';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative overflow-hidden">
          <Navbar />
              <HelmetProvider>
                    <ChatbotButton />
          <AppRoutes />
          </HelmetProvider>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;