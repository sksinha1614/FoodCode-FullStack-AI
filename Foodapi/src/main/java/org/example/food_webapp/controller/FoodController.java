package org.example.food_webapp.controller;

import lombok.AllArgsConstructor;
import org.example.food_webapp.dto.FoodRequest;
import org.example.food_webapp.dto.FoodResponse;
import org.example.food_webapp.service.FoodServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {

    private final FoodServiceImpl foodService;

    @PostMapping
    public ResponseEntity<FoodResponse> addFood(
            @RequestPart("food") String foodString,
            @RequestPart("file") MultipartFile multipartFile) {

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            FoodRequest foodRequest =
                    objectMapper.readValue(foodString, FoodRequest.class);

            FoodResponse foodResponse =
                    foodService.addFood(foodRequest, multipartFile);

            return ResponseEntity.ok(foodResponse);

        } catch (JacksonException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid JSON format"
            );
        }
    }

    @GetMapping
    public ResponseEntity<List<FoodResponse>> getAllFoods() {
        return ResponseEntity.ok(foodService.readFoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodResponse>getFoodById(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.readFoodById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodById(@PathVariable Long id) {

        foodService.deleteFood(id);

        return ResponseEntity.noContent().build();
    }
}