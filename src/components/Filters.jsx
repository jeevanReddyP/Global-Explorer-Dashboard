import React from "react";

const REGIONS = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "Antarctic",
];

export default function Filters({ region, setRegion, sort, setSort }) {
  return (
    <div className="flex gap-3 items-center flex-wrap relative z-50">
      <div className="relative">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none z-50"
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => (
            <option
              key={r}
              value={r}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none z-50"
        >
          <option value="">Sort</option>
          <option value="population_asc">Population ↑</option>
          <option value="population_desc">Population ↓</option>
          <option value="area_asc">Area ↑</option>
          <option value="area_desc">Area ↓</option>
        </select>
      </div>
    </div>
  );
}
