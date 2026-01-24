import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Don't show Navbar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          TradeTracker
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
          <Link to="/daily-marking" className="hover:text-blue-500">
            Daily Marking
          </Link>
          <Link to="/trade-journal" className="hover:text-blue-500">
            Trade Journal
          </Link>
          <Link to="/journal-history" className="hover:text-blue-500">
            History
          </Link>
          <Link to="/stats" className="hover:text-blue-500">
            Stats
          </Link>
          <Link to="/login" className="hover:text-blue-500">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
