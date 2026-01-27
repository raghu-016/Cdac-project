package com.querybridge.answer_service.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.querybridge.answer_service.dto.CreateAnswerRequest;
import com.querybridge.answer_service.entity.Answer;
import com.querybridge.answer_service.repository.AnswerRepository;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final RestTemplate restTemplate;

    public AnswerService(AnswerRepository answerRepository, RestTemplate restTemplate) {
        this.answerRepository = answerRepository;
        this.restTemplate = restTemplate;
    }

    public Answer createAnswer(CreateAnswerRequest request) {

        // 🔹 Validate USER
        restTemplate.getForObject(
            "http://USER-SERVICE/api/auth/users/" + request.getUserId(),
            Object.class
        );

        // 🔹 Validate QUERY
        restTemplate.getForObject(
            "http://QUERY-SERVICE/api/queries/" + request.getQueryId(),
            Object.class
        );

        Answer answer = new Answer();
        answer.setUserId(request.getUserId());
        answer.setQueryId(request.getQueryId());
        answer.setContent(request.getContent());

        return answerRepository.save(answer);
    }
}
