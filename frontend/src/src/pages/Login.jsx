import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CANDIDATE'})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        console.log('Auth context working!')
        console.log('Form submitted:', form);
        setLoading(false)
        
    }

  return (
    <>
        <style>{`
            .login-page {
                min-height: 100vh;
                display: flex;
                align-item: center;
                justify-content: center;
                padding: 2rem;
                background: #0a0a0f;
            }

            .login-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 2.5rem;
                width: 100%;
                max-width: 420px;
            }

            .login-title {
                font-size: 1.8rem;
                font-weight: 800;
                color: white;
                margin-bottom: 0.3rem;
            }

            .login-subtitle {
                color: #a0a0b8;
                font-size: 0.9rem;
                margin-bottom: 2rem;
            }

            .form-group {
                margin-bottom: 1.2rem;
            }

            .form-label {
                dispaly: block;
                color: #a0a0b8;
                font-size: 0.85rem;
                font-weight: 500;
                margin-bottom: 0.4rem;
            }

            .form-input {
                width: 100%;
                background: rgba(255,255, 255, 0.05);
                border: 1px solid rgba (255, 255, 255,0.1);
                color: #e8e8f0;
                padding: 0.7rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                outline: none;
                transititon: border-color 0.2s;
                box-sizing: border-box;
            }

            .form-input:focus {
                border-color: #2255f5;
            }

            .form-input::placeholder {
                color: #555570;
            }

            .form-select {
                width: 100%;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #e8e8f0;
                padding: 0.7rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                outline: none;
                cursor: pointer;
                box-sizing: border-box;
            }

            .form-select option {
                background: #1a1a2e;
                color: #e8e8f0;
            }

            .btn-submit {
                width: 100%;
                background: #2255f5;
                color: white;
                border: none;
                padding: 0.8rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
                margin-top: 0.5rem;
            }

            .btn-submit:hover {
                background: #1a44e8;
            }

            .btn-submit:disabled {
                background: #334;
                cursor: not-allowed;
            }

            .error-msg {
                background: rgba(239,68,68,0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                color: #f87171;
                padding: 0.7rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                margin-bottom: 1rem;
            }

            .toggle-text {
                text-align: center;
                color: #a0a0b8;
                font-size: 0.875rem;
                margin-top: 1.5rem;
            }

            .toggle-link {
                color: #2255f5;
                cursor: pointer;
                font-weight: 600;
                background: none;
                border: none;
                font-size: 0.875rem;
                padding: 0;
            }

            .toggle-link:hover {
                text-decoration: underline;
            }

            .divider {
                text-align: center;
                color: #444460;
                font-size: 0.8rem;
                margin: 1rem 0;
            }
        `}
        </style>

    <div className='login-page'>
        <div className='login-card'>
            {/* Title */}
            <h1 className='login-title'>
                {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className='login-subtitle'>
                {isRegister ? 'Join JobBoard today' : 'Login to your JobBoard account'}
            </p>

            {/* Error */}
            {error && <div className='error-msg'>{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit}>

                {/* Name - only on register */}
                {isRegister && (
                    <div className='form-group'>
                        <label className='form-label'>Full Name</label>
                        <input 
                            className='form-input'
                            type="text"
                            name='name'
                            placeholder='Enter name'
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Email */}
                <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input 
                        className='form-input'
                        type="email"
                        name='email'
                        placeholder='Enter mail Id'
                        value={form.email}
                        onChange={handleChange}
                        required 
                    />
                </div>

                {/* Password */}
                <div className='form-group'>
                    <label className='form-label'>Password</label>
                    <input 
                        className='form-input'
                        type="password" 
                        name="password"
                        placeholder='Enter Password'
                        value={form.email}
                        onChange={handleChange}
                        required 
                    />
                </div>

                {/* Role - only on register */}
                {isRegister && (
                    <div className='form-group'>
                        <label className='form-label'>I am a</label>
                        <select 
                            className='form-select'
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="CANDIDATE">Candidate - Looking for jobs</option>
                            <option value="RECRUITER">Recruiter - Posting jobs</option>
                        </select>
                    </div>
                )}

                <button className='btn-submit' type='submit' disabled={loading}>
                    {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
                </button>
            </form>

            {/* Toggle */}
            <div className='toggle-text'>
                {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                <button className='toggle-link' onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Login' : 'Register'}
                </button>
            </div>
        </div>
      
    </div>
    </>
  )
}

export default Login
