package org.example.food_webapp.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.food_webapp.model.OrderItem;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Long userId;

    private String userAddress;

    private String phoneNumber;

    private String email;

    @ElementCollection
    private List<OrderItem> orderedItems;

    private double amount;

    private String paymentStatus;

    private String razorpayOrderId;

    private String razorpaySignature;

    private String razorpayPaymentId;

    private String orderStatus;
}