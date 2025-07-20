const { ethers } = require("hardhat");

async function main() {
  console.log("Interacting with AutoInteractionBot...");

  // Get the deployed contract address (you can modify this)
  const BOT_ADDRESS = process.env.BOT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Get signers
  const [owner, trustedExecutor, otherUser] = await ethers.getSigners();
  
  // Get the contract instance
  const bot = await ethers.getContractAt("AutoInteractionBot", BOT_ADDRESS);
  
  console.log("Bot address:", BOT_ADDRESS);
  console.log("Owner:", await bot.owner());
  console.log("Trusted Executor:", await bot.trustedExecutor());
  console.log("Router:", await bot.whitelistedRouter());

  // Check initial balance
  const initialBalance = await ethers.provider.getBalance(bot.address);
  console.log("Initial bot balance:", ethers.utils.formatEther(initialBalance), "ETH");

  // Example 1: Owner deposits ETH
  console.log("\n--- Example 1: Owner deposits ETH ---");
  const depositAmount = ethers.utils.parseEther("1.0");
  const tx1 = await bot.connect(owner).deposit({ value: depositAmount });
  await tx1.wait();
  console.log("Deposited", ethers.utils.formatEther(depositAmount), "ETH");
  
  const balanceAfterDeposit = await ethers.provider.getBalance(bot.address);
  console.log("Bot balance after deposit:", ethers.utils.formatEther(balanceAfterDeposit), "ETH");

  // Example 2: Owner withdraws ETH
  console.log("\n--- Example 2: Owner withdraws ETH ---");
  const withdrawAmount = ethers.utils.parseEther("0.5");
  const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
  
  const tx2 = await bot.connect(owner).withdraw(withdrawAmount);
  await tx2.wait();
  console.log("Withdrew", ethers.utils.formatEther(withdrawAmount), "ETH");
  
  const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
  console.log("Owner balance change:", ethers.utils.formatEther(ownerBalanceAfter.sub(ownerBalanceBefore)), "ETH");

  // Example 3: Non-owner tries to withdraw (should fail)
  console.log("\n--- Example 3: Non-owner tries to withdraw (should fail) ---");
  try {
    await bot.connect(otherUser).withdraw(ethers.utils.parseEther("0.1"));
    console.log("❌ This should have failed!");
  } catch (error) {
    console.log("✅ Correctly rejected non-owner withdrawal");
  }

  // Example 4: Non-executor tries to swap (should fail)
  console.log("\n--- Example 4: Non-executor tries to swap (should fail) ---");
  try {
    await bot.connect(owner).executeSafeSwap(
      "0x0000000000000000000000000000000000000000", // Some token address
      ethers.utils.parseEther("0.1"),
      0,
      Math.floor(Date.now() / 1000) + 60
    );
    console.log("❌ This should have failed!");
  } catch (error) {
    console.log("✅ Correctly rejected non-executor swap");
  }

  console.log("\n--- Interaction completed successfully! ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 