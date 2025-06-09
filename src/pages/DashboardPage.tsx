import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import { DollarSign, CopyIcon, CheckIcon, SendIcon, WalletIcon, Loader2 } from "lucide-react"
import { ThemeToggle } from "../components/ThemeToggle"
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"

type Wallet = {
  publicKey: string
  secretKey: string
}

export default function Dashboard() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [balances, setBalances] = useState<Record<number, string>>({})
  const [loadingBalance, setLoadingBalance] = useState<Record<number, boolean>>({})

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [sending, setSending] = useState(false)

  const connection = new Connection("https://api.devnet.solana.com")

  useEffect(() => {
    const saved = localStorage.getItem("wallets")
    if (saved) {
      setWallets(JSON.parse(saved))
    }
  }, [])

  const handleCopy = (key: string, index: number) => {
    navigator.clipboard.writeText(key)
    setCopiedIndex(index)
    toast("Public key copied!")
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  const handleCheckBalance = async (wallet: Wallet, index: number) => {
    try {
      setLoadingBalance(prev => ({ ...prev, [index]: true }))
      const publicKey = new PublicKey(wallet.publicKey)
      const lamports = await connection.getBalance(publicKey)
      const sol = lamports / 1e9
      setBalances(prev => ({ ...prev, [index]: sol.toFixed(4) + " SOL" }))
    } catch (err) {
      toast.error("Failed to fetch balance.")
    } finally {
      setLoadingBalance(prev => ({ ...prev, [index]: false }))
    }
  }

  const handleSend = async (wallet: Wallet, index: number) => {
    try {
      setSending(true);

      if (!recipient || recipient.length < 32) {
        toast.error("Please enter a valid recipient public key.");
        return;
      }

      const solAmount = parseFloat(amount);
      if (isNaN(solAmount) || solAmount <= 0) {
        toast.error("Please enter a valid amount.");
        return;
      }

      let secretKeyArr;
      try {
        secretKeyArr = JSON.parse(wallet.secretKey);
        if (!Array.isArray(secretKeyArr)) throw new Error();
      } catch {
        toast.error("Invalid secret key format.");
        return;
      }

      const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArr));
      const toPublicKey = new PublicKey(recipient);
      const lamports = solAmount * 1e9;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports,
        })
      );

      const signature = await connection.sendTransaction(transaction, [fromKeypair]);
      await connection.confirmTransaction(signature);

      toast.success("Transaction successful!");
      toast(`Explorer: https://solana.fm/tx/${signature}`);

      setRecipient("");
      setAmount("");
      setOpenModalIndex(null);
    } catch (err: any) {
      toast.error("Failed to send transaction: " + (err?.message || err));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Wallets</h1>
        <ThemeToggle />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.length === 0 && <p>No wallets found. Generate one first!</p>}
        {wallets.map((wallet, index) => (
          <Card
            key={index}
            className="bg-background dark:bg-background-dark border border-foreground/10 dark:border-white/10 shadow-xl transition-colors duration-300"
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary dark:text-highlight">
                <WalletIcon className="w-5 h-5" />
                Wallet {index + 1}
              </CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(wallet.publicKey, index)}
                aria-label="Copy public key"
              >
                {copiedIndex === index ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 text-sm break-all">
              <p><strong>Public Key:</strong></p>
              <p className="bg-muted p-2 rounded">{wallet.publicKey}</p>

              {balances[index] && (
                <p className="text-xs mt-1 text-muted-foreground">
                  Balance: {balances[index]}
                </p>
              )}

              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setOpenModalIndex(index);
                    setRecipient("");
                    setAmount("");
                  }}
                  aria-label="Send SOL"
                >
                  <SendIcon className="w-4 h-4 mr-1" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCheckBalance(wallet, index)}
                  disabled={loadingBalance[index]}
                  aria-label="Check Balance"
                >
                  {loadingBalance[index] ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-1" />
                      Check Balance
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Dialog
          open={openModalIndex !== null}
          onOpenChange={(open) => {
            setOpenModalIndex(open ? openModalIndex : null);
            if (!open) {
              setRecipient("");
              setAmount("");
            }
          }}
        >
          <DialogContent className="bg-background dark:bg-background-dark">
            <DialogHeader>
              <DialogTitle>Send SOL</DialogTitle>
            </DialogHeader>

            <Input
              type="text"
              placeholder="Recipient Public Key"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Amount in SOL"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <DialogFooter className="mt-4">
              <Button
                disabled={sending}
                onClick={() => {
                  if (openModalIndex !== null) {
                    handleSend(wallets[openModalIndex], openModalIndex);
                  }
                }}
              >
                {sending ? "Sending..." : "Send SOL"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}