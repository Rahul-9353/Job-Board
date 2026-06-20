import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )
    
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    )
    
    const login = (userData, jwt) => {
        setUser(userData)
        setToken(jwt)
        localStorage.setItem('token', jwt)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
