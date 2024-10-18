import React from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div >
      <Navbar />
      <div className="h-screen flex justify-center items-center ">
        <AuthForm />
      </div> 
    </div>
  );
};

export default App;
