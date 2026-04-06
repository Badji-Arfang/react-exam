import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle, AlertCircle, Trash2, Search } from 'lucide-react';
import { Reservation, StatutReservation } from '../types/reservation';
import useLocalStorage from '../hooks/useLocalStorage';

const statutConfig: Record<StatutReservation, { label: string; couleur: string; icon: React.ReactNode }> = {
  en_attente: {
    label: 'En attente',
    couleur: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  confirmee: {
    label: 'Confirmée',
    couleur: 'bg-green-50 text-green-700 border-green-200',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  annulee: {
    label: 'Annulée',
    couleur: 'bg-red-50 text-red-500 border-red-200',
    icon: <XCircle className="w-4 h-4" />,
  },
};

const Reservations = () => {
  const [reservations, setReservations] = useLocalStorage<Reservation[]>('reservations', []);
  const [filtreStatut, setFiltreStatut] = useState<StatutReservation | 'toutes'>('toutes');
  const [recherche, setRecherche] = useState('');
  const [aAnnuler, setAAnnuler] = useState<string | null>(null);
  const [aSupprimer, setASupprimer] = useState<string | null>(null);

  const reservationsFiltrees = reservations.filter(r => {
    const matchStatut = filtreStatut === 'toutes' || r.statut === filtreStatut;
    const matchRecherche = r.restaurantNom.toLowerCase().includes(recherche.toLowerCase()) ||
      r.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      r.prenom.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });

  const annulerReservation = (id: string) => {
    setReservations(prev =>
      prev.map(r => r.id === id ? { ...r, statut: 'annulee' } : r)
    );
    setAAnnuler(null);
  };

  const supprimerReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    setASupprimer(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-SN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateCreation = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-SN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const nbParStatut = {
    toutes: reservations.length,
    en_attente: reservations.filter(r => r.statut === 'en_attente').length,
    confirmee: reservations.filter(r => r.statut === 'confirmee').length,
    annulee: reservations.filter(r => r.statut === 'annulee').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Votre espace personnel</span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Mes Réservations
          </h1>
          <p className="text-gray-400">
            Gérez et suivez toutes vos réservations en un seul endroit
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Onglets statut */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: 'toutes', label: 'Toutes' },
            { key: 'en_attente', label: 'En attente' },
            { key: 'confirmee', label: 'Confirmées' },
            { key: 'annulee', label: 'Annulées' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltreStatut(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filtreStatut === key
                  ? 'bg-amber-500 text-stone-900 shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                filtreStatut === key ? 'bg-stone-900/20 text-stone-900' : 'bg-gray-100'
              }`}>
                {nbParStatut[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Recherche */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par restaurant ou nom..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
          />
        </div>

        {/* Liste des réservations */}
        {reservationsFiltrees.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">📅</div>
            <h3 className="text-xl font-playfair font-bold text-stone-800 mb-2">
              {reservations.length === 0 ? 'Aucune réservation' : 'Aucun résultat'}
            </h3>
            <p className="text-gray-500 mb-6">
              {reservations.length === 0
                ? 'Vous n\'avez pas encore effectué de réservation.'
                : 'Aucune réservation ne correspond à vos critères.'}
            </p>
            {reservations.length === 0 && (
              <a
                href="/restaurants"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Découvrir les restaurants
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reservationsFiltrees.map((reservation) => {
              const config = statutConfig[reservation.statut];
              const estPassee = new Date(reservation.date) < new Date();
              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Barre de couleur */}
                  <div className={`h-1 ${
                    reservation.statut === 'confirmee' ? 'bg-green-500' :
                    reservation.statut === 'annulee' ? 'bg-red-400' : 'bg-amber-400'
                  }`} />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-playfair font-bold text-stone-800">
                            {reservation.restaurantNom}
                          </h3>
                          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.couleur}`}>
                            {config.icon}
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Réservation N° <span className="font-mono font-semibold text-stone-600">{reservation.id}</span>
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 flex-shrink-0">
                        Créée le {formatDateCreation(reservation.dateCreation)}
                      </p>
                    </div>

                    {/* Détails */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Date</p>
                          <p className="font-medium">{new Date(reservation.date).toLocaleDateString('fr-SN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Heure</p>
                          <p className="font-medium">{reservation.heure}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Personnes</p>
                          <p className="font-medium">{reservation.nombrePersonnes}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Client</p>
                          <p className="font-medium">{reservation.prenom} {reservation.nom}</p>
                        </div>
                      </div>
                    </div>

                    {reservation.message && (
                      <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4">
                        <p className="text-xs text-gray-400 mb-0.5">Note</p>
                        <p className="text-sm text-gray-600 italic">"{reservation.message}"</p>
                      </div>
                    )}

                    {/* Actions */}
                    {!estPassee && reservation.statut !== 'annulee' && (
                      <div className="flex justify-end gap-3">
                        {aAnnuler === reservation.id ? (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                            <span className="text-sm text-red-600 font-medium">Confirmer l'annulation ?</span>
                            <button
                              onClick={() => annulerReservation(reservation.id)}
                              className="bg-red-500 hover:bg-red-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Oui, annuler
                            </button>
                            <button
                              onClick={() => setAAnnuler(null)}
                              className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1.5"
                            >
                              Non
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAAnnuler(reservation.id)}
                            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 border border-red-200 hover:border-red-400 px-4 py-2 rounded-xl transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                            Annuler
                          </button>
                        )}
                      </div>
                    )}

                    {(reservation.statut === 'annulee' || estPassee) && (
                      <div className="flex justify-end">
                        {aSupprimer === reservation.id ? (
                          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                            <span className="text-sm text-gray-600">Supprimer définitivement ?</span>
                            <button
                              onClick={() => supprimerReservation(reservation.id)}
                              className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Oui
                            </button>
                            <button onClick={() => setASupprimer(null)} className="text-gray-500 text-xs px-2 py-1.5">Non</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setASupprimer(reservation.id)}
                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Supprimer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;