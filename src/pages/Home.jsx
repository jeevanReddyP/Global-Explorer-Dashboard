import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [miniWeather, setMiniWeather] = useState({});
  const [regionFilter, setRegionFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,area,population,cca3,ccn3"
        );

        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setError("Unexpected data format");
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      }
    }

    fetchCountries();
  }, []);

  function toggleFav(code) {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
    );
  }

  const filteredCountries = Array.isArray(countries)
    ? countries
        .filter((c) => (regionFilter ? c.region === regionFilter : true))
        .sort((a, b) => {
          if (sortBy === "name")
            return a.name.common.localeCompare(b.name.common);
          if (sortBy === "population") return b.population - a.population;
          return 0;
        })
    : [];

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-3 py-1 border rounded bg-white dark:bg-gray-800"
        >
          <option value="">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border rounded bg-white dark:bg-gray-800"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A–Z)</option>
          <option value="population">Population</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">⚠️ {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((c) => (
          <CountryCard
            key={c.cca3 || c.ccn3 || c.name.common}
            country={c}
            onToggleFav={toggleFav}
            isFav={favorites.includes(c.cca3)}
            miniWeather={miniWeather[c.capital?.[0]]}
          />
        ))}
      </div>
    </div>
  );
}
