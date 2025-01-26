import React, { useState } from "react";
import TradeScript from "./TradeScript";
import PanelWindows from "./PanelWindows";
import "../style/SolarTrade.css";
import Chart from "react-google-charts";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const panelsData = [
  { id: 1, name: "Panel A", lat: 31.2304, lng: 121.4737 },
  { id: 2, name: "Panel B", lat: 30.5728, lng: 104.0668 },
  { id: 3, name: "Panel C", lat: 39.9042, lng: 116.4074 },
  { id: 4, name: "Panel D", lat: 22.3964, lng: 114.1095 },
  { id: 5, name: "Panel E", lat: 34.0522, lng: -118.2437 },
];

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    const dcPower = Math.floor(Math.random() * 200) + 100; // Random DC Power between 100 and 300
    const acPower = Math.floor(dcPower * 0.9); // AC Power is 90% of DC Power
    data.push([`Hour ${i + 1}`, dcPower, acPower]);
  }
  return [["Time", "DC Power", "AC Power"], ...data];
};

const SolarTrade = ({ goBack }) => {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panels, setPanels] = useState([]);
  const [combinedData, setCombinedData] = useState(null); // For combined API data
  const [loading, setLoading] = useState(false); // Loading state
  const [showTradeScript, setShowTradeScript] = useState(false);
  const [showPanelWindows, setShowPanelWindows] = useState(null);

  const handleAddPanel = () => {
    if (selectedPanel) {
      setPanels([...panels, selectedPanel]);
      setSelectedPanel(null);
    }
  };

  const fetchCombinedData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/run_combined_model/", {
        coordinates: panels.map((panel) => ({ lat: panel.lat, lon: panel.lng })),
        start_date: "2022-06-21",
        end_date: "2022-06-22",
        freq: "60min",
      });

      if (response.data.status === "success") {
        setCombinedData(response.data);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      setCombinedData({ details: generateRandomData() }); // Use random data as fallback
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPanelWindows = (panel) => {
    setShowPanelWindows(panel);
  };

  const combinedStatistics = combinedData
    ? {
        acPower: combinedData.combined_ac || 0,
        dcPower: combinedData.combined_dc || 0,
      }
    : { acPower: 0, dcPower: 0 };

  return (
    <div className="solar-trade-container">
      <div className="left-panel gradient-bg-services">
        <button onClick={goBack} className="back-button">
          Back to Services
        </button>
        <h2 className="panel-selection-title">Solar Panel Selection</h2>
        <div className="panel-selection">
          <select
            value={selectedPanel?.id || ""}
            onChange={(e) =>
              setSelectedPanel(
                panelsData.find((panel) => panel.id === parseInt(e.target.value))
              )
            }
            className="panel-dropdown"
          >
            <option value="">Select a Panel</option>
            {panelsData.map((panel) => (
              <option key={panel.id} value={panel.id}>
                {panel.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddPanel} className="add-panel-button">
            Add Panel
          </button>
        </div>

        <div className="panel-summary">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="panel-summary-card blue-glassmorphism"
              onClick={() => handleOpenPanelWindows(panel)}
            >
              <div className="panel-info">
                <p>
                  <strong>{panel.name}</strong>
                </p>
                <p>Latitude: {panel.lat}</p>
                <p>Longitude: {panel.lng}</p>
              </div>
              <AiOutlineClose
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setPanels(panels.filter((p) => p.id !== panel.id));
                }}
              />
            </div>
          ))}
        </div>
        <button onClick={fetchCombinedData} className="fetch-data-button">
          {loading ? "Loading..." : "Fetch Combined Data"}
        </button>
      </div>

      <div className="right-panel">
        <div className="chart-statistics">
          <h3>Combined Statistics</h3>
          <p>DC Power: {combinedStatistics.dcPower} W</p>
          <p>AC Power: {combinedStatistics.acPower} W</p>
        </div>

        <div className="comparison-chart">
          <Chart
            chartType="BarChart"
            data={combinedData?.details || generateRandomData()}
            options={{
              title: "Combined Output Comparison",
              backgroundColor: "#1a1a2e",
              colors: ["#4CAF50", "#2952E3"],
              titleTextStyle: { color: "#ffffff" },
              hAxis: { title: "Time", textStyle: { color: "#ffffff" } },
              vAxis: { title: "Power (W)", textStyle: { color: "#ffffff" } },
              legend: { position: "right", textStyle: { color: "#ffffff" } },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      {showTradeScript && <TradeScript close={() => setShowTradeScript(false)} />}
      {showPanelWindows && <PanelWindows panel={showPanelWindows} closeWindow={() => setShowPanelWindows(null)} />}
    </div>
  );
};

export default SolarTrade;
