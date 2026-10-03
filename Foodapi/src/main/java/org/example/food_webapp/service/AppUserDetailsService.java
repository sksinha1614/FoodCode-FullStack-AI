package org.example.food_webapp.service;

import lombok.Data;
import org.example.food_webapp.entity.UserEntity;
import org.example.food_webapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import java.util.Collections;

@Component
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user= userRepo.findByEmail(email).orElseThrow(()->  new UsernameNotFoundException("user not found"));
        return new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }
}
