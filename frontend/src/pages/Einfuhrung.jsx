import React from 'react';

function Einführung() {
  return (
        <div className="w-screen h-[65vh] overflow-hidden">
          <video className="w-[130vh] h-[60vh] mx-auto mt-10 object-cover" controls>
            <source src="/videos/Einführung.mp4" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </div>
  );
}

export default Einführung;