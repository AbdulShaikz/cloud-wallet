import { useState } from "react"
import { generateWallet } from "../lib/wallet"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { ThemeToggle } from "../components/ThemeToggle"
import { EyeIcon, EyeOffIcon, CopyIcon, CheckIcon } from "lucide-react"
import { toast } from "sonner"

export default function GenerateWallet() {
  const [wallet, setWallet] = useState<{ publicKey: string; secretKey: string } | null>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [copied, setCopied] = useState("")
  const navigate = useNavigate()

  const handleGenerate = () => {
    const newWallet = generateWallet()
    setWallet(newWallet)

    const stored = JSON.parse(localStorage.getItem("wallets") || "[]")
    localStorage.setItem("wallets", JSON.stringify([...stored, newWallet]))

    toast.success("Wallet Created!")
  }

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(""), 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-white flex items-center justify-center px-4 transition-colors duration-300">
      <ThemeToggle />
      <Card className="max-w-md w-full shadow-xl bg-background dark:bg-background-dark border border-foreground/10 dark:border-white/10 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary dark:text-highlight">Generate New Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={handleGenerate} 
            className="w-full"
          >
            Generate Wallet
          </Button>
          {wallet && (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Public Key</label>
                <div className="relative">
                  <Input value={wallet.publicKey} readOnly />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1"
                    onClick={() => handleCopy(wallet.publicKey, "public")}
                    aria-label="Copy public key"
                  >
                    {copied === "public" ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Secret Key</label>
                <div className="relative">
                  <Textarea value={showSecret ? wallet.secretKey : "••••••••••••••••••••"} rows={3} readOnly />
                  <div className="absolute right-2 top-2 flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowSecret(prev => !prev)}
                      aria-label={showSecret ? "Hide secret key" : "Show secret key"}
                    >
                      {showSecret ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(wallet.secretKey, "secret")}
                      aria-label="Copy secret key"
                    >
                      {copied === "secret" ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}