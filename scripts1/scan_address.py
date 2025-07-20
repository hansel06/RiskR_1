#!/usr/bin/env python3
"""
Simple script to scan any BSC contract address with RiskRobo
Usage: python scan_address.py <contract_address>
"""
 
import requests
import json
import sys
from datetime import datetime

def scan_address(address: str, base_url: str = "http://localhost:8000"):
    """Scan a contract address with RiskRobo"""
    
    print(f"🔍 Scanning contract: {address}")
    print("=" * 50)
    
    try:
        # Prepare request
        analysis_request = {
            "contract_address": address,
            "network": "bsc"
        }
        
        # Send request
        response = requests.post(
            f"{base_url}/analyze/contract",
            json=analysis_request,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            
            # Create text output
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            text_output = f"""
RISKROBO CONTRACT ANALYSIS REPORT
================================
Contract Address: {address}
Analysis Date: {timestamp}
Network: BSC

ANALYSIS RESULTS:
----------------
Risk Score: {result.get('risk_score', 'N/A')}/100

VULNERABILITIES:
"""
            
            # Vulnerabilities
            vuln_flags = result.get('vulnerability_flags', [])
            if vuln_flags:
                text_output += f"Detected: {', '.join(vuln_flags)}\n"
            else:
                text_output += "No vulnerabilities detected\n"
            
            # Liquidity
            text_output += "\nLIQUIDITY ANALYSIS:\n"
            liquidity = result.get('liquidity_data', {})
            if liquidity.get('has_liquidity'):
                text_output += f"Total Liquidity: {liquidity.get('total_liquidity_bnb', 'N/A')} BNB\n"
                text_output += f"USD Value: ~${liquidity.get('total_liquidity_usd', 'N/A')}\n"
            else:
                text_output += "No liquidity found\n"
            
            # Holder distribution
            text_output += "\nHOLDER ANALYSIS:\n"
            holders = result.get('holder_analysis', {})
            if 'top_10_percentage' in holders:
                text_output += f"Top 10 holders percentage: {holders.get('top_10_percentage', 'N/A')}%\n"
                if holders.get('concentration_risk'):
                    text_output += "WARNING: High holder concentration detected\n"
            
            # Additional details
            text_output += "\nDETAILED ANALYSIS:\n"
            text_output += "=" * 50 + "\n"
            text_output += json.dumps(result, indent=2)
            
            # Display results on screen
            print(f"✅ Analysis completed!")
            print(f"📊 Risk Score: {result.get('risk_score', 'N/A')}/100")
            
            if vuln_flags:
                print(f"🚨 Vulnerabilities: {', '.join(vuln_flags)}")
            else:
                print("✅ No vulnerabilities detected")
            
            if liquidity.get('has_liquidity'):
                print(f"💰 Liquidity: {liquidity.get('total_liquidity_bnb', 'N/A')} BNB")
                print(f"💵 USD Value: ~${liquidity.get('total_liquidity_usd', 'N/A')}")
            else:
                print("⚠️ No liquidity found")
            
            if 'top_10_percentage' in holders:
                print(f"👥 Top 10 holders: {holders.get('top_10_percentage', 'N/A')}%")
                if holders.get('concentration_risk'):
                    print("⚠️ High holder concentration detected")
            
            # Save to text file
            filename = f"scan_result_{address}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(text_output)
            
            print(f"\n📄 Analysis saved to: {filename}")
            
        else:
            print(f"❌ Analysis failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    """Main function"""
    if len(sys.argv) != 2:
        print("Usage: python scan_address.py <contract_address>")
        print("Example: python scan_address.py 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82")
        sys.exit(1)
    
    address = sys.argv[1]
    
    # Validate address format
    if not address.startswith('0x') or len(address) != 42:
        print("❌ Invalid address format. Must be 42 characters starting with 0x")
        sys.exit(1)
    
    # Check if API is running
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
        if response.status_code != 200:
            print("❌ API is not responding. Please start the backend first:")
            print("cd backend && python main.py")
            sys.exit(1)
    except:
        print("❌ Cannot connect to API. Please start the backend first:")
        print("cd backend && python main.py")
        sys.exit(1)
    
    # Scan the address
    scan_address(address)

if __name__ == "__main__":
    main() 