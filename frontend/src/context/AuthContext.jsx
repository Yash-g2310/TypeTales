// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = (userData) => {
        setIsLoggedIn(true);
        // Here, you can also store user data in localStorage or state management libraries if needed.
        navigate('/');
    };

    const logout = () => {
        setIsLoggedIn(false);
        navigate('/login');
        // Clear user data if stored in localStorage or state management libraries.
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
