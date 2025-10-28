import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({
  country,
  onToggleFav,
  isFav,
  miniWeather,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex gap-3 items-center hover:shadow-lg transition">
      <img
        src={country.flags?.svg || country.flags?.png}
        alt={`${country.name.common} flag`}
        className="w-16 h-10 object-cover rounded"
      />

      <div className="flex-1">
        <Link
          to={`/country/${encodeURIComponent(
            country.name.common || country.name
          )}`}
          className="font-semibold hover:underline"
        >
          {country.name.common || country.name}
        </Link>
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {country.capital?.[0] || "—"} • {country.region}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Population: {country.population?.toLocaleString()}
        </div>
        {miniWeather && (
          <div className="text-xs text-gray-500 mt-1">
            🌤 {Math.round(miniWeather.temp)}°C in {country.capital?.[0]}
          </div>
        )}
      </div>

      <button
        onClick={() =>
          onToggleFav(country.cca3 || country.ccn3 || country.name.common)
        }
        title={isFav ? "Remove from favorites" : "Add to favorites"}
        className={`ml-2 px-2 py-1 border rounded transition-all duration-200 ${
          isFav
            ? "text-yellow-500 border-yellow-400 bg-yellow-50 dark:bg-yellow-900"
            : "text-gray-500 hover:text-yellow-500"
        }`}
      >
        {isFav ? "★" : "☆"}
      </button>
    </div>
  );
}
