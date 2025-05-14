import { useState, useEffect, useCallback } from 'react';
import BannerSelector from '../src/components/BannerSelector'; 
import RollControls from '../src/components/RollControls'; 
import type { Banner, RollResult } from './types/gacha';

const API_BASE_URL = 'http://localhost:3000'; // Asegúrate que el backend corre en este puerto

function App() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const [rollResults, setRollResults] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [sqSpent, setSqSpent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gacha/banners`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data);
        if (data.length > 0 && !selectedBannerId) {
          setSelectedBannerId(data[0].id); 
        }
      } catch (e: any) {
        console.error("Failed to fetch banners:", e);
        setError(`Failed to load banners: ${e.message}`);
      }
    };
    fetchBanners();
  }, [selectedBannerId]); 

  const handleBannerSelect = (bannerId: string) => {
    setSelectedBannerId(bannerId);
    setRollResults([]); 
  };

  const handleRoll = useCallback(async (isMulti: boolean) => {
    if (!selectedBannerId || isRolling) return;

    setIsRolling(true);
    setError(null);
    setRollResults([]); // Limpiar resultados anteriores antes de nueva tirada

    try {
      const response = await fetch(
        `${API_BASE_URL}/gacha/banners/${selectedBannerId}/roll?isMulti=${isMulti}`,
        { method: 'POST' }
      );
      if (!response.ok) {
        const errData = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errData}`);
      }
      const data: RollResult[] = await response.json();
      setRollResults(data);
      setSqSpent(prevSq => prevSq + (isMulti ? 30 : 3));
    } catch (e: any) {
      console.error("Failed to perform roll:", e);
      setError(`Roll failed: ${e.message}`);
    } finally {
      setIsRolling(false);
    }
  }, [selectedBannerId, isRolling]);


  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-blue-700">FGO Gacha Simulator</h1>
      </header>

      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

      <BannerSelector
        banners={banners}
        selectedBannerId={selectedBannerId}
        onBannerSelect={handleBannerSelect}
      />

      <RollControls
        onRoll={handleRoll}
        isRolling={isRolling}
        selectedBannerId={selectedBannerId}
      />
      
      <div className="my-4 text-center">
        <p className="text-xl">SQ Gastados: <span className="font-bold">{sqSpent}</span></p>
      </div>

      {/* Aquí irá ResultsDisplay más tarde */}
      <div className="mt-8">
        {isRolling && <p className="text-center text-xl">Tirando...</p>}
        {rollResults.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Resultados de la Tirada:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {rollResults.map((item, index) => (
                <div key={`${item.id}-${index}`} className="border p-3 rounded-lg shadow bg-white text-center">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">{item.rarity}★ {item.type}</p>
                  {item.isRateUp && <p className="text-xs text-purple-600 font-bold">RATE UP!</p>}
                  {/* La imagen se añadirá con el componente Card */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;