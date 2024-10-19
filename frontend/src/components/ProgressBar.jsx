import React from 'react';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

const ProgressBar = ({ userInput = '', textToType = '' }) => {
  const progress = textToType.length > 0 ? (userInput.length / textToType.length) * 100 : 0;

  return (
    <Tooltip title={`${Math.round(progress)}%`} arrow>
      <div className="w-full bg-gray-200 rounded h-2 mt-2">
        <motion.div
          style={{ width: `${progress}%` }}
          className="bg-green-500 h-full rounded transition-all duration-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        ></motion.div>
      </div>
    </Tooltip>
  );
};

export default ProgressBar;
