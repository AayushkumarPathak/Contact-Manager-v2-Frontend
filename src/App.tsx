import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/HomePage'
import Signup from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import { LoadingProvider } from './contexts/GlobalLoadingContext'


function App() {
  

  return (
    
      <BrowserRouter>
        <LoadingProvider>
          <div className="App min-h-screen min-w-fit">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        </LoadingProvider>
      </BrowserRouter>
    
  )
}

export default App
