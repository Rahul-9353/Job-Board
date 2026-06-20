import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Tracker from './pages/Tracker'
import PostJob from './pages/PostJob'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './pages/JobDetails'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs' element={<Jobs />} />

        {/* Candidate only or logged in user */}
        <Route 
          path='/tracker' 
          element={
            <ProtectedRoute>
              <Tracker />
            </ProtectedRoute>
          } 
        />

        {/* Recruiter */}
        <Route 
          path='/post-job' 
          element={
            <ProtectedRoute allowedRoles={['RECRUITER']}>  
              <PostJob />
            </ProtectedRoute>
          } 
        />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App