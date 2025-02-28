import React from "react";

function Einführung() {
  return (
    <>
      <h2 className="text-amber-100 text-3xl font-semibold text-center mt-13">
        Einführung
      </h2>
      <p className="text-white p-4 text-md text-center mt-2 w-[100vh] mx-auto">
        Lerne schnelles und präzises Tippen! 🚀✨ In diesem Video zeigen wir dir
        effektive Übungen, um deine Tippgeschwindigkeit zu steigern. Leg los und
        werde zum Tastatur-Profi!
      </p>
      <div className="w-screen h-[65vh] overflow-hidden">
        <video
          className="w-[100vh] h-[60vh] mx-auto mt-10 object-cover rounded-xl"
          controls
        >
          <source src="/videos/Einführung.mp4" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>
      </div>
    </>
  );
}

export default Einführung;
