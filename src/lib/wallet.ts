import { Keypair } from '@solana/web3.js'

export function generateWallet() {
  const keypair = Keypair.generate()

  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: JSON.stringify(Array.from(keypair.secretKey)),
  }
}