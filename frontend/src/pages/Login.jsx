import React from 'react';

function Login() {
  return (
    <div className="p-8 w-xl h-auto mt-20 mx-auto bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-700">Anmeldung</h2>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">E-Mail</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="E-Mail"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Passwort</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Passwort"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg border-1 border-blue-600 hover:bg-blue-600"
        >
          Anmelden
        </button>
      </form>
    </div>
  );
}

export default Login;