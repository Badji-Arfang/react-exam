import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

const Navbar = () => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const liens = [
    { path: '/', label: 'Accueil' },
    { path: '/restaurants', label: 'Restaurants' },
    { path: '/reservations', label: 'Mes Réservations' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || location.pathname !== '/'
          ? 'bg-stone-900 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-amber-500 p-2 rounded-full group-hover:bg-amber-400 transition-colors">
              <UtensilsCrossed className="w-6 h-6 text-stone-900" />
            </div>
            <div>
              <span className="text-amber-400 font-playfair font-bold text-xl tracking-wide leading-none block">
                AMBIANCE
              </span>
              <span className="text-white font-inter text-xs tracking-widest uppercase">
                Culinaire
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {liens.map((lien) => (
              <Link
                key={lien.path}
                to={lien.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(lien.path)
                    ? 'bg-amber-500 text-stone-900 font-semibold'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-white/10'
                }`}
              >
                {lien.label}
              </Link>
            ))}
            <Link
              to="/restaurants"
              className="ml-4 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-amber-500/30"
            >
              Réserver une table
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label="Menu"
          >
            {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOuvert && (
        <div className="md:hidden bg-stone-900 border-t border-white/10 px-4 py-4 space-y-2 animate-fade-in">
          {liens.map((lien) => (
            <Link
              key={lien.path}
              to={lien.path}
              onClick={() => setMenuOuvert(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(lien.path)
                  ? 'bg-amber-500 text-stone-900 font-semibold'
                  : 'text-gray-300 hover:text-amber-400 hover:bg-white/10'
              }`}
            >
              {lien.label}
            </Link>
          ))}
          <Link
            to="/restaurants"
            onClick={() => setMenuOuvert(false)}
            className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-5 py-3 rounded-full text-sm transition-all mt-2"
          >
            Réserver une table
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
