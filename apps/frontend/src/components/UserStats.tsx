import React from 'react';
import type { RollResult } from '../types/gacha'; 
import { Rarity, CardType } from '../types/gacha';

interface UserStatsProps {
  sqSpent: number;
  rollHistory: RollResult[][];
  onReset: () => void;
}

const UserStats: React.FC<UserStatsProps> = ({ sqSpent, rollHistory, onReset }) => { 
  const allObtainedItems: RollResult[] = rollHistory.flat();

  const counts = {
    totalRolls: allObtainedItems.length,
    servants: {
      [Rarity.SSR]: 0,
      [Rarity.SR]: 0,
      [Rarity.R]: 0,
      total: 0,
    },
    ces: {
      [Rarity.SSR]: 0,
      [Rarity.SR]: 0,
      [Rarity.R]: 0,
      total: 0,
    },
  };

  allObtainedItems.forEach(item => {
    if (item.type === CardType.SERVANT) {
      counts.servants[item.rarity]++;
      counts.servants.total++;
    } else {
      counts.ces[item.rarity]++;
      counts.ces.total++;
    }
  });

  const ssrServantRate = counts.servants.total > 0 && counts.servants[Rarity.SSR] > 0 ? (counts.servants[Rarity.SSR] / counts.totalRolls * 100).toFixed(2) : "0.00";
  const srServantRate = counts.servants.total > 0 && counts.servants[Rarity.SR] > 0 ? (counts.servants[Rarity.SR] / counts.totalRolls * 100).toFixed(2) : "0.00";
  const totalServantRate = counts.totalRolls > 0 ? (counts.servants.total / counts.totalRolls * 100).toFixed(2) : "0.00";


    return (
    <section className="bg-brand-surface p-6 rounded-xl shadow-2xl">
      <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-brand-secondary">
        Estadísticas de Invocación
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-[#2a2a4a] rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-300">SQ Gastados:</p>
          <p className="text-4xl font-bold text-brand-primary">{sqSpent}</p>
        </div>
        <div className="p-4 bg-[#2a2a4a] rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-300">Tiradas Totales:</p>
          <p className="text-4xl font-bold text-brand-primary">{counts.totalRolls}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="p-4 bg-[#2a2a4a] rounded-lg">
          <h4 className="text-xl font-semibold mb-3 text-purple-400">Servants Obtenidos <span className="text-sm text-gray-500">({counts.servants.total})</span></h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><strong className="text-fgo-gold">5★ SSR:</strong> {counts.servants[Rarity.SSR]} (Tasa: {ssrServantRate}%)</li>
            <li><strong className="text-fgo-silver">4★ SR:</strong> {counts.servants[Rarity.SR]} (Tasa: {srServantRate}%)</li>
            <li><strong className="text-fgo-bronze">3★ R:</strong> {counts.servants[Rarity.R]}</li>
          </ul>
           <p className="mt-3 text-sm font-medium text-purple-300">Tasa Total de Servants: {totalServantRate}%</p>
        </div>

        <div className="p-4 bg-[#2a2a4a] rounded-lg">
          <h4 className="text-xl font-semibold mb-3 text-teal-400">Craft Essences <span className="text-sm text-gray-500">({counts.ces.total})</span></h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><strong className="text-fgo-gold">5★ SSR:</strong> {counts.ces[Rarity.SSR]}</li>
            <li><strong className="text-fgo-silver">4★ SR:</strong> {counts.ces[Rarity.SR]}</li>
            <li><strong className="text-fgo-bronze">3★ R:</strong> {counts.ces[Rarity.R]}</li>
          </ul>
        </div>
      </div>

      {sqSpent > 0 && (
         <div className="mt-10 text-center">
            <button
                onClick={onReset}
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
                Reiniciar Simulación
            </button>
         </div>
      )}
    </section>
  );
};
export default UserStats;