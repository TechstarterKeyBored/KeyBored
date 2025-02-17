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
        const currentTime = Date.now() / 1000; // Zeit in Sekunden

        // Überprüfen, ob der Token noch gültig ist
        if (decoded.exp > currentTime) {
          setIsLoggedIn(true); // Token ist gültig, bleib eingeloggt
        } else {
          console.warn("Token ist abgelaufen, lösche es...");
          localStorage.removeItem('token');
          setIsLoggedIn(false); // Setze den Login-Status zurück
        }
      } catch (error) {
        console.error("Fehler beim Token-Dekodieren:", error);
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Fehler beim Dekodieren, setze den Login-Status zurück
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
