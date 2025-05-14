export enum Rarity {
  SSR = 5, // 5 estrellas
  SR = 4,  // 4 estrellas
  R = 3,   // 3 estrellas
}

export enum CardType {
  SERVANT = 'Servant',
  CE = 'CraftEssence',
}

export interface GachaItem {
  id: string;
  name: string;
  rarity: Rarity;
  type: CardType;
  imageUrl: string; // URL a la imagen de el personaje
}

export interface RateUpItem extends GachaItem {
  rateUpPercentage: number;
}

export interface Banner {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Imagen del banner
  rateUpServants: RateUpItem[];
  rateUpCEs: RateUpItem[];
  
}

export interface RollResult extends GachaItem {
  isRateUp: boolean;
}