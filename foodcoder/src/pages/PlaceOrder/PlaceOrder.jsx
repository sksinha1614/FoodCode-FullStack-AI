import React from "react";
import "./PlaceOrder.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState, useRef } from "react";
import { calculateTotalPrice } from "../../util/cartUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const paidRef = useRef(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    paidRef.current = false;

    const orderData = {
      userAddress: `${data.firstName}, ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (
        response.status === 201 &&
        response.data.razorpayOrderId &&
        response.data.razorpayKey
      ) {
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("Unable to place order. Please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to place order. Please try again");
    }
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: order.razorpayKey,
      amount: Math.round(Number(order.amount)),
      currency: "INR",
      name: "FoodCoder",
      description: "Food order payment",
      order_id: order.razorpayOrderId,

      handler: async function (razorpayResponse) {
        paidRef.current = true;
        await verifyPayment(razorpayResponse);
      },

      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },

      theme: {
        color: "#3399cc",
      },

      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay using UPI",
              instruments: [{ method: "upi" }],
            },
          },
          sequence: ["block.upi"],
          preferences: { show_default_blocks: true },
        },
      },

      modal: {
        ondismiss: async function () {
          if (paidRef.current) return;
          toast.error("Payment cancelled.");
          await deleteOrder(order.id);
        },
      },
    };

    if (!window.Razorpay) {
      toast.error("Razorpay failed to load. Please refresh the page.");
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/verify",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Payment Successful.");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment Failed. Please try again");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment verification failed.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Contact support team");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuantities({});
    } catch (error) {
      console.error(error);
      toast.error("Error while clearing the cart");
    }
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shippingFee, tax, total } = calculateTotalPrice(
    cartItems,
    quantities,
  );

  return (
    <div className="po_page">
      <header className="po_header">
        <h1 className="po_title">Checkout</h1>
        <p className="po_subtitle">
          Tell us where to deliver, then pay securely with Razorpay.
        </p>
      </header>

      <div className="po_layout">
        <form
          id="po_checkout_form"
          className="po_form"
          onSubmit={onSubmitHandler}
        >
          <section className="po_card">
            <h2 className="po_card_title">Contact details</h2>

            <div className="po_grid">
              <div className="po_field">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Saurabh"
                  autoComplete="given-name"
                  required
                  onChange={onChangeHandler}
                  value={data.firstName}
                />
              </div>

              <div className="po_field">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Kumar"
                  autoComplete="family-name"
                  required
                  onChange={onChangeHandler}
                  value={data.lastName}
                />
              </div>

              <div className="po_field po_span2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>

              <div className="po_field po_span2">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phoneNumber"
                  placeholder="1234567890"
                  autoComplete="tel"
                  required
                  onChange={onChangeHandler}
                  value={data.phoneNumber}
                />
              </div>
            </div>
          </section>

          <section className="po_card">
            <h2 className="po_card_title">Delivery address</h2>

            <div className="po_grid">
              <div className="po_field po_span2">
                <label htmlFor="address">Street address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="House number, street, landmark"
                  autoComplete="street-address"
                  required
                  onChange={onChangeHandler}
                  value={data.address}
                />
              </div>

              <div className="po_field">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  required
                  onChange={onChangeHandler}
                  value={data.state}
                >
                  <option value="">Choose state</option>
                  <option>Uttar Pradesh</option>
                </select>
              </div>

              <div className="po_field">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city"
                  required
                  onChange={onChangeHandler}
                  value={data.city}
                >
                  <option value="">Choose city</option>
                  <option>Agra</option>
                </select>
              </div>

              <div className="po_field po_span2">
                <label htmlFor="zip">PIN code</label>
                <input
                  type="number"
                  id="zip"
                  name="zip"
                  placeholder="282001"
                  autoComplete="postal-code"
                  required
                  onChange={onChangeHandler}
                  value={data.zip}
                />
              </div>
            </div>
          </section>

          <button
            className="po_pay_btn po_pay_mobile"
            type="submit"
            disabled={cartItems.length === 0}
          >
            Pay ₹{total.toFixed(2)}
          </button>
        </form>

        <aside className="po_summary">
          <div className="po_card po_summary_card">
            <div className="po_summary_head">
              <h2 className="po_card_title">Your order</h2>
              <span className="po_badge">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <p className="po_empty">
                Your cart is empty. Add some dishes to continue.
              </p>
            ) : (
              <ul className="po_items">
                {cartItems.map((item) => (
                  <li key={item.id} className="po_item">
                    <img
                      className="po_item_img"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div className="po_item_info">
                      <span className="po_item_name">{item.name}</span>
                      <span className="po_item_qty">
                        Qty {quantities[item.id]}
                      </span>
                    </div>
                    <span className="po_item_price">
                      ₹{item.price * quantities[item.id]}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <dl className="po_totals">
              <div className="po_row">
                <dt>Subtotal</dt>
                <dd>₹{subtotal.toFixed(2)}</dd>
              </div>
              <div className="po_row">
                <dt>Shipping</dt>
                <dd>₹{shippingFee.toFixed(2)}</dd>
              </div>
              <div className="po_row">
                <dt>Tax (10%)</dt>
                <dd>₹{tax.toFixed(2)}</dd>
              </div>
              <div className="po_row po_total">
                <dt>Total</dt>
                <dd>₹{total.toFixed(2)}</dd>
              </div>
            </dl>

            <button
              className="po_pay_btn po_pay_desktop"
              type="submit"
              form="po_checkout_form"
              disabled={cartItems.length === 0}
            >
              Pay ₹{total.toFixed(2)}
            </button>

            <p className="po_secure">
              Payments are processed securely by Razorpay.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PlaceOrder;