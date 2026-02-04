package com.querybridge.query_service.service;

import java.util.List;

import org.jspecify.annotations.Nullable;
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

 	String url = "http://USER-SERVICE/api/users/" + request.getUserId();
		
    	restTemplate.getForObject(url, Object.class);


        Query query = new Query();
        query.setUserId(request.getUserId());
        query.setTitle(request.getTitle());
        query.setBody(request.getBody());

        return queryRepository.save(query);
    }
    public List<Query> getAllQueries() { 
    	return queryRepository.findAll(); }


    public Query getQueryById(Long id) {
        return queryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Query not found with id: " + id));
    }

	
}
