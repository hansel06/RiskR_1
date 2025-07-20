from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from web3 import Web3
import os
from dotenv import load_dotenv
import asyncio
from typing import List, Dict, Any

load_dotenv()

app = FastAPI(title="RiskRobo API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContractAnalysisRequest(BaseModel):
    contract_address: str
    network: str = "bsc"

class DeepResearchRequest(BaseModel):
    contract_address: str
    network: str = "bsc"
    max_results: int = 10

class AnalysisResponse(BaseModel):
    contract_address: str
    risk_score: int
    vulnerability_flags: List[str]
    liquidity_data: Dict[str, Any]
    holder_analysis: Dict[str, Any]

class DeepResearchResponse(BaseModel):
    target_contract: str
    similar_contracts: List[Dict[str, Any]]
    analysis_summary: str

# Initialize Web3 connections with failover
def get_web3_connection():
    rpc_urls = [
        os.getenv('BSC_MAINNET_RPC_1'),
        os.getenv('BSC_MAINNET_RPC_2'),
        os.getenv('BSC_MAINNET_RPC_3'),
        os.getenv('BSC_MAINNET_RPC_4'),
        os.getenv('QUICKNODE_BSC_RPC'),
        os.getenv('ALCHEMY_BSC_RPC'),
        os.getenv('INFURA_BSC_RPC')
    ]
    
    # Filter out None values
    rpc_urls = [url for url in rpc_urls if url and url != 'your-quicknode-bsc-endpoint' and url != 'your-alchemy-bsc-endpoint' and url != 'your-infura-bsc-endpoint']
    
    if not rpc_urls:
        raise Exception("No valid RPC URLs configured. Please check your .env file.")
    
    for url in rpc_urls:
        try:
            w3 = Web3(Web3.HTTPProvider(url))
            if w3.is_connected():
                print(f"Connected to BSC via {url}")
                return w3
        except Exception as e:
            print(f"Failed to connect to {url}: {e}")
            continue
    
    raise Exception("Failed to connect to BSC network. All RPC endpoints failed.")

w3 = get_web3_connection()

@app.get("/")
async def root():
    return {"message": "RiskRobo API is running", "network": "BSC", "connected": w3.is_connected()}

@app.post("/analyze/contract", response_model=AnalysisResponse)
async def analyze_contract(request: ContractAnalysisRequest):
    try:
        from services.contract_analyzer import ContractAnalyzer
        from services.liquidity_analyzer import LiquidityAnalyzer
        
        # Initialize analyzers
        contract_analyzer = ContractAnalyzer(w3)
        liquidity_analyzer = LiquidityAnalyzer(w3)
        
        # Run parallel analysis
        vulnerability_task = asyncio.create_task(
            contract_analyzer.analyze_vulnerabilities(request.contract_address)
        )
        liquidity_task = asyncio.create_task(
            liquidity_analyzer.analyze_pancake_liquidity(request.contract_address)
        )
        holder_task = asyncio.create_task(
            contract_analyzer.analyze_holder_distribution(request.contract_address)
        )
        
        # Gather results
        vulnerability_flags = await vulnerability_task
        liquidity_data = await liquidity_task
        holder_analysis = await holder_task
        
        # Calculate risk score (simplified algorithm)
        risk_score = calculate_risk_score(vulnerability_flags, liquidity_data, holder_analysis)
        
        return AnalysisResponse(
            contract_address=request.contract_address,
            risk_score=risk_score,
            vulnerability_flags=vulnerability_flags,
            liquidity_data=liquidity_data,
            holder_analysis=holder_analysis
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/deep-research", response_model=DeepResearchResponse)
async def deep_research(request: DeepResearchRequest):
    """Find contracts with similar functions to the target contract"""
    try:
        from services.contract_analyzer import ContractAnalyzer
        
        contract_analyzer = ContractAnalyzer(w3)
        
        # Get target contract functions
        target_functions = await contract_analyzer.get_contract_functions(request.contract_address)
        
        # Find similar contracts (this would need to be implemented in contract_analyzer)
        similar_contracts = await contract_analyzer.find_similar_contracts(
            request.contract_address, 
            target_functions, 
            max_results=request.max_results
        )
        
        # Generate analysis summary
        analysis_summary = generate_similarity_analysis(target_functions, similar_contracts)
        
        return DeepResearchResponse(
            target_contract=request.contract_address,
            similar_contracts=similar_contracts,
            analysis_summary=analysis_summary
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/scan-contract")
async def scan_contract(request: ContractAnalysisRequest):
    """Comprehensive contract analysis using scan_address.py functionality"""
    try:
        from services.contract_analyzer import ContractAnalyzer
        from services.liquidity_analyzer import LiquidityAnalyzer
        
        # Initialize analyzers
        contract_analyzer = ContractAnalyzer(w3)
        liquidity_analyzer = LiquidityAnalyzer(w3)
        
        # Run comprehensive analysis (similar to scan_address.py)
        vulnerability_task = asyncio.create_task(
            contract_analyzer.analyze_vulnerabilities(request.contract_address)
        )
        liquidity_task = asyncio.create_task(
            liquidity_analyzer.analyze_pancake_liquidity(request.contract_address)
        )
        holder_task = asyncio.create_task(
            contract_analyzer.analyze_holder_distribution(request.contract_address)
        )
        functions_task = asyncio.create_task(
            contract_analyzer.get_contract_functions(request.contract_address)
        )
        
        # Gather results
        vulnerability_flags = await vulnerability_task
        liquidity_data = await liquidity_task
        holder_analysis = await holder_task
        contract_functions = await functions_task
        
        # Calculate risk score
        risk_score = calculate_risk_score(vulnerability_flags, liquidity_data, holder_analysis)
        
        # Generate comprehensive analysis summary
        analysis_summary = generate_comprehensive_analysis(
            request.contract_address,
            risk_score,
            vulnerability_flags,
            liquidity_data,
            holder_analysis,
            contract_functions
        )
        
        # Prepare complete detailed data (similar to scan_address.py output)
        complete_data = {
            "contract_address": request.contract_address,
            "risk_score": risk_score,
            "vulnerability_flags": vulnerability_flags,
            "liquidity_data": liquidity_data,
            "holder_analysis": holder_analysis,
            "contract_functions": contract_functions,
            "analysis_summary": analysis_summary,
            # Additional detailed fields for complete analysis
            "detailed_analysis": {
                "contract_info": {
                    "address": request.contract_address,
                    "network": "bsc",
                    "analysis_timestamp": asyncio.get_event_loop().time()
                },
                "risk_assessment": {
                    "overall_score": risk_score,
                    "risk_level": "HIGH" if risk_score >= 70 else "MEDIUM" if risk_score >= 40 else "LOW",
                    "vulnerability_count": len(vulnerability_flags),
                    "liquidity_risk": liquidity_data.get('concentration_risk', False),
                    "holder_concentration_risk": holder_analysis.get('concentration_risk', False)
                },
                "liquidity_details": {
                    "pair_address": liquidity_data.get('pair_address', 'N/A'),
                    "token_reserve": liquidity_data.get('token_reserve', 0),
                    "bnb_reserve": liquidity_data.get('bnb_reserve', 0),
                    "lp_total_supply": liquidity_data.get('lp_total_supply', 0),
                    "top_lp_holders": liquidity_data.get('top_lp_holders', []),
                    "liquidity_locked": liquidity_data.get('liquidity_locked', {}),
                    "liquidity_safety_score": liquidity_data.get('liquidity_locked', {}).get('liquidity_safety_score', 0)
                },
                "holder_details": {
                    "total_holders": holder_analysis.get('total_holders', 0),
                    "top_1_percentage": holder_analysis.get('top_1_percentage', 0),
                    "top_5_percentage": holder_analysis.get('top_5_percentage', 0),
                    "top_10_percentage": holder_analysis.get('top_10_percentage', 0),
                    "holder_list": holder_analysis.get('holders', [])
                },
                "function_analysis": {
                    "total_functions": len(contract_functions),
                    "function_list": contract_functions,
                    "has_transfer_function": any('transfer' in func.lower() for func in contract_functions),
                    "has_mint_function": any('mint' in func.lower() for func in contract_functions),
                    "has_burn_function": any('burn' in func.lower() for func in contract_functions)
                }
            }
        }
        
        # Save the complete data to the specified file
        import json
        import os
        
        # Define the file path
        file_path = r"C:\Users\ashwi\OneDrive\Desktop\Testingggg\Main\scanned.txt"
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Save the JSON data to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(complete_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Analysis data saved to: {file_path}")
        
        return complete_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def calculate_risk_score(vuln_flags, liquidity_data, holder_data):
    """Simple risk scoring algorithm"""
    score = 50  # Base score
    
    # Vulnerability penalties
    score += len(vuln_flags) * 15
    
    # Liquidity concentration penalty
    if liquidity_data.get('concentration_risk', False):
        score += 20
    
    # Holder concentration penalty
    if holder_data.get('top_10_percentage', 0) > 70:
        score += 25
    
    return min(100, max(0, score))

def generate_similarity_analysis(target_functions, similar_contracts):
    """Generate a summary of the similarity analysis"""
    if not similar_contracts:
        return "No similar contracts found with matching function signatures."
    
    function_count = len(target_functions)
    similar_count = len(similar_contracts)
    
    summary = f"Found {similar_count} contracts with similar functions to the target contract.\n"
    summary += f"Target contract has {function_count} functions.\n\n"
    
    # Group by similarity percentage
    high_similarity = [c for c in similar_contracts if c.get('similarity_percentage', 0) >= 80]
    medium_similarity = [c for c in similar_contracts if 50 <= c.get('similarity_percentage', 0) < 80]
    low_similarity = [c for c in similar_contracts if c.get('similarity_percentage', 0) < 50]
    
    if high_similarity:
        summary += f"🔴 High similarity ({len(high_similarity)} contracts): Potential clones or forks\n"
    if medium_similarity:
        summary += f"🟡 Medium similarity ({len(medium_similarity)} contracts): Similar functionality\n"
    if low_similarity:
        summary += f"🟢 Low similarity ({len(low_similarity)} contracts): Partial matches\n"
    
    return summary

def generate_comprehensive_analysis(contract_address, risk_score, vulnerability_flags, liquidity_data, holder_analysis, contract_functions):
    """Generate comprehensive analysis summary similar to scan_address.py"""
    
    summary = f"""
🔍 COMPREHENSIVE CONTRACT ANALYSIS
================================
Contract Address: {contract_address}
Network: BSC

📊 RISK ASSESSMENT:
------------------
Risk Score: {risk_score}/100
Risk Level: {'🔴 HIGH' if risk_score >= 70 else '🟡 MEDIUM' if risk_score >= 40 else '🟢 LOW'}

🚨 VULNERABILITY ANALYSIS:
-------------------------
"""
    
    if vulnerability_flags:
        for flag in vulnerability_flags:
            summary += f"• {flag}\n"
    else:
        summary += "✅ No vulnerabilities detected\n"
    
    summary += f"""
💰 LIQUIDITY ANALYSIS:
---------------------
"""
    
    if liquidity_data.get('has_liquidity'):
        summary += f"Total Liquidity: {liquidity_data.get('total_liquidity_bnb', 'N/A')} BNB\n"
        summary += f"USD Value: ~${liquidity_data.get('total_liquidity_usd', 'N/A')}\n"
        if liquidity_data.get('concentration_risk'):
            summary += "⚠️ High liquidity concentration detected\n"
    else:
        summary += "⚠️ No liquidity found\n"
    
    summary += f"""
👥 HOLDER ANALYSIS:
------------------
"""
    
    if 'top_10_percentage' in holder_analysis:
        summary += f"Top 10 holders: {holder_analysis.get('top_10_percentage', 'N/A')}%\n"
        if holder_analysis.get('concentration_risk'):
            summary += "⚠️ High holder concentration detected\n"
    else:
        summary += "Unable to analyze holder distribution\n"
    
    summary += f"""
🔧 CONTRACT FUNCTIONS:
---------------------
Total Functions: {len(contract_functions)}
"""
    
    if contract_functions:
        summary += "Key Functions:\n"
        for func in contract_functions[:10]:  # Show first 10 functions
            summary += f"• {func}\n"
        if len(contract_functions) > 10:
            summary += f"... and {len(contract_functions) - 10} more functions\n"
    
    summary += f"""
📋 RECOMMENDATION:
-----------------
"""
    
    if risk_score >= 80:
        summary += "🔴 HIGH RISK: Avoid this contract. Multiple red flags detected.\n"
    elif risk_score >= 60:
        summary += "🟡 MEDIUM RISK: Exercise caution. Some concerning indicators.\n"
    elif risk_score >= 40:
        summary += "🟢 LOW-MEDIUM RISK: Generally safe but monitor closely.\n"
    else:
        summary += "🟢 LOW RISK: Contract appears safe based on analysis.\n"
    
    return summary

if __name__ == "__main__":
    host = os.getenv('API_HOST', '0.0.0.0')
    port = int(os.getenv('API_PORT', 8000))
    reload = os.getenv('API_RELOAD', 'true').lower() == 'true'
    
    print(f"Starting RiskRobo API server on {host}:{port}")
    print(f"Debug mode: {reload}")
    
    if reload:
        # For development with reload, use import string
        uvicorn.run(
            "main:app",
            host=host,
            port=port,
            reload=True,
            log_level="info"
        )
    else:
        # For production, use app object directly
        uvicorn.run(
            app,
            host=host,
            port=port,
            workers=int(os.getenv('API_WORKERS', 1)),
            log_level="info"
        )
