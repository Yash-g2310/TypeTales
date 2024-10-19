import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import UploadSection from '../components/UploadSection';
import TypingArea from '../components/TypingArea';
import ProgressBar from '../components/ProgressBar';
import HighlightedText from '../components/HighlightedText';

const Home = () => {
  const [uploadedText, setUploadedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleTextUpload = (text) => {
    setUploadedText(text);
    setIsTypingStarted(true);
    setUserInput(''); // Reset user input when starting new typing session
    setCompleted(false); // Reset completion status
  };

  const handleReset = () => {
    setUploadedText('');
    setUserInput('');
    setIsTypingStarted(false);
    setCompleted(false);
  };

  const handleInputChange = (input) => {
    setUserInput(input);
    if (input === uploadedText) {
      setCompleted(true);
    }
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" className="mb-4">
          Welcome to Type Tales!
        </Typography>
        <Typography variant="body1" className="mb-6">
          Improve your typing speed and reading skills with a fun and interactive experience. 
          Start by uploading a PDF or pasting text, and begin your typing journey.
        </Typography>

        {isTypingStarted ? (
          <div>
            {/* Display the progress bar */}
            <ProgressBar userInput={userInput} textToType={uploadedText} />
            {/* Display highlighted text */}
            <HighlightedText textToType={uploadedText} userInput={userInput} />
            {/* Typing area with input change handler */}
            <TypingArea text={uploadedText} onReset={handleReset} onInputChange={handleInputChange} />
            {completed && (
              <Typography variant="h5" className="text-green-500 mt-4">
                Congrats! You’ve completed the text.
              </Typography>
            )}
          </div>
        ) : (
          <UploadSection onTextUpload={handleTextUpload} />
        )}
      </Paper>
    </Container>
  );
};

export default Home;
