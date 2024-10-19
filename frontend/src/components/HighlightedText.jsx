import React from 'react';
import { motion } from 'framer-motion';

const HighlightedText = ({ textToType = '', userInput = '' }) => {
  const getHighlightedText = () => {
    if (!textToType) {
      return <span>No text available to type.</span>;
    }

    return textToType.split('').map((char, index) => {
      const isTyped = index < userInput.length;
      const isCorrect = isTyped && userInput[index] === char;

      return (
        <motion.span
          key={index}
          className={`font-bold ${isTyped ? (isCorrect ? 'text-green-600' : 'text-red-600') : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return <div className="mt-2">{getHighlightedText()}</div>;
};

export default HighlightedText;
