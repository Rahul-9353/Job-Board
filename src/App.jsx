import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Tracker from './pages/Tracker'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/tracker' element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App