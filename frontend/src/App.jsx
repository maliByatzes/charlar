import { ThemeProvider } from '@/components/theme-provider'
import './App.css'
import Home from './pages/home/Home';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center">
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App
