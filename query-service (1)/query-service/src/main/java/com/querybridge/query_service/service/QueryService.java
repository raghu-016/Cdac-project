package com.querybridge.query_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.querybridge.query_service.dto.CreateQueryRequest;
import com.querybridge.query_service.entity.Query;
import com.querybridge.query_service.repository.QueryRepository;

@Service
public class QueryService {

    private final QueryRepository queryRepository;
    private final RestTemplate restTemplate;

    public QueryService(QueryRepository queryRepository, RestTemplate restTemplate) {
        this.queryRepository = queryRepository;
        this.restTemplate = restTemplate;
    }

    public Query createQuery(CreateQueryRequest request) {

        // Validate user exists (USER-SERVICE)
    	String url = "http://USER-SERVICE/api/auth/users/" + request.getUserId();
    	restTemplate.getForObject(url, Object.class);


        Query query = new Query();
        query.setUserId(request.getUserId());
        query.setTitle(request.getTitle());
        query.setBody(request.getBody());

        return queryRepository.save(query);
    }

    // ✅ ADD THIS METHOD
    public Query getQueryById(Long id) {
        return queryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Query not found with id: " + id));
    }
}
