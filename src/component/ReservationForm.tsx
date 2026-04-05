import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Calendar, Clock, Users, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Restaurant } from '../types/restaurant';
import { Reservation } from '../types/reservation';

interface ReservationFormProps {
  restaurant: Restaurant;
  onClose: () => void;
  onSuccess: (reservation: Reservation) => void;
}

const ReservationForm = ({ restaurant, onClose, onSuccess }: ReservationFormProps) => {
  const [etape, setEtape] = useState<1 | 2>(1);
  const [soumis, setSoumis] = useState(false);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [chargement, setChargement] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    nombrePersonnes: 2,
    message: '',
  });

  // Date minimum = aujourd'hui
  const dateMin = new Date().toISOString().split('T')[0];
  // Date maximum = 3 mois
  const dateMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const heuresDisponibles = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (erreurs[name]) {
      setErreurs(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const validerEtape1 = (): boolean => {
    const nouvellesErreurs: Record<string, string> = {};
    if (!formData.nom.trim()) nouvellesErreurs.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) nouvellesErreurs.prenom = 'Le prénom est requis';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nouvellesErreurs.email = 'Email invalide';
    }
    if (!formData.telephone.trim() || !/^[+\d\s]{8,}$/.test(formData.telephone)) {
      nouvellesErreurs.telephone = 'Numéro de téléphone invalide';
    }
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const validerEtape2 = (): boolean => {
    const nouvellesErreurs: Record<string, string> = {};
    if (!formData.date) nouvellesErreurs.date = 'La date est requise';
    if (!formData.heure) nouvellesErreurs.heure = "L'heure est requise";
    if (formData.nombrePersonnes < 1 || formData.nombrePersonnes > 20) {
      nouvellesErreurs.nombrePersonnes = 'Entre 1 et 20 personnes';
    }
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleSuivant = () => {
    if (validerEtape1()) setEtape(2);
  };

  const handleSoumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validerEtape2()) return;

    setChargement(true);
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    const reservation: Reservation = {
      id: `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      restaurantId: restaurant.id,
      restaurantNom: restaurant.nom,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      date: formData.date,
      heure: formData.heure,
      nombrePersonnes: formData.nombrePersonnes,
      message: formData.message,
      statut: 'en_attente',
      dateCreation: new Date().toISOString(),
    };

    setChargement(false);
    setSoumis(true);
    onSuccess(reservation);
  };

  // Bloc de succès
  if (soumis) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl animate-slide-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-stone-800 mb-3">
            Réservation Envoyée ! 🎉
          </h2>
          <p className="text-gray-500 mb-2">
            Votre demande pour <strong>{restaurant.nom}</strong> a été reçue.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Le {formData.date} à {formData.heure} pour {formData.nombrePersonnes} personne(s)
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-amber-700 font-medium">Confirmation envoyée à</p>
            <p className="text-sm text-stone-700 font-semibold">{formData.email}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-3 rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-playfair font-bold text-stone-800">
              {restaurant.nom}
            </h2>
            <p className="text-xs text-amber-600 font-medium">
              Étape {etape} / 2 – {etape === 1 ? 'Vos informations' : 'Détails de la réservation'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-gray-100 h-1">
          <div
            className="bg-amber-500 h-1 transition-all duration-500"
            style={{ width: etape === 1 ? '50%' : '100%' }}
          />
        </div>

        <form onSubmit={handleSoumettre} className="p-6 space-y-5">
          {etape === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    <User className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Aminata"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                      erreurs.prenom ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {erreurs.prenom && <p className="text-red-500 text-xs mt-1">{erreurs.prenom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Diallo"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                      erreurs.nom ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {erreurs.nom && <p className="text-red-500 text-xs mt-1">{erreurs.nom}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  <Mail className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Adresse Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aminata@exemple.sn"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                    erreurs.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {erreurs.email && <p className="text-red-500 text-xs mt-1">{erreurs.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Téléphone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+221 77 XXX XX XX"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                    erreurs.telephone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {erreurs.telephone && <p className="text-red-500 text-xs mt-1">{erreurs.telephone}</p>}
              </div>

              <button
                type="button"
                onClick={handleSuivant}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-3 rounded-xl transition-colors"
              >
                Continuer →
              </button>
            </>
          )}

          {etape === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={dateMin}
                    max={dateMax}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                      erreurs.date ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {erreurs.date && <p className="text-red-500 text-xs mt-1">{erreurs.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Heure *
                  </label>
                  <select
                    name="heure"
                    value={formData.heure}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                      erreurs.heure ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">-- Choisir --</option>
                    {heuresDisponibles.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {erreurs.heure && <p className="text-red-500 text-xs mt-1">{erreurs.heure}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  <Users className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Nombre de personnes *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, nombrePersonnes: Math.max(1, p.nombrePersonnes - 1) }))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center text-xl font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-stone-800 w-8 text-center">
                    {formData.nombrePersonnes}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, nombrePersonnes: Math.min(20, p.nombrePersonnes + 1) }))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center text-xl font-bold transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-400">personne(s)</span>
                </div>
                {erreurs.nombrePersonnes && <p className="text-red-500 text-xs mt-1">{erreurs.nombrePersonnes}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Anniversaire, allergie alimentaire, demande spéciale..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none transition-all"
                />
              </div>

              {/* Récapitulatif */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">Récapitulatif</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-stone-700">
                  <span className="text-gray-500">Restaurant</span>
                  <span className="font-medium">{restaurant.nom}</span>
                  <span className="text-gray-500">Client</span>
                  <span className="font-medium">{formData.prenom} {formData.nom}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEtape(1)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:border-amber-300 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  type="submit"
                  disabled={chargement}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-stone-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {chargement ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-900/40 border-t-stone-900 rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    '✓ Confirmer la réservation'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;