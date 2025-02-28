import React, { useState, useEffect, useRef } from "react";

//Definiert die zugehörigen Buchstaben den jeweiligen Positionen und Farben
const fingerZones = [
  { letters: "aqy", color: "#FADA7A", position: 0, label: "Kleiner Finger" },
  { letters: "wsx", color: "#A6F1E0", position: 1, label: "Ringfinger" },
  { letters: "edc", color: "#87A2FF", position: 2, label: "Mittelfinger" },
  { letters: "rfvtgb", color: "#DE3163", position: 3, label: "Zeigefinger" },
  { letters: "zhnujm", color: "#DE3163", position: 4, label: "Zeigefinger" },
  { letters: "ik", color: "#87A2FF", position: 5, label: "Mittelfinger" },
  { letters: "ol", color: "#A6F1E0", position: 6, label: "Ringfinger" },
  { letters: "pöüä", color: "#FADA7A", position: 7, label: "Kleiner Finger" },
];

const TypingGame = () => {
  const [fallingLetters, setFallingLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem("highScore")) || 0);
  const [lives, setLives] = useState(3);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const gameAreaRef = useRef(null);
  const [activeZones, setActiveZones] = useState([]);

  //Countdown funktion
  useEffect(() => {
    if (gameStarted && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, countdown]);

  //Generieren von Buchstaben in den Zonen
  useEffect(() => {
    if (!isPaused && gameStarted && lives > 0) {
      const interval = setInterval(() => {
        const zone = fingerZones[Math.floor(Math.random() * fingerZones.length)];
        const letter = zone.letters[Math.floor(Math.random() * zone.letters.length)];
        const isUpperCase = Math.random() < 0.5;
        const letterToDisplay = isUpperCase
          ? letter.toUpperCase()
          : letter.toLowerCase();

        setFallingLetters((prev) => {
          // Begrenze die Anzahl der fallenden Buchstaben
          if (prev.length >= 10) return prev;
          return [
            ...prev,
            {
              letter: letterToDisplay,
              top: 0,
              zoneIndex: zone.position,
              id: `${Date.now()}-${Math.random()}`,
            },
          ];
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPaused, gameStarted, lives]);

  useEffect(() => {
    if (!isPaused && gameStarted && lives > 0) {
      const moveInterval = setInterval(() => {
        setFallingLetters((prev) => {
          return prev
            .map((item) => ({ ...item, top: item.top + 15 }))
            .filter((item) => {
              if (gameAreaRef.current) {
                const gameAreaHeight = gameAreaRef.current.offsetHeight || 600;
                if (item.top >= gameAreaHeight - 50) {
                  setLives((prevLives) => Math.max(prevLives - 1, 0));
                  return false;
                }
              }
              return true;
            });
        });
      }, 250);
      return () => clearInterval(moveInterval);
    }
  }, [isPaused, gameStarted, lives]);

  //Tastatureingabe
  const handleKeyPress = (event) => {
    if (!isPaused && gameStarted && lives > 0) {
      setFallingLetters((prev) => {
        const index = prev.findIndex((item) => item.letter === event.key);
        if (index !== -1) {
          const newScore = score + 1;
          setScore(newScore);  
          //Highscore
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("highScore", newScore);
          }
          return prev.filter((_, i) => i !== index);
        }
        return prev;
      });
      const zone = fingerZones.find((z) => z.letters.includes(event.key.toLowerCase()));
      if (zone){
        setActiveZones((prev) => [...new Set([...prev, zone.position])]);
      }
    }
  };

  const handleKeyRelease = (event) => {
    const zone = fingerZones.find((z) => z.letters.includes(event.key.toLowerCase()));
    if (zone) {
      setActiveZones((prev) => prev.filter((pos) => pos !== zone.position));
    }
  };

  //eventlistener für Tastatureingabe
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [handleKeyPress, handleKeyRelease]);

  //Pausieren und Fortsetzen des Spiels
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  //Setzt alles zurück
  const handleRestart = () => {
    setFallingLetters([]);
    setScore(0);
    setLives(3);
    setShowInstructions(true);
    setIsPaused(false);
    setGameStarted(false);
    setCountdown(0);
  };

  const handleStart = () => {
    setGameStarted(true);
    setCountdown(3);
  };

  return (
    <div className="relative z-40 w-[70%] h-[78vh] mt-5 p-2 rounded-lg items-center justify-center mx-auto bg-gradient-to-br from-gray-900 to-gray-700 opacity-75 shadow-[0_0px_50px_10px_rgb(0,0,0,0.8)] border">
      {gameStarted ? (
        countdown > 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Mach dich bereit!</h2>
            <p className="text-4xl">{countdown}</p>
          </div>
        ) : lives === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 text-white p-6 w-50 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Game Over</h2>
            <p className="text-xl">Score: {score}</p>
            <p className="text-xl">Highscore: {highScore}</p>
            <button onClick={handleRestart} className="mt-4 bg-green-500 text-white py-2 px-6 rounded">Neustarten</button>
          </div>
        ) : (
          <>
            <div className="absolute z-50 top-2 rounded-lg right-4 font-bold bg-gray-700 p-2 text-white text-xl">
              Score: {score} | Highscore: {highScore} | Leben: {lives}
            </div>
            <div className="absolute top-4 left-30 transform -translate-x-1/2 flex gap-4 z-999">
              <button onClick={handlePause} className="bg-[#37a0fd] text-white py-2 px-4 rounded">
                {isPaused ? "Weiter" : "Pause"}
              </button>
              <button onClick={handleRestart} className="bg-[#ff133a] text-white py-2 px-4 rounded">Neustart</button>
            </div>
            <div ref={gameAreaRef} className="grid grid-cols-8 w-full h-[70%] border-white relative">
              {fallingLetters.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-3xl font-semibold [text-shadow:_0_5px_4px_rgb(99_102_241_/_0.5)]"
                  style={{
                    top: `${item.top}px`,
                    left: `calc(${item.zoneIndex * 12.5}% + 6.25%)`,
                    color: fingerZones[item.zoneIndex].color,
                  }}
                >
                  {item.letter}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-0.5 w-full h-20 mt-15 shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.8)]">
              {fingerZones.map((zone) => (
                <div
                  key={zone.position}
                  className="flex flex-col items-center justify-center text-black font-semibold devide-dashed border border-dotted"
                  style={{ backgroundColor: zone.color, borderRadius:"6px", filter: activeZones.includes(zone.position) ? "brightness(1.5)" : "brightness(1)"}}
                >
                  {zone.label}
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 w-2xl rounded-lg text-center mx-auto mt-10">
          <h2 className="text-amber-100 text-3xl font-bold text mb-4">Typing Game</h2>
          <h2 className="text-amber-50 text-1xl mb-4">Positioniere deine Finger auf der Tastatur!</h2>
          <p> Linke Hand: Kleiner Finger - A, Ringfinger - S, Mittelfinger - D, Zeigefinger - F</p>
          <p> Rechte Hand: Kleiner Finger - Ö, Ringfinger - L, Mittelfinger - K, Zeigefinger - J</p>
          <button onClick={handleStart} className="mt-4 bg-green-500 text-white py-2 px-6 rounded">Spiel Starten</button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;