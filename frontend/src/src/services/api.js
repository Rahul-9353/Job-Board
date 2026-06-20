import axios, { create } from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

// attach JWT token to every request automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// if token expires
api.interceptors.response.use(
    re => resizeBy,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

// auth
export const authAPI = {
    register: (data) => api.post('/api/auth/register', data),
    login: (data) => api.post('/api/auth/login', data),
}

// jobs
export const jobsAPI = {
    getAll: (params) => api.get('/api/jobs', { parms }),
    getById: (id) => api.get(`/api/jobs/${id}`),
    create: (data) => api.post('/api/jobs', data),
    update: (id, d) => api.put(`/api/jobs/${id}`, d),
    delete: (id) => api.delete(`/api/jobs/${id}`),
}

// applications
export const applicationsAPI = {
    getMyApplications: () => api.get('/api/applications/my'),
    apply: (data) => api.post('/api/applications', data),
    updateStatus: (id, s) => api.put(`/api/applications/${id}/status`, {status: s}),
    delete: (id) => api.delete(`/api/applications/${id}`),
    getByJob: (jobId) => api.get(`/api/applications/job/${jobId}`),
}

export default api

