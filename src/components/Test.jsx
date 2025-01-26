import React, { useState } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "../style/Test.css"; // Import custom styles

const Test = () => {
  const [lat, setLat] = useState(31.2992); // Default latitude
  const [lng, setLng] = useState(120.7467); // Default longitude
  const [data, setData] = useState(null); // Holds API response data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [interval, setInterval] = useState("hour"); // Time interval
  const [timeRange, setTimeRange] = useState(24); // Time range (in hours)
  const [startDate, setStartDate] = useState("2022-06-21"); // Start date
  const [endDate, setEndDate] = useState("2022-06-22"); // End date
  const [showCharts, setShowCharts] = useState(true); // Toggle chart visibility

  const fetchSolarData = async () => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/run_model/", {
        lat: parseFloat(lat),
        lon: parseFloat(lng),
        start_date: startDate,
        end_date: endDate,
        freq: interval === "second" ? "1s" : interval === "minute" ? "1min" : interval === "hour" ? "60min" : "1D",
      });

      if (response.data.status === "success") {
        setData(response.data.data);
      } else {
        setError("API returned an error: " + response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const transformDataForChart = (dataKey) => {
    if (!data || !data[dataKey]) return [];

    const chartData = [["Time", dataKey]]; // Initialize header row
    const timestamps = Object.keys(data[dataKey]);

    timestamps.forEach((timestamp) => {
      chartData.push([
        new Date(timestamp).toLocaleTimeString(),
        data[dataKey][timestamp],
      ]);
    });

    return chartData;
  };

  return (
    <div className="test-container gradient-bg-welcome">
      <h1 className="test-title">Solar Data Visualization</h1>

      <div className="input-container white-glassmorphism">
        <div className="coordinate-inputs">
          <label>
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="coordinate-input"
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="coordinate-input"
            />
          </label>
        </div>

        <div className="time-controls">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="time-input"
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="time-input"
            />
          </label>
          <label>
            Interval:
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="time-interval-select"
            >
              <option value="second">Seconds</option>
              <option value="minute">Minutes</option>
              <option value="hour">Hours</option>
              <option value="day">Days</option>
            </select>
          </label>
          <label>
            Time Range (Hours):
            <input
              type="range"
              min="1"
              max="48"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-range-slider"
            />
            <span>{timeRange} hours</span>
          </label>
        </div>

        <button className="fetch-button" onClick={fetchSolarData}>
          Fetch Data
        </button>
      </div>

      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p className="error-text">{error}</p>}

      {showCharts && data && (
        <div className="chart-container">
          <button
            className="close-button"
            onClick={() => setShowCharts(false)} // Close charts
          >
            Close Charts
          </button>
          {Object.keys(data).map((key) => (
            <div key={key} className="chart-box blue-glassmorphism">
              <h3 className="chart-subtitle">{key} Chart</h3>
              <Chart
                chartType="LineChart"
                data={transformDataForChart(key)}
                options={{
                  title: `${key} Over Time`,
                  titleTextStyle: { color: "#fff" },
                  hAxis: { title: "Time", textStyle: { color: "#fff" } },
                  vAxis: { title: key, textStyle: { color: "#fff" } },
                  legend: { position: "bottom", textStyle: { color: "#fff" } },
                  colors: ["#34A853", "#FBBC05", "#EA4335", "#4285F4"],
                  backgroundColor: "transparent",
                }}
                width="100%"
                height="400px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
