import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const KaraokePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const audioRef = useRef(null);

  // Sample lyrics with timing (in seconds)
  const lyrics = [
    { time: 18, text: "you only see" },
    { time: 20, text: "what your eyes want to see" },
    { time: 22, text: "how can life be " },
    { time: 24, text: "what you want it to be" },
    { time: 27, text: "you re frozen" },
    { time: 29, text: "when your heart s not open" },
    { time: 37, text: "you re so consumed with how much you get" },
    { time: 40.5, text: "you waste your time with hate and regret" },
    { time: 44.5, text: "you re broken" },
    { time: 47, text: "when your heart s not open" },
    { time: 53, text: "mmmmmm" },
    { time: 57.5, text: "if i could melt your heart" },
    { time: 62.5, text: "mmmmmm" },
    { time: 66.5, text: "we d never be apart" },
    { time: 72, text: "mmmmmm" },
    { time: 75.5, text: "give yourself to me" },
    { time: 81, text: "mmmmmm" },
    { time: 84.5, text: "you hold the key" },
    { time: 98.5, text: "now there s no point in placing the blame" },
    { time: 103, text: "and you should know i suffer the same" },
    { time: 106.5, text: "if i lose you" },
    { time: 108.5, text: "my heart will be broken" },
    { time: 116.5, text: "love is a bird" },
    { time: 118.5, text: "she needs to fly" },
    { time: 120.5, text: "let all the hurt inside of you die" },
    { time: 124.5, text: "you re frozen" },
    { time: 126.5, text: "when your heart s not open" },
    { time: 134, text: "mmmmmm" },
    { time: 137.5, text: "if i could melt your heart" },
    { time: 143, text: "mmmmmm" },
    { time: 146.5, text: "we d never be apart" },
    { time: 151.5, text: "mmmmmm" },
    { time: 156, text: "give yourself to me" },
    { time: 160.5, text: "mmmmmm" },
    { time: 164.5, text: "you hold" },
    { time: 170, text: "the key" },
    { time: 173, text: "*music*" },
    { time: 213.5, text: "you only see what your eyes want to see" },
    { time: 218.5, text: "how can life be what you want it to be" },
    { time: 222.5, text: "you re frozen" },
    { time: 225, text: "when your heart s not open" },
    { time: 232, text: "mmmmmm" },
    { time: 235.5, text: "if i could melt your heart" },
    { time: 240, text: "mmmmmm" },
    { time: 245, text: "we d never be apart" },
    { time: 249.5, text: "mmmmmm" },
    { time: 253.5, text: "give yourself to me" },
    { time: 258, text: "mmmmmm" },
    { time: 262, text: "you hold" },
    { time: 267, text: "the key" },
    { time: 271.5, text: "if i could melt your heart" },
    { time: 276, text: "mmmmmm" },
    { time: 279.5, text: "we d never be apart" },
    { time: 284, text: "mmmmmm" },
    { time: 289, text: "give yourself to me" },
    { time: 293.5, text: "mmmmmm" },
    { time: 297, text: "you hold" },
    { time: 302, text: "the key" },
    { time: 306, text: "if i could melt your heart" },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          return time + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getCurrentLyric = () => {
    const currentLyric = lyrics.reduce((prev, curr) => {
      if (curr.time <= currentTime) return curr;
      return prev;
    }, lyrics[0]);

    return currentLyric;
  };

  const getNextLyric = () => {
    const nextLyric = lyrics.find((lyric) => lyric.time > currentTime);
    return nextLyric || lyrics[0];
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
    if (inputValue === getCurrentLyric().text) {
      event.target.value = "";
      setScore((score) => score + 1);
    }
  };

  return (
    // Audio
    <div >
      <audio
        ref={audioRef}
        src="src/assets/audio/frozen.mp3"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Lyrics display */}
      <div className="space-y-6 mb-8">
        <div className="text-4xl font-bold text-center">
          <div className="text-white mb-2">{getCurrentLyric().text}</div>
          <div className="text-gray-500 text-2xl">{getNextLyric().text}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handlePlayPause}
          className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Text-Input */}
      <div className="flex justify-center my-8">
        <input onInput={handleInput} type="text" className="bg-gray-600 text-white" ></input>
      </div>
      
      {/* High score */}
      <div className="text-center text-white">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default KaraokePlayer;
