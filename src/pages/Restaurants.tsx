import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Star } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import ReservationForm from '../components/ReservationForm';
import { restaurants } from '../data/restaurants';
import { Restaurant } from '../types/restaurant';
import { Reservation } from '../types/reservation';
import useLocalStorage from '../hooks/useLocalStorage';

type TriOption = 'note' | 'prix_asc' | 'prix_desc' | 'nom';

const Restaurants = () => {
  const [recherche, setRecherche] = useState('');
  const [cuisineFiltre, setCuisineFiltre] = useState('');
  const [quartierFiltre, setQuartierFiltre] = useState('');
  const [tri, setTri] = useState<TriOption>('note');
  const [disponibleSeulement, setDisponibleSeulement] = useState(false);
  const [filtresOuverts, setFiltresOuverts] = useState(false);
  const [restaurantSelectionne, setRestaurantSelectionne] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useLocalStorage<Reservation[]>('reservations', []);
  const [notification, setNotification] = useState<string | null>(null);

  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  const quartiers = [...new Set(restaurants.map(r => r.quartier))];

  const restaurantsFiltres = restaurants
    .filter(r => {
      const matchRecherche = r.nom.toLowerCase().includes(recherche.toLowerCase()) ||
        r.quartier.toLowerCase().includes(recherche.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(recherche.toLowerCase());
      const matchCuisine = !cuisineFiltre || r.cuisine === cuisineFiltre;
      const matchQuartier = !quartierFiltre || r.quartier === quartierFiltre;
      const matchDispo = !disponibleSeulement || r.disponible;
      return matchRecherche && matchCuisine && matchQuartier && matchDispo;
    })
    .sort((a, b) => {
      switch (tri) {
        case 'note': return b.note - a.note;
        case 'prix_asc': return a.prixMoyen - b.prixMoyen;
        case 'prix_desc': return b.prixMoyen - a.prixMoyen;
        case 'nom': return a.nom.localeCompare(b.nom);
        default: return 0;
      }
    });

  const handleReserver = (restaurant: Restaurant) => {
    setRestaurantSelectionne(restaurant);
  };

  const handleSuccesReservation = (reservation: Reservation) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const handleFermerForm = () => {
    setRestaurantSelectionne(null);
  };

  const resetFiltres = () => {
    setRecherche('');
    setCuisineFiltre('');
    setQuartierFiltre('');
    setDisponibleSeulement(false);
    setTri('note');
  };

  const nbFiltresActifs = [cuisineFiltre, quartierFiltre, disponibleSeulement ? 'dispo' : ''].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Dakar, Sénégal</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Nos Restaurants
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Découvrez et réservez parmi les {restaurants.length} meilleurs restaurants sélectionnés par Ambiance Culinaire
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Barre de recherche + filtres */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Chercher par nom, quartier, cuisine..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              {recherche && (
                <button onClick={() => setRecherche('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Tri */}
            <select
              value={tri}
              onChange={(e) => setTri(e.target.value as TriOption)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white min-w-[180px]"
            >
              <option value="note">Meilleures notes</option>
              <option value="prix_asc">Prix croissant</option>
              <option value="prix_desc">Prix décroissant</option>
              <option value="nom">Ordre alphabétique</option>
            </select>

            {/* Toggle filtres */}
            <button
              onClick={() => setFiltresOuverts(!filtresOuverts)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border transition-all ${
                nbFiltresActifs > 0
                  ? 'bg-amber-500 text-stone-900 border-amber-500'
                  : 'border-gray-200 text-gray-600 hover:border-amber-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
              {nbFiltresActifs > 0 && (
                <span className="bg-stone-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {nbFiltresActifs}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${filtresOuverts ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Panneau filtres */}
          {filtresOuverts && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-end animate-fade-in">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Type de cuisine</label>
                <select
                  value={cuisineFiltre}
                  onChange={(e) => setCuisineFiltre(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[200px]"
                >
                  <option value="">Toutes les cuisines</option>
                  {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Quartier</label>
                <select
                  value={quartierFiltre}
                  onChange={(e) => setQuartierFiltre(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[180px]"
                >
                  <option value="">Tous les quartiers</option>
                  {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="disponible"
                  checked={disponibleSeulement}
                  onChange={(e) => setDisponibleSeulement(e.target.checked)}
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="disponible" className="text-sm text-gray-600 cursor-pointer">Disponibles uniquement</label>
              </div>
              {nbFiltresActifs > 0 && (
                <button
                  onClick={resetFiltres}
                  className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <X className="w-4 h-4" /> Réinitialiser
                </button>
              )}
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            <span className="text-stone-800 font-semibold text-base">{restaurantsFiltres.length}</span>
            {' '}restaurant{restaurantsFiltres.length !== 1 ? 's' : ''} trouvé{restaurantsFiltres.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Sélection Ambiance Culinaire
          </div>
        </div>

        {/* Grille restaurants */}
        {restaurantsFiltres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurantsFiltres.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onReserver={handleReserver}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-playfair font-bold text-stone-800 mb-2">Aucun restaurant trouvé</h3>
            <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche.</p>
            <button
              onClick={resetFiltres}
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Voir tous les restaurants
            </button>
          </div>
        )}
      </div>

      {/* Modal formulaire de réservation */}
      {restaurantSelectionne && (
        <ReservationForm
          restaurant={restaurantSelectionne}
          onClose={handleFermerForm}
          onSuccess={handleSuccesReservation}
        />
      )}
    </div>
  );
};

export default Restaurants;
