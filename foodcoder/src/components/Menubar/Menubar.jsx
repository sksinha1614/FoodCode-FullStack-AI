import React, { useState } from 'react';
import './Menubar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Menubar = ({ cartCount = 0 }) => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();

  const { quantities } = useContext(StoreContext);
  cartCount=Object.values(quantities).filter(qty => qty > 0).length; 

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0 ">
      <div className="container-fluid p-0 m-0">

        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt=""
            className="mx-4"
            height={100}
            width={97}
            
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link
                className={active === 'home' ? 'nav-link fw-bold active' : 'nav-link'}
                to="/"
                onClick={() => setActive('home')}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={active === 'explore' ? 'nav-link fw-bold active' : 'nav-link'}
                to="/explore"
                onClick={() => setActive('explore')}
              >
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={active === 'contact-us' ? 'nav-link fw-bold active' : 'nav-link'}
                to="/contact"
                onClick={() => setActive('contact-us')}
              >
                Contact Us
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-4">

            {/* Cart */}
            <Link to="/cart" className="position-relative">
              <img
                src={assets.cart}
                alt="Cart"
                height={110}
                width={110}
              />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* Login/Register */}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate('/login')}
            >
              Login
            </button>

            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => navigate('/register')}
            >
              Register
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Menubar;