import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select"

const NETWORKS = [
  { value: "devnet", label: "Solana Devnet" },
  { value: "mainnet", label: "Solana Mainnet" },
]

export function NetworkSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent>
        {NETWORKS.map((n) => (
          <SelectItem key={n.value} value={n.value}>
            {n.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}