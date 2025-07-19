# AutoInteractionBot Scripts

This directory contains scripts for deploying and interacting with the AutoInteractionBot smart contract.

## Scripts

### 1. `deployBot.js` - Deploy the AutoInteractionBot contract

Deploys the AutoInteractionBot contract to the specified network.

**Usage:**
```bash
# Deploy to localhost (for testing)
npx hardhat run scripts/deployBot.js --network localhost

# Deploy to BSC testnet
npx hardhat run scripts/deployBot.js --network bscTestnet

# Deploy to BSC mainnet
npx hardhat run scripts/deployBot.js --network bscMainnet
```

**Environment Variables:**
- `TRUSTED_EXECUTOR`: Address of the trusted executor (defaults to deployer)
- `PANCAKE_ROUTER_V2`: PancakeSwap router address (defaults to BSC mainnet router)

**Example:**
```bash
TRUSTED_EXECUTOR=0x123... PANCAKE_ROUTER_V2=0x456... npx hardhat run scripts/deployBot.js --network localhost
```

### 2. `interactWithBot.js` - Interact with deployed AutoInteractionBot

Demonstrates how to interact with the deployed AutoInteractionBot contract.

**Usage:**
```bash
# Use default bot address (from localhost deployment)
npx hardhat run scripts/interactWithBot.js --network localhost

# Use custom bot address
BOT_ADDRESS=0x789... npx hardhat run scripts/interactWithBot.js --network localhost
```

**Environment Variables:**
- `BOT_ADDRESS`: Address of the deployed AutoInteractionBot contract

## Setup Instructions

### 1. Start Local Hardhat Node
```bash
npx hardhat node
```

### 2. Deploy the Contract
```bash
npx hardhat run scripts/deployBot.js --network localhost
```

### 3. Interact with the Contract
```bash
npx hardhat run scripts/interactWithBot.js --network localhost
```

## Network Configuration

Add your network configurations to `hardhat.config.js`:

```javascript
networks: {
  localhost: {
    url: "http://127.0.0.1:8545",
    chainId: 31337
  },
  bscTestnet: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    chainId: 97,
    accounts: [process.env.PRIVATE_KEY]
  },
  bscMainnet: {
    url: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

## Security Notes

- Never commit private keys to version control
- Use environment variables for sensitive data
- Test thoroughly on testnets before mainnet deployment
- Verify contract addresses after deployment 