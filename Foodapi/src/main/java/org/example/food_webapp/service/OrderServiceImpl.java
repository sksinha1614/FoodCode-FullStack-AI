package org.example.food_webapp.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import jakarta.transaction.Transactional;
import org.example.food_webapp.dto.OrderRequest;
import org.example.food_webapp.dto.OrderResponse;
import org.example.food_webapp.entity.OrderEntity;
import org.example.food_webapp.repo.CartRepo;
import org.example.food_webapp.repo.OrderRepo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CartRepo cartRepository;

    @Value("${razorpay.key}")
    private String razorpayKey;
    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {

        OrderEntity newOrder = convertToEntity(request);
        newOrder = orderRepository.save(newOrder);


        RazorpayClient razorpayClient =
                new RazorpayClient(razorpayKey.trim(), razorpaySecret.trim());
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (newOrder.getAmount() * 100));
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
        Long loggedInUserId = userService.findByUserId();
        newOrder.setUserId(loggedInUserId);
        newOrder = orderRepository.save(newOrder);
        return convertToResponse(newOrder);


    }

    @Override
    @Transactional
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        OrderEntity existingOrder = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setPaymentStatus(status);
        existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
        existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
        orderRepository.save(existingOrder);
        if ("paid".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(existingOrder.getUserId());
        }

    }

    @Override
    public List<OrderResponse> getUserOrders() {
        Long loggedInUserId = userService.findByUserId();
        List<OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeOrder(UUID orderId) {
        orderRepository.deleteById(orderId);


    }

    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {
        List<OrderEntity> list = orderRepository.findAll();
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());

    }

    @Override
    public void updateOrderStatus(UUID orderId, String status) {
        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        entity.setOrderStatus(status);
        orderRepository.save(entity);

    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .id(newOrder.getId())
                .userId(newOrder.getUserId())
                .userAddress(newOrder.getUserAddress())
                .phoneNumber(newOrder.getPhoneNumber())
                .email(newOrder.getEmail())
                .orderedItems(newOrder.getOrderedItems())
                .amount(newOrder.getAmount())
                .paymentStatus(newOrder.getPaymentStatus())
                .razorpayOrderId(newOrder.getRazorpayOrderId())
                .razorpayKey(razorpayKey)
                .razorpaySignature(newOrder.getRazorpaySignature())
                .razorpayPaymentId(newOrder.getRazorpayPaymentId())
                .orderStatus(newOrder.getOrderStatus())
                .build();
    }

    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .orderedItems(request.getOrderedItems())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(request.getOrderStatus())
                .build();
    }
}