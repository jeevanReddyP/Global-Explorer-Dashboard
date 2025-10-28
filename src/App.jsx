import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Favorites from "./pages/Favorites";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("ge_theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ge_theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<CountryDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="max-w-6xl mx-auto text-xs text-center p-4 text-gray-500 dark:text-gray-400">
        Data from REST Countries, OpenWeatherMap, NewsAPI
      </footer>
    </div>
  );
}

export default App;
