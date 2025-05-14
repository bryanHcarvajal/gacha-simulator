export enum Rarity {
  SSR = 5,
  SR = 4,
  R = 3,
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
  imageUrl: string;
}

export interface Banner {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  
}

export interface RollResult extends GachaItem {
  isRateUp: boolean;
}