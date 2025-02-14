import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const KaraokePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  
  // Sample lyrics with timing (in seconds)
  const lyrics = [
    { time: 0, text: "I can't help" },
    { time: 2, text: "falling in love" },
    { time: 4, text: "with you" },
    { time: 6, text: "Wise men say" },
    { time: 8, text: "only fools rush in" },
    // Add more lyrics with timing
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time >= 12) return 0; // Loop back to start
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
    const nextLyric = lyrics.find(lyric => lyric.time > currentTime);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <audio
        ref={audioRef}
        src="/path-to-your-audio.mp3"
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Current time display */}
      <div className="text-gray-400 text-sm mb-4">
        {Math.floor(currentTime)}:{((currentTime % 1) * 10).toFixed(0).padStart(1, '0')}
      </div>

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
    </div>
  );
};

export default KaraokePlayer;