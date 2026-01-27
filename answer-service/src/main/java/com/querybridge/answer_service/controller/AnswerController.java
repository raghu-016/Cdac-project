package com.querybridge.answer_service.controller;


import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.querybridge.answer_service.dto.CreateAnswerRequest;
import com.querybridge.answer_service.entity.Answer;
import com.querybridge.answer_service.repository.AnswerRepository;
import com.querybridge.answer_service.service.AnswerService;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin(origins = "http://localhost:5173")
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerRepository answerRepository;

    public AnswerController(AnswerService answerService, AnswerRepository answerRepository) {
        this.answerService = answerService;
        this.answerRepository = answerRepository;
    }

    @PostMapping
    public ResponseEntity<Answer> create(@RequestBody CreateAnswerRequest request) {
        return ResponseEntity.ok(answerService.createAnswer(request));
    }

    @GetMapping("/query/{queryId}")
    public ResponseEntity<List<Answer>> getByQuery(@PathVariable Long queryId) {
        return ResponseEntity.ok(answerRepository.findByQueryId(queryId));
    }
}
