import React, { useState, useEffect, useRef } from "react";

//Definiert die zugehörigen Buchstaben den jeweiligen Positionen und Farben
const fingerZones = [
  { letters: "aqy", color: "#FADA7A", position: 0, label: "Kleiner Finger" },
  { letters: "wsx", color: "#A6F1E0", position: 1, label: "Ringfinger" },
  { letters: "edc", color: "#B2A5FF", position: 2, label: "Mittelfinger" },
  { letters: "rfvtgb", color: "#DE3163", position: 3, label: "Zeigefinger" },
  { letters: "zhnujm", color: "#DE3163", position: 4, label: "Zeigefinger" },
  { letters: "ik", color: "#B2A5FF", position: 5, label: "Mittelfinger" },
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
    <div className="relative w-[70%] h-[83vh] flex-col items-center justify-center mx-auto bg-gray-800  opacity-75 shadow-2xl">
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
            <div className="absolute top-4 left-4 font-bold text-white text-xl">
              Score: {score} | Highscore: {highScore} | Leben: {lives}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-999">
              <button onClick={handlePause} className="bg-blue-500 text-white py-2 px-4 rounded">
                {isPaused ? "Weiter" : "Pause"}
              </button>
              <button onClick={handleRestart} className="bg-red-500 text-white py-2 px-4 rounded">Neustart</button>
            </div>
            <div ref={gameAreaRef} className="grid grid-cols-8 w-full h-[70%] border-white relative">
              {fallingLetters.map((item) => (
                <div
                  key={item.id}
                  className="absolute text-2xl font-bold"
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
            <div className="grid grid-cols-8 w-full h-20 mt-4 border-t-2 border-s-violet-200 border-white">
              {fingerZones.map((zone) => (
                <div
                  key={zone.position}
                  className="flex flex-col items-center justify-center text-black font-bold"
                  style={{ backgroundColor: zone.color, borderRadius:"12px", filter: activeZones.includes(zone.position) ? "brightness(1.5)" : "brightness(1)"}}
                >
                  {zone.label}
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 w-2xl rounded-lg text-center mx-auto mt-10">
          <h2 className="text-amber-100 text-3xl font-bold text mb-4">Typing Trainer</h2>
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