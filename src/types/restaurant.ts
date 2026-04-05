export interface Restaurant {
  id: number;
  nom: string;
  cuisine: string;
  quartier: string;
  adresse: string;
  telephone: string;
  email: string;
  capacite: number;
  note: number;
  nbAvis: number;
  prixMoyen: number; // en FCFA
  imageUrl: string;
  description: string;
  horaires: {
    ouverture: string;
    fermeture: string;
  };
  tags: string[];
  disponible: boolean;
  specialites: string[];
}
