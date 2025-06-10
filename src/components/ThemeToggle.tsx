import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../components/ui/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.theme === 'dark')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDark])

  return (  
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="absolute top-4 right-4"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
export default ThemeToggle;