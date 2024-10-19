import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import UploadSection from './components/UploadSection';
import TypingArea from './components/TypingArea';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [textToType, setTextToType] = useState('');

  const handleTextUpload = (text) => {
    setTextToType(text);
  };

  const handleReset = () => {
    setTextToType('');
  };

  return (
    <>
      {isLoggedIn && <Navbar navigate={navigate} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/typing"
              element={
                textToType ? (
                  <TypingArea text={textToType} onReset={handleReset} />
                ) : (
                  <UploadSection onTextUpload={handleTextUpload} />
                )
              }
            />
          </>
        ) : (
          <Route path="/login" element={<AuthForm />} />
        )}
      </Routes>
    </>
  );
};

export default App;
