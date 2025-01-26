import React from 'react';
import '../style/Sidebar.css';  // 引入 Sidebar.css 样式文件

const Sidebar = ({ sidebarOpen, toggleSidebar }) => (
  <>
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"} bg-gray-900 text-white p-4`}>
      {sidebarOpen && (
        <>
          <input
            type="search"
            className="w-full p-2 mb-4 bg-gray-800 border-none"
            placeholder="Search for panels..."
          />
          <div className="panel-info border-b pb-4 mb-4">
            <strong>Solar Panel 1</strong>
            <p>Production: 5kW</p>
            <p>Status: Active</p>
          </div>
          <div className="panel-info">
            <strong>Solar Panel 2</strong>
            <p>Production: 3kW</p>
            <p>Status: Maintenance</p>
          </div>
        </>
      )}
    </div>

    {/* Toggle Button that stays when sidebar is collapsed */}
    <button className={`sidebar-toggle ${sidebarOpen ? "" : "collapsed"}`} onClick={toggleSidebar}>
      {sidebarOpen ? "<<" : ">>"}
    </button>
  </>
);

export default Sidebar;
