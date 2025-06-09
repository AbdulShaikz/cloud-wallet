const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = require('@solana/web3.js');
const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
const WALLET_ADDRESS = 'BSB5gfLHEPYWc9zRbqckukQXq4ZrPqiWgNF8Lx6oTRMq'; //wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; 

(async () => {
    console.log(`Requesting airdrop for ${WALLET_ADDRESS}`);

    const signature = await SOLANA_CONNECTION.requestAirdrop(
        new PublicKey(WALLET_ADDRESS),
        AIRDROP_AMOUNT
    );

    console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
})();