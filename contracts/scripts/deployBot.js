const hre = require("hardhat");

async function main() {
  // Get the test accounts from the Hardhat node
  const [owner, trustedExecutor] = await hre.ethers.getSigners();
  const pancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // Real PancakeSwap Router

  console.log("Deploying contracts with the account:", owner.address);
  console.log("Trusted Executor will be:", trustedExecutor.address);

  const BotFactory = await hre.ethers.getContractFactory("AutoInteractionBot");

  // Deploy the contract
  const bot = await BotFactory.deploy(trustedExecutor.address, pancakeRouterAddress);
  await bot.deployed();

  console.log("AutoInteractionBot deployed to:", bot.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});