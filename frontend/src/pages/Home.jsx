import React, { useState, useEffect } from "react";

const textArray = [
  "Willkommen zum Typing-Trainer!",
  "Übe deine Tippgeschwindigkeit.",
  "Verbessere deine Genauigkeit!",
  "Starte jetzt und werde schneller!",
];

function VideoWithSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 8000); // Wechselt alle 3 Sekunden

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full h-[63vh]">
        {/* Video-Hintergrund */}
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="public/videos/stk.mp4" type="video/mp4" />
          Dein Browser unterstützt kein Video.
        </video>

        {/* Slider-Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/15">
          <h2 className="text-white text-6xl font-bold transition-opacity duration-500 [text-shadow:_0_4px_8px_rgb(128_0_128_/_0.8)]">
            {textArray[currentIndex]}
          </h2>
        </div>
      </div>

      <div className="grid grid-col-2">
        <div className="col-start-1">
          <h1 className=" text-white text-4xl font-semibold ml-20 mt-10">
            UNSERE BENUTZTEN TOOLS
          </h1>
          <div className="flex col-start-1 p-10 space-x-10 ml-10 w-[69vw]">
            <img src="public/tailwind.svg" width="14%" />
            <img src="public/react.svg" width="7%" />
            <img src="public/mongodb.svg" width="15%" />
            <img src="public/vite.svg" width="6%" />
            <img src="public/ionos.svg" width="15%" />
          </div>
        </div>
        <div className="col-start-2 mr-20">
          <h1 className="text-white text-right text-4xl font-semibold mt-10 ">
            TEAM KEYBORED
          </h1>
          <div className="relative right  mt-5 text-right ">
              <span className="text-white text-2xl font-semibold italic">Michelle, Nico, Marc, Vitali, Ömer</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoWithSlider;