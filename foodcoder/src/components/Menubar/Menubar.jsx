import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const { quantities, token,setQuantities } = useContext(StoreContext);
  const cartCount = Object.values(quantities).filter((qty) => qty > 0).length;

  const logout = () => {
    localStorage.removeItem("token");
    setQuantities({});
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid p-0 m-0">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt=""
            className="mx-4"
            height={80}
            width={78}
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
                className={
                  active === "home" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  active === "contact-us"
                    ? "nav-link fw-bold active"
                    : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3 me-5 nav-actions">
            {/* Cart */}
            <Link to="/cart" className="position-relative nav-cart">
              <img src={assets.cart} alt="Cart" height={100} width={100} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {!token ? (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="dropdown">
                <button
                  className="btn p-0 border-0 bg-transparent dropdown-toggle nav-avatar-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assets.profile}
                    className="rounded-circle nav-avatar"
                    alt="User"
                    height={36}
                    width={36}
                  />
                </button>

                <ul className="dropdown-menu dropdown-menu-end nav-dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/myorders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;