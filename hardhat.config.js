require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Helper to pick the first available RPC URL
const rpcUrls = [
  process.env.BSC_MAINNET_RPC_1,
  process.env.BSC_MAINNET_RPC_2,
  process.env.BSC_MAINNET_RPC_3,
  process.env.BSC_MAINNET_RPC_4,
];
const forkingUrl = rpcUrls.find((url) => url && url !== "");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      // Disable forking for tests to avoid network issues
      // forking: forkingUrl ? {
      //   url: forkingUrl,
      // } : undefined
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  }
};
