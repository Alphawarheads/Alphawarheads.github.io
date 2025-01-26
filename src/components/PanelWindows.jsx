import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import Draggable from "react-draggable";
import "../style/PanelWindows.css";

const PanelWindows = ({ panel, closeWindow }) => {
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expanded, setExpanded] = useState(false); // Control chart expansion

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await axios.post("http://127.0.0.1:8000/run_model/", {
          lat: panel.lat,
          lon: panel.lng,
          start_date: "2022-06-21",
          end_date: "2022-06-22",
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

    fetchData();
  }, [panel.lat, panel.lng]);

  const transformDataForChart = (dataKey) => {
    if (!data || !data[dataKey]) return [];

    const chartData = [["Time", dataKey]]; // Initialize header row
    const timestamps = Object.keys(data[dataKey]);

    if (typeof data[dataKey][timestamps[0]] === "object") {
      // Handle nested data (e.g., `dc` with sub-parameters)
      const subKeys = Object.keys(data[dataKey][timestamps[0]]);
      subKeys.forEach((subKey) => chartData[0].push(subKey));

      timestamps.forEach((timestamp) => {
        const row = [new Date(timestamp).toLocaleTimeString()];
        subKeys.forEach((subKey) => row.push(data[dataKey][timestamp][subKey]));
        chartData.push(row);
      });
    } else {
      // Handle flat data
      timestamps.forEach((timestamp) => {
        chartData.push([
          new Date(timestamp).toLocaleTimeString(),
          data[dataKey][timestamp],
        ]);
      });
    }

    return chartData;
  };

  return (
    <Draggable handle=".panel-header">
      <div className="panel-window">
        <div className="panel-header">
          <h3>更多信息</h3>
          <button className="close-button" onClick={closeWindow}>
            X
          </button>
        </div>

        {/* Display panel information */}
        <p>纬度: {panel.lat}</p>
        <p>经度: {panel.lng}</p>
        <p>电池温度: {panel.batteryTemp}°C</p>
        <p>直流功率: {panel.dcPower} W</p>
        <p>交流功率: {panel.acPower} W</p>
        <p>占有状态: {panel.occupied ? "是" : "否"}</p>

        {/* Loading or Error State */}
        {loading && <p>加载数据中...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Render Charts */}
        {data && (
          <div>
            {Object.keys(data).map((key) => (
              <div key={key} style={{ marginBottom: "20px" }}>
                <h4>{key} 图表</h4>
                <Chart
                  chartType="LineChart"
                  data={transformDataForChart(key)}
                  options={{
                    title: `${key} 随时间变化`,
                    hAxis: { title: "时间" },
                    vAxis: { title: key },
                    legend: { position: "bottom" },
                  }}
                  width="100%"
                  height="300px"
                />
              </div>
            ))}
          </div>
        )}

        {/* Expand/Collapse Charts */}
        {expanded && (
          <button
            className="expand-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "收回" : "展开"}
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default PanelWindows;
