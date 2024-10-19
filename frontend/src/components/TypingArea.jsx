import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import ProgressBar from './ProgressBar';
import HighlightedText from './HighlightedText';

const TypingArea = ({ text, onReset }) => {
  const [userInput, setUserInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);

  // Start timer when the user starts typing
  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [userInput, startTime]);

  // Calculate WPM every second
  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 60000; // convert ms to minutes
        setWpm(Math.round((userInput.length / 5) / elapsedTime)); // Approx. 5 chars = 1 word
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, userInput]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input === text) {
      setCompleted(true);
    }
  };

  return (
    <div className="space-y-4">
      <Typography variant="h6">Type the following text:</Typography>
      <Typography className="p-2 bg-gray-100 rounded">{text}</Typography>
      <TextField
        label="Start typing here"
        multiline
        rows={6}
        value={userInput}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
      />
      <div className="mt-4">
        <ProgressBar userInput={userInput} textToType={text} />
        <Typography variant="h6" className="mt-2">Words Per Minute: {wpm}</Typography>
      </div>
      <HighlightedText textToType={text} userInput={userInput} />
      {completed ? (
        <Typography variant="h5" className="text-green-500">
          Congrats! You’ve completed the text.
        </Typography>
      ) : (
        <Typography variant="body1">
          Keep going! You can do it.
        </Typography>
      )}
      <Button variant="contained" color="secondary" onClick={onReset}>
        Reset and Upload Again
      </Button>
    </div>
  );
};

export default TypingArea;
