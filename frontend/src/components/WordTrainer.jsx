import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sampleLyrics = [
  "This is the first line",
  "Here comes the second line",
  "And now the third one",
  "Final line of the verse",
];

const difficultySpeeds = {
  easy: 3000,
  medium: 2000,
  hard: 1000,
};

export default function WordTrainer() {
  const [words, setWords] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameRunning, setGameRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scorePopup, setScorePopup] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (gameRunning && !paused && words.length > 0) {
      const interval = setInterval(() => {
        if (words.length > 0) {
          const word = words.shift();
          setFallingWords((prev) => [
            ...prev,
            { text: word, id: Math.random(), col: Math.floor(Math.random() * 4) },
          ]);
        } else {
          setGameRunning(false);
          setWords([]);
        }
      }, difficultySpeeds[difficulty]);
      return () => clearInterval(interval);
    }
  }, [gameRunning, paused, words, difficulty]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setFallingWords((prev) =>
      prev.filter((word) => {
        if (word.text === e.target.value.trim()) {
          setScore((prevScore) => prevScore + 10);
          setScorePopup({ text: "+10", id: Math.random() });
          setTimeout(() => setScorePopup(null), 1000);
          setInputText("");
          return false;
        }
        return true;
      })
    );
  };

  const startGame = () => {
    setCountdown(3);
    setWords(sampleLyrics.join(" ").split(" "));
    setFallingWords([]);
    setScore(0);
    setGameRunning(true);
    setPaused(false);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseGame = () => {
    setPaused((prev) => !prev);
  };

  const stopGame = () => {
    setGameRunning(false);
    setWords([]);
    setFallingWords([]);
    setScore(0);
    setCountdown(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 min-h-screen  text-white">
      <h1 className="text-3xl font-bold">WordTrainer</h1>

      <div className="flex gap-2">
        {Object.keys(difficultySpeeds).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-lg ${difficulty === level ? "bg-blue-500" : "bg-gray-600"}`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={startGame} className="px-6 py-3 bg-green-500 text-white rounded-lg">Start</button>
        <button onClick={pauseGame} className={`px-6 py-3 ${paused ? "bg-yellow-500" : "bg-gray-500"} text-white rounded-lg`}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button onClick={stopGame} className="px-6 py-3 bg-red-500 text-white rounded-lg">Stop</button>
      </div>

      {countdown !== null && (
        <motion.div
          className="fixed text-5xl font-bold text-green-500 top-1/2 left-1/2"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1 }}
          key={countdown}
        >
          {countdown === 0 ? "START!" : countdown}
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-4 mt-6 relative h-72 w-full max-w-3xl">
        {fallingWords.map((word) => (
          <motion.div
            key={word.id}
            className="absolute px-4 py-2 bg-purple-400 text-black text-xl font-bold rounded-md shadow-md"
            initial={{ y: -50, x: word.col * 200 }}
            animate={{ y: 300, opacity: 0 }}
            transition={{ duration: difficultySpeeds[difficulty] / 1000, ease: "linear" }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>

      {scorePopup && (
        <motion.div
          key={scorePopup.id}
          className="absolute text-2xl text-green-400 font-bold"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          {scorePopup.text}
        </motion.div>
      )}

      <input
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type the word here..."
        className="mt-4 p-3 border-2 border-blue-400 bg-gray-700 text-white text-lg rounded w-64 text-center"
      />

      <div className="mt-4 text-lg font-bold">Score: {score}</div>
    </div>
  );
}
