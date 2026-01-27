package com.querybridge.support_service.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.querybridge.support_service.entity.SupportRequest;

public interface SupportRepository extends JpaRepository<SupportRequest, Long> {
    List<SupportRequest> findByUserId(Long userId);
}
