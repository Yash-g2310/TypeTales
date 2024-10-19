import React, { useState, useEffect } from 'react';
import { Button, Container, Paper, Typography, Snackbar, Alert } from '@mui/material';
import UploadSection from '../components/UploadSection';
import TypingArea from '../components/TypingArea';
import ProgressBar from '../components/ProgressBar';
import HighlightedText from '../components/HighlightedText';
import { useDispatch, useSelector } from 'react-redux';
import { setTypingSpeed, resetTypingStats, setAccuracy } from '../store/typingSlice';

const CHUNK_SIZE = 50; // Adjust chunk size based on preference

const Home = () => {
  const [uploadedText, setUploadedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [accurateCount, setAccurateCount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false); // For completion message

  const chunks = uploadedText.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'g')) || [];
  const dispatch = useDispatch();
  const typingSpeed = useSelector((state) => state.typing.speed);
  const accuracy = (accurateCount / uploadedText.length) * 100 || 0;

  const handleTextUpload = (text) => {
    setUploadedText(text);
    setIsTypingStarted(true);
    setUserInput('');
    setCompleted(false);
    setCurrentChunkIndex(0);
    setAccurateCount(0);
    setStartTime(Date.now());
    dispatch(resetTypingStats());
  };

  const handleReset = () => {
    setUploadedText('');
    setUserInput('');
    setIsTypingStarted(false);
    setCompleted(false);
    setCurrentChunkIndex(0);
    setAccurateCount(0);
    clearInterval(timer);
    dispatch(resetTypingStats());
  };

  const handleInputChange = (input) => {
    setUserInput(input);

    const currentChunk = chunks[currentChunkIndex];
    let correctChars = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === currentChunk[i]) {
        correctChars++;
      }
    }
    setAccurateCount(accurateCount + correctChars);
    dispatch(setAccuracy(accurateCount + correctChars));

    if (input === currentChunk) {
      if (currentChunkIndex < chunks.length - 1) {
        setCurrentChunkIndex(currentChunkIndex + 1);
        setUserInput('');
      } else {
        setCompleted(true);
        clearInterval(timer);
        calculateTypingSpeed();
        setOpenSnackbar(true); // Show completion message
      }
    }
  };

  const calculateTypingSpeed = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    const totalTypedChars = uploadedText.length;
    const speed = (totalTypedChars / timeTaken) * 60;
    dispatch(setTypingSpeed(Math.round(speed)));
  };

  useEffect(() => {
    if (isTypingStarted && !completed) {
      setTimer(setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = Math.round((userInput.length / 5) / (elapsed / 60));
        dispatch(setTypingSpeed(speed));
      }, 1000));
    }

    return () => clearInterval(timer);
  }, [isTypingStarted, completed, userInput, startTime, dispatch]);

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper elevation={3} className="p-6 shadow-lg">
        <Typography variant="h4" className="mb-4 text-center">
          Welcome to Type Tales!
        </Typography>
        <Typography variant="body1" className="mb-6 text-center">
          Improve your typing speed and reading skills with a fun and interactive experience. 
          Start by uploading a PDF or pasting text, and begin your typing journey.
        </Typography>

        {isTypingStarted ? (
          <div>
            <ProgressBar userInput={userInput} textToType={uploadedText} totalText={uploadedText} />
            <ProgressBar userInput={userInput} textToType={chunks[currentChunkIndex]} />
            <HighlightedText textToType={chunks[currentChunkIndex]} userInput={userInput} />
            <TypingArea
              text={chunks[currentChunkIndex]}
              onReset={handleReset}
              onInputChange={handleInputChange}
            />
            <Typography variant="h6" className="mt-4">
              Typing Speed: {typingSpeed} CPM | Accuracy: {accuracy.toFixed(2)}%
            </Typography>
            {completed && (
              <Typography variant="h5" className="text-green-500 mt-4">
                Congrats! You’ve completed the text. Your typing speed is {typingSpeed} CPM!
              </Typography>
            )}
          </div>
        ) : (
          <UploadSection onTextUpload={handleTextUpload} />
        )}
      </Paper>

      {/* Snackbar for completion message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          🎉 Congratulations! You've completed the typing exercise!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
