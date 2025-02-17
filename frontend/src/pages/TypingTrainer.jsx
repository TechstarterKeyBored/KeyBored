import React from "react";
import { useNavigate } from "react-router-dom";
import WordTrainer from "../components/WordTrainer/";
import TypingGame from "../components/TypingGame/";

function TypingTrainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 p-10 w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white">Willkommen auf TypingTrainer</h1>
      <p className="text-white">
        Hier kannst du zwischen unseren 2 Modis auswählen. Wenn du neu bist in der Welt des
        10-Finger-Typings, dann empfehle ich dir, mit unserem TypingGame zu starten, 
        um dich mit der Belegung der Tasten vertraut zu machen.
      </p>
      <div className="flex flex-row gap-5">
        <button
          onClick={() => navigate("/TypingGame")}
          className="w-96 bg-blue-500 text-white rounded-lg text-4xl font-bold"
        >
          TypingGame
        </button>
        <button
          onClick={() => navigate("/WordTrainer")}
          className="w-96 bg-blue-500 text-white rounded-lg text-4xl font-bold"
        >
          WordTrainer
        </button>
      </div>
    </div>
  );
}

export default TypingTrainer;

