import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo.png';

const Sidebar = ({ sidebarOpen }) => {

  const navItems = [
    {
      path: '/add',
      icon: 'bi-plus-circle',
      label: 'Add Food'
    },
    {
      path: '/list',
      icon: 'bi-grid',
      label: 'My Menu'
    },
    {
      path: '/orders',
      icon: 'bi-cart',
      label: 'Orders'
    }
  ];

  return (
    <aside
      className={`sidebar border-end ${
        sidebarOpen ? '' : 'd-none'
      }`}
      id="sidebar-wrapper"
    >

      {/* Logo */}
      <div className="sidebar-brand">
        <img
          src={logo}
          alt="FoodCode Logo"
          className="foodcode-logo"
        />
      </div>

      {/* Navigation */}
      <div className="sidebar-content">

        <div className="nav-section-title">
          MENU
        </div>

        <nav className="sidebar-nav">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon">
                <i className={`bi ${item.icon}`}></i>
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}

        </nav>

      </div>

      {/* Admin Profile */}
      <div className="sidebar-bottom">

        <div className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div className="admin-info">
            <div className="admin-name">
              Admin
            </div>

            <small>
              Administrator
            </small>
          </div>

          <i className="bi bi-three-dots-vertical ms-auto"></i>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;