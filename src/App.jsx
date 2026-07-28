import React, { useEffect } from "react";
import { useState } from "react";
import { salesData } from "./data/data";
import { BarChart } from "./components/BarChart";
import { Controls } from "./components/Controls";

import "./App.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [filters, setFilters] = useState({
    region: "all",
    year: 1992,
    category: "all",
  });

  const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
};

useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
}, [isDarkMode]); 
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setIsDarkMode(true);
    document.body.classList.add("dark-theme");
  }
}, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  const filteredData = salesData.filter((item) => {
    return (
      (filters.region === "all" || item.region === filters.region) &&
      item.year >= Number(filters.year) &&
      (filters.category === "all" || item.category === filters.category)
    );
  });

  const exportToCSV = () => {
    const headers = "ID,Year,Region,Category,IT,Service";
    const csvRows = filteredData.map(
      (item) =>
        `${item.id},${item.year},${item.region},${item.category},${item.itIndustry},${item.serviceIndustry}`,
    );
    console.log(csvRows);

    const csvString = "\ufeff" + [headers, ...csvRows].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_sales.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="chart-wrapper">
      <BarChart chartData={filteredData} categoryFilter={filters.category} />
      <Controls onFilterChange={handleFilterChange} exportToCSV={exportToCSV} toggleTheme={toggleTheme} filters={filters} isDarkMode={isDarkMode}/>
    </div>
  );
}

export default App;
