package org.example.food_webapp.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.food_webapp.dto.CartRequest;
import org.example.food_webapp.entity.CartEntity;
import org.springframework.stereotype.Service;


public interface CartService {

    CartRequest addItemToCart(CartRequest cartRequest);
    CartRequest removeItemFromCart(CartRequest cartRequest);
    void clearCart();
    CartEntity getCart();
}

