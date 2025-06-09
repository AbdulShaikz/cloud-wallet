import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ThemeToggle from './components/ThemeToggle'
import GenerateWallet from './pages/GenerateWallet'
import Dashboard from './pages/DashboardPage'
import { Toaster } from "sonner"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-white transition-colors">
        <ThemeToggle />
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}