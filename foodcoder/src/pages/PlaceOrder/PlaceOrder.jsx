import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { calculateTotalPrice } from '../../util/cartUtils';

const PlaceOrder = () => {

    const { foodList, quantities } = useContext(StoreContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    // Prevent error if data is not loaded yet
    if (!foodList || !quantities) {
        return <div className="po-loading">Loading...</div>;
    }

    // Cart items
    const cartItems = foodList.filter(
        food => quantities[food.id] > 0
    );

    // Calculate cart total
    const {
        subtotal,
        shippingFee,
        total
    } = calculateTotalPrice(cartItems, quantities);

    // Tax
    const tax = subtotal * 0.1;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            state,
            city,
            zip
        });
    };

    return (
        <div className="container mt-2 po-page">

            <main>

                {/* LOGO */}
                <div className="py-5 text-center po-header">
                    <img
                        className="d-block mx-auto po-logo"
                        src={assets.logo}
                        alt="Logo"
                        width="150"
                        height="150"
                    />
                    <h2 className="po-title">Checkout</h2>
                    <p className="po-subtitle">You're almost there, review your order and ship it</p>
                </div>

                <div className="row g-4">

                    {/* CART */}
                    <div className="col-md-5 col-lg-4 order-md-last">

                        <div className="card po-summary-card">
                            <div className="card-body">

                                <h4 className="d-flex justify-content-between align-items-center mb-3 po-summary-heading">

                                    <span>
                                        Your cart
                                    </span>

                                    <span className="po-badge">
                                        {cartItems.length}
                                    </span>

                                </h4>

                                <ul className="list-unstyled mb-0 po-item-list">

                                    {cartItems.map((item) => (
                                        <li
                                            key={item.id}
                                            className="d-flex justify-content-between po-item"
                                        >
                                            <div>

                                                <h6 className="my-0 po-item-name">
                                                    {item.name}
                                                </h6>

                                                <small className="po-item-qty">
                                                    Qty: {quantities[item.id]}
                                                </small>

                                            </div>

                                            <span className="po-item-price">
                                                &#8377;
                                                {(
                                                    item.price *
                                                    quantities[item.id]
                                                ).toFixed(2)}
                                            </span>

                                        </li>
                                    ))}

                                    {/* SHIPPING */}
                                    <li className="d-flex justify-content-between po-row">
                                        <span>
                                            Shipping
                                        </span>

                                        <span className="po-row-value">
                                            &#8377;
                                            {shippingFee.toFixed(2)}
                                        </span>
                                    </li>

                                    {/* TAX */}
                                    <li className="d-flex justify-content-between po-row">

                                        <span>
                                            Tax (10%)
                                        </span>

                                        <span className="po-row-value">
                                            &#8377;
                                            {tax.toFixed(2)}
                                        </span>

                                    </li>

                                    <hr />

                                    {/* TOTAL */}
                                    <li className="d-flex justify-content-between po-total">

                                        <span>
                                            Total (INR)
                                        </span>

                                        <strong>
                                            &#8377;
                                            {total.toFixed(2)}
                                        </strong>

                                    </li>

                                </ul>

                            </div>
                        </div>

                    </div>


                    {/* BILLING ADDRESS */}
                    <div className="col-md-7 col-lg-6">

                        <div className="card po-form-card">
                            <div className="card-body">

                                <h4 className="mb-4 po-form-heading">
                                    Billing address
                                </h4>

                                <form
                                    className="needs-validation"
                                    onSubmit={onSubmitHandler}
                                >

                                    <div className="row g-3">

                                        {/* FIRST NAME */}
                                        <div className="col-sm-6">

                                            <label
                                                htmlFor="firstName"
                                                className="form-label po-label"
                                            >
                                                First name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control po-input"
                                                id="firstName"
                                                name="firstName"
                                                required
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                            />

                                        </div>


                                        {/* LAST NAME */}
                                        <div className="col-sm-6">

                                            <label
                                                htmlFor="lastName"
                                                className="form-label po-label"
                                            >
                                                Last name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control po-input"
                                                id="lastName"
                                                name="lastName"
                                                required
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                            />

                                        </div>


                                        {/* EMAIL */}
                                        <div className="col-12">

                                            <label
                                                htmlFor="email"
                                                className="form-label po-label"
                                            >
                                                Email
                                            </label>

                                            <div className="input-group po-input-group">

                                                <span className="input-group-text po-input-addon">
                                                    @
                                                </span>

                                                <input
                                                    type="email"
                                                    className="form-control po-input"
                                                    id="email"
                                                    name="email"
                                                    placeholder="you@example.com"
                                                    required
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />

                                            </div>

                                        </div>


                                        {/* PHONE */}
                                        <div className="col-12">

                                            <label
                                                htmlFor="phone"
                                                className="form-label po-label"
                                            >
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                className="form-control po-input"
                                                id="phone"
                                                name="phoneNumber"
                                                placeholder="1234567890"
                                                required
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(e.target.value)
                                                }
                                            />

                                        </div>


                                        {/* ADDRESS */}
                                        <div className="col-12">

                                            <label
                                                htmlFor="address"
                                                className="form-label po-label"
                                            >
                                                Address
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control po-input"
                                                id="address"
                                                name="address"
                                                placeholder="1234 Main St"
                                                required
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                            />

                                        </div>


                                        {/* STATE */}
                                        <div className="col-md-5">

                                            <label
                                                htmlFor="state"
                                                className="form-label po-label"
                                            >
                                                State
                                            </label>

                                            <select
                                                className="form-select po-input"
                                                id="state"
                                                name="state"
                                                required
                                                value={state}
                                                onChange={(e) =>
                                                    setState(e.target.value)
                                                }
                                            >

                                                <option value="">
                                                    Choose...
                                                </option>

                                                <option value="Uttar Pradesh">
                                                    Uttar Pradesh
                                                </option>

                                                <option value="Jharkhand">
                                                    Jharkhand
                                                </option>

                                                <option value="Delhi">
                                                    Delhi
                                                </option>

                                            </select>

                                        </div>


                                        {/* CITY */}
                                        <div className="col-md-4">

                                            <label
                                                htmlFor="city"
                                                className="form-label po-label"
                                            >
                                                City
                                            </label>

                                            <select
                                                className="form-select po-input"
                                                id="city"
                                                name="city"
                                                required
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            >

                                                <option value="">
                                                    Choose...
                                                </option>

                                                <option value="Agra">
                                                    Agra
                                                </option>

                                                <option value="Ranchi">
                                                    Ranchi
                                                </option>

                                                <option value="Delhi">
                                                    Delhi
                                                </option>

                                            </select>

                                        </div>


                                        {/* ZIP */}
                                        <div className="col-md-3">

                                            <label
                                                htmlFor="zip"
                                                className="form-label po-label"
                                            >
                                                Zip
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control po-input"
                                                id="zip"
                                                name="zip"
                                                placeholder="282001"
                                                required
                                                value={zip}
                                                onChange={(e) =>
                                                    setZip(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>

                                    <button
                                        className="w-100 btn po-submit-btn btn-lg mt-3"
                                        type="submit"
                                        disabled={cartItems.length === 0}
                                    >
                                        Continue to checkout
                                    </button>

                                </form>

                            </div>
                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default PlaceOrder;