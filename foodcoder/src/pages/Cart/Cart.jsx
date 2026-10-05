import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { calculateTotalPrice } from '../../util/cartUtils';
import './Cart.css';

const Cart = () => {
    const {
        foodList,
        quantities,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useContext(StoreContext);

    const navigate = useNavigate();

    const cartItems = foodList.filter(
        food => quantities[food.id] > 0
    );

    const { subtotal, tax, shippingFee, total } =
        calculateTotalPrice(cartItems, quantities);

    return (
        <div className="container py-5 cart-page">
            <h1 className="mb-5 cart-heading">Your Shopping Cart</h1>

            <div className="row">

                {/* Cart Items */}
                <div className="col-lg-8">

                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <i className="bi bi-cart3"></i>
                            <p>Your cart is empty.</p>
                            <Link to="/" className="btn cart-btn-primary">
                                Browse the menu
                            </Link>
                        </div>
                    ) : (
                        <div className="card cart-card mb-4">
                            <div className="card-body">

                                {cartItems.map((food, index) => (
                                    <div
                                        key={food.id}
                                        className={`row cart-item align-items-center${index !== cartItems.length - 1 ? ' cart-item-divider' : ''}`}
                                    >
                                        {/* Image */}
                                        <div className="col-md-3">
                                            <img
                                                src={food.imageUrl}
                                                alt={food.name}
                                                className="img-fluid rounded cart-item-img"
                                                width={100}
                                            />
                                        </div>

                                        {/* Food Details */}
                                        <div className="col-md-5">
                                            <h5 className="card-title cart-item-name">
                                                {food.name}
                                            </h5>

                                            <p className="cart-item-category">
                                                {food.category}
                                            </p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-md-2">
                                            <div className="cart-stepper">
                                                <button
                                                    className="cart-stepper-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(food.id)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="text"
                                                    className="cart-stepper-input"
                                                    value={quantities[food.id]}
                                                    readOnly
                                                />

                                                <button
                                                    className="cart-stepper-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(food.id)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price & Remove */}
                                        <div className="col-md-2 text-end">
                                            <p className="cart-item-price">
                                                &#8377;
                                                {(
                                                    food.price *
                                                    quantities[food.id]
                                                ).toFixed(2)}
                                            </p>

                                            <button
                                                className="cart-remove-btn"
                                                onClick={() =>
                                                    removeFromCart(food.id)
                                                }
                                                aria-label="Remove item"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}

                    {/* Continue Shopping */}
                    <div className="text-start mb-4">
                        <Link
                            to="/"
                            className="btn cart-btn-ghost"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-lg-4">

                    <div className="card cart-summary">
                        <div className="card-body">

                            <h5 className="card-title mb-4">
                                Order Summary
                            </h5>

                            {/* Subtotal */}
                            <div className="d-flex justify-content-between mb-3 cart-summary-row">
                                <span>Subtotal</span>
                                <span>
                                    &#8377;{subtotal.toFixed(2)}
                                </span>
                            </div>

                            {/* Shipping */}
                            <div className="d-flex justify-content-between mb-3 cart-summary-row">
                                <span>Shipping</span>
                                <span>
                                    &#8377;{shippingFee.toFixed(2)}
                                </span>
                            </div>

                            {/* Tax */}
                            <div className="d-flex justify-content-between mb-3 cart-summary-row">
                                <span>Tax</span>
                                <span>
                                    &#8377;{tax.toFixed(2)}
                                </span>
                            </div>

                            <hr />

                            {/* Total */}
                            <div className="d-flex justify-content-between mb-4 cart-summary-total">
                                <strong>Total</strong>
                                <strong>
                                    &#8377;{total.toFixed(2)}
                                </strong>
                            </div>

                            {/* Checkout */}
                            <button
                                className="btn cart-checkout-btn w-100"
                                disabled={cartItems.length === 0}
                                onClick={() => navigate('/order')}
                            >
                                Proceed to Checkout
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;