package com.jobboard.backend.repository;

import com.jobboard.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByLocation(String location);
    List<Job> findByType(String type);
    List<Job> findByPostedById(Long userId);
}
