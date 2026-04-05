import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Users, ChevronRight, Heart } from 'lucide-react';
import { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onReserver?: (restaurant: Restaurant) => void;
}

const RestaurantCard = ({ restaurant, onReserver }: RestaurantCardProps) => {
  const [favori, setFavori] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrix = (prix: number) => {
    return new Intl.NumberFormat('fr-SN').format(prix) + ' FCFA';
  };

  const renderEtoiles = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(note) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 group border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {!imageError ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.nom}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-stone-900/80 backdrop-blur-sm text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
            {restaurant.cuisine}
          </span>
          {!restaurant.disponible && (
            <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full">
              Complet
            </span>
          )}
        </div>

        {/* Favori */}
        <button
          onClick={() => setFavori(!favori)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
          aria-label={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              favori ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Note en bas */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-stone-800 text-xs font-bold">{restaurant.note}</span>
          <span className="text-gray-500 text-xs">({restaurant.nbAvis})</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-stone-800 font-playfair font-bold text-xl mb-1 group-hover:text-amber-600 transition-colors">
            {restaurant.nom}
          </h3>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-sm">{restaurant.quartier}, Dakar</span>
          </div>
        </div>

        {/* Étoiles */}
        <div className="flex items-center gap-1 mb-3">
          {renderEtoiles(restaurant.note)}
          <span className="text-sm text-gray-500 ml-1">{restaurant.nbAvis} avis</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Infos bas */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{restaurant.horaires.ouverture} – {restaurant.horaires.fermeture}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>jusqu'à {restaurant.capacite} couverts</span>
          </div>
        </div>

        {/* Prix + Bouton */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Prix moyen</span>
            <p className="text-stone-800 font-bold text-sm">{formatPrix(restaurant.prixMoyen)}</p>
          </div>
          {restaurant.disponible ? (
            <button
              onClick={() => onReserver?.(restaurant)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1 shadow hover:shadow-amber-300/40"
            >
              Réserver
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-sm text-red-500 font-medium bg-red-50 px-3 py-2 rounded-xl">
              Indisponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;