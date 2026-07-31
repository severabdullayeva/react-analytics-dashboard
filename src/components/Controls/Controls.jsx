import React from "react";
import "./Controls.css";

export const Controls = ({
  filters,
  onFilterChange,
  exportToCSV,
  toggleTheme,
  isDarkMode,
}) => {
  return (
    <div className="controls-wrapper">
      <button onClick={toggleTheme} className="theme-btn">
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <select onChange={(e) => onFilterChange("region", e.target.value)}>
        <option value="all">All Region</option>
        <option value="Baku">Baku</option>
        <option value="Sumgait">Sumgait</option>
        <option value="Ganja">Ganja</option>
      </select>

      <select onChange={(e) => onFilterChange("category", e.target.value)}>
        <option value="all">All Categories</option>
        <option value="it">IT Industry</option>
        <option value="service">Service Industry</option>
      </select>

      <label>Year: {filters.year}</label>
      <input
        type="range"
        min="1992"
        max="2000"
        step="2"
        value={filters.year || 1992}
        onChange={(e) => onFilterChange("year", e.target.value)}
        className="custom-slider"
      />
      <button className="export-btn" onClick={exportToCSV}>
        Export CSV
      </button>
    </div>
  );
};
