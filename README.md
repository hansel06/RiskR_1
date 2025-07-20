# 🤖 RiskRobo – Web3 Security & AI Analytics Platform

RiskRobo is an advanced Web3 analytics and smart contract security platform that combines:

- 🧠 **AI-Powered Research**
- 🔐 **Smart Contract Risk Detection**
- 📈 **Live DeFi Market Analytics**
- 🤖 **Auto-Trading Bot (BSC)**
- 🖥️ **Modern React UI Dashboard**

---

## 📦 Step 1: Clone & Setup Environment

```bash
# Clone repository
git clone <your-repo-url>
cd hansel06-riskr_1

# Create Python virtual environment
python -m venv riskrobo-env

# Activate virtual environment
# Linux/macOS:
source riskrobo-env/bin/activate

# Windows:
riskrobo-env\Scripts\activate
⚙️ Step 2: Install Backends
bash
Copy
Edit
# Main backend
cd backend
pip install -r requirements.txt

# AI backend
cd ../AI+frontend/Backend
pip install flask flask-cors python-dotenv requests beautifulsoup4

# Return to root
cd ../../
💻 Step 3: Install Frontends
bash
Copy
Edit
# Main dashboard
cd roborisk-main
npm install

# AI frontend
cd ../AI+frontend/Frontend
npm install

# Return to root
cd ../../
🔐 Step 4: Configuration
🔧 Main Backend
bash
Copy
Edit
cd backend
cp environment_template.txt .env
nano .env
Add the following environment variables:

dotenv
Copy
Edit
# API Keys
BSCSCAN_API_KEY=your-bscscan-api-key
COINMARKETCAP_API_KEY=your-cmc-api-key
OPENROUTER_API_KEY=your-openrouter-key
GITHUB_TOKEN=your-github-token

# BSC Configuration
BSC_MAINNET_RPC_1=https://bsc-dataseed1.binance.org
PANCAKE_FACTORY_V2=0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
PANCAKE_ROUTER_V2=0x10ED43C718714eb63d5aA57B78B54704E256024E

# Server Settings
API_HOST=0.0.0.0
API_PORT=8000
🤖 AI Backend
bash
Copy
Edit
cd ../AI+frontend/Backend/app
cat > .env << EOF
OPENROUTER_API_KEY=your-openrouter-key
CMC_API_KEY=your-cmc-key
GITHUB_TOKEN=your-github-token
SERPER_API_KEY=your-serper-key
EOF
🟢 Step 5: Run Services (Use 4 Terminals)
Terminal 1 – Main Backend API
bash
Copy
Edit
cd backend
python start_server.py
# → http://localhost:8000
Terminal 2 – AI Research Backend
bash
Copy
Edit
cd AI+frontend/Backend/app
python main.py
# → http://localhost:5000
Terminal 3 – Main Dashboard
bash
Copy
Edit
cd roborisk-main
npm start
# → http://localhost:3000
Terminal 4 – AI Research Frontend
bash
Copy
Edit
cd AI+frontend/Frontend
npm start
# → http://localhost:3001
🎯 Quick Start Script (Optional)
Create a helper script to launch all services:

bash
Copy
Edit
cat > start_riskrobo.sh << 'EOF'
#!/bin/bash
echo "🤖 Starting RiskRobo Platform..."

# Activate environment
source riskrobo-env/bin/activate

# Start services
cd backend && python start_server.py &
cd ../AI+frontend/Backend/app && python main.py &
cd ../../../roborisk-main && npm start &
cd ../AI+frontend/Frontend && npm start &

echo "✅ All services started!"
echo "📊 Dashboard: http://localhost:3000"
echo "🤖 AI Research: http://localhost:3001"
echo "🔗 API: http://localhost:8000"
wait
EOF

chmod +x start_riskrobo.sh
./start_riskrobo.sh
🔗 Service URLs
Service	URL	Description
Main Dashboard	http://localhost:3000	Analytics & scanning UI
AI Research UI	http://localhost:3001	GPT-based blockchain research
Main Backend API	http://localhost:8000	FastAPI service backend
AI Research API	http://localhost:5000	Flask + AI model inference
Swagger Docs	http://localhost:8000/docs	API Documentation UI

💡 Usage Examples
1️⃣ Smart Contract Scan
bash
Copy
Edit
curl -X POST "http://localhost:8000/scan-contract" \
  -H "Content-Type: application/json" \
  -d '{"contract_address": "0x...", "network": "bsc"}'
Or use the UI at:
➡️ http://localhost:3000 → Deep Research tab

2️⃣ AI Research Query
bash
Copy
Edit
curl -X POST "http://localhost:5000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Analyze DeFi trends"}],
    "coin_name": "Ethereum",
    "coin_symbol": "ETH"
  }'
🧪 Testing
bash
Copy
Edit
cd scripts1

# Contract scan test
python test_comprehensive_scan.py

# Backend endpoint test
python test_api.py

# Full workflow test
python test_complete_workflow.py
🚨 Troubleshooting
Issue	Fix Command / Steps
❌ Port conflicts	`sudo lsof -ti:3000,5000,8000
🔑 API key issues	`cat backend/.env
🔒 Permission error	chmod -R 755 /path/to/project

✅ Success Checklist
✅ All terminals show “Server running”

✅ No errors appear in console

✅ URLs respond with full UI/API

✅ Contract scan returns risk score

✅ AI queries return valid responses

📞 Support
If you encounter issues:

☑️ Ensure all API keys are correct in .env files

☑️ Ensure ports 3000, 3001, 5000, 8000 are free

☑️ Make sure Python environment is activated

☑️ Run ./start_riskrobo.sh again if unsure

🚀 You're ready to analyze smart contracts & protect the DeFi world with RiskRobo!
yaml
Copy
Edit

---

This version is:

✅ GitHub-ready  
✅ Cleanly segmented  
✅ Easy to read and execute  
✅ Reflects everything **you gave, section by section**

Would you like me to export this as a downloadable `README.md` file or commit-ready version?
