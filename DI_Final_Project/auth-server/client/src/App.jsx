import './App.css'
import Dashboard from './assets/components/Dashboard'
import Header from './assets/components/Header'
import LoginRegister from './assets/components/LoginRegister'
import Admin from './assets/components/Admin'
import Auth from './auth/Auth'
import { Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react'

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null) 
  return (
    <AuthContext.Provider value={{token, setToken, userInfo, setUserInfo}}>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path= '/Admin' element={<Auth><Admin/></Auth>} />
        <Route path='/login' element={<LoginRegister mode='Login'/>} />
        <Route path='/register' element={<LoginRegister mode='Register'/>} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
