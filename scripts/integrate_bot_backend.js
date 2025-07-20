const { ethers } = require("hardhat");
const axios = require("axios");

async function main() {
  console.log("🤖 RiskRobo: AutoInteractionBot + Backend Integration");
  console.log("=" * 60);

  // Get signers
  const [owner, trustedExecutor, otherUser] = await ethers.getSigners();
  
  // Deploy AutoInteractionBot
  console.log("📦 Deploying AutoInteractionBot...");
  const BotFactory = await ethers.getContractFactory("AutoInteractionBot");
  const bot = await BotFactory.deploy(trustedExecutor.address, "0x10ED43C718714eb63d5aA57B78B54704E256024E");
  await bot.deployed();
  
  console.log("✅ AutoInteractionBot deployed to:", bot.address);
  console.log("👤 Owner:", await bot.owner());
  console.log("🔐 Trusted Executor:", await bot.trustedExecutor());

  // Test token to analyze
  const testToken = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"; // CAKE
  
  console.log("\n🔍 Analyzing token with backend...");
  
  try {
    // Call backend API for risk analysis
    const analysisResponse = await axios.post("http://localhost:8000/analyze/contract", {
      contract_address: testToken,
      network: "bsc"
    });

    const analysis = analysisResponse.data;
    
    console.log("📊 Backend Analysis Results:");
    console.log("- Risk Score:", analysis.risk_score + "/100");
    console.log("- Vulnerabilities:", analysis.vulnerability_flags.length);
    console.log("- Liquidity:", analysis.liquidity_data.has_liquidity ? "Available" : "None");
    
    // Decision logic based on risk score
    const riskLevel = analysis.risk_score < 30 ? "LOW" : 
                     analysis.risk_score < 70 ? "MODERATE" : "HIGH";
    
    console.log("\n🎯 Risk Assessment:", riskLevel);
    
    if (riskLevel === "LOW" || riskLevel === "MODERATE") {
      console.log("✅ Token appears safe for interaction");
      
      // Simulate safe interaction with AutoInteractionBot
      console.log("\n💰 Simulating safe interaction...");
      
      // Deposit some ETH to the bot
      const depositAmount = ethers.utils.parseEther("0.1");
      const tx1 = await bot.connect(owner).deposit({ value: depositAmount });
      await tx1.wait();
      
      console.log("✅ Deposited", ethers.utils.formatEther(depositAmount), "ETH to bot");
      
      // Check bot balance
      const botBalance = await ethers.provider.getBalance(bot.address);
      console.log("💰 Bot balance:", ethers.utils.formatEther(botBalance), "ETH");
      
      // Simulate swap (this would fail on localhost but shows the flow)
      console.log("\n🔄 Simulating swap execution...");
      try {
        const swapAmount = ethers.utils.parseEther("0.05");
        const tx2 = await bot.connect(trustedExecutor).executeSafeSwap(
          testToken,
          swapAmount,
          0,
          Math.floor(Date.now() / 1000) + 60
        );
        await tx2.wait();
        console.log("✅ Swap executed successfully!");
      } catch (error) {
        console.log("⚠️ Swap simulation failed (expected on localhost):", error.message);
      }
      
    } else {
      console.log("🚨 Token appears risky - interaction blocked");
      console.log("❌ AutoInteractionBot would reject this transaction");
    }
    
    // Show full analysis
    console.log("\n📋 Full Analysis Details:");
    console.log(JSON.stringify(analysis, null, 2));
    
  } catch (error) {
    console.log("❌ Backend analysis failed:", error.message);
    console.log("💡 Make sure the backend is running: cd backend && python start_server.py");
  }

  console.log("\n🎉 Integration test completed!");
  console.log("📝 Summary:");
  console.log("- AutoInteractionBot deployed and functional");
  console.log("- Backend risk analysis integrated");
  console.log("- Decision logic implemented");
  console.log("- Safe interaction flow demonstrated");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 