package org.example.food_webapp.service;

import org.example.food_webapp.dto.FoodRequest;
import org.example.food_webapp.dto.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request,MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFoodById(Long id);

    boolean deleteFile(String filename);

    void deleteFood(Long id);



}
