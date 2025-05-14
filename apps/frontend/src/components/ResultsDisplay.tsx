import React from 'react';
import type { RollResult } from '../types/gacha';
import Card from './Card';

interface ResultsDisplayProps {
  results: RollResult[];
  isRolling: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isRolling }) => {
  const messageContainerClasses = "py-10 min-h-[200px] flex items-center justify-center text-center";

  if (isRolling) {
    return <div className={messageContainerClasses}><p className="text-2xl text-yellow-400 animate-pulse">Invocando Espíritus Heroicos...</p></div>;
  }

  if (!results.length) {
    return <div className={messageContainerClasses}><p className="text-gray-500">Realiza una tirada para ver los resultados.</p></div>;
  }

  return (
    <section className="bg-brand-surface p-4 sm:p-6 rounded-xl shadow-2xl">
      <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-brand-primary">
        Resultados de la Invocación
      </h3>
      {}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {results.map((item, index) => (
          <Card key={`${item.id}-${index}-${Math.random()}`} item={item} />
        ))}
      </div>
    </section>
  );
};
export default ResultsDisplay;