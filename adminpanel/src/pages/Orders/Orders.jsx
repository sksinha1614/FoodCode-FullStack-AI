import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Orders.css';

const Orders = () => {
    const[data, setData] = useState([]);

    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setData(response.data);
    };

    const updateStatus = async (event, orderId) => {
      const response = await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`);
      if (response.status === 200) {
        await fetchOrders();
        
      }
    };

    useEffect(() => {
      fetchOrders();
    }, []);

    return (
      <div className="admin-orders-page">
        <div className="container">
          <div className="py-5 row justify-content-center">
            <div className="col-12 col-xl-11">
                <h2 className="admin-orders-title">Orders</h2>

                <ul className="admin-orders-list">
                    {
                        data.map((order, index) => {
                            return (
                                <li
                                    className="admin-order-card"
                                    key={index}
                                    data-status={String(order.orderStatus).toLowerCase()}
                                >
                                    <div className="admin-order-icon">
                                        <img src={assets.parcel} alt="" height={30} width={30} />
                                    </div>

                                    <div className="admin-order-main">
                                        <ul className="admin-order-items">
                                            {order.orderedItems.map((item, i) => (
                                                <li className="admin-order-item" key={i}>
                                                    <span className="admin-order-qty">{item.quantity}</span>
                                                    <span>{item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="admin-order-address">
                                            <i className="bi bi-geo-alt"></i>
                                            <span>{order.userAddress}</span>
                                        </div>
                                    </div>

                                    <div className="admin-order-amount">
                                        &#x20B9;{order.amount.toFixed(2)}
                                    </div>

                                    <div className="admin-order-count">
                                        Items: {order.orderedItems.length}
                                    </div>

                                    <select
                                        className="admin-order-select"
                                        onChange={(event) => updateStatus(event, order.id)}
                                        value={order.orderStatus}
                                    >
                                        <option value="Food Preparing">Food Preparing</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
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

export default Orders;