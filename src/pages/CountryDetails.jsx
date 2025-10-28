import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchCountryByName,
  fetchWeatherByCity,
  fetchTopHeadlinesByCountryCode,
} from "../api/api";
import Loading from "../components/Loading";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useLocalStorage("ge_favorites", []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const data = await fetchCountryByName(name);
        setCountry(data);
        const capital = data.capital?.[0];
        if (capital) {
          try {
            const w = await fetchWeatherByCity(capital);
            setWeather({
              temp: w.main.temp,
              desc: w.weather?.[0]?.description,
              icon: w.weather?.[0]?.icon,
            });
          } catch {}
        }
        const code = (data.cca2 || "").toLowerCase();
        const res = await fetchTopHeadlinesByCountryCode(
          code,
          `${data.name.common} ${data.capital?.[0] || ""}`
        );
        setNews(res.articles ? res.articles.slice(0, 3) : []);
      } catch (e) {
        setErr("Failed to load country details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [name]);

  function toggleFav() {
    const id = country.cca3;
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  if (loading) return <Loading />;
  if (err) return <div className="text-red-500">{err}</div>;
  if (!country) return <div>No country found.</div>;

  const languages = country.languages ? Object.values(country.languages) : [];
  const currencies = country.currencies
    ? Object.values(country.currencies).map(
        (c) => c.name + ` (${c.symbol || ""})`
      )
    : [];
  const borders = country.borders || [];

  return (
    <div className="space-y-6">
      <div className="flex gap-6 items-start">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt="flag"
          className="w-56 h-36 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{country.name?.official}</h1>
          <div className="text-sm text-gray-500 mt-1">
            {country.name?.common}
          </div>
          <div className="mt-3 text-sm">
            Capital: {country.capital?.[0] || "—"}
          </div>
          <div className="text-sm">Region: {country.region}</div>
          <div className="text-sm">
            Population: {country.population?.toLocaleString()}
          </div>
          <div className="mt-3">
            <button
              onClick={toggleFav}
              className="px-3 py-1 bg-yellow-100 rounded"
            >
              {favorites.includes(country.cca3)
                ? "★ Favorited"
                : "☆ Add Favorite"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Details</h3>
          <div className="text-sm">
            <strong>Languages:</strong> {languages.join(", ") || "—"}
          </div>
          <div className="text-sm">
            <strong>Currencies:</strong> {currencies.join(", ") || "—"}
          </div>
          <div className="text-sm">
            <strong>Area:</strong> {country.area ? country.area + " km²" : "—"}
          </div>
          <div className="text-sm mt-2">
            <strong>Borders:</strong>{" "}
            {borders.length
              ? borders.map((b) => (
                  <Link
                    className="mr-2 text-sky-600"
                    key={b}
                    to={`/country/${b}`}
                  >
                    {b}
                  </Link>
                ))
              : "—"}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Map & Location</h3>
          {country.latlng?.length ? (
            <iframe
              title="map"
              width="100%"
              height="250"
              className="rounded"
              src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=6&output=embed`}
            />
          ) : (
            <div className="text-sm text-gray-500">No lat/lng available.</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">
            Weather — {country.capital?.[0] || "—"}
          </h3>
          {weather ? (
            <div>
              <div className="text-3xl font-bold">
                {Math.round(weather.temp)}°C
              </div>
              <div className="text-sm text-gray-500">{weather.desc}</div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No weather data.</div>
          )}
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="font-semibold mb-2">Top News</h3>
          {news.length ? (
            <ul className="space-y-2">
              {news.map((a, i) => (
                <li key={i}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium hover:underline"
                  >
                    {a.title}
                  </a>
                  <div className="text-xs text-gray-500">
                    {a.source?.name} •{" "}
                    {new Date(a.publishedAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">No news available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
