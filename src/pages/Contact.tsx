import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  reponse: string;
}

const faqs: FAQ[] = [
  {
    question: "Comment faire une réservation sur Ambiance Culinaire ?",
    reponse: "Rendez-vous sur la page 'Restaurants', choisissez votre restaurant, cliquez sur 'Réserver' et remplissez le formulaire en 2 étapes. Vous recevrez une confirmation par email et SMS."
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    reponse: "Oui ! Depuis la page 'Mes Réservations', vous pouvez annuler votre réservation jusqu'à 2 heures avant l'heure réservée. Pour une modification, contactez-nous directement."
  },
  {
    question: "Les restaurants sont-ils disponibles tous les jours ?",
    reponse: "Chaque restaurant a ses propres horaires affichés sur sa fiche. La disponibilité est mise à jour en temps réel. Certains restaurants peuvent être complets lors des périodes chargées."
  },
  {
    question: "Comment contacter un restaurant directement ?",
    reponse: "Les numéros de téléphone de chaque restaurant sont disponibles sur leur fiche. Vous pouvez également utiliser notre service de contact pour toute question."
  },
  {
    question: "Y a-t-il des frais de réservation ?",
    reponse: "Non ! La réservation via Ambiance Culinaire est totalement gratuite. Vous payez uniquement votre repas directement au restaurant."
  },
];

const Contact = () => {
  const [faqOuverte, setFaqOuverte] = useState<number | null>(null);
  const [formEnvoye, setFormEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (erreurs[name]) setErreurs(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const valider = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = 'Requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.sujet) e.sujet = 'Requis';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Minimum 20 caractères';
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const handleEnvoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valider()) return;
    setChargement(true);
    await new Promise(r => setTimeout(r, 1500));
    setChargement(false);
    setFormEnvoye(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div className="py-16 bg-stone-900">
        <div className="px-4 mx-auto text-center max-w-7xl">
          <span className="text-sm font-semibold tracking-widest uppercase text-amber-400">Nous sommes là pour vous</span>
          <h1 className="mt-2 mb-4 text-4xl font-bold text-white md:text-5xl font-playfair">
            Contactez-nous
          </h1>
          <p className="max-w-xl mx-auto text-gray-400">
            Une question ? Un problème de réservation ? Notre équipe à Dakar est disponible pour vous aider.
          </p>
        </div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Infos de contact */}
          <div className="space-y-6 lg:col-span-1">
            <div>
              <h2 className="mb-6 text-2xl font-bold font-playfair text-stone-800">Nos coordonnées</h2>
            </div>

            {/* Cards contact */}
            {[
              {
                icon: <Phone className="w-6 h-6 text-amber-500" />,
                titre: 'Téléphone / WhatsApp',
                valeur: '+221 77 867 68 08',
                lien: 'tel:+221778676808',
                desc: 'Disponible Lun–Sam · 9h–21h',
              },
              {
                icon: <Mail className="w-6 h-6 text-amber-500" />,
                titre: 'Email',
                valeur: 'badjiarfang94@gmail.com',
                lien: 'mailto:badjiarfang94@gmail.com',
                desc: 'Réponse sous 24 heures',
              },
              {
                icon: <MapPin className="w-6 h-6 text-amber-500" />,
                titre: 'Adresse',
                valeur: 'Dakar, Sénégal',
                lien: '#',
                desc: 'Service disponible dans tout Dakar',
              },
              {
                icon: <Clock className="w-6 h-6 text-amber-500" />,
                titre: 'Horaires du support',
                valeur: 'Lun – Sam : 9h00 – 21h00',
                lien: '#',
                desc: 'Fermé les dimanches',
              },
            ].map((item) => (
              <div key={item.titre} className="flex gap-4 p-5 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-colors bg-amber-50 rounded-xl group-hover:bg-amber-100">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.titre}</p>
                  <a href={item.lien} className="text-sm font-semibold break-all transition-colors text-stone-800 hover:text-amber-600">
                    {item.valeur}
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Message WhatsApp rapide */}
            <a
              href="https://wa.me/221778676808?text=Bonjour%20Ambiance%20Culinaire%2C%20j%27ai%20une%20question..."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full gap-3 px-6 py-4 font-semibold text-white transition-all bg-green-500 shadow-lg hover:bg-green-400 rounded-2xl hover:shadow-green-300/30"
            >
              <MessageCircle className="w-5 h-5" />
              Écrire sur WhatsApp
            </a>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
              {formEnvoye ? (
                <div className="py-10 text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold font-playfair text-stone-800">Message envoyé ! 🎉</h3>
                  <p className="mb-2 text-gray-500">Merci <strong>{form.nom}</strong>, nous avons bien reçu votre message.</p>
                  <p className="mb-8 text-sm text-gray-400">Nous vous répondrons à <strong>{form.email}</strong> dans les 24 heures.</p>
                  <button
                    onClick={() => { setFormEnvoye(false); setForm({ nom: '', email: '', sujet: '', message: '' }); }}
                    className="px-8 py-3 font-bold transition-colors bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-xl"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 text-2xl font-bold font-playfair text-stone-800">Envoyer un message</h2>
                  <p className="text-sm text-gray-400 mb-7">Notre équipe vous répondra dans les plus brefs délais.</p>

                  <form onSubmit={handleEnvoyer} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Nom complet *</label>
                        <input
                          type="text"
                          name="nom"
                          value={form.nom}
                          onChange={handleChange}
                          placeholder="Arfang Badji"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${erreurs.nom ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        />
                        {erreurs.nom && <p className="mt-1 text-xs text-red-500">{erreurs.nom}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="arfang@exemple.sn"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${erreurs.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        />
                        {erreurs.email && <p className="mt-1 text-xs text-red-500">{erreurs.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Sujet *</label>
                      <select
                        name="sujet"
                        value={form.sujet}
                        onChange={handleChange}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all bg-white ${erreurs.sujet ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      >
                        <option value="">-- Choisissez un sujet --</option>
                        <option value="reservation">Problème de réservation</option>
                        <option value="restaurant">Information sur un restaurant</option>
                        <option value="partenariat">Devenir restaurant partenaire</option>
                        <option value="reclamation">Réclamation / Avis</option>
                        <option value="autre">Autre</option>
                      </select>
                      {erreurs.sujet && <p className="mt-1 text-xs text-red-500">{erreurs.sujet}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Décrivez votre demande en détail..."
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none transition-all ${erreurs.message ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      />
                      <div className="flex justify-between mt-1">
                        {erreurs.message ? <p className="text-xs text-red-500">{erreurs.message}</p> : <span />}
                        <p className="text-xs text-gray-400">{form.message.length} / min. 20</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={chargement}
                      className="flex items-center justify-center w-full gap-2 py-4 font-bold transition-all shadow-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-900 rounded-xl hover:shadow-amber-300/30"
                    >
                      {chargement ? (
                        <>
                          <div className="w-4 h-4 border-2 rounded-full border-stone-900/30 border-t-stone-900 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-6 h-6 text-amber-500" />
              <h2 className="text-3xl font-bold font-playfair text-stone-800">Questions Fréquentes</h2>
            </div>
            <p className="text-gray-400">Les réponses aux questions les plus posées</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                <button
                  onClick={() => setFaqOuverte(faqOuverte === index ? null : index)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="pr-4 text-sm font-semibold text-stone-800">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform ${faqOuverte === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {faqOuverte === index && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <p className="text-sm leading-relaxed text-gray-500">{faq.reponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
