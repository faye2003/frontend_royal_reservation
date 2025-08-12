export interface Post {
  id: number;
  user_id: number;            // host_id dans la BDD
  titre: string;              // title
  slug: string;
  type: 'room' | 'entire';     // type
  description: string;
  ville: string;               // city
  pays: string;                // country (code ISO 2 lettres)
  latitude?: number | null;    // lat
  longitude?: number | null;   // lon
  prix_base: number;           // base_price (centimes)
  devise: string;              // currency (XOF, etc.)
  frais_nettoyage: number;     // cleaning_fee (centimes)
  pourcentage_frais_service: number; // service_fee_pct
  nuits_min: number;           // min_nights
  nuits_max: number;           // max_nights
  reservation_instantanee: boolean; // instant_book
  statut: 'draft' | 'review' | 'active' | 'blocked'; // status
  created_at?: string;
  updated_at?: string;
}

