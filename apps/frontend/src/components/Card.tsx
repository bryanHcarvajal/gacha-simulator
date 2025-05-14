import React from 'react';
import type {RollResult} from '../types/gacha'
import  { Rarity, CardType } from '../types/gacha';

interface CardProps { item: RollResult; }

const getRarityStyle = (rarity: Rarity): { border: string; shadow: string; nameColor: string; tagBg: string; } => {
  switch (rarity) {
    case Rarity.SSR: return { border: 'border-fgo-gold', shadow: 'shadow-fgo-gold/40', nameColor: 'text-fgo-gold', tagBg: 'bg-fgo-gold' };
    case Rarity.SR: return { border: 'border-fgo-silver', shadow: 'shadow-fgo-silver/40', nameColor: 'text-fgo-silver', tagBg: 'bg-fgo-silver' };
    case Rarity.R: return { border: 'border-fgo-bronze', shadow: 'shadow-fgo-bronze/40', nameColor: 'text-fgo-bronze', tagBg: 'bg-fgo-bronze' };
    default: return { border: 'border-gray-600', shadow: 'shadow-gray-600/20', nameColor: 'text-gray-400', tagBg: 'bg-gray-500' };
  }
};

const Card: React.FC<CardProps> = ({ item }) => {
  const rarityStyle = getRarityStyle(item.rarity);

  const placeholderImage = item.type === CardType.SERVANT 
    ? '/images/servants/placeholder_servant.png' 
    : '/images/ces/placeholder_ce.png';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
    e.currentTarget.classList.add('object-contain');
    e.currentTarget.classList.remove('object-cover');
  };

  return (
    <div 
      className={`
        bg-[#2a2a4a] border-2 rounded-lg shadow-lg 
        ${rarityStyle.border} hover:${rarityStyle.shadow} /* Sombra más sutil en hover */
        flex flex-col items-center text-center relative overflow-hidden 
        transition-all duration-300 ease-in-out transform hover:scale-105 group
      `}
    >
      {item.isRateUp && (
        <div className="absolute top-1 right-1 bg-opacity-80 backdrop-blur-sm bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold z-10 animate-pulse-bg">
          RATE UP
        </div>
      )}
      
      <div className="w-full aspect-[2/3] overflow-hidden bg-[#1e1e3f]"> {/* Fondo mientras carga */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy" // ¡IMPORTANTE PARA LA CARGA!
          onError={handleImageError}
        />
      </div>

      <div className="p-2 w-full">
        {/* Etiqueta de rareza */}
        <div className={`inline-block px-2 py-0.5 text-[9px] font-bold text-black rounded-full mb-1 ${rarityStyle.tagBg}`}>
          {item.rarity}★ {item.type === CardType.SERVANT ? "Servant" : "CE"}
        </div>
        <h4 
          className={`font-semibold text-xs sm:text-sm leading-tight truncate w-full ${rarityStyle.nameColor}`} 
          title={item.name}
        >
          {item.name}
        </h4>
      </div>
    </div>
  );
};
export default Card;