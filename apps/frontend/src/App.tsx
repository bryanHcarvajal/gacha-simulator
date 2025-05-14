import { useState, useEffect, useCallback } from 'react';
import BannerSelector from '../src/components/BannerSelector'; 
import RollControls from '../src/components/RollControls'; 
import ResultsDisplay from './components/ResultsDisplay'; 
import UserStats from './components/UserStats';
import TargetSelector from './components/TargetSelector'; 
import type { Banner, RollResult, GachaItem } from './types/gacha';
import { CardType, Rarity } from './types/gacha';


const API_BASE_URL = 'http://localhost:3000'; // El backend DEBE correr en este puerto
const MAX_TARGET_SIMULATION_ROLLS = 500;

const getStoredValue = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved) as T;
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
      return defaultValue;
    }
  }
  return defaultValue;
};

const storeValue = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};


function App() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(
    () => getStoredValue<string | null>('selectedBannerId', null) 
  );
  const [rollResults, setRollResults] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [sqSpent, setSqSpent] = useState<number>(
    () => getStoredValue<number>('sqSpent', 0) 
  );
  const [error, setError] = useState<string | null>(null);
  const [rollHistory, setRollHistory] = useState<RollResult[][]>(
    () => getStoredValue<RollResult[][]>('rollHistory', []) 
  );

  const [allPossibleTargets, setAllPossibleTargets] = useState<GachaItem[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(
    () => getStoredValue<string | null>('selectedTargetId_v2', null) 
  );
  const [isSimulatingTarget, setIsSimulatingTarget] = useState(false);

  useEffect(() => { storeValue('selectedBannerId', selectedBannerId); }, [selectedBannerId]);
  useEffect(() => { storeValue('sqSpent', sqSpent); }, [sqSpent]);
  useEffect(() => { storeValue('rollHistory', rollHistory); }, [rollHistory]);
  useEffect(() => { storeValue('selectedTargetId_v2', selectedTargetId); }, [selectedTargetId]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gacha/banners`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setBanners(data);
        if (data.length > 0 && !selectedBannerId) {
          setSelectedBannerId(data[0].id);
        } else if (selectedBannerId && !data.find((b: Banner) => b.id === selectedBannerId)) {
          setSelectedBannerId(data.length > 0 ? data[0].id : null);
        }
      } catch (e: any) {
        console.error("Failed to fetch banners:", e);
        setError(`Failed to load banners: ${e.message}`);
      }
    };
    fetchBanners();
  }, []); 

  useEffect(() => {
    const mockAllServantsAndCEs: GachaItem[] = [
      { id: 's001', name: 'Artoria Pendragon', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/artoria.png' },
      { id: 's002', name: 'Altera', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/altera.png' },
      { id: 's003', name: 'Waver Velvet (Zhuge Liang)', rarity: Rarity.SSR, type: CardType.SERVANT, imageUrl: '/images/servants/waver.png' },
      { id: 's004', name: 'Siegfried', rarity: Rarity.SR, type: CardType.SERVANT, imageUrl: '/images/servants/siegfried.png' },
      { id: 's005', name: 'EMIYA', rarity: Rarity.SR, type: CardType.SERVANT, imageUrl: '/images/servants/emiya.png' },
      { id: 'ce001', name: 'Kaleidoscope', rarity: Rarity.SSR, type: CardType.CE, imageUrl: '/images/ces/kaleidoscope.png' },
      { id: 'ce003', name: 'Formal Craft', rarity: Rarity.SR, type: CardType.CE, imageUrl: '/images/ces/formal_craft.png' },
    ];
    setAllPossibleTargets(mockAllServantsAndCEs);
  }, []);


  const handleBannerSelect = (bannerId: string) => {
    setSelectedBannerId(bannerId);
    setRollResults([]);
  };

  const handleRoll = useCallback(async (isMulti: boolean) => {
    if (!selectedBannerId || isRolling || isSimulatingTarget) return;

    setIsRolling(true);
    setError(null);
    setRollResults([]);

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
      setRollHistory(prevHistory => [...prevHistory, data]);
      setSqSpent(prevSq => prevSq + (isMulti ? 30 : 3));
    } catch (e: any) {
      console.error("Failed to perform roll:", e);
      setError(`Roll failed: ${e.message}`);
    } finally {
      setIsRolling(false);
    }
  }, [selectedBannerId, isRolling, isSimulatingTarget]);


  const handleTargetSelect = (id: string | null) => {
    setSelectedTargetId(id);
  };

  const simulateUntilTarget = useCallback(async () => {
    if (!selectedBannerId || !selectedTargetId || isSimulatingTarget || isRolling) return;

    setIsSimulatingTarget(true);
    setError(null);
    let targetFound = false;
    let multiRollsDone = 0;
    let currentSqSpent = sqSpent; 
    let currentRollHistory = [...rollHistory]; 

    await new Promise(resolve => setTimeout(resolve, 100)); 

    while (!targetFound && multiRollsDone < MAX_TARGET_SIMULATION_ROLLS) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/gacha/banners/${selectedBannerId}/roll?isMulti=true`,
          { method: 'POST' }
        );
        if (!response.ok) {
          const errData = await response.text();
          throw new Error(`Sim. HTTP error! status: ${response.status} - ${errData}`);
        }
        const results: RollResult[] = await response.json();
        
        currentRollHistory.push(results);
        currentSqSpent += 30;
        
        if (results.some(item => item.id === selectedTargetId)) {
          targetFound = true;
        }
        multiRollsDone++;

        if (multiRollsDone % 10 === 0 || targetFound) { 
            setRollResults(results);
            setRollHistory([...currentRollHistory]);
            setSqSpent(currentSqSpent);
            await new Promise(resolve => setTimeout(resolve, 20));
        }
      } catch (e: any) {
        setError(`Error durante simulación: ${e.message}. Detenido.`);
        break; 
      }
    }
    
    setSqSpent(currentSqSpent);
    setRollHistory(currentRollHistory);
    if (currentRollHistory.length > 0 && currentRollHistory[currentRollHistory.length-1]) {
        setRollResults(currentRollHistory[currentRollHistory.length-1]);
    }

    const targetName = allPossibleTargets.find(t => t.id === selectedTargetId)?.name || "Objetivo desconocido";
    if (targetFound) {
      alert(`¡${targetName} obtenido después de ${multiRollsDone} multi-rolls (${multiRollsDone * 30} SQ)!`);
    } else if (multiRollsDone >= MAX_TARGET_SIMULATION_ROLLS) {
      alert(`Límite de ${MAX_TARGET_SIMULATION_ROLLS} multi-rolls alcanzado. ${targetName} no obtenido.`);
    }
    setIsSimulatingTarget(false);

  }, [selectedBannerId, selectedTargetId, isSimulatingTarget, isRolling, sqSpent, rollHistory, allPossibleTargets]);


  const handleResetSimulation = () => {
    if (window.confirm("¿Estás seguro de que quieres reiniciar toda la simulación? Se borrará el historial y SQ gastado.")) {
        setSqSpent(0);
        setRollHistory([]);
        setRollResults([]);
        setSelectedTargetId(null); 
        setError(null); 
    }
  };
 
  return (
    <div className="flex flex-col min-h-screen items-center bg-brand-background text-gray-200 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center pt-6 pb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary drop-shadow-lg">
            FGO Gacha Simulator
          </h1>
        </header>

        {error && (
          <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-md relative mb-6 text-center" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="space-y-10">
          <BannerSelector
            banners={banners}
            selectedBannerId={selectedBannerId}
            onBannerSelect={handleBannerSelect}
          />

          {selectedBannerId && ( 
            <>
              <TargetSelector
                availableTargets={allPossibleTargets}
                selectedTargetId={selectedTargetId}
                onTargetSelect={handleTargetSelect}
                onSimulateUntilTarget={simulateUntilTarget}
                isSimulatingTarget={isSimulatingTarget}
                canSimulate={!!selectedBannerId && !isRolling && !isSimulatingTarget} 
              />

              <RollControls
                onRoll={handleRoll}
                isRolling={isRolling || isSimulatingTarget} 
                selectedBannerId={selectedBannerId}
              />
            </>
          )}
          
          <ResultsDisplay results={rollResults} isRolling={isRolling || isSimulatingTarget} />

          <UserStats sqSpent={sqSpent} rollHistory={rollHistory} onReset={handleResetSimulation} />
        </main>
        
        <footer className="text-center py-10 mt-12 text-xs text-gray-500">
          <p>FGO Gacha Simulator. Todos los derechos de personajes y assets pertenecen a Lasengle Inc. / ANIPLEX.</p>
          <p>Creado con fines educativos y de entretenimiento.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;