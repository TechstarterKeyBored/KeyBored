import React, { useState, useEffect } from "react";

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
  const [showInstructions, setShowInstructions] = useState(true);

  //zufällige Buchstaben in den jeweiligen bereichen generieren
  useEffect(() => {
    const interval = setInterval(() => {
      const zone = fingerZones[Math.floor(Math.random() * fingerZones.length)];
      const letter = zone.letters[Math.floor(Math.random() * zone.letters.length)];
      setFallingLetters((prev) => [...prev, { letter, top: 0, zoneIndex: zone.position }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //Dropevent
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setFallingLetters((prev) => prev.map((item) => ({ ...item, top: item.top +5})));
    }, 200);
    return () => clearInterval(moveInterval);
  }, []);

  //Eingabe überprüfen
  const handleKeyPress = (event) => {
    if (showInstructions) {
      setShowInstructions(false);
      return;
    }
    setFallingLetters((prev) => {
      const index = prev.findIndet((item) => item.letter === event.key);
      if (index !== -1) {
        setScore(score + 1);
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [score, showInstructions]);

  return(
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
      {showInstructions ? (
        <div className="absolute bg-linear-gradient text-white p-6 rounden-lg text-center">
          <h2 className="text-2xl mb-4">Typing Trainer</h2>
          <p>Positioniere deine Finger auf der Tastatur</p>
          <p>Linke Hand: Kleiner finger - A, Ringfinger - S, Mittelfinger - D, Zeigefinger - F</p>
          <p>Rechte Hand: Zeigefinger - J, Mittelfinger - K, Ringfinger - L, Kleiner Finger - Ö</p>
          <p>Drücke eine beliebige Taste um den Trainer zu starten!</p>
          </div>
      ) : (
        <>
        <div className="absolut top-4 left-4 text-white text-xl">Score: {score}</div>
        <div className="grid grid-cols-8 w-full h-5/6 border-b-2 border-white relative">
        {fallingLetters.map((item, index) => (
          <div
          key={index}
          className="absolute text-2xl font-bold"
          style={{
            top: `${item.top}px`,
            left: `${item.zoneIndex * 12.5}%`, //damit die buchstaben nur im erlaubten Bereich erscheinen
            color: fingerZones[item.zoneIndex].color
          }}
          >
            {item.letter}
            </div>
        ))}
        </div>
        <div className="grid grid-cols-8 w-full h-16">
          {fingerZones.map((zone, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="w-8 h-12 rounded-full" style={{ backgroundColor: zone.color}}></div>
              </div>
          ))}
          </div>
          </>
      )}
      </div>
      );
    };

    export default typingGame;