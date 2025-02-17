import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          console.warn("Token ist abgelaufen, lösche es...");
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Fehler beim Token-Dekodieren:", error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
