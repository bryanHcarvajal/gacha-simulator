import React from 'react';

interface RollControlsProps {
  onRoll: (isMulti: boolean) => void;
  isRolling: boolean;
  selectedBannerId: string | null;
}

const RollControls: React.FC<RollControlsProps> = ({ onRoll, isRolling, selectedBannerId }) => {
  const disabled = isRolling || !selectedBannerId;
  return (
    <section className="bg-brand-surface p-6 rounded-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={() => onRoll(false)}
          disabled={disabled}
          className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75"
        >
          Single Roll (3 SQ)
        </button>
        <button
          onClick={() => onRoll(true)}
          disabled={disabled}
          className="w-full sm:w-auto px-8 py-3 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75"
        >
          Multi Roll (30 SQ)
        </button>
      </div>
    </section>
  );
};
export default RollControls;