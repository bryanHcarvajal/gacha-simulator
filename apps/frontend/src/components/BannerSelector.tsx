import React from 'react';
import type { Banner } from '../types/gacha';

interface BannerSelectorProps {
  banners: Banner[];
  selectedBannerId: string | null;
  onBannerSelect: (bannerId: string) => void;
}

const BannerSelector: React.FC<BannerSelectorProps> = ({ banners, selectedBannerId, onBannerSelect }) => {
  if (!banners.length) {
    return <p className="text-center text-gray-500 my-6">Cargando banners...</p>;
  }

  return (
    <section className="bg-brand-surface p-6 rounded-xl shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-brand-primary">
        Selecciona un Banner
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <button
            key={banner.id}
            onClick={() => onBannerSelect(banner.id)}
            className={`
              block w-full rounded-lg overflow-hidden 
              border-2 transition-all duration-300 ease-in-out group
              bg-[#282a36] hover:bg-[#313342] focus:outline-none
              ${selectedBannerId === banner.id 
                ? 'border-brand-primary scale-105 shadow-lg shadow-brand-primary/30' 
                : 'border-gray-700 hover:border-brand-secondary'
              }
            `}
          >
            <div className="p-4 text-left">
              <h3 className="text-lg font-bold text-white group-hover:text-brand-secondary transition-colors">
                {banner.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {banner.description}
              </p>
            </div>
            {banner.imageUrl ? (
                <div className="w-full h-32 sm:h-40 overflow-hidden"> {}
                    <img
                        src={banner.imageUrl}
                        alt={`Banner ${banner.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy" 
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.parentElement?.querySelector('.banner-img-placeholder');
                            if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                        }}
                    />
                    {}
                    <div className="banner-img-placeholder w-full h-full bg-gray-700 hidden items-center justify-center text-gray-500 text-sm">
                        Imagen no disponible
                    </div>
                </div>
            ) : (
              <div className="w-full h-32 sm:h-40 bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Sin imagen de banner</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BannerSelector;