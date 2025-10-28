import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Favorites() {
  const [favorites] = useLocalStorage("favorites", []);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,area,population,cca3,ccn3"
        );
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const favoriteCountries = countries.filter((c) => favorites.includes(c.cca3));

  if (loading) return <div className="p-4">Loading favorites...</div>;
  if (error) return <div className="text-red-500 p-4">⚠️ {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">⭐ Favorite Countries</h1>
      {favoriteCountries.length === 0 ? (
        <p className="text-gray-500">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteCountries.map((c) => (
            <CountryCard
              key={c.cca3}
              country={c}
              onToggleFav={() => {}}
              isFav={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
