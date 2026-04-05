import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';

// Scroll vers le haut à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
            {/* Page 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                  <div className="text-center px-4">
                    <div className="text-8xl mb-4">🍽️</div>
                    <h1 className="text-6xl font-playfair font-bold text-stone-800 mb-4">404</h1>
                    <p className="text-xl text-gray-500 mb-8">
                      Oups ! Cette page n'existe pas.
                    </p>
                    <a
                      href="/"
                      className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3 rounded-xl transition-colors"
                    >
                      Retour à l'accueil
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
