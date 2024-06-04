import { ThemeProvider } from '@/components/theme-provider'
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/register/Register';
import { useAuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function App() {
  const { authUser } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" /> } />
          <Route path="/register" element={authUser ? <Navigate to='/' /> : <Register />} />
          <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
