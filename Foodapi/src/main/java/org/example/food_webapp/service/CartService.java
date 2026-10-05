package org.example.food_webapp.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.food_webapp.dto.CartRequest;
import org.example.food_webapp.dto.CartResponse;
import org.example.food_webapp.entity.CartEntity;
import org.springframework.stereotype.Service;


public interface CartService {

    CartResponse addItemToCart(CartRequest cartRequest);
    CartResponse removeItemFromCart(CartRequest cartRequest);
    void clearCart();
    CartResponse getCart();
}

