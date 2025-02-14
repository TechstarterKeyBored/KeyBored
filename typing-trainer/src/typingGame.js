import React, { useState, useEffect, use } from "react";


//Definiert die zugehörigen Buchstaben den jeweiligen Positionen und Farben
const fingerZones = [
  {letters: "aqz", color: "brown", position: 0}, //Linker kleiner Finger
  {letters: "wsx", color: "green", position: 1}, //Linker Ringfinger
  {letters: "edc", color: "blue", position: 2}, //Linker Mittelfinger
  {letters: "rfvtgb", color: "red", position: 3}, //Linker Zeigefinger
  {letters: "zhnujm", color: "purple", position: 4}, // Rechter Zeigefinger
  {letters: "ik", color: "blue", position: 5}, // Rechter Mittelfinger
  {letters: "ol", color: "green", position: 6}, //Rechter Ringfinger
  {letters: "pöüä", color: "brown", position: 7}, // Rechter kleiner Finger
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
        const letter = zone.letter[Math.floor(Math.random() * zone.letters.length)];
        const isUppperCase = Math.random() < 0.5;
        const letterToDisplay = isUppperCase
        ? letter.toUpperCase()
        : letter.toLowerCase();

        setFallingLetters((prav) => [
          ...prev,
          {
            letter: letterToDisplay,
            top: 0,
            zoneIndex: zone.position,
            id: Date.now(),
            timer: 7000,
          },
        ]);
      }, 2500);
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
          top: item.top + 2,
          timer: item.timer - 200,
        }))
      );
      }, 200);
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
    <div className="relative w-full h-screen bg-gray-900 flex-col items-center justify-center">
      {gameStarted ? (
        countdown > 0 ? (
          <div className="absolute bg-gray-800 text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Mach dich bereit!</h2>
            <p className="text-4xl">{countdown}</p>
          </div>
        ) : lives === 0? (
          <div className="absolute bg-red-700 text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Gamer Over</h2>
            <p className="text-xl">Score: {score}</p>
            <p className="text-xl">Highscore: {highScore}</p>
            <button onClick={handleRestart}
            className="mt-4 bg-green-500 text-white py-2 px-6 rounded">Neustarten</button>
          </div>
        ) : (
          <>
          <div className="absolute top-4 left-4 text-white text-xl">
            Score: {score} | Highscore: {highScore} | Leben: {lives}
          </div>
          <div className="grid grid-cols-8 w-full h-5/6 border-b-2 border-white relative">
          {fallingLetters.map((item) => (
            <div
            key={item.id}
            className="absolute text-2xl font-bold"
            style={{
              top: `${item.top}px`,
              left: `${item.zoneIndex * 12.5}%`,
              color: fingerZones[item.zoneIndex].color,
            }}
            >
              {item.letter}
            </div>
          ))}
          </div>
          <div className="absolute bottom-10 flex gap-4">
            <button onclick={handlePause} className="bg-blue-500 text-white py-2 px-4 rounded">
              {isPaused ? "Weiter" : "Pause"}
            </button>
            <button onClick={handleRestart} className="bg-red-500 text-white py-2 px-4 rounded">Neustart</button>
          </div>
          </>
        )
        ):(
          <div className="absolute bg-gray-800 text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Typing Trainer</h2>
            <p>Positioniere deine Finger auf der Tastatur!</p>
            <p> Linke Hand: Kleiner Finger - A, Ringfinger - S, Mittelfinger - D, Zeigefinger - F</p>
            <p> Rechte Hand:Kleiner Finger - Ö, Ringfinger - L, Mittelfinger - K, Zeigefinger - J</p>
            <button onClick={handleRestart} className="mt-4 bg-green-500 text-white py-2 px-6 rounded">Spiel Starten</button>
          </div>
        )}
        </div>
        );
};

export default typingGame;