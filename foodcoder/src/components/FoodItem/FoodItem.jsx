import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQuantity, decreaseQuantity, quantities } = useContext(StoreContext);
  const qty = quantities?.[id] || 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="food-card">
        <Link to={`/food/${id}`} className="food-card-img-wrap">
          <img src={imageUrl} className="food-card-img" alt={name} />
          <span className="food-card-badge">
            <i className="bi bi-star-fill"></i> 4.2
          </span>
        </Link>

        <div className="food-card-body">
          <h5 className="food-card-title">{name}</h5>
          <p className="food-card-desc">{description}</p>

          <div className="food-card-footer">
            <span className="food-card-price">&#8377;{price}</span>

            {qty > 0 ? (
              <div className="food-qty-control">
                <button className="qty-btn" onClick={() => decreaseQuantity(id)}>
                  <i className="bi bi-dash"></i>
                </button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => increaseQuantity(id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            ) : (
              <button className="add-btn" onClick={() => increaseQuantity(id)}>
                <i className="bi bi-plus-circle"></i> Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;