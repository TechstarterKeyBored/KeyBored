import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <div className="">
        <div className="w-screen h-[65vh] overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/videos/stk.mp4" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Home;
