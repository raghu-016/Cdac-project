package com.querybridge.user_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.querybridge.user_service.dto.UpdateProfileRequest;
import com.querybridge.user_service.entity.User;
import com.querybridge.user_service.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔹 GET PROFILE
    @GetMapping("/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(
            userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"))
        );
    }

    // 🔹 UPDATE PROFILE
    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setBio(request.getBio());
        user.setRole(request.getRole());

        return ResponseEntity.ok(userRepository.save(user));
    }
    // 🔹 GET USERNAME BY ID
    @GetMapping("/{id}/username")
    public String getUserNameById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(User::getName)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
