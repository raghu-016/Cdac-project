package com.querybridge.answer_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateAnswerRequest {

    @NotNull
    private Long queryId;

    @NotNull
    private Long userId;

    @NotBlank
    private String content;

    public Long getQueryId() { return queryId; }
    public Long getUserId() { return userId; }
    public String getContent() { return content; }

    public void setQueryId(Long queryId) { this.queryId = queryId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setContent(String content) { this.content = content; }
}
