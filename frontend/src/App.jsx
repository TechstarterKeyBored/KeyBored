import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./AuthContext"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Introduction from "./pages/Einfuhrung";
import TypingTrainer from "./pages/TypingTrainer";
import HelpSupport from "./pages/HelpSupport";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute"; 
import WordTrainer from "./components/WordTrainer/";
import TypingGame from "./components/TypingGame/";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation(); // Aktuelle Seite für Animation ermitteln

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/introduction" element={<PageTransition><Introduction /></PageTransition>} />
        <Route path="/typing-trainer" element={<PageTransition><PrivateRoute element={TypingTrainer} /></PageTransition>} />
        <Route path="/wordtrainer" element={<PageTransition><PrivateRoute element={WordTrainer} /></PageTransition>} />
        <Route path="/typinggame" element={<PageTransition><PrivateRoute element={TypingGame} /></PageTransition>} />
        <Route path="/help-support" element={<PageTransition><PrivateRoute element={HelpSupport} /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
