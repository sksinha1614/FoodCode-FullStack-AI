package org.example.food_webapp.controller;


import lombok.AllArgsConstructor;
import org.example.food_webapp.dto.CartRequest;
import org.example.food_webapp.dto.CartResponse;
import org.example.food_webapp.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request) {
        Long foodId = request.getFoodId();
        if (foodId == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "foodId not found.");
        }
        return cartService.addItemToCart(request);

    }
    @GetMapping
    public CartResponse getCart(){
        return cartService.getCart();
    }


    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart() {
        cartService.clearCart();
    }

    @PostMapping("/remove")
    public CartResponse removeFromCart(@RequestBody CartRequest request) {
        Long foodId = request.getFoodId();
        if (foodId == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "foodId not found.");
        }
        return cartService.removeItemFromCart(request);
    }
}