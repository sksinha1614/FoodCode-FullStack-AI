import React from 'react';
import { assets,categories } from '../../assets/assets';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div
      className="hero-section d-flex flex-column text-black bg-light mt-3 py-5 px-2 rounded-3 border border-0 text-white justify-content-center align-items-center"
      style={{ backgroundImage: `url(${assets.header})` }}
    >
      <h1 className="display-5 fw-semibold d-flex align-items-center gap-2">
        <i className="bi bi-egg-fried text-white"></i> Good Food. Great Mood!!
      </h1> 
      
      <p className="fw-normal fs-5 mt-3 "> 
        <i className="bi bi-truck text-white me-2"></i> 
        Discover delicious meals and new flavors, delivered straight to your doorstep. 
      </p>
      <Link to="/explore" className='align-self-center'><button className="btn btn-dark mt-3">Explore</button></Link>
    </div>
  );
};

export default Header;