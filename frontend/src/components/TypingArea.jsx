import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import ProgressBar from './ProgressBar';
import HighlightedText from './HighlightedText';

const CHUNK_SIZE = 50; // Adjust chunk size based on preference

const TypingArea = ({ text, onReset }) => {
  const [userInput, setUserInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [chunks, setChunks] = useState([]);

  // Split text into chunks when the text is passed in
  useEffect(() => {
    setChunks(text.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'g')) || []);
    setCurrentChunkIndex(0); // Reset chunk index
    setUserInput(''); // Reset user input
    setCompleted(false); // Reset completion status
  }, [text]);

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

    // Check if the current input matches the current chunk
    if (input === chunks[currentChunkIndex]) {
      if (currentChunkIndex < chunks.length - 1) {
        setCurrentChunkIndex(currentChunkIndex + 1); // Move to next chunk
        setUserInput(''); // Reset user input for the next chunk
      } else {
        setCompleted(true); // Mark as completed if it's the last chunk
      }
    }
  };

  return (
    <div className="space-y-4">
      <Typography variant="h6">Type the following text chunk:</Typography>
      <Typography className="p-2 bg-gray-100 rounded">{chunks[currentChunkIndex]}</Typography>
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
        <ProgressBar userInput={userInput} textToType={chunks[currentChunkIndex]} />
        <Typography variant="h6" className="mt-2">Words Per Minute: {wpm}</Typography>
      </div>
      <HighlightedText textToType={chunks[currentChunkIndex]} userInput={userInput} />
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
