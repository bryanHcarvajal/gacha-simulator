import React from 'react';
import type { Banner } from '../types/gacha';
    
interface BannerSelectorProps {
  banners: Banner[];
  selectedBannerId: string | null;
  onBannerSelect: (bannerId: string) => void;
}

const BannerSelector: React.FC<BannerSelectorProps> = ({ banners, selectedBannerId, onBannerSelect }) => {
  if (!banners.length) {
    return <p className="text-center text-gray-500">Cargando banners...</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-center">Selecciona un Banner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <button
            key={banner.id}
            onClick={() => onBannerSelect(banner.id)}
            className={`p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
                        ${selectedBannerId === banner.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'}`}
          >
            {banner.imageUrl && (
                <img 
                    src={`http://localhost:3000${banner.imageUrl}`} 
                    alt={banner.name} 
                    className="w-full h-32 object-cover rounded-md mb-2" 
                    onError={(e) => (e.currentTarget.style.display = 'none')} 
                />
            )}
            <h3 className="text-lg font-semibold">{banner.name}</h3>
            <p className="text-sm text-gray-600 truncate">{banner.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerSelector;