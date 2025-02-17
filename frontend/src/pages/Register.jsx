// 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/login'); // Weiterleitung zur Anmeldeseite
      } else {
        setError(data.message || 'Registrierung fehlgeschlagen');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };

  return (
    <div className="p-8 w-xl h-auto mt-20 mx-auto bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-8">Registrierung</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Benutzername</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Benutzername"
            required
          />
        </div>
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
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Registrieren
        </button>
      </form>
    </div>
  );
}

export default Register;