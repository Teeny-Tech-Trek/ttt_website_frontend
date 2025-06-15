// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative overflow-hidden">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;