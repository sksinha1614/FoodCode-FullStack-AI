package org.example.food_webapp.service;

import lombok.RequiredArgsConstructor;
import org.example.food_webapp.dto.FoodRequest;
import org.example.food_webapp.dto.FoodResponse;
import org.example.food_webapp.entity.FoodEntity;
import org.example.food_webapp.repo.FoodRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final S3Client s3Client;
    private final FoodRepo foodRepository;

    @Value("${aws.s3.bucket}")
    private String bucketname;

    @Override
    public String uploadFile(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid file"
            );
        }

        String filenameExtension =
                originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        String key = UUID.randomUUID() + "." + filenameExtension;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketname)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromBytes(file.getBytes())
            );

            if (response.sdkHttpResponse().isSuccessful()) {
                return "http://" + bucketname + ".s3.localhost.localstack.cloud:4566/" + key;
            }

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "File upload failed"
            );

        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while uploading the file"
            );
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity = convertToEntity(request);

        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFoodById(Long id) {

        FoodEntity food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        return convertToResponse(food);
    }


    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket("foodcode")
                .key(filename)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteFood(Long id) {
        FoodResponse response = readFoodById(id);
        String imageUrl = response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean isFileDelete = deleteFile(filename);
        if (isFileDelete){
            foodRepository.deleteById(response.getId());
        }

    }


    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}