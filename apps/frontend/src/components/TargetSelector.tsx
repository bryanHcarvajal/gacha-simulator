import React from 'react';
import type { GachaItem } from '../types/gacha';

// Definir la interfaz de props aquí
interface TargetSelectorProps {
  availableTargets: GachaItem[];
  selectedTargetId: string | null;
  onTargetSelect: (id: string | null) => void;
  onSimulateUntilTarget: () => void;
  isSimulatingTarget: boolean;
  canSimulate: boolean;
}

const TargetSelector: React.FC<TargetSelectorProps> = ({
  availableTargets, 
  selectedTargetId,
  onTargetSelect,
  onSimulateUntilTarget,
  isSimulatingTarget,
  canSimulate,
}) => {
  if (!availableTargets.length && !isSimulatingTarget) return null;

  return (
    <section className="bg-brand-surface p-6 rounded-xl shadow-2xl">
      <h3 className="text-xl font-semibold mb-4 text-center text-green-400">Objetivo de Invocación</h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <select
          value={selectedTargetId || ''}
          onChange={(e) => onTargetSelect(e.target.value || null)}
          className="w-full sm:w-auto p-3 border border-gray-600 bg-[#2a2a4a] text-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-60"
          disabled={isSimulatingTarget}
        >
          <option value="" className="bg-[#1e1e3f] text-gray-400">-- Selecciona Objetivo --</option>
          {availableTargets.map((target: GachaItem) => ( 
            <option key={target.id} value={target.id} className="bg-[#1e1e3f]">
              {target.name} ({target.rarity}★ {target.type})
            </option>
          ))}
        </select>
        <button
          onClick={onSimulateUntilTarget}
          disabled={!selectedTargetId || isSimulatingTarget || !canSimulate}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          {isSimulatingTarget ? 'Simulando...' : 'Simular hasta Obtener'}
        </button>
      </div>
      {isSimulatingTarget && (
        <p className="text-center mt-4 text-yellow-400 animate-pulse">
          Buscando objetivo... Esto puede tardar.
        </p>
      )}
    </section>
  );
};
export default TargetSelector;