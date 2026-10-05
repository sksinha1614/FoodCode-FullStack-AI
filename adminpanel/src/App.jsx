import React from "react";
import { Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import Orders from "./pages/Orders/Orders";
import ListFood from "./pages/ListFood/ListFood";
import Sidebar from "./components/Sidebar/Sidebar";
import Menubar from "./components/Menubar/Menubar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div id="page-content-wrapper">
        <Menubar menuToggle={toggleSidebar} />
        <ToastContainer />

        <div className="container-fluid">
          <Routes>
            <Route
              path="/add"
              element={
                sidebarOpen==false ? (
                  <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <AddFood />
                  </div>
                ) : (
                  <AddFood />
                )
              }
            />
            <Route path="/list" element={<ListFood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
