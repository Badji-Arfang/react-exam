import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Star, UtensilsCrossed, MapPin, Award, Clock } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const Home = () => {
  const [compteur, setCompteur] = useState({ restaurants: 0, reservations: 0, avis: 0 });
  const [visible, setVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = { restaurants: 6, reservations: 1240, avis: 2032 };

  // Animation des compteurs au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCompteur({
              restaurants: Math.floor(stats.restaurants * eased),
              reservations: Math.floor(stats.reservations * eased),
              avis: Math.floor(stats.avis * eased),
            });
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [visible]);

  const featuredRestaurants = restaurants.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Particules décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }} />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-300 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-amber-500 rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>La référence gastronomique à Dakar, Sénégal 🇸🇳</span>
          </div>

          {/* Titre principal */}
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
            AMBIANCE
            <br />
            <span className="text-amber-400">CULINAIRE</span>
          </h1>

          <p className="text-gray-200 text-lg md:text-2xl font-light mb-4 max-w-2xl mx-auto leading-relaxed">
            Réservez votre table dans les meilleurs restaurants de Dakar
          </p>
          <p className="text-amber-300/80 text-base mb-10 italic">
            "Vivez l'art de la teranga à travers chaque repas"
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:scale-105"
            >
              Découvrir les restaurants
            </Link>
            <Link
              to="/reservations"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Mes réservations
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 animate-bounce">
            <span className="text-xs">Découvrir</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="bg-stone-900 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { label: 'Restaurants partenaires', value: compteur.restaurants, suffix: '+' },
              { label: 'Réservations effectuées', value: compteur.reservations, suffix: '+' },
              { label: 'Avis clients', value: compteur.avis, suffix: '+' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl md:text-5xl font-playfair font-bold text-amber-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POURQUOI NOUS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Notre promesse</span>
            <h2 className="text-4xl font-playfair font-bold text-stone-800 mt-2 mb-4">
              Pourquoi choisir Ambiance Culinaire ?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nous sélectionnons les meilleurs restaurants de Dakar pour vous offrir une expérience gastronomique inoubliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                titre: 'Restaurants Certifiés',
                desc: 'Chaque restaurant est sélectionné et certifié pour la qualité de sa cuisine, son service et son ambiance.',
                couleur: 'bg-amber-50 text-amber-600',
              },
              {
                icon: <Clock className="w-8 h-8" />,
                titre: 'Réservation Instantanée',
                desc: 'Réservez en moins de 2 minutes, 24h/24 et 7j/7. Confirmation immédiate par SMS et email.',
                couleur: 'bg-green-50 text-green-600',
              },
              {
                icon: <Star className="w-8 h-8" />,
                titre: 'Avis Vérifiés',
                desc: 'Toutes les notes et avis sont déposés par de vrais clients. Faites confiance à l\'expérience collective.',
                couleur: 'bg-blue-50 text-blue-600',
              },
            ].map((item) => (
              <div key={item.titre} className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className={`w-16 h-16 ${item.couleur} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold text-stone-800 mb-3">{item.titre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESTAURANTS EN VEDETTE ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Nos coups de cœur</span>
              <h2 className="text-4xl font-playfair font-bold text-stone-800 mt-2">
                Restaurants en Vedette
              </h2>
            </div>
            <Link to="/restaurants" className="text-amber-600 hover:text-amber-500 font-semibold text-sm flex items-center gap-1 transition-colors">
              Voir tous →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRestaurants.map((resto) => (
              <div key={resto.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resto.imageUrl}
                    alt={resto.nom}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/95 rounded-lg px-2 py-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-stone-800 text-xs font-bold">{resto.note}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-playfair font-bold text-lg text-stone-800 mb-1">{resto.nom}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {resto.quartier}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{resto.description}</p>
                  <Link
                    to="/restaurants"
                    className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-sm py-2.5 rounded-xl transition-colors"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1550966871-3ed3cfd3a3ef?w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto text-center px-4 relative z-10">
          <UtensilsCrossed className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Prêt pour une soirée inoubliable ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Choisissez parmi 6 restaurants d'exception à Dakar et réservez votre table dès maintenant.
          </p>
          <Link
            to="/restaurants"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/30"
          >
            Choisir mon restaurant
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
