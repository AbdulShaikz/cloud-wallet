import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-1.png' 

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
      <div className="text-center space-y-4">
        <img
          src={logo}
          alt="Cloud Wallet Logo"
          className="mx-auto mb-4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-lg"
          draggable={false}
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Cloud Wallet for Solana
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
          Create, manage, and access Solana wallets securely in your browser.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/generate">
            <Button className="w-full sm:w-auto">Generate Wallet</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">Dashboard</Button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Coming soon: Social login, cloud backup, and MPC support!
        </p>
      </div>
    </main>
  )
}