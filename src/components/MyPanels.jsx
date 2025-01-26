import React from 'react';
import '../style/MyPanels.css'; // 引入配套的 CSS

const MyPanels = ({ panelOpen, togglePanel }) => (
  <>
    <div className={`my-panels ${panelOpen ? "open" : "closed"} bg-gray-900 text-white p-4`}>
      {panelOpen && (
        <>
          <div className="panel-info border-b pb-4 mb-4">
            <strong>Solar Panel 1</strong>
            <p>Production: 5kW</p>
          </div>
        </>
      )}
    </div>

    {/* Toggle Button for collapsing and expanding the panel */}
    <button className={`panel-toggle ${panelOpen ? "" : "collapsed"}`} onClick={togglePanel}>
      {panelOpen ? ">>" : "<<"}
    </button>
  </>
);

export default MyPanels;
