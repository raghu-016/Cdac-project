package com.querybridge.user_service.controller;


import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.querybridge.user_service.dto.LoginRequest;
import com.querybridge.user_service.dto.RegisterRequest;
import com.querybridge.user_service.entity.User;
import com.querybridge.user_service.security.JwtUtil;
import com.querybridge.user_service.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = authService.authenticate(request.getEmail(), request.getPassword());

        String token = JwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
            Map.of(
                "token", token,
                "userId", user.getId(),
                "email", user.getEmail()
            )
        );
    }
    
    	

    
}
