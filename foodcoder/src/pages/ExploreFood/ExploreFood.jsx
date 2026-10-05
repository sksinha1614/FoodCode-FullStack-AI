import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './ExploreFood.css';

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="explore-hero">
        <div className="container text-center">
          <h2 className="explore-title">Explore our menu</h2>
          <p className="explore-subtitle">Find your favourite dish from a curated menu</p>

          <div className="row justify-content-center">
            <div className="col-md-7">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="search-bar">
                  <select
                    className="category-select"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="All">All</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Burger">Burger</option>
                    <option value="Cake">Cakes</option>
                    <option value="Ice Cream">Ice Cream</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Salad">Salad</option>
                  </select>

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search your favourite dish..."
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                  />

                  <button className="search-btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
};

export default ExploreFood;