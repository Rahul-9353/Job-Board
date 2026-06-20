import React, { useState } from 'react'

const SAMPLE_APPLICATIONS = [
  { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Bangalore', salary: '12-18 LPA', status: 'INTERVIEW', appliedDate: '2024-01-10', skills: ['React', 'JavaScript', 'CSS'] },
  { id: 2, title: 'Backend Developer', company: 'Amazon', location: 'Hyderabad', salary: '15-22 LPA', status: 'APPLIED', appliedDate: '2024-01-12', skills: ['Java', 'Spring Boot', 'PostgreSQL'] },
  { id: 3, title: 'Full Stack Developer', company: 'Flipkart', location: 'Remote', salary: '10-16 LPA', status: 'OFFER', appliedDate: '2024-01-08', skills: ['React', 'Node.js', 'MongoDB'] },
  { id: 4, title: 'DevOps Engineer', company: 'Microsoft', location: 'Pune', salary: '14-20 LPA', status: 'REJECTED', appliedDate: '2024-01-05', skills: ['Docker', 'Kubernetes', 'AWS'] },
  { id: 5, title: 'React Developer', company: 'Swiggy', location: 'Bangalore', salary: '8-12 LPA', status: 'APPLIED', appliedDate: '2024-01-14', skills: ['React', 'Redux', 'Tailwind'] },
]

const STATUS_CONFIG = {
  APPLIED:   { label: 'Applied',   color: '#6b9bff', bg: 'rgba(34,85,245,0.12)',   border: 'rgba(34,85,245,0.25)' },
  INTERVIEW: { label: 'Interview', color: '#facc15', bg: 'rgba(234,179,8,0.12)',   border: 'rgba(234,179,8,0.25)' },
  OFFER:     { label: 'Offer',     color: '#4ade80', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.25)' },
  REJECTED:  { label: 'Rejected',  color: '#f87171', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.25)' },
}

function Tracker() {
    const [applications, setApplications] = useState(SAMPLE_APPLICATIONS)
    const [filterStatus, setFilterStatus] = useState('ALL')

    const filtered = filterStatus === 'ALL'
        ? applications
        : applications.filter(a => a.status === filterStatus)
    
    const counts = {
        ALL:        applications.length,
        APPLIED:    applications.filter(a => a.status === 'APPLIED').length,
        INTERVIEW:  applications.filter(a => a.status === 'INTERVIEW').length,
        OFFER:      applications.filter(a => a.status === 'OFFER').length,
        REJECTED: applications.filter(a => a.status === 'REJECTED').length,
    }

    const handleStatusChange = (id, newStatus) => {
        setApplications(prev =>
            prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
        )
    }

    const handleDelete = (id) => {
        setApplications(prev => prev.filter(a => a.id !== id))
    }
  
    return (
        <>
            <style>{`
                .tracker-page {
                    min-height: 100vh;
                    background: #0a0a0f;
                    padding: 2rem 5%;
                }

                .tracker-header {
                    max-width: 1100px;
                    margin: 0 auto 2rem;
                }

                .tracker-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.4rem;
                }

                .tracker-subtitle {
                    color: #a0a0b8;
                    font-size: 0.95rem;
                }

                /* Summary Cards */
                .summary-cards {
                    max-width: 1100px;
                    margin: 0 auto 2rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1rem;
                }

                .summary-card {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    paddding: 1.2rem 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .summary-card:hover, .summary-card.active {
                    border-color: rgba(34, 85, 245, 0.4);
                    background: rgba(34, 85, 245, 0.08);
                }

                .summary-card-number {
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                }

                .summary-card-label {
                    color: #a0a0b8;
                    font-size: 0.85rem;
                    margin-top: 0.2rem;
                }

                /* Applications List */
                .applications-list {
                    max-width: 1100px;
                    margin:0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .app-card {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    transition: all 0.2s;
                    flex-wrap: wrap;
                }

                .app-card:hover {
                    border-color: rgba(34, 85, 245, 0.25);
                    background: rgba(255, 255, 255, 0.06);
                }

                .app-logo {
                    width: 48px;
                    height: 48px;
                    background: rgba(34, 85, 245, 0.15);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #6b9bff;
                    flex-shrink: 0;
                }

                .app-info {
                    flex: 1;
                    min-width: 200px;
                }

                .app-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem
                }

                .app-company {
                    color: #a0a0b8;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }

                .app-meta {
                    dispaly: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .app-meta-item {
                    color: #7070a0;
                    font-size: 0.78rem;
                }

                .app-skills {
                    display: flex;
                    gap: 0.4rem;
                    flex-wrap: wrap;
                    flex: 1;
                    min-width: 150px;
                }

                .skill-tag{
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #a0a0b8;
                    padding: 0.2rem 0.6rem;
                    border-radius: 6px;
                    font-size: 0.72rem;
                }

                .app-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-shrink: 0;
                }

                .status-badge {
                    padding: 0.3rem 0.85rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    white-space: nowrap;
                }

                .status-select {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #e8e8f0;
                    padding: 0.4rem 0.75rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    outline: none;
                    cursor: pointer;
                }

                .status-select option {
                    background: #1a1a2e;
                }

                .btn-delete {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68,68, 0.2);
                    color: #f87171;
                    padding: 0.4rem 0.75rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-delete:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

                /* Empty state */
                .empty-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: #a0a0b8;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .empty-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .empty-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 768px) {
                    .app-card {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .app-actions {
                        width: 100%;
                        justify-content: flex-start;
                    }
                }
            `}</style>

            <div className='tracker-page'>

                {/* Header */}
                <div className='tracker-header'>
                    <h1 className='tracker-title'>My Applications</h1>
                    <p className='tracker-subtitle'>Track and manage all your job applications</p>
                </div>

                {/* Summary Cards */}
                <div className='summary-cards'>
                    {Object.entries(counts).map(([status, count]) => (
                        <div
                            key={status}
                            className={`summary-card ${filterStatus === status ? 'active' : ''}`}
                            onClick={() => setFilterStatus(status)}
                        >
                            <div className='summary-card-number'>{count}</div>
                            <div className='summary-card-label'>
                                {status === 'ALL' ? 'Total Applied' : STATUS_CONFIG[status].label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Applications */}
                {filtered.length > 0 ? (
                    <div className='applications-list'>
                        {filtered.map(app => {
                            const s = STATUS_CONFIG[app.status]
                            return (
                                <div className='app-card' key={app.id}>
                                    <div className='app-logo'>{app.company[0]}</div>

                                    <div className='app-info'>
                                        <div className='app-title'>{app.title}</div>
                                        <div className='app-company'>{app.company}</div>
                                        <div className='app-meta'>
                                            <span className='app-meta-item'>📍 {app.location}</span>
                                            <span className='app-meta-item'>💰 {app.salary}</span>
                                            <span className='app-meta-item'>📅 Applied: {app.appliedDate}</span>

                                        </div>
                                    </div>

                                    <div className='app-skills'>
                                        {app.skills.map(skill => (
                                            <span className='skill-tag' key={skill}>{skill}</span>
                                        ))}
                                    </div>

                                    <div className='app-actions'>
                                        <span 
                                            className='status-badge' 
                                            style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`}}
                                        >
                                            {s.label}
                                        </span>
                                        <select 
                                            className='status-select'
                                            value={app.status}
                                            onChange={e => handleStatusChange(app.id, e.target.value)}
                                        >
                                            <option value="APPLIED">Applied</option>
                                            <option value="INTERVIEW">Interview</option>
                                            <option value="OFFER">Offer</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                        <button className='btn-delete' onClick={() => handleDelete(app.id)}>
                                            ✕
                                        </button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className='empty-state'>
                        <div className='empty-icon'>📋</div>
                        <div className='empty-title'>No applications found</div>
                        <p>Start applying to jobs to track them here!</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Tracker
