import os
import requests
import json
from dotenv import load_dotenv
from github_scraper import get_github_features, search_github_repo
from twitter_scraper import get_twitter_features
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import BaseModel
from typing import Optional
from coinmarketcap_scraper import get_coinmarketcap_data
from binance_scraper import get_binance_data
from cryptowhale_tracker import scrape_whale_alerts

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

app = Flask(__name__)
CORS(app)

def read_scanned_data():
    """Read the scanned contract data from the file"""
    try:
        file_path = r"C:\Users\ashwi\OneDrive\Desktop\Testingggg\Main\scanned.txt"
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data
        else:
            return None
    except Exception as e:
        print(f"Error reading scanned data: {e}")
        return None

def summarize_contract_analysis(contract_data, user_query=""):
    """Summarize contract analysis data using AI"""
    try:
        API_KEY = os.getenv("OPENROUTER_API_KEY")
        url = "https://openrouter.ai/api/v1/chat/completions"
        
        # Create a comprehensive prompt for contract analysis
        system_content = f"""You are RiskRobo, an expert smart contract security analyst. You have been provided with detailed analysis data for a smart contract.

CONTRACT ANALYSIS DATA:
Contract Address: {contract_data.get('contract_address', 'N/A')}
Risk Score: {contract_data.get('risk_score', 'N/A')}/100

VULNERABILITIES:
{chr(10).join([f"• {vuln}" for vuln in contract_data.get('vulnerability_flags', [])]) if contract_data.get('vulnerability_flags') else "• No vulnerabilities detected"}

LIQUIDITY ANALYSIS:
{contract_data.get('liquidity_data', {})}

HOLDER ANALYSIS:
{contract_data.get('holder_analysis', {})}

CONTRACT FUNCTIONS:
{contract_data.get('contract_functions', [])}

Your task is to provide a comprehensive, professional analysis of this smart contract. Include:

1. **Risk Assessment**: Evaluate the overall risk level and explain why
2. **Security Analysis**: Analyze vulnerabilities and security concerns
3. **Liquidity Analysis**: Assess liquidity health and potential risks
4. **Holder Distribution**: Evaluate holder concentration and its implications
5. **Function Analysis**: Review contract functions for suspicious patterns
6. **Recommendation**: Provide clear, actionable advice

Be specific, professional, and focus on practical insights that would help an investor or trader make informed decisions.

User Query: {user_query if user_query else "Please provide a comprehensive analysis of this contract."}
"""

        messages = [{"role": "system", "content": system_content}]
        
        payload = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": messages,
            "temperature": 0.7
        }
        
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return f"Error: Failed to summarize contract analysis. Status: {response.status_code}"
            
    except Exception as e:
        return f"Error generating summary: {str(e)}"

def clean_irrelevant_lines(summary: str) -> str:
    lines = summary.splitlines()
    cleaned = [
        line for line in lines
        if not line.strip().startswith("Irrelevant to crypto/finance:")
    ]
    return "\n".join(cleaned)

@app.route('/summarize-contract', methods=['POST'])
def summarize_contract():
    """Summarize the scanned contract data using AI"""
    try:
        data = request.get_json()
        user_query = data.get('query', '') if data else ''
        
        # Read the scanned data
        contract_data = read_scanned_data()
        
        if not contract_data:
            return jsonify({
                "error": "No scanned contract data found. Please run a contract scan first.",
                "file_path": r"C:\Users\ashwi\OneDrive\Desktop\Testingggg\Main\scanned.txt"
            }), 404
        
        # Generate AI summary
        summary = summarize_contract_analysis(contract_data, user_query)
        summary = clean_irrelevant_lines(summary)
        
        return jsonify({
            "summary": summary,
            "contract_address": contract_data.get('contract_address'),
            "risk_score": contract_data.get('risk_score'),
            "timestamp": contract_data.get('detailed_analysis', {}).get('contract_info', {}).get('analysis_timestamp')
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing request: {str(e)}"}), 500

@app.route('/get-scanned-data', methods=['GET'])
def get_scanned_data():
    """Get the raw scanned contract data"""
    try:
        contract_data = read_scanned_data()
        
        if not contract_data:
            return jsonify({
                "error": "No scanned contract data found. Please run a contract scan first.",
                "file_path": r"C:\Users\ashwi\OneDrive\Desktop\Testingggg\Main\scanned.txt"
            }), 404
        
        return jsonify(contract_data)
        
    except Exception as e:
        return jsonify({"error": f"Error reading scanned data: {str(e)}"}), 500

def summarize_text(messages, features, model="mistralai/mistral-7b-instruct"):
    import requests, os
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    url = "https://openrouter.ai/api/v1/chat/completions"
    # Add features as a system message
    system_content = (
        "You are RiskRobo, an intelligent financial summarizer that processes content from GitHub, Twitter, CoinMarketCap, Binance, and Whale Alert data.\n"
        "Your job is to extract key insights related to blockchain, cryptocurrency, DeFi, smart contracts, or financial security.\n\n"
        "First, always check the whale_alerts data for any significant whale activity or spikes (large, unusual transactions involving the coin in question). If you find such activity, summarize it first and explain its potential impact (bullish, bearish, or neutral). Only after this, proceed to analyze and summarize the other data sources.\n\n"
        "For market data (CoinMarketCap/Binance):\n"
        "- Use the provided price, market cap, and volume to inform your answer. Do NOT mention APIs or how to get the data.\n"
        "- If the data shows strong positive or negative movement, or unusual volume, make a clear recommendation: Is it a good time to buy this asset? Answer 'Yes' or 'No' and explain why in 1-2 sentences.\n"
        "- If the data is inconclusive, provide a balanced, detailed summary of the asset's recent performance, utility, ecosystem, and any relevant news or trends, even if you cannot make a strong recommendation. Do not simply say 'not enough information to make a recommendation.'\n\n"
        "For GitHub repos:\n"
        " Analyze a GitHub repo for crypto-related risk. Determine if the repo appears trustworthy or fraudulent based on the following:\n"
        "- Does it have real, readable smart contracts?\n"
        "- Are there multiple contributors and a commit history?\n"
        "- Is the project maintained recently?\n"
        "- Are there tests, documentation, and a proper license?\n"
        "- Do the issues/discussions raise concerns?\n"
        "Respond with either:\n"
        "- '🟢 Legit: [1-2 sentence explanation]'\n"
        "- '🔴 Risky: [explanation of red flags]'\n\n"
        "For Tweets: Only summarize tweets or accounts that are directly relevant to cryptocurrency, DeFi, web3, tokens, or NFTs. Ignore and do not mention any Twitter results that are unrelated to crypto or finance, such as apps, artists, or research centers. Do not list usernames or accounts unless they are directly relevant to the crypto project in question.\n\n"
        "For Whale Alerts:\n"
        "- Review the provided whale_alerts data for any large recent transactions involving the coin in question.\n"
        "- Summarize any significant whale moves (large transfers, especially to or from exchanges, or between major wallets).\n"
        "- Explain if these whale moves are likely bullish, bearish, or neutral signals for the asset, and why.\n"
        "- If there are no relevant whale alerts, say so briefly.\n\n"
        "Always be precise and avoid fluff. If the content is not relevant to blockchain or finance, respond: **\"Irrelevant to crypto/finance.\"**\n\n"
        "You have access to the following data sources for the user's query:\n"
        f"GitHub Info: {features['github']}\n"
        f"CoinMarketCap: {features['coinmarketcap']}\n"
        f"Binance: {features['binance']}\n"
        f"Twitter Results: {features['twitter']}\n"
        f"Whale Alerts: {features['whale_alerts']}\n"
        "Use this information to answer the user's questions as accurately as possible."
    )
    full_messages = [{"role": "system", "content": system_content}] + messages
    payload = {
        "model": model,
        "messages": full_messages,
        "temperature": 0.7
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return "Error: Failed to summarize."

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    messages = data.get('messages', [])
    coin_name = data.get('coin_name')
    coin_symbol = data.get('coin_symbol')

    # Validate presence of coin_name and coin_symbol
    if not coin_name or not coin_symbol:
        return jsonify({
            "error": "Both 'coin_name' and 'coin_symbol' are required in the request body."
        }), 400

    # Use coin_name and coin_symbol for all lookups
    query = coin_name  # For Twitter and GitHub search
    github_data = get_github_features(query)
    twitter_data = get_twitter_features(query)

    def get_binance_symbol(symbol):
        url = "https://api.binance.com/api/v3/exchangeInfo"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()["symbols"]
            symbol_upper = symbol.strip().upper()
            for s in data:
                if s["baseAsset"] == symbol_upper and s["quoteAsset"] == "USDT":
                    return s["symbol"]
                if s["baseAsset"].lower() == symbol.strip().lower() and s["quoteAsset"] == "USDT":
                    return s["symbol"]
        return symbol.upper() + "USDT"  # fallback

    def get_cmc_github_url(symbol):
        CMC_API_KEY = os.getenv("CMC_API_KEY")
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info"
        headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY}
        params = {"symbol": symbol}
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()["data"]
            if symbol in data:
                urls = data[symbol].get("urls", {})
                githubs = urls.get("github", [])
                if githubs:
                    return githubs[0]  # Return the first GitHub repo URL
        return None

    def extract_owner_repo(github_url):
        # Assumes standard GitHub URL format
        if github_url and "github.com" in github_url:
            parts = github_url.rstrip("/").split("/")
            if len(parts) >= 2:
                return f"{parts[-2]}/{parts[-1]}"
        return None

    binance_symbol = get_binance_symbol(coin_symbol)
    coinmarketcap_data = get_coinmarketcap_data(coin_symbol)
    binance_data = get_binance_data(binance_symbol)

    # Get the official GitHub repo from CoinMarketCap and analyze it
    github_url = get_cmc_github_url(coin_symbol)
    owner_repo = extract_owner_repo(github_url) if github_url else None

    if not owner_repo:
        # Fallback: search GitHub by project name or symbol
        owner_repo = search_github_repo(coin_name)

    github_data = get_github_features(owner_repo) if owner_repo else "No official GitHub repo found."

    # Get whale alerts (scraped)
    try:
        whale_alerts = scrape_whale_alerts()
    except Exception as e:
        whale_alerts = f"Error fetching whale alerts: {str(e)}"

    features = {
        "github": github_data,
        "coinmarketcap": coinmarketcap_data,
        "binance": binance_data,
        "twitter": twitter_data,
        "whale_alerts": whale_alerts
    }
    summary = summarize_text(messages, features)
    return jsonify({"summary": summary, "raw": features})

if __name__ == '__main__':
    app.run(debug=True)

# Optionally, expose gather_all_features for internal use

def gather_all_features(query, github_repo=None, subreddit=None):
    github_data = get_github_features(github_repo or query)
    twitter_data = get_twitter_features(query)
    coinmarketcap_data = get_coinmarketcap_data(query.upper())
    binance_data = get_binance_data(query.upper() + "USDT")
    return {
        "github": github_data,
        "coinmarketcap": coinmarketcap_data,
        "binance": binance_data,
        "twitter": twitter_data
    }
