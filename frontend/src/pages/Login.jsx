import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Importiere den AuthContext, um den Login-Status zu aktualisieren

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [protectedData, setProtectedData] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); // Greife auf den AuthContext zu

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token); // Token speichern
        console.log("Gespeichertes Token:", localStorage.getItem('token'));
        setIsLoggedIn(true); // Setze den Login-Status auf true
        navigate('/'); // Weiterleitung zur Startseite
      } else {
        setError(data.message || 'Anmeldung fehlgeschlagen');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setProtectedData(null); // Wenn kein Token, setze die geschützten Daten auf null
        return;
      }

      try {
        const response = await fetch('api/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          // Wenn die Antwort einen Fehler enthält (z. B. Token ungültig oder abgelaufen)
          setIsLoggedIn(false); // Setze den Login-Status auf false
          localStorage.removeItem('token'); // Entferne den Token
          setError('Session abgelaufen oder ungültiger Token.');
          navigate('/login'); // Weiterleitung zur Login-Seite
        } else {
          setProtectedData(data); // Speichert die erhaltenen Daten im State
        }
      } catch (err) {
        console.error('Fehler beim Abrufen der geschützten Daten:', err);
        setError('Fehler beim Abrufen der geschützten Daten.');
      }
    };

    fetchProtectedData();
  }, [setIsLoggedIn, navigate]); // Effekt wird bei Änderung des Login-Status ausgeführt

  return (
    <div className="p-8 w-xl h-auto mt-20 mx-auto bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-700">Anmeldung</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="E-Mail"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Passwort"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg border-1 border-blue-600 hover:bg-blue-600"
        >
          Anmelden
        </button>
      </form>
      {/* {protectedData && <p className="mt-4 text-gray-700">Erhaltene Daten: {JSON.stringify(protectedData)}</p>} */}
    </div>
  );
}

export default Login;
