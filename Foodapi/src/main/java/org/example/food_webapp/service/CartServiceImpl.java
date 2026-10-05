package org.example.food_webapp.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.example.food_webapp.dto.CartRequest;
import org.example.food_webapp.dto.CartResponse;
import org.example.food_webapp.entity.CartEntity;
import org.example.food_webapp.repo.CartRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepo cartRepo;
    private final UserService userService;

    @Override
    public CartResponse addItemToCart(CartRequest request) {
        Long loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepo.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));
        Map<Long, Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cart.setItems(cartItems);
        cart = cartRepo.save(cart);
        return convertToResponse(cart);

    }
    @Override
    public CartResponse removeItemFromCart(CartRequest cartRequest) {
        Long loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepo.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found"));
        Map<Long, Integer> cartItems =  entity.getItems();
        if (cartItems.containsKey(cartRequest.getFoodId())) {
            int currentQty = cartItems.get(cartRequest.getFoodId());
            if (currentQty > 0){
                cartItems.put(cartRequest.getFoodId(), currentQty - 1);
            } else {
                cartItems.remove(cartRequest.getFoodId());
            }
            entity = cartRepo.save(entity);
        }
        return convertToResponse(entity);
    }

    @Override
    @Transactional
    public void clearCart() {
        Long loggedUserId = userService.findByUserId();
        cartRepo.deleteByUserId(loggedUserId);

    }

    @Override

    public CartResponse getCart() {
        Long loggedInUserId = userService.findByUserId();
        CartEntity cartEntity=cartRepo.findByUserId(loggedInUserId).orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
        return convertToResponse(cartEntity);

    }

    private CartResponse convertToResponse(CartEntity cartEntity) {
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();

    }
}
