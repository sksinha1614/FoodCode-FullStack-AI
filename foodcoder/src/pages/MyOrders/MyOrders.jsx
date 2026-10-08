import React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import './MyOrders.css';

const MyOrders = () => {
    const {token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get("http://localhost:8080/api/orders", {headers: {"Authorization": `Bearer ${token}`}});
        setData(response.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
      <div className="orders-page">
        <div className="container">
          <div className="py-5 row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
                <h2 className="orders-title">My orders</h2>

                <ul className="orders-list">
                    {
                        data.map((order, index) => {
                            return (
                                <li
                                    className="order-card"
                                    key={index}
                                    data-status={String(order.orderStatus).toLowerCase()}
                                >
                                    <div className="order-icon">
                                        <img src={assets.delivery} alt="" height={30} width={30} />
                                    </div>

                                    <div className="order-main">
                                        <ul className="order-items">
                                            {order.orderedItems.map((item, i) => (
                                                <li className="order-item" key={i}>
                                                    <span className="order-qty">{item.quantity}</span>
                                                    <span className="order-name">{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="order-count">
                                            Items: {order.orderedItems.length}
                                        </div>
                                        {order.userAddress && (
                                            <div className="order-address">
                                                <i className="bi bi-geo-alt"></i>
                                                <span>{order.userAddress}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="order-amount">
                                        &#x20B9;{order.amount.toFixed(2)}
                                    </div>

                                    <div className="order-status text-capitalize">
                                        <span className="order-dot"></span>
                                        {order.orderStatus}
                                    </div>

                                    <button className="order-refresh" onClick={fetchOrders} aria-label="Refresh orders">
                                        <i className="bi bi-arrow-clockwise"></i>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
          </div>
        </div>
      </div>  
    );
};

export default MyOrders;