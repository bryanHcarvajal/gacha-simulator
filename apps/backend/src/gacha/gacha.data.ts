import { Banner, GachaItem, Rarity, CardType, RateUpItem } from './gacha.interfaces';

// --- Pool General de Items (No Rate-Up) ---
// Estos son los "spooks" o items que pueden salir sin estar destacados

    export const ALL_SERVANTS: GachaItem[] = [
    // 5 Estrellas (SSR)
    { id: 's001', name: 'Artoria Pendragon', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/artoria.png' },
    { id: 's002', name: 'Altera', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/altera.png' },
    { id: 's003', name: 'Waver Velvet (Zhuge Liang)', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/waver.png' },

  // 4 Estrellas (SR)
  { id: 's004', name: 'Siegfried', rarity: Rarity.SR, type: CardType.SERVANT, imageUrl: '/images/servants/siegfried.png' },
  { id: 's005', name: 'EMIYA', rarity: Rarity.SR, type: CardType.SERVANT, imageUrl: '/images/servants/emiya.png' },
  { id: 's006', name: "Chevalier d'Eon", rarity: Rarity.SR, type: CardType.SERVANT, imageUrl: '/images/servants/deon.png' },

  // 3 Estrellas (R)
  { id: 's007', name: 'Cu Chulainn', rarity: Rarity.R, type: CardType.SERVANT, imageUrl: '/images/servants/cu.png' },
  { id: 's008', name: 'Medusa', rarity: Rarity.R, type: CardType.SERVANT, imageUrl: '/images/servants/medusa.png' },
  { id: 's009', name: 'Ushiwakamaru', rarity: Rarity.R, type: CardType.SERVANT, imageUrl: '/images/servants/ushi.png' },
];

export const ALL_CES: GachaItem[] = [
  // 5 Estrellas (SSR CE)
  { id: 'ce001', name: 'Kaleidoscope', rarity: Rarity.SSR, type: CardType.CE, imageUrl: '/images/ces/kaleidoscope.png' },
  { id: 'ce002', name: 'Black Grail', rarity: Rarity.SSR, type: CardType.CE, imageUrl: '/images/ces/black_grail.png' },

  // 4 Estrellas (SR CE)
  { id: 'ce003', name: 'Formal Craft', rarity: Rarity.SR, type: CardType.CE, imageUrl: '/images/ces/formal_craft.png' },
  { id: 'ce004', name: "Imaginary Around", rarity: Rarity.SR, type: CardType.CE, imageUrl: '/images/ces/imaginary_around.png' },

  // 3 Estrellas (R CE)
  { id: 'ce005', name: 'Dragon\'s Meridian', rarity: Rarity.R, type: CardType.CE, imageUrl: '/images/ces/dragons_meridian.png' },
  { id: 'ce006', name: 'Jeweled Sword Zelretch', rarity: Rarity.R, type: CardType.CE, imageUrl: '/images/ces/jeweled_sword.png' }, // Error común, esta es 4*, ejemplo
];


// --- Banners Específicos ---
const artoriaBannerRateUpServant: RateUpItem = {
  ...ALL_SERVANTS.find(s => s.id === 's001')!, // Artoria
  rateUpPercentage: 0.8, // 0.8% de chance para Artoria SSR
};

const kaleidoscopeRateUpCE: RateUpItem = {
  ...ALL_CES.find(ce => ce.id === 'ce001')!, // Kaleidoscope
  rateUpPercentage: 2.8, // Asumiendo solo esta CE 5* rate up
};


export const BANNERS_DATA: Banner[] = [
  {
    id: 'banner001',
    name: 'Artoria Pendragon Pickup Banner',
    description: '¡Mayor probabilidad de obtener a Artoria Pendragon (Saber)!',
    imageUrl: '/images/banners/artoria_banner.png',
    rateUpServants: [artoriaBannerRateUpServant],
    rateUpCEs: [
      kaleidoscopeRateUpCE,
      { ...ALL_CES.find(ce => ce.id === 'ce003')!, rateUpPercentage: 7.0 }, // Formal Craft SR CE
      { ...ALL_CES.find(ce => ce.id === 'ce005')!, rateUpPercentage: 20.0 } // Dragon's Meridian R CE
    ],
  },
  {
    id: 'banner002',
    name: 'Story Banner Genérico',
    description: 'Banner estándar con todos los Servants y CEs permanentes.',
    imageUrl: '/images/banners/story_banner.png',
    rateUpServants: [], // Sin rate-up específicos, se usarían las tasas base
    rateUpCEs: [],
  },
];