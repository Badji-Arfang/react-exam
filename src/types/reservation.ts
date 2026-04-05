export interface Reservation {
  id: string;
  restaurantId: number;
  restaurantNom: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date: string;
  heure: string;
  nombrePersonnes: number;
  message?: string;
  statut: 'en_attente' | 'confirmee' | 'annulee';
  dateCreation: string;
}

export type StatutReservation = Reservation['statut'];
