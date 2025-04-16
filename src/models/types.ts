// Definicje typów dla aplikacji Dress Recommender

// Typy parametrów sukienek
export type Fit = 'Loose' | 'Regular' | 'Slim' | 'Tight';
export type Skirt = 'A-Line' | 'Asymmetrical' | 'Cowl' | 'Fishtail' | 'Flared' | 'High-low' | 'Mermaid' | 
                    'Petal' | 'Peplum' | 'Semi-circular' | 'Straight' | 'Tulip' | 'Wrapped' | 'Yoke' | 
                    'Bubble' | 'Pencil' | 'Sarong';
export type Neckline = 'Asymmetrical' | 'Bertha' | 'Cowl' | 'Halter' | 'Grecian' | 'Mandarin' | 
                        'Round spaghetti' | 'Sabrina with sleeve' | 'Sabrina without sleeve' | 
                        'V-spaghetti' | 'V-halter';

// Model sukienki
export interface Dress {
  dress: {
    fit: Fit;
    skirt: Skirt;
    neckline: Neckline;
  };
}

// Model sukienki z dodatkowym score
export interface ScoredDress extends Dress {
  score: number;
}

// Typ dla liczników
export interface ValueCounters {
  shown: number;
  liked: number;
}

// Model preferencji użytkownika
export interface UserPreferences {
  fit: Record<Fit, ValueCounters>;
  skirt: Record<Skirt, ValueCounters>;
  neckline: Record<Neckline, ValueCounters>;
}

// Stan aplikacji
export interface AppState {
  allDresses: Dress[];         // Wszystkie sukienki w bazie
  shownDressIds: Set<number>;  // Indeksy sukienek, które były już pokazane
  currentBatch: Dress[];       // Aktualna partia 8 sukienek
  likedDresses: Set<number>;   // Indeksy polubionych sukienek w aktualnej partii
  recommendations: ScoredDress[]; // Rekomendowane sukienki
  userPreferences: UserPreferences; // Preferencje użytkownika
} 