import React, { useState } from 'react';

function MainContent() {
  const [isTyping, setIsTyping] = useState(false);

  const handleStart = () => {
    setIsTyping(true);
  };

  const handleStop = () => {
    setIsTyping(false);
  };

  return (
    <main className="flex-1 p-8 text-center">
      <h2 className="text-3xl font-bold mb-8">your typing trainer</h2>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">EINFUHRUNG</h3>
        <p className="text-gray-700">Hier kommt eine Einführung in den Typing-Trainer.</p>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">TYPING TRAINER</h3>
        <textarea
          disabled={!isTyping}
          placeholder="Start typing here..."
          className="w-3/4 h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4">
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4 hover:bg-blue-600"
          >
            START
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            STOP
          </button>
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-semibold mb-4">HILFE & SUPPORT</h3>
        <p className="text-gray-700">Hier findest du Hilfe und Support.</p>
      </section>
    </main>
  );
}

export default MainContent;