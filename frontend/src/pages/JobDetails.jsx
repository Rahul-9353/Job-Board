import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SAMPLE_JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Bangalore', type: 'Full-Time', salary: '12-18 LPA', skills: ['React', 'JavaScript', 'CSS'], posted: '2 days ago', description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive, performant user interfaces using React and modern JavaScript. Strong understanding of CSS, component architecture, and state management is required.' },
  { id: 2, title: 'Backend Developer', company: 'Amazon', location: 'Hyderabad', type: 'Full-Time', salary: '15-22 LPA', skills: ['Java', 'Spring Boot', 'PostgreSQL'], posted: '1 day ago', description: 'Join our backend team to build scalable REST APIs using Java and Spring Boot. You will work with PostgreSQL databases, implement security with Spring Security, and design clean, maintainable services.' },
  { id: 3, title: 'Full Stack Developer', company: 'Flipkart', location: 'Remote', type: 'Full-Time', salary: '10-16 LPA', skills: ['React', 'Node.js', 'MongoDB'], posted: '3 days ago', description: 'We need a Full Stack Developer comfortable working across the stack — React on the frontend, Node.js on the backend, and MongoDB for data storage. Experience with REST APIs and deployment is a plus.' },
  { id: 4, title: 'DevOps Engineer', company: 'Microsoft', location: 'Pune', type: 'Full-Time', salary: '14-20 LPA', skills: ['Docker', 'Kubernetes', 'AWS'], posted: '5 days ago', description: 'Looking for a DevOps Engineer to manage CI/CD pipelines, container orchestration with Kubernetes, and cloud infrastructure on AWS. Strong scripting and automation skills required.' },
  { id: 5, title: 'React Developer', company: 'Swiggy', location: 'Bangalore', type: 'Contract', salary: '8-12 LPA', skills: ['React', 'Redux', 'Tailwind'], posted: '1 day ago', description: 'Contract role for a React Developer to build and maintain customer-facing features. Experience with Redux state management and Tailwind CSS preferred.' },
  { id: 6, title: 'Java Developer', company: 'Infosys', location: 'Chennai', type: 'Full-Time', salary: '6-10 LPA', skills: ['Java', 'Spring', 'MySQL'], posted: '4 days ago', description: 'Entry to mid-level Java Developer role working with Spring framework and MySQL databases. Great opportunity to grow your backend development skills in an enterprise environment.' },
]

function JobDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, user } = useAuth()
    const [applied, setApplied] = useState(false)

    const job = SAMPLE_JOBS.find(j => j.id === parseInt(id))

    if (!job) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a0a0f', color: 'white', textAlign: 'center', padding: '4rem 2rem' }}>
                <h2>Job not found</h2>
                <button 
                    onClick={() => navigate('/jobs')}
                    style={{marginTop: '1rem', background: '#2255f5', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                        Back to Jobs
                    </button>
            </div>
        )
    }

    const handleApply = () => {
        if (!isLoggedIn) {
           navigate('/login')
           return 
        }
        console.log('Applied to job:', job.id, 'by user:', user?.name);
        setApplied(true)
        
    }
  return (
    <>
        <style>{`
            .details-page {
                min-height: 100vh;
                background: #0a0a0f;
                padding: 2rem 5% 4 rem;
            }

            .details-container {
                max-width: 800px;
                margin:0 auto;
            }

            .back-link {
                color: #6b9bff;
                text-decoration: none;
                font-size: 0.875rem;
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                margin-bottom: 1.5rem;
                cursor: pointer;
                background: none;
                border: none;
                padding: 0;
            }

            .back-link:hover {
                text-decoration: underline;
            }

            .details-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 2rem;
            }

            .details-header {
                display: flex;
                gap: 1.2rem;
                align-items: flex-start;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .details-logo {
                width: 64px;
                height: 64px;
                background: rgba(34, 85, 245, 0.15);
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                font-weight: 800;
                color: #6b9bff;
                flex-shrink: 0;
            }

            .details-title-group {
                flex: 1;
                min-width: 200px;
            }

            .details-title {
                font-size: 1.6rem;
                font-weight: 800;
                color: white;
                margin-bottom: 0.3rem;
            }

            .details-company {
                color: #a0a0b8;
                font-size: 1rem;
                margin-bottom: 0.6rem;
            }

            .details-meta {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .details-meta-item {
                color: #7070a0;
                font-size: 0.85rem;
            }

            .type-badge {
                padding: 0.25rem 0.75rem;
                border-radius: 999px;
                font-size: 0.72rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                background: rgba(34, 197, 94, 0.2);
                flex-shrink: 0;
            }

            .type-badge.contract {
                background: rgba(234, 179, 8, 0.12);
                color: #facc15;
                border-color: rgba(234, 179, 8, 0.2);
            }

            .details-section {
                border-top: 1px solid rgba(255, 255, 255, 0.06);
                padding-top: 1.5rem;
                margin-top: 1.5rem;
            }

            .section-label {
                color: white;
                font-weight: 700;
                font-size: 1rem;
                margin-bottom: 0.8rem;
            }

            .details-description {
                color: #a0a0b8;
                font-size: 0.95rem;
                line-height: 1.8;
            }

            .skills-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }

            .skill-tag {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #a0a0b8;
                padding: 0.3rem 0.8rem;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 500;
            }

            .apply-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid rgba(255, 255, 255, 0.06);
                padding-top: 1.5rem;
                margin-top: 1.5rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .salary-display {
                color: #4ade80;
                font-weight: 800;
                font-size: 1.3rem;
            }

            .salary-display span {
                color: #a0a0b8;
                font-weight: 500;
                font-size: 0.85rem;
                display: block;
            }

            .btn-apply-large {
                background: #2255f5;
                color: white;
                border: none;
                padding: 0.85rem 2.2rem;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-apply-large:hover {
                background: #1a44e8;
                transform: translateY(-2px);
            }

            .btn-applied {
                background: rgba(34, 197, 94, 0.12);
                color: #4ade80;
                border: 1px solid rgba(34, 197, 94, 0.25);
                padding: 0.85rem 2.2rem;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 700;
                cursor: default;
            }
        `}</style>

        <div className='details-page'>
            <div className='details-container'>

                <button className='back-link' onClick={() => navigate('/jobs')}>
                    ← Back to all jobs
                </button>

                <div className='details-card'>

                    {/* Header */}
                    <div className='details-header'>
                        <div className='details-logo'>{job.company[0]}</div>
                        <div className='details-title-group'>
                            <div className='details-title'>{job.title}</div>
                            <div className='details-company'>{job.company}</div>
                            <div className='details-meta'>
                                <span className='details-meta-item'>📍 {job.location}</span>
                                <span className='details-meta-item'>🕐 Posted {job.posted}</span>
                            </div>
                        </div>
                        <span className={`type-badge ${job.type === 'Contract' ? 'contract' : ''}`}>
                            {job.type}
                        </span>
                    </div>

                    {/* Description */}
                    <div className='details-section'>
                        <div className='section-label'>Job Description</div>
                        <p className='details-description'>{job.description}</p>
                    </div>

                    {/* Skills */}
                    <div className='details-section'>
                        <div className='section-label'>Required Skills</div>
                        <div className='skills-row'>
                            {job.skills.map(skill => (
                                <span className='skill-tag' key={skill}>{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Apply Bar */}
                    <div className='apply-bar'>
                        <div className='salary-display'>
                            <span>Annual Salary</span>
                                {job.salary}
                        </div>

                        {applied ? (
                            <button className='btn-applied'>✓ Applied</button>
                        ) : (
                            <button className='btn-apply-large' onClick={handleApply}>
                                {isLoggedIn ? 'Apply Now' : 'Login to Apply'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default JobDetails
