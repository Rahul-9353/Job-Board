package com.jobboard.backend.service;

import com.jobboard.backend.model.Application;
import com.jobboard.backend.model.Job;
import com.jobboard.backend.model.User;
import com.jobboard.backend.repository.ApplicationRepository;
import com.jobboard.backend.repository.JobRepository;
import com.jobboard.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final JobRepository jobRepository;

    private final UserRepository userRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

//    Application submited by logged in candidates
    public List<Application> getMyApplications(String candidateEmail) {

        User candidate = userRepository.findByEmail(candidateEmail)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        return applicationRepository.findByCandidateId(candidate.getId());
    }

//    Apply to a job
    public Application applyToJob(Long jobId, String candidateEmail) {

        User candidate = userRepository.findByEmail(candidateEmail)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found!"));

        if (applicationRepository.existsByJobIdAndCandidateId(
                jobId, candidate.getId())) {
            throw new RuntimeException("Application already exists!");
        }

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);

        application.setStatus(Application.Status.APPLIED);

        return applicationRepository.save(application);
    }

//    Update application status
    public Application updateStatus(Long applicationId,
                                    String status,
                                    String recruiterEmail) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found!"));

        if (!application.getJob().getPostedBy().getEmail().equals(recruiterEmail)) {
            throw new RuntimeException("You are not allowed to update this application!");
        }

        application.setStatus(Application.Status.valueOf(status.toUpperCase()));

        return applicationRepository.save(application);
    }

//    application for specific job

    public List<Application> getApplicationsByJob(Long jobId,
                                                  String recruiterEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found!"));

        if (!job.getPostedBy().getEmail().equals(recruiterEmail)) {
            throw new RuntimeException("You are not allowed to update this application!");
        }

        return applicationRepository.findByJobId(jobId);
    }

//    delete or withdrawn application
    public void  deleteApplication(Long applicationId,
                                   String candidateEmail) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found!"));

        if (!application.getCandidate().getEmail().equals(candidateEmail)) {
            throw new RuntimeException("You are not allowed to delete this application!");
        }

        applicationRepository.delete(application);
    }
}
