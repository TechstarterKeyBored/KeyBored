import React from "react";
import { useNavigate } from "react-router-dom";
import KaraokeTrainer from "../components/KaraokeTrainer/";
import TypingGame from "../components/TypingGame/";

function TypingTrainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 p-10 w-4xl mx-auto">
      <h1 className="text-4xl font-semibold text-amber-100 mt-10">Willkommen im TypingTrainer</h1>
      <p className="text-white p-4 text-md text-center mt-2">
        Hier kannst du zwischen unseren 2 Modis auswählen. Wenn du neu bist in der Welt des
        10-Finger-Typings, dann empfehle ich dir, mit unserem TypingGame zu starten, 
        um dich mit der Belegung der Tasten vertraut zu machen.
      </p>
      <div className="flex flex-row gap-5 mt-10">
        <button
          onClick={() => navigate("/TypingGame")}
          className="w-96 h-20 text-amber-100 font-bold text-xl p-3 bg-gray-900 border-1 border-black rounded-2xl shadow-fuchsia-950 shadow-lg hover:scale-104 hover:shadow-xl transition-all mt-4"
        >
          TypingGame
        </button>
        <button
          onClick={() => navigate("/KaraokeTrainer")}
          className="w-96 h-20 text-amber-100 font-bold text-xl p-3 bg-gray-900 border-1 border-black rounded-2xl shadow-fuchsia-950 shadow-lg hover:scale-104 hover:shadow-xl transition-all mt-4"
        >
          KaraokeGame
        </button>
      </div>
    </div>
  );
}

export default TypingTrainer;

