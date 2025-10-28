import axios from "axios";

const REST_COUNTRIES = "https://restcountries.com/v3.1";
const OPENWEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
const NEWS_KEY = import.meta.env.VITE_NEWS_KEY;

console.log("Weather Key:", import.meta.env.VITE_WEATHER_KEY);
console.log("News Key:", import.meta.env.VITE_NEWS_KEY);

export async function fetchAllCountries() {
    try {
        const res = await axios.get(
            `${REST_COUNTRIES}/all?fields=name,flags,capital,cca2,region,population`
        );
        console.log("Countries fetched:", res.data.length);
        return res.data;
    } catch (err) {
        console.error("Error fetching countries:", err.response?.status, err.message);
        throw err;
    }
}
export async function fetchCountryByName(name) {
    try {
        const res = await axios.get(
            `${REST_COUNTRIES}/name/${encodeURIComponent(name)}?fullText=true`
        );
        return res.data[0];
    } catch (error) {
        console.error("Error fetching country:", error);
        return null;
    }
}
export async function fetchWeatherByCity(city) {
    const key = OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&units=metric&appid=${key}`;
    const res = await axios.get(url);
    return res.data;
}
export async function fetchTopHeadlinesByCountryCode(code, qFallback = "") {
    const key = NEWS_KEY;
    if (!key) return { articles: [] };
    try {
        const res = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${code}&pageSize=3&apiKey=${key}`
        );
        return res.data;
    } catch (error) {
        return { articles: [] };
    }
}
