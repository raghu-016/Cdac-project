package com.querybridge.support_service.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.querybridge.support_service.dto.CreateSupportRequest;
import com.querybridge.support_service.entity.SupportRequest;
import com.querybridge.support_service.repository.SupportRepository;

@Service
public class SupportService {

    private final SupportRepository supportRepository;
    private final RestTemplate restTemplate;

    public SupportService(SupportRepository supportRepository,
                          RestTemplate restTemplate) {
        this.supportRepository = supportRepository;
        this.restTemplate = restTemplate;
    }

    public SupportRequest create(CreateSupportRequest request) {

        // 🔹 Validate user exists
        restTemplate.getForObject(
            "http://USER-SERVICE/api/users/" + request.getUserId(),
            Object.class
        );

        SupportRequest support = new SupportRequest();
        support.setUserId(request.getUserId());
        support.setName(request.getName());
        support.setEmail(request.getEmail());
        support.setMessage(request.getMessage());

        return supportRepository.save(support);
    }
}
