# Cloud Wallet for Solana

A simple, secure Solana wallet you can use directly in your browser -no extensions or cloud required.

## Features

- Create and manage Solana wallets in your browser
- Encrypted secret keys stored locally (never sent to a server)
- Password-protected wallet access
- Switch between Solana Mainnet and Devnet
- Responsive, modern UI (shadcn/ui + React)
- No backend or browser extension required

## Limitations

- **No password recovery:** If you forget your password, your wallets are unrecoverable.
- **Local storage only:** Clearing browser storage will permanently delete your wallets.
- **No cloud backup or multi-device sync (yet)**
- **No social login or MPC (yet)**

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/AbdulShaikz/cloud-wallet.git
   cd cloud-wallet
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add your `.env` file:
   ```
   VITE_ALCHEMY_API_KEY=your-alchemy-api-key
   ```

4. Start the app:
   ```
   npm run dev
   ```

## Roadmap/ Planned Features

- Social login
- Cloud backup
- Multi-party computation (MPC) support

---

**Do not use for large amounts. This is an early, client-side-only wallet.**

---
