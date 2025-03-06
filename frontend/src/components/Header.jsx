import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Header() {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext); // Zugriff auf den Login-Status
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Logout aus dem Context
    navigate("/"); // Nach dem Logout zur Startseite navigieren
  };

  return (
    <header  className="text-white z-50 py-2 text-center shadow-2xl border-b-1 border-b-fuchsia-700">
      <nav data-testid="app" className=" flex flex-row justify-between items-center ml-2 px-5">
        <Link to="/" id="logo">
          <h1  className="text-4xl font-bold">KeyBored</h1>
          <span className="text-xs ml-15">your TypingTrainer</span>
        </Link>
        <div>
          <Link to="/introduction" className="mx-4 hover:text-purple-200">
            Einführung
          </Link>

          {/* Diese Links sind nur sichtbar, wenn der Benutzer eingeloggt ist */}
          {isLoggedIn && (
            <>
              <Link to="/typing-trainer" className="mx-4 hover:text-purple-200">
                Typing Trainer
              </Link>
              <Link to="/help-support" className="mx-4 hover:text-purple-200">
                Hilfe & Support
              </Link>
            </>
          )}
        </div>

        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="mx-4 hover:text-blue-200">
                Registrieren
              </Link>
              <Link to="/login" className="mx-4 hover:text-blue-200">
                Anmelden
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="mx-4 hover:text-blue-200"
            >
              Abmelden
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
