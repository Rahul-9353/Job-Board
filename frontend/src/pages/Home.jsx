import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

  return (
    <>
        <style>{`
            .home-page {
                min-height: 100vh;
                background: #0a0a0f;
            }
            
            /* hero section */
            .hero {
                text-align: center;
                padding: 6rem 2rem 4rem;
                max-width: 800px;
                margin:0 auto;
            }

            .hero-badge {
                display: inline-block;
                background: rgba(34, 85, 245, 0.15);
                color: #6b9bff;
                border: 1px solid rgba(34, 85, 245, 0.25);
                padding: 0.35rem 1rem;
                border-radius: 999px;
                font-size: 0.8rem;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                margin-bottom: 1.5rem;
            }
            
            .hero-title {
                font-size: clamp(2.5rem, 6vw, 4.5rem);
                font-weight: 800;
                color: white;
                line-height: 1.1;
                margin-bottom: 1.5rem;
            }

            .hero-title span {
                color: #2255f5;
            }

            .hero-subtitle {
                color: #a0a0b8;
                font-size: clamp(1rem, 2vw, 1.2rem);
                line-height: 1.7;
                margin-bottom: 2.5rem;
                max-width:600px;
                margin-left: auto;
                margin-right: auto;
            }

            .hero-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .btn-primary {
                background: #2255f5;
                color: white;
                border: none;
                padding: 0.87rem 2.2rem;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-primary:hover {
                background: #1a44e8;
                transform: translateY(-2px);
            }

            .btn-outline {
                background: transparent;
                color: white;
                border: 1px solid rgba(255,255,255,0.15);
                padding: 0.85rem 2rem;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-outline:hover {
                border-color: rgba(255, 255, 255, 0.35);
                transform: translateY(-2px);
            }

            /* Stats */
            .stats {
                dispaly: flex;
                justify-content: center;
                gap: 3rem;
                padding: 3rem 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.06);}
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                flex-wrap: wrap;
            }

            .stat-item {
                text-align: center;
            }

            .stat-number {
                font-size: 2rem;
                font-weight: 800;
                color: white;
            }

            .stat-number span {
                color: #2255f5;
            }

            .stat-label {
                color: #a0a0b8;
                font-size: 0.85rem;
                margin-top: 0.2rem;
            }

            /* Features */
            .features {
                padding: 5rem 2rem;
                max-width: 1100px;
                margin: 0 auto;
            }

            .features-title {
                text-align: center;
                font-size: 2rem;
                font-weight: 800;
                color: white;
                margin-bottom: 3rem;
            }

            .features-grid {
                dispaly: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 1.5rem;
            }

            .feature-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 14px;
                padding: 2rem;
                transition: all 0.2s;
            }

            .feature-card:hover {
                border-color: rgba(34, 85, 245, 0.3);
                transform: translateY(-3px);
            }

            .feature-icon {
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .feature-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: white;
                margin-bottom: 0.5rem;
            }

            .feature-desc {
                color: #a0a0b8;
                font-size: 0.9rem;
                line-height: 1.6;
            }

            /* CTA */
            .cta {
                text-align: center;
                padding: 5rem 2rem;
                background: rgba(34, 85, 245, 0.05);
                border-top: 1px solid rgba(34, 85, 245, 0.1);
            }

            .cta-title {
                font-size: 2rem;
                font-weight: 800;
                color: white;
                margin-bottom: 1rem;
            }
        `}</style>

        <div className='home-page'>

            {/* hero */}
            <section className='hero'>
                <div className='hero-badge'>🚀 Now Hiring</div>

                <h1 className='hero-title'>
                    Find Your <span>Dream Job</span><br />
                    or Hire Top Talent
                </h1>

                <p className='hero-subtitle'>
                    The modern job board connecting ambitious candidates
                    with great companies. Browse jobs, apply in seconds,
                    and track every application in one place.
                </p>

                <div className='hero-buttons'>
                    <button className='btn-primary' onClick={() => navigate('/jobs')}>
                        Browse Jobs
                    </button>
                    <button className='btn-outline' onClick={() => navigate('/login')}>
                        Post a Job
                    </button>
                </div>

            </section>

            {/* Stats */}
            <section className='stats'>
                <div className='stat-item'>
                    <div className='stat-number'>1,200 <span>+</span></div>
                    <div className='stat-label'>Jobs Posted</div>
                </div>

                <div className='stat-item'>
                    <div className='stat-number'>850 <span>+</span></div>
                    <div className='stat;label'>Companies</div>
                </div>

                <div className='stat-item'>
                    <div className='stat-number'>5,000 <span>+</span></div>
                    <div className='stat-item'>Candidates</div>
                </div>

                <div className='stat-item'>
                    <div className='stat-number'>92 <span>%</span></div>
                    <div className='stat-label'>Success Rate</div>
                </div>
            </section>

            {/* Features */}
            <section className='features'>
                <h2 className='feature-title'>Everything you need</h2>
                
                <div className='features-grid'>
                    <div className='feature-card'>
                        <div className='feature-icon'>🔍</div>
                        <div className='feature-title'>Smart Job Search</div>
                        <div className='feature-desc'>Filter by location, salary, experience level and tech stack to find your perfect match.</div>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>⚡</div>
                        <div className='feature-title'>One-Click Apply</div>
                        <div className='feature-desc'>Apply to jobs instantly. Your profile is pre-filled so you never repeat yourself.</div>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>📊</div>
                        <div className='feature-title'>Application Tracker</div>
                        <div className='feature-desc'>Track every application — Applied, Interview, Offer, Rejected — all in one dashboard.</div>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>🏢</div>
                        <div className='feature-title'>Post Jobs Free</div>
                        <div className='feature-desc'>Recruiters can post jobs, manage listings, and view all applicants in one place.</div>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>🔐</div>
                        <div className='feature-title'>Secure & Private</div>
                        <div className='feature-desc'>JWT authentication with role-based access. Your data is always safe.</div>
                    </div>

                    <div className='feature-card'>
                        <div className='feature-icon'>📱</div>
                        <div className='feature-title'>Works Everywhere</div>
                        <div className='feature-desc'>Fully responsive — use it on desktop, tablet or mobile with ease.</div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className='cta'>
                <h2 className='cta-title'>Ready to get started?</h2>
                <p className='cta-subtitle'>Join thousands of candidates and recruiters today.</p>
                <button className='btn-primary' onClick={() => navigate('/login')}>
                    Create Free Account
                </button>
            </section>

        </div>
    </>
  )
}

export default Home
