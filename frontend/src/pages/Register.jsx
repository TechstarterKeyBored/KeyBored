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
      const response = await fetch('api/register', {
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
    <div className="p-8 w-xl h-auto mt-20 mx-auto text-white rounded-lg items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 opacity-75 shadow-[0_0px_50px_10px_rgb(0,0,0,0.8)] border-black border-1">
      <h2 className="text-3xl text-amber-100 font-bold mb-8">Registrierung</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block">Benutzername</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-fuchsia-500 focus:outline-none"
            placeholder="Benutzername"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-fuchsia-500 focus:outline-none"
            placeholder="E-Mail"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-fuchsia-500 focus:outline-none"
            placeholder="Passwort"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-fuchsia-700 text-white px-6 py-2 rounded hover:bg-fuchsia-600 border-black transition-colors"
        >
          Registrieren
        </button>
      </form>
    </div>
  );
}

export default Register;