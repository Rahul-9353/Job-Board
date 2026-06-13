import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate()
    const { user, logout, isLoggedIn } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setMenuOpen(false)
        navigate('/')
    }

  return (

    <>
        <style>{`
            
            .nav-wrapper {
                background: rgba(10, 10, 15, 0.95);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding: 0 5%;
                position: sticky;
                top: 0;
                z-index: 100;
                backdrop-filter: blur(12px);
            }

            .nav-inner {
                max-width: 1280px;
                margin: 0 auto;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .nav-logo {
                text-decoration: none;
                flex-shrink: 0;
            }

            .nav-logo .blue {
                font-size: 1.4rem;
                font-weight: 800;
                color: #2255f5;
            }
            
            .nav-logo .white {
                font-size: 1.4rem;
                font-weight: 800;
                color: white;
            }

            .nav-links {
                display: flex;
                align-items: center;
                gap: 2rem;
            }

            .nav-links a {
                color: #a0a0b8;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.95rem;
                transition: color 0.2s;
                white-space: nowrap;
            }

            .nav-links a:hover {
                color: white;
            }

            .btn-login, .btn-logout, .btn-postjob {
                background: #2255f5;
                color: white;
                border: none;
                padding: 0.5rem 1.3rem;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                transition: background 0.2s;
                white-space: nowrap;
            }

            .btn-login:hover, .btn-postjob:hover {
                background: #1a44e8;
            }

            .btn-logout {
                background: transparent;
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #f87171;
            }

            .btn-logout:hover {
                background: rgba(239, 68, 68, 0.1);
            }

            .user-chip {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.35rem 0.9rem 0.35rem 0.35rem;
                border-radius: 999px;
            }

            .user-avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(34, 85, 245, 0.2);
                color: #6b9bff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: 700;    
            }

            .user-name {
                color: #e8e8f0;
                font-size: 0.85rem;
                font-weight: 600;
            }

            .user-role {
                color: #555570;
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.04rem;
            }

            .hamburger {
                display: none;
                background: none;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 6px;
                padding: 0.4rem 0.7rem;
                cursor: pointer;
                color: white;
                font-size: 1.2rem;
            }

            .mobile-menu {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                padding: 1rem 0;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }

            .mobile-menu a {
                color: #a0a0b8;
                text-decoration: none;
                font-weight: 500;
                font-size: 1rem;
                padding: 0.4rem 0;
            }
            
            .mobile-menu .btn-login,
            .mobile-menu .btn-logout,
            .mobile-menu .btn-postjob {
                width: 100%;
                padding: 0.7rem;
                font-size: 1rem;
                text-align: center;
            }

            .mobile-user-chip {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                margin-bottom: 0.3rem;
            }

            /* Tablet */
            @media (max-width: 1024px) {
                .nav-links {
                    gap: 1rem;
                }
                .nav-links a {
                    font-size: 0.85rem;
                }
                .btn-login,
                .btn-logout,
                .btn-postjob { 
                    padding: 0.45rem 1rem;
                    font-size: 0.85rem;
                }
            }

            /* Mobile */
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                }
                .hamburger {
                    display: block;
                }
            }

        `}</style>

        <nav className='nav-wrapper'>
            <div className='nav-inner'>
                {/* Logo */}
                <Link to="/" className='nav-logo'>
                    <span className='blue'>Job</span>
                    <span className='white'>Board</span>
                </Link>

                {/* Desktop Links */}
                <div className='nav-links'>
                    <Link to="/jobs">Browse Jobs</Link>

                    {isLoggedIn && (
                        <Link to="/tracker">My Applications</Link>
                    )}

                    {isLoggedIn && user?.role === 'RECRUITER' && (
                        <Link to="/post-job">Post a Job</Link>
                    )}

                    {isLoggedIn ? (
                        <>
                            <div className='user-chip'>
                                <div className='user-avatar'>
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <div className='user-name'>{user?.name || 'User'}</div>
                                    <div className='user-role'>{user?.role || 'candidate'}</div>
                                </div>
                            </div>
                            <button className='btn-logout' onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className='btn-login' onClick={() => navigate('/login')}>
                        Login
                        </button>
                    )}
                </div>

                {/* Hamburger */}
                <button className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className='mobile-menu'>
                    {isLoggedIn && (
                        <div className='mobile-user-chip'>
                            <div className='user-avatar'>
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <div className='user-name'>{user?.name || 'User' }</div>
                                <div className='user-role'>{user?.role || 'candidate'}</div>
                            </div>
                        </div>
                    )}

                    <Link to="/jobs" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>

                    {isLoggedIn && (
                        <Link to="/tracker" onClick={() => setMenuOpen(false)}>My Applications</Link>
                    )}

                    {isLoggedIn && user?.role === 'RECRUITER' && (
                        <Link to="/post-job" onClick={() => setMenuOpen(false)}>Post a Job</Link>
                    )}

                    {isLoggedIn ? (
                        <button className='btn-logout' onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className='btn-login' onClick={() => { navigate('/login'); setMenuOpen(false) }}>
                        Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    </>

  )
}

export default Navbar
