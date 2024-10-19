import React from 'react';

const HighlightedText = ({ textToType, userInput }) => {
  const getHighlightedText = () => {
    return textToType.split('').map((char, index) => {
      if (index < userInput.length) {
        const isCorrect = userInput[index] === char;
        return (
          <span
            key={index}
            className={`${
              isCorrect ? 'text-green-600' : 'text-red-600'
            } font-bold`}
          >
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>; // No highlight for untyped characters
    });
  };

  return <div className="mt-2">{getHighlightedText()}</div>;
};

export default HighlightedText;
