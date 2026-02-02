package com.querybridge.query_service.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateQueryRequest {

    @NotNull
    private Long userId;
//    private Long userName;

    @NotBlank
    private String title;

    @NotBlank
    private String body;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    

    public String getTitle() { return title; }
//    public Long getUserName() {
//		return userName;
//	}
//	public void setUserName(Long userName) {
//		this.userName = userName;
//	}
	public void setTitle(String title) { this.title = title; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
}
