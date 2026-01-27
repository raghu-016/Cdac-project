package com.querybridge.notification_service.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateNotificationRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String message;

    public Long getUserId() { return userId; }
    public String getMessage() { return message; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setMessage(String message) { this.message = message; }
}
