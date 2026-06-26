package com.jobboard.backend.service;

import com.jobboard.backend.model.Job;
import com.jobboard.backend.model.User;
import com.jobboard.backend.repository.JobRepository;
import com.jobboard.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

//    getting all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

//    getting jobs by id
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Not Found with id: " + id));
    }

//    job posting
    public Job createJob(Job job, String recruiterEmail) {
        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new RuntimeException("Recruiter Not Found!"));
        job.setPostedBy(recruiter);
        return jobRepository.save(job);
    }

//    update existing job
    public Job updateJob(Long id, Job updateJob, String recruiterEmail) {
        Job existingJob = getJobById(id);

        if (!existingJob.getPostedBy().getEmail().equals(recruiterEmail)) {
            throw new RuntimeException("Your not authorized to update this Job!");
        }

        existingJob.setTitle(updateJob.getTitle());
        existingJob.setCompany(updateJob.getCompany());
        existingJob.setLocation(updateJob.getLocation());
        existingJob.setType(updateJob.getType());
        existingJob.setSalaryMin(updateJob.getSalaryMin());
        existingJob.setSalaryMax(updateJob.getSalaryMax());
        existingJob.setDescription(updateJob.getDescription());
        existingJob.setSkills(updateJob.getSkills());

        return jobRepository.save(existingJob);
    }

//    deleting job post
    public void deleteJob(Long id, String recruiterEmail) {
        Job existingJob = getJobById(id);

        if (!existingJob.getPostedBy().getEmail().equals(recruiterEmail)) {
            throw new RuntimeException("Your not authorized to delete this Job!");
        }

        jobRepository.delete(existingJob);
    }

//    Search job by keywords
    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

//    filter job by location
    public List<Job> filterByLocation(String location) {
        return jobRepository.findByLocation(location);
    }

//    filter job by type
    public List<Job> filterByType(String type) {
        return jobRepository.findByType(type);
    }
}
