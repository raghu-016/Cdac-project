package com.querybridge.query_service.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.querybridge.query_service.dto.CreateQueryRequest;
import com.querybridge.query_service.entity.Query;
import com.querybridge.query_service.service.QueryService;

@RestController
@RequestMapping("/api/queries")
//@CrossOrigin(origins = "http://localhost:5174")
public class QueryController {

    private final QueryService queryService;

    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping
    public ResponseEntity<Query> create(@RequestBody CreateQueryRequest request) {
        return ResponseEntity.ok(queryService.createQuery(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Query> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
                queryService.getQueryById(id)
        );
    }
    // 🔹 ADD THIS TO QueryController.java
    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        return ResponseEntity.ok(queryService.getAllQueries()); // You need to add this method to QueryService too!
    }
}
