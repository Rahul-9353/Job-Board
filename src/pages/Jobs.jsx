import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SAMPLE_JOBS = [
    { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Bangalore', type: 'Full-Time', salary: '12-18 LPA', skills: ['React', 'JavaScript', 'CSS'], posted: '2 days ago' },
    { id: 2, title: 'Backend Developer', company: 'Amazon', location: 'Hyderabad', type: 'Full-Time', salary: '15-22 LPA', skills: ['Java', 'Spring Boot', 'PostgreSQL'], posted: '1 day ago' },
    { id: 3, title: 'Full Stack Developer', company: 'Flipkart', location: 'Remote', type: 'Full-Time', salary: '10-16 LPA', skills: ['React', 'Node.js', 'MongoDB'], posted: '3 days ago' },
    { id: 4, title: 'DevOps Engineer', company: 'Microsoft', location: 'Pune', type: 'Full-Time', salary: '14-20 LPA', skills: ['Docker', 'Kubernetes', 'AWS'], posted: '5 days ago' },
    { id: 5, title: 'React Developer', company: 'Swiggy', location: 'Bangalore', type: 'Contract', salary: '8-12 LPA', skills: ['React', 'Redux', 'Tailwind'], posted: '1 day ago' },
    { id: 6, title: 'Java Developer', company: 'Infosys', location: 'Chennai', type: 'Full-Time', salary: '6-10 LPA', skills: ['Java', 'Spring', 'MySQL'], posted: '4 days ago' },
]

function Jobs() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [locationFilter, setLocationFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')

    const filtered = SAMPLE_JOBS.filter(job => {
        const matchSearch = job.title.toLocaleLowerCase().  includes(search.toLowerCase()) ||
                            job.company.toLowerCase().includes(search.toLowerCase()) || 
                            job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
        
        const matchLocation = locationFilter ? job.location === locationFilter :true

        const matchType = typeFilter ? job.type === typeFilter : true

        return matchSearch && matchLocation && matchType
    })

  return (
    <>
        <style>{`
            .jobs-page {
                min-height: 100vh;
                background: #0a0a0f;
                padding: 2rem 5%;
            }

            .jobs-header {
                max-width: 1100px;
                margin: 0 auto 2rem;
            }

            .jobs-title {
                font-size: 2rem;
                font-weight: 800;
                color: white;
                margin-bottom: 0.4rem;
            }

            .jobs-subtitle {
                color: #a0a0b8;
                font-size: 0.95rem;
            }

            /* Search & Filters */
            .filters {
                max-width: 1100px;
                margin: 0 auto 2rem;
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .search-input {
                flex: 1;
                min-width: 200px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #e8e8f0;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                font-size: 0.9rem;
                outline: none;
                transition: border-color 0.2s;
            }

            .search-input:focus { border-color: #2255f5; }
            .search-input:placeholder { color: #555570; }

            .filter-select {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #e8e8f0;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                font-size: 0.9rem;
                outline: none;
                cursor: pointer;
                min-width: 150px;
            }

            .filter-select option {
                background: #1a1a2e;
            }

            /* Results count */
            .results-count {
                max-width: 1100px;
                margin: 0 auto 1rem;
                color: #a0a0b8;
                font-size: 0.875rem;
            }

            .results-count span {
                color: white;
                font-weight: 600;
            }

            /* Job Cards Grid */
            .jobs-grid {
                max-width: 1100px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.2rem;
            }

            .job-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 14px;
                padding: 1.5rem;
                transition: all 0.2s;
                cursor: pointer;
            }

            .job-card:hover {
                border-color: rgba(34, 85, 245, 0.35);
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.06);
            }

            .job-card-top {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }

            .job-company-logo {
                width: 44px;
                height: 44px;
                background: rgba(34, 85, 245, 0.15);
                border-radius: 10px;
                dispaly: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: 800;
                color: #6b9bff;
            }

            .job-type-badge {
                padding: 0.25rem 0.75rem;
                border-radius: 999px;
                font-size: 0.72rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                background: rgba(34, 197, 94, 0.12);
                color: #4ade80;
                border: 1px solid rgba(34, 197, 94, 0.2);
            }

            .job-type-badge.contract {
                background: rgba(234, 179, 8, 0.12);
                color: #facc15;
                border-color: rgba(234, 179, 8, 0.2);
            }

            .job-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: white;
                margin-bottom: 0.3rem;
            }

            .job-company {
                color: #a0a0b8;
                font-size: 0.875rem;
                margin-bottom: 0.75rem;
            }

            .job-meta {
                dispaly: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .job-meta-item {
                color: #7070a0;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }

            .job-skills {
                dispaly: flex;
                flex-wrap: wrap;
                gap: 0.4rem;
                margin-bottom: 1.2rem;
            }

            .skill-tag {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #a0a0b8;
                padding: 0.2rem 0.65rem;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .job-card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid rgba(255, 255, 255, 0.06);
                padding-top: 1rem;
            }

            .job-salary {
                color: #4ade80;
                font-weight: 700;
                font-size: 0.9rem;
            }

            .btn-apply {
                background: #2255f5;
                color: white;
                border: none;
                padding: 0.45rem 1.1rem;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }

            .btn-apply:hover {
                background: #1a44e8;
            }

            .job-posted {
                color: #555570;
                font-size: 0.75rem;
            }

            /* No results */
            .no-results {
                text-align: center;
                padding: 4rem 2rem;
                color: #a0a0b8;
                max-width:1100px;
                margin: 0 auto;
            }

            .no-results-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .no-results-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: white;
                margin-bottom: 0.5rem;
            }
        
        `}</style>

        <div className='jobs-page'>

            {/* Header */}
            <div className='jobs-header'>
                <h1 className='jobs-title'>Browse Jobs</h1>
                <p className='jobs-subtitle'>Find your next opportunity from top companies</p>
            </div>

            {/* Filters */}
            <div className='filters'>
                <input 
                    className='search-input'
                    type="text"
                    placeholder='🔍  Search by title, company or skill...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select 
                    className='filter-select'
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderbad">Hyderbad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Remote">Remote</option>
                </select>

                <select 
                    className='filter-select'
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                </select>
            </div>

            {/* Result Count */}
            <div className='results-count'>
                Showing <span>{filtered.length}</span> jobs
            </div>

            {/* Job Cards */}
            {filtered.length > 0 ? (
                <div className='jobs-grid'>
                    {filtered.map(job => (
                        <div className='job-card' key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
                            <div className='job-card-top'>
                                <div className='job-company-logo'>
                                    {job.company[0]}
                                </div>
                                <span className={`job-type-badge ${job.type === 'Contract' ? 'contract' : ''}`}>
                                    {job.type}
                                </span>
                            </div>

                            <div className='job-title'>{job.title}</div>
                            <div className='job-company'>{job.company}</div>

                            <div className='job-meta'>
                                <span className='job-meta-item'>📍 {job.location}</span>
                                <span className='job-meta-item'>🕐 {job.posted}</span>
                            </div>

                            <div className='job-skills'>
                                {job.skills.map(skill => (
                                    <span className='skill-tag' key={skill}>{skill}</span>
                                ))}
                            </div>

                            <div className='job-card-footer'>
                                <span className='job-salary'>{job.salary}</span>
                                <button className='btn-apply' onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`) }}>
                                    View Details
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <div className='no-results'>
                    <div className='no-results-icon'>🔍</div>
                    <div className='no-results-title'>No jobs found</div>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    </>
  )
}

export default Jobs
