package com.querybridge.notification_service.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.querybridge.notification_service.dto.CreateNotificationRequest;
import com.querybridge.notification_service.entity.Notification;
import com.querybridge.notification_service.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final RestTemplate restTemplate;

    public NotificationService(NotificationRepository notificationRepository,
                               RestTemplate restTemplate) {
        this.notificationRepository = notificationRepository;
        this.restTemplate = restTemplate;
    }

    public Notification createNotification(CreateNotificationRequest request) {

        // Validate USER exists
        restTemplate.getForObject(
            "http://USER-SERVICE/api/auth/users/" + request.getUserId(),
            Object.class
        );

        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setMessage(request.getMessage());

        return notificationRepository.save(notification);
    }
}
