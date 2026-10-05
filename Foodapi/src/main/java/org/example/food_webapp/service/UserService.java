package org.example.food_webapp.service;

import org.example.food_webapp.dto.UserRequest;
import org.example.food_webapp.dto.UserResponse;

public interface UserService {


    public UserResponse register(UserRequest userRequest);
    public Long findByUserId();

}
