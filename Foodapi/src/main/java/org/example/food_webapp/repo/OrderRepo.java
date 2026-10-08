package org.example.food_webapp.repo;

import org.example.food_webapp.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepo extends JpaRepository<OrderEntity, UUID> {

    List<OrderEntity> findByUserId(Long userId);
    Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);
}