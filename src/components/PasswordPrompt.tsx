import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { decryptSecretKey } from "../lib/crypto"
import { AlertTriangle } from "lucide-react"

interface PasswordPromptProps {
  open: boolean
  onClose: () => void
  encryptedKeySample: string // sample key to test password
  onSuccess: (password: string) => void
}

export function PasswordPrompt({ open, onClose, encryptedKeySample, onSuccess }: PasswordPromptProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    try {
      const decrypted = decryptSecretKey(encryptedKeySample, password)
      if (decrypted) {
        onSuccess(password)
        setError("")
        toast.success("Password accepted!")
        onClose()
      }
    } catch {
      setError("Incorrect password. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Wallet Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
            <AlertTriangle className="text-yellow-500" size={18} />
            <span className="text-xs text-yellow-700 dark:text-yellow-300">
              If you forget your password, your wallets cannot be recovered.
            </span>
          </div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || !password}>
            {loading ? "Checking..." : "Unlock Wallets"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}