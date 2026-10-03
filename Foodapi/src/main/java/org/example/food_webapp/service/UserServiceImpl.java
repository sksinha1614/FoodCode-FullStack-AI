package org.example.food_webapp.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.food_webapp.dto.UserRequest;
import org.example.food_webapp.dto.UserResponse;
import org.example.food_webapp.entity.UserEntity;
import org.example.food_webapp.repo.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse register(UserRequest userRequest) {

        if (userRepo.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        UserEntity newUser = convertToEntity(userRequest);

        UserEntity registeredUser = userRepo.save(newUser);

        return convertToResponse(registeredUser);
    }

    private UserResponse convertToResponse(UserEntity registeredUser) {
        return UserResponse.builder()
                .email(registeredUser.getEmail())
                .name(registeredUser.getName())
                .id(registeredUser.getId())
                .build();
    }

    private UserEntity convertToEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .email(userRequest.getEmail())
                .name(userRequest.getName())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .build();
    }

    @Override
    public String findByUserId() {
        return "";
    }
}