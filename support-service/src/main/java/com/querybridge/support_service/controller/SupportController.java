package com.querybridge.support_service.controller;


import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.querybridge.support_service.dto.CreateSupportRequest;
import com.querybridge.support_service.entity.SupportRequest;
import com.querybridge.support_service.repository.SupportRepository;
import com.querybridge.support_service.service.SupportService;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class SupportController {

    private final SupportService supportService;
    private final SupportRepository supportRepository;

    public SupportController(SupportService supportService,
                             SupportRepository supportRepository) {
        this.supportService = supportService;
        this.supportRepository = supportRepository;
    }

    @PostMapping
    public ResponseEntity<SupportRequest> create(@RequestBody CreateSupportRequest request) {
        return ResponseEntity.ok(supportService.create(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportRequest>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(supportRepository.findByUserId(userId));
    }
}
