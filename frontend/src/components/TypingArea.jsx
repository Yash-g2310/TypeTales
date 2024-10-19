import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Snackbar } from '@mui/material';
import ProgressBar from './ProgressBar';
import HighlightedText from './HighlightedText';
import { ToastContainer, toast } from 'react-toastify';

const CHUNK_SIZE = 50;

const TypingArea = ({ text, onReset }) => {
  const [userInput, setUserInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    setChunks(text.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'g')) || []);
    setCurrentChunkIndex(0);
    setUserInput('');
    setCompleted(false);
  }, [text]);

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [userInput, startTime]);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 60000;
        setWpm(Math.round((userInput.length / 5) / elapsedTime));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, userInput]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input === chunks[currentChunkIndex]) {
      if (currentChunkIndex < chunks.length - 1) {
        setCurrentChunkIndex(currentChunkIndex + 1);
        setUserInput('');
      } else {
        setCompleted(true);
        toast.success('Congrats! You’ve completed the text.', { position: "top-center" });
      }
    }
  };

  return (
    <div className="space-y-4">
      <Typography variant="h6">Type the following text chunk:</Typography>
      <Typography className="p-2 bg-gray-100 rounded border border-gray-300">
        {chunks[currentChunkIndex]}
      </Typography>
      <TextField
        label="Start typing here"
        multiline
        rows={6}
        value={userInput}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        placeholder="Type here..."
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
      <ToastContainer />
    </div>
  );
};

export default TypingArea;
