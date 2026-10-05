import React from "react";
import './Menubar.css';

const Menubar = ({ menuToggle }) => {
  return (
    <nav className="topbar border-bottom">
      <div className="container-fluid">

        {/* Left Section */}
        <div className="topbar-left">

          <button
            className="sidebar-toggle"
            id="sidebarToggle"
            onClick={menuToggle}
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="page-info">
            <h6>Admin Dashboard</h6>
            <small>Manage your food delivery system</small>
          </div>

        </div>

    

      </div>
    </nav>
  );
};

export default Menubar;