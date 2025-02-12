import React, { useState } from "react";

function TypingTrainer() {
  const [isTyping, setIsTyping] = useState(false);

  const handleStart = () => {
    setIsTyping(true);
  };

  const handleStop = () => {
    setIsTyping(false);
  };

  return (
    <div className="p-8 mx-auto">
      <h2 className="text-3xl w-4xl mx-auto font-bold text-white ">
        TypingTrainer
      </h2>
      <div className="flex justify-center w-full mt-4">
        <div className="w-4xl bg-[#EA32EA] rounded-lg h-[55vh] opacity-50 my-5 border-1 border-[#4b004b]">
          wörterbereich
        </div>
      </div>

      <div className="flex justify-center w-full mt-4">
        <input
          disabled={!isTyping}
          placeholder="Start typing here..."
          className="w-2xl h-10 p-4 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      <div id="buttons" className="flex justify-between  mt-5 w-4xl mx-auto">

        <div className="space-x-2">
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-400"
          >
            EASY
          </button>
          <button
            onClick={handleStop}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-400"
          >
            MEDIUM
          </button>
          <button
            onClick={handleStop}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-400"
          >
            HARD
          </button>
        </div>

        <div className="space-x-2">
          <button
            onClick={handleStart}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500"
          >
            START
          </button>
          <button
            onClick={handleStop}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500"
          >
            STOP
          </button>
          <button
            onClick={handleStop}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            PAUSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default TypingTrainer;
