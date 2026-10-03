package org.example.food_webapp.controller;


import lombok.AllArgsConstructor;
import org.example.food_webapp.dto.AuthenticationRequest;
import org.example.food_webapp.dto.AuthenticationResponse;
import org.example.food_webapp.dto.UserRequest;
import org.example.food_webapp.service.AppUserDetailsService;
import org.example.food_webapp.service.UserServiceImpl;
import org.example.food_webapp.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {
    private final AppUserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?>login (@RequestBody AuthenticationRequest  request){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            final String jwtToken = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(request.getEmail(), jwtToken));
        }
        catch(BadCredentialsException e){
            return ResponseEntity.status(403).body("invalid username or password");

        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest){
        userService.register(userRequest);
        return ResponseEntity.status(201).body("User Registered");

    }

}
