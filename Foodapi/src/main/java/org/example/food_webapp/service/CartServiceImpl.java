package org.example.food_webapp.service;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.food_webapp.dto.CartRequest;
import org.example.food_webapp.entity.CartEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class CartServiceImpl implements CartService {



    @Override
    public CartRequest addItemToCart(CartRequest cartRequest) {

    }

    @Override
    public CartRequest removeItemFromCart(CartRequest cartRequest) {
        return null;
    }

    @Override
    public void clearCart() {

    }

    @Override
    public CartEntity getCart() {
        return null;
    }
}
