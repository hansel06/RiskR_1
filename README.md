# 🤖 RiskRobo

RiskRobo is an advanced Web3 analytics and smart contract security platform that combines:

- **🧠 AI-Powered Research**: Multi-source blockchain data analysis  
- **🔐 Smart Contract Security**: Automated vulnerability detection and risk scoring  
- **📈 Real-Time Analytics**: Live market monitoring and DeFi insights  
- **🤖 Trading Automation**: Smart contract-based trading bot for BSC  
- **🖥 Comprehensive Dashboard**: Modern React-based user interface  

---

## 🏗 Architecture Components

This monorepo contains six primary components:

| Component              | Description                                         |
|------------------------|-----------------------------------------------------|
| `AI+frontend`          | AI-powered research frontend/backend (React + Flask) |
| `backend`              | FastAPI-based blockchain analytics backend          |
| `contracts`            | Solidity smart contracts for BSC                    |
| `roborisk-main`        | Main analytics dashboard (React + Vite)             |
| `scripts`              | Deployment and automation scripts                   |
| `scripts1`             | Testing and validation scripts                      |

---

## 🚀 Installation Guide

### ✅ Prerequisites

- **Node.js** v16+
- **Python** 3.8+
- **8 GB+ RAM**, **10 GB+ Storage**
- Required API Keys:
  - BSCScan API Key
  - CoinMarketCap API Key
  - GitHub Personal Access Token
  - OpenRouter API Key (for AI queries)

---

### 📦 Step 1: Clone & Setup Environment

```bash
# Clone repository
git clone <your-repo-url>
cd hansel06-riskr_1

# Python virtual environment
python -m venv riskrobo-env

# Activate virtual environment
# Linux/macOS
source riskrobo-env/bin/activate

# Windows
riskrobo-env\Scripts\activate
⚙️ Step 2: Install Backends
bash
Copy
Edit
# Backend
cd backend
pip install -r requirements.txt

# AI Backend
cd ../AI+frontend/Backend
pip install flask flask-cors python-dotenv requests beautifulsoup4

# Return to root
cd ../../
💻 Step 3: Install Frontends
bash
Copy
Edit
# Main Dashboard
cd roborisk-main
npm install

# AI Frontend
cd ../AI+frontend/Frontend
npm install

# Return to root
cd ../../
🔐 Step 4: Configuration
Main Backend
bash
Copy
Edit
cd backend
cp environment_template.txt .env
nano .env
Update the .env with:

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
AI Backend
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
🟢 Step 5: Run Services (4 Terminals)
Terminal 1 – Main Backend (API)
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
Main Backend API	http://localhost:8000	FastAPI service
AI Research API	http://localhost:5000	AI inference backend
Swagger Docs	http://localhost:8000/docs	API Documentation

💡 Usage Examples
1. Smart Contract Scan
bash
Copy
Edit
curl -X POST "http://localhost:8000/scan-contract" \
  -H "Content-Type: application/json" \
  -d '{"contract_address": "0x...", "network": "bsc"}'
Or via UI:
→ http://localhost:3000 → Deep Research tab

2. AI Research Query
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
Port conflicts	`sudo lsof -ti:3000,5000,8000
API key not loading	`cat backend/.env
File permission	chmod -R 755 /path/to/project

✅ Success Checklist
All terminals say "Server running..."

URLs return valid responses

No runtime errors

Contract scan → shows risk report

AI queries → return relevant analysis

📞 Support
If something isn’t working:

✅ Check your .env variables

✅ Confirm services are running on correct ports

✅ Inspect logs for error messages

✅ Restart with: ./start_riskrobo.sh

🚀 RiskRobo is now ready to analyze smart contracts and protect the DeFi world!

yaml
Copy
Edit

---

Let me know if you’d like this converted into a downloadable `README.md` file or want badges (build, license, version) added at the top.
