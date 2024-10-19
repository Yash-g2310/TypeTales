import React from 'react';

const ProgressBar = ({ userInput = '', textToType = '' }) => {
  // Avoid division by zero if textToType is empty
  const progress = textToType.length > 0 ? (userInput.length / textToType.length) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded h-2 mt-2">
      <div
        style={{ width: `${progress}%` }}
        className="bg-green-500 h-full rounded transition-all duration-300"
      ></div>
    </div>
  );
};

export default ProgressBar;
