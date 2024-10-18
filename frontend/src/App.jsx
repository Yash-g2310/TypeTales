import React from 'react';
import AuthForm from './pages/AuthForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
    <Router>
      {isLoggedIn && <Navbar/>}  
      <Routes>
        {isLoggedIn?(
          <>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>}/>
          </>
        ):(
          <Route path='/login' element={<div className="h-screen flex justify-center items-center ">
            <></>
            <AuthForm />
          </div>}/>
        )}
      </Routes>   
    </Router>
    {/* <div >
      <Navbar />
      <div className="h-screen flex justify-center items-center ">
        <AuthForm />
      </div> 
    </div> */}
    </>
  );
};

export default App;
