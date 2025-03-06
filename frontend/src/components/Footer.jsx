import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid='footapp' className="text-white z-50 py-4 text-center bg-fuchsia-800 border-t-1 border-t-fuchsia-700">
      <Link to="/impressum" className="mx-4 hover:text-gray-400">IMPRESSUM</Link>
      <Link to="/datenschutz" className="mx-4 hover:text-gray-400">DATENSCHUTZ</Link>
    </footer>
  );
}

export default Footer;
