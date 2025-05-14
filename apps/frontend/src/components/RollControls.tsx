import React from 'react';

interface RollControlsProps {
  onRoll: (isMulti: boolean) => void;
  isRolling: boolean;
  selectedBannerId: string | null;
}

const RollControls: React.FC<RollControlsProps> = ({ onRoll, isRolling, selectedBannerId }) => {
  const disabled = isRolling || !selectedBannerId;
  return (
    <div className="my-6 flex justify-center space-x-4">
      <button
        onClick={() => onRoll(false)}
        disabled={disabled}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Single Roll (3 SQ)
      </button>
      <button
        onClick={() => onRoll(true)}
        disabled={disabled}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Multi Roll (30 SQ)
      </button>
    </div>
  );
};

export default RollControls;