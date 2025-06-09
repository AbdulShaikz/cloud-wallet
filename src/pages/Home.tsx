import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Cloud Wallet for Solana
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
          Create, manage, and access Solana wallets with fast, secure social login and MPC.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/generate">
            <Button className="w-full sm:w-auto">Generate Wallet</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}