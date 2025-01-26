import React, { useState, useEffect, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "./Sidebar";
import PanelWindows from "./PanelWindows"; // Import PanelWindows
import TradeScript from "./TradeScript"; // Import TradeScript
import kakilogo from "../../images/kali.png";
import { TransactionContext } from "../context/TransactionContext"; // 引入上下文
import "../style/MapSection.css"; // Correctly import CSS

const MapSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [showPanelDetails, setShowPanelDetails] = useState(false);
  const [showTradeScript, setShowTradeScript] = useState(false); // State for TradeScript visibility
  const [isConfirmingPanel, setIsConfirmingPanel] = useState(false); // State for panel creation confirmation
  const [pendingPanelLocation, setPendingPanelLocation] = useState(null); // Store location for new panel
  const [mapInstance, setMapInstance] = useState(null); // Store the Leaflet map instance
  const { currentAccount, connectWallet } = useContext(TransactionContext); // 获取钱包连接状态
  const [tradeScriptData, setTradeScriptData] = useState(null); // Data passed to TradeScript

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreatePanel = (lat, lng) => {
    if (!currentAccount) {
      alert("请先连接钱包！");
      connectWallet();
      return;
    }
    setPendingPanelLocation({ lat, lng }); // Save the panel location
    setIsConfirmingPanel(true);
    setTradeScriptData({
      lat,
      lng,
      sandia_module_name: "Canadian_Solar_CS5P_220M___2009_",
      cec_inverter_name: "ABB__MICRO_0_25_I_OUTD_US_208__208V_",
    });
    setIsConfirmingPanel(true);
  };


  const confirmCreatePanel = () => {
    setIsConfirmingPanel(false);
    setShowTradeScript(true);
  };

  const cancelCreatePanel = () => {
    setIsConfirmingPanel(false);
    setPendingPanelLocation(null); // Clear the pending panel location
  };

  const createPanelOnClose = () => {
    if (pendingPanelLocation && mapInstance) {
      const { lat, lng } = pendingPanelLocation;

      const newMarker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: kakilogo,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50],
        }),
      })
        .addTo(mapInstance)
        .bindPopup(
          `<div>
            <strong>New Solar Panel</strong><br>
            Production: 0kW<br>
            Status: Active<br>
            <button class="details-button">详细资料</button>
          </div>`
        );

      // Attach popupopen event to the new marker
      newMarker.on("popupopen", () => {
        setSelectedPanel({
          id: Date.now(),
          lat,
          lng,
          name: "New Solar Panel",
          production: "0kW",
          status: "Active",
          batteryTemp: 0,
          dcPower: 0,
          acPower: 0,
        });
        document.querySelector(".details-button").addEventListener("click", () => {
          setShowPanelDetails(true);
        });
      });

      setPendingPanelLocation(null); // Clear the pending panel location
    }
    setShowTradeScript(false); // Hide TradeScript
  };

  useEffect(() => {
    const map = L.map("map").setView([31.2992, 120.7467], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    setMapInstance(map); // Store the map instance

    const solarPanels = [
      {
        id: 1,
        lat: 31.2992,
        lng: 120.7467,
        name: "Solar Panel 1",
        production: "5kW",
        status: "Active",
        batteryTemp: 25,
        dcPower: 120,
        acPower: 100,
      },
      {
        id: 2,
        lat: 31.3002,
        lng: 120.7467,
        name: "Solar Panel 2",
        production: "3kW",
        status: "Occupied",
        batteryTemp: 30,
        dcPower: 100,
        acPower: 90,
      },
    ];

    const customIcon = L.icon({
      iconUrl: kakilogo,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    solarPanels.forEach((panel) => {
      const marker = L.marker([panel.lat, panel.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div>
            <strong>${panel.name}</strong><br>
            Production: ${panel.production}<br>
            Status: ${panel.status}<br>
            <button class="details-button">详细资料</button>
          </div>`
        );

      marker.on("popupopen", () => {
        setSelectedPanel(panel);
        document.querySelector(".details-button").addEventListener("click", () => {
          setShowPanelDetails(true);
        });
      });
    });

    map.on("contextmenu", (e) => {
      handleCreatePanel(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
    };
  }, [currentAccount]);

  return (
    <div className="map-section">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`map-container ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}>
        <h2 className="text-center text-white my-4 text-2xl">Solar Panel Locations</h2>
        <div id="map" className="map"></div>
      </div>

      {/* Display the confirmation dialog if isConfirmingPanel is true */}
      {isConfirmingPanel && (
        <div className="confirmation-popup">
          <p>Do you want to create a new solar panel here?</p>
          <button onClick={confirmCreatePanel}>Yes</button>
          <button onClick={cancelCreatePanel}>No</button>
        </div>
      )}

      {/* Display TradeScript when confirmed */}
      {showTradeScript && <TradeScript close={createPanelOnClose} />}
      {/* Display TradeScript when confirmed */}
      {showTradeScript && (
        <TradeScript
          close={() => setShowTradeScript(false)}
          lat={tradeScriptData.lat}
          lng={tradeScriptData.lng}
          sandiaModuleName={tradeScriptData.sandia_module_name}
          cecInverterName={tradeScriptData.cec_inverter_name}
          close={createPanelOnClose}
        />
      )}

      {/* When showPanelDetails is true, display PanelWindows */}
      {showPanelDetails && selectedPanel && (
        <PanelWindows
          panel={selectedPanel}
          closeWindow={() => setShowPanelDetails(false)}
        />
      )}
    </div>
  );
};

export default MapSection;
