package org.example.food_webapp.service;

import com.razorpay.RazorpayException;
import org.example.food_webapp.dto.OrderRequest;
import org.example.food_webapp.dto.OrderResponse;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

    void verifyPayment(Map<String, String> paymentData, String status);

    List<OrderResponse> getUserOrders();

    void removeOrder(UUID orderId);

    List<OrderResponse> getOrdersOfAllUsers();

    void updateOrderStatus(UUID orderId, String status);

}