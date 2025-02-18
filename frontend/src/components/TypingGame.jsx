import React, { useState, useEffect, use } from "react";


//Definiert die zugehörigen Buchstaben den jeweiligen Positionen und Farben
const fingerZones = [
  { letters: "aqz", color: "darkorange", position: 0, label: "Kleiner Finger" },
  { letters: "wsx", color: "limegreen", position: 1, label: "Ringfinger" },
  { letters: "edc", color: "royalblue", position: 2, label: "Mittelfinger" },
  { letters: "rfvtgb", color: "#e11313", position: 3, label: "Zeigefinger" },
  { letters: "zhnujm", color: "mediumorchid", position: 4, label: "Zeigefinger" },
  { letters: "ik", color: "royalblue", position: 5, label: "Mittelfinger" },
  { letters: "ol", color: "limegreen", position: 6, label: "Ringfinger"},
  { letters: "pöüä", color: "darkorange", position: 7, label: "Kleiner Finger" },
];

const typingGame = () => {
  const [fallingLetters, setFallingLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState (parseInt(localStorage.getItem("highScore")) || 0);
  const [lives, setLives] = useState(3);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(0)

  //Countdown funktion
  useEffect(() => {
    let countdownTimer;
    if (gameStarted && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }else if (countdown === 0 && gameStarted) {
      setShowInstructions(false);
    }
    return () => clearInterval(countdownTimer);
  }, [gameStarted, countdown]);


  //Generieren von Buchstaben in den Zonen
  useEffect(() => {
    if (!isPaused && gameStarted && lives > 0) {
      const interval = setInterval(() => {
        const zone = fingerZones[Math.floor(Math.random() * fingerZones.length)];
        const letter = zone.letters[Math.floor(Math.random() * zone.letters.length)];
        const isUppperCase = Math.random() < 0.5;
        const letterToDisplay = isUppperCase
          ? letter.toUpperCase()
          : letter.toLowerCase();

        setFallingLetters((prev) => 
          [...prev,
          {
            letter: letterToDisplay,
            top: 0,
            zoneIndex: zone.position,
            id: Date.now(),
            timer: 7000,
          }],
      );
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPaused, gameStarted, lives]);


  //Lässt die Buchstaben nach unten fallen
  useEffect(() => {
    if (!isPaused && gameStarted && lives > 0) {
      const moveInterval = setInterval(() => {
        setFallingLetters((prev) => 
        prev.map((item) => ({
          ...item,
          top: item.top + 20,
          timer: item.timer - 250,
        }))
      );
      }, 250);
      return () => clearInterval(moveInterval);
    };
  }, [isPaused, gameStarted, lives]);


  //Entfernt die Buchstaben wenn sie zu weit unten sind und verringert Leben
  useEffect(() => {
    if (!isPaused && gameStarted && lives > 0) {
    const lifeLossInterval = setInterval(() => {
      setFallingLetters((prev) => {
        let newLives =lives;
        const updatedLetters = prev.filter((item) => {
          if (item.timer <= 0) {
            newLives = Math.max(newLives - 1, 0);
            return false;
          }
          return true;
        });

        if (newLives !== lives) {
          setLives(newLives);
        }

        return updatedLetters;
      });
    }, 200);
    return () => clearInterval(lifeLossInterval);
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
    }
  };

  //eventlistener für Tastatureingabe
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [score, showInstructions, isPaused, gameStarted]);

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
    <div className="relative w-3xl h-screen flex-col items-center justify-center mx-auto bg-white opacity-75">
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
            <div className="absolute top-4 left-4 text-white text-xl">
              Score: {score} | Highscore: {highScore} | Leben: {lives}
            </div>
            <div className="absolute top-4 right-4 flex gap-4">
              <button onClick={handlePause} className="bg-blue-500 text-white py-2 px-4 rounded">
                {isPaused ? "Weiter" : "Pause"}
              </button>
              <button onClick={handleRestart} className="bg-red-500 text-white py-2 px-4 rounded">Neustart</button>
            </div>
            <div className="grid grid-cols-8 w-full h-5/6 border-b-2 border-white relative">
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
            <div className="grid grid-cols-8 w-full h-20 mt-4 border-t-2 border-white">
              {fingerZones.map((zone) => (
                <div
                  key={zone.position}
                  className="flex flex-col items-center justify-center text-black font-bold"
                  style={{ backgroundColor: zone.color }}
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
export default typingGame;