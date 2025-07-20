const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AutoInteractionBot...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Configuration - you can modify these values
  const TRUSTED_EXECUTOR = process.env.TRUSTED_EXECUTOR || deployer.address; // Default to deployer if not set
  const PANCAKE_ROUTER_V2 = process.env.PANCAKE_ROUTER_V2 || "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // BSC Mainnet

  console.log("Trusted Executor:", TRUSTED_EXECUTOR);
  console.log("PancakeSwap Router:", PANCAKE_ROUTER_V2);

  // Deploy the AutoInteractionBot contract
  const AutoInteractionBot = await ethers.getContractFactory("AutoInteractionBot");
  const bot = await AutoInteractionBot.deploy(TRUSTED_EXECUTOR, PANCAKE_ROUTER_V2);

  await bot.deployed();

  console.log("AutoInteractionBot deployed to:", bot.address);
  console.log("Owner:", await bot.owner());
  console.log("Trusted Executor:", await bot.trustedExecutor());
  console.log("Whitelisted Router:", await bot.whitelistedRouter());

  // Verify deployment
  console.log("\nDeployment verification:");
  console.log("- Owner is deployer:", (await bot.owner()) === deployer.address);
  console.log("- Trusted executor is set:", (await bot.trustedExecutor()) === TRUSTED_EXECUTOR);
  console.log("- Router is set:", (await bot.whitelistedRouter()) === PANCAKE_ROUTER_V2);

  console.log("\nDeployment completed successfully!");
  console.log("Contract address:", bot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 