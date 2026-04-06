import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, UtensilsCrossed, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-gray-300">
      {/* Bande décorative */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500 p-2 rounded-full">
                <UtensilsCrossed className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <span className="text-amber-400 font-playfair font-bold text-lg block leading-none">AMBIANCE</span>
                <span className="text-gray-400 text-xs tracking-widest uppercase">Culinaire</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              La référence de la réservation de table à Dakar. Découvrez les meilleurs restaurants du Sénégal et réservez en quelques clics.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-stone-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-playfair">Navigation</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/restaurants', label: 'Nos Restaurants' },
                { to: '/reservations', label: 'Mes Réservations' },
                { to: '/contact', label: 'Contact' },
              ].map((lien) => (
                <li key={lien.to}>
                  <Link
                    to={lien.to}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500 group-hover:w-2 transition-all" />
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-playfair">Horaires du Service</h3>
            <ul className="space-y-3">
              {[
                { jour: 'Lundi – Vendredi', heure: '11h00 – 23h00' },
                { jour: 'Samedi', heure: '10h00 – 00h00' },
                { jour: 'Dimanche', heure: '10h00 – 22h00' },
              ].map((h) => (
                <li key={h.jour} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white">{h.jour}</p>
                    <p className="text-xs text-gray-400">{h.heure}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-playfair">Nous Contacter</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Dakar, Sénégal</p>
                  <p className="text-xs text-gray-400">Service disponible dans tout Dakar</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+221778676808" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                  +221 77 867 68 08
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:badjiarfang94@gmail.com" className="text-sm text-gray-400 hover:text-amber-400 transition-colors break-all">
                  badjiarfang94@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center">
            © {annee} <span className="text-amber-400">Ambiance Culinaire</span>. Tous droits réservés. Dakar, Sénégal 🇸🇳
          </p>
          <p className="text-xs text-gray-600">
            Fait avec ❤️ pour la gastronomie sénégalaise
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
