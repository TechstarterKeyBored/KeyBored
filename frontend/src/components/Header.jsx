import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className=" text-white py-2 text-center shadow-2xl shadow-fuchsia-800 border-b-1 border-b-fuchsia-700">
      
      <nav className="flex flex-row justify-between items-center  ml-2 px-5">
        <Link to="/" id="logo" className=""><h1 className="text-4xl font-bold">KeyBored</h1><span className='text-xs ml-15'>your TypingTrainer</span></Link>
        {/* <Link to="/" className="mx-4 hover:text-purple-200">Home</Link> */}
        <div className="">
        <Link to="/introduction" className="mx-4 hover:text-purple-200">Einführung</Link>
        <Link to="/typing-trainer" className="mx-4 hover:text-purple-200">TypingTrainer</Link>
        <Link to="/help-support" className="mx-4 hover:text-purple-200">Hilfe & Support</Link>
        </div>
        <div className="" >
        <Link to="/register" className="mx-4 hover:text-purple-200">Registrieren</Link>
          <Link to="/login" className="mx-4 hover:text-purple-200">Anmelden</Link>
          </div>
      </nav>
    </header>
  );
}

export default Header;