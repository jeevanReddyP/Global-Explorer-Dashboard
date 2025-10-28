import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ theme, setTheme }) {
  const loc = useLocation();

  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="font-bold text-xl hover:underline">
            🌍 Global Explorer
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Explore countries, weather, and news
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-1 rounded transition-colors duration-200 ${
              loc.pathname === "/"
                ? "bg-sky-100 dark:bg-sky-700 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className={`px-3 py-1 rounded transition-colors duration-200 ${
              loc.pathname === "/favorites"
                ? "bg-sky-100 dark:bg-sky-700 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Favorites
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}
