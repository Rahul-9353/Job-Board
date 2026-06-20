import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PostJob() {
    const navigate = useNavigate()
    const [form, setForm] = useState ({
        title: '',
        company: '',
        location: '',
        type: 'Full-Time',
        salaryMin: '',
        salaryMax: '',
        skills: '',
        description: ''
    })
    const [success,setSuccess] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Job posted:', form);
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        
    }

    return (
        <>
            <style>{`
                .postjob-page {
                    min-height: 100vh;
                    background: #0a0a0f;
                    padding: 2rem 5% 4rem;
                }

                .postjob-header {
                    max-width: 700px;
                    margin: 0 auto 2rem;
                }

                .postjob-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.4rem;
                }

                .postjob-subtitle {
                    color: #a0a0b8;
                    font-size: 0.95rem;
                }

                .postjob-card {
                    max-width: 700px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 2rem;
                }

                .success-msg {
                    max-width: 700px;
                    margin: 0 auto 1.5rem;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.25);
                    color: #4ade80;
                    padding: 0.85rem 1.2rem;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
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

                .form-input, .form-select, .form-textarea {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #e8e8f0;
                    padding: 0.7rem 1rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                    font-family: inherit;
                }

                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    border-color: #2255f5;
                }

                .form-input::placeholder, .form-textarea::placeholder {
                    color: #555570;
                }

                .form-select option {
                    background: #1a1a2e;
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .form-hint {
                    color: #7070a0;
                    font-size: 0.78rem;
                    margin-top: 0.3rem;
                }

                .btn-submit {
                    width: 100%;
                    background: #2255f5;
                    color: white;
                    border: none;
                    padding: 0.85rem;
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

                @media (max-width: 600px) {
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>  
            <div className='postjob-page'>
                
                <div className='postjob-header'>
                    <h1 className='postjob-title'>Post a Job</h1>
                    <p className='postjob-subtitle'>Fill in the details to publish your job listing</p>
                </div>

                {success && (
                    <div className='success-msg'>
                        ✅ Job posted successfully! It's now live on the job board.
                    </div>
                )} 

                <div className='postjob-card'>
                    <form onSubmit={handleSubmit}>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label className='form-label'>Job Title</label>
                                <input 
                                    className='form-input'
                                    type="text"
                                    name='title'
                                    placeholder='e.g. Frontend Developer'
                                    value={form.title}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Company Name</label>
                                <input 
                                    className='form-input'
                                    type="text"
                                    name='company'
                                    placeholder='e.g. Google'
                                    value={form.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label className='form-label'>Location</label>
                                <input 
                                    className='form-input'
                                    type="text"
                                    name='location'
                                    placeholder='e.g. Bangalore / Remote'
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Job Type</label>
                                <select 
                                    className='form-select'
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                >
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label className='form-label'>Min Salary (LPA)</label>
                                <input 
                                    className='form-input'
                                    type="number"
                                    name='salaryMin'
                                    placeholder='e.g. 10'
                                    value={form.salaryMin}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Max Salary (LPA)</label>
                                <input 
                                    className='form-input'
                                    type="number"
                                    name='salaryMax'
                                    placeholder='e.g. 16'
                                    value={form.salaryMax}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>Required Skills</label>
                            <input 
                                className='form-input'
                                type="text"
                                name='skills'
                                placeholder='e.g. React, JavaScript, CSS'
                                value={form.skills}
                                onChange={handleChange}
                                required 
                            />
                            <div className='form-hint'>Separate skills with commas</div>
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>Job Description</label>
                            <textarea 
                                className='form-textarea'
                                name="description"
                                placeholder='Describe the role, responsibilities, and requirements...'
                                value={form.description}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <button className='btn-submit' type='submit'>
                            Post Job
                        </button>
                    </form>
                </div>   
            </div>  
        </>
    )
}

export default PostJob

