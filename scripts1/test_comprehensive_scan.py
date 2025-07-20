#!/usr/bin/env python3
"""
Test script for the Comprehensive Contract Scan API endpoint
Usage: python test_comprehensive_scan.py
"""

import requests
import json
from datetime import datetime

def test_comprehensive_scan():
    """Test the comprehensive scan API endpoint"""
    
    # Test contract address (CAKE token)
    test_address = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
    
    print(f"🔍 Testing Comprehensive Contract Scan API")
    print(f"Contract Address: {test_address}")
    print("=" * 60)
    
    try:
        # Prepare request
        request_data = {
            "contract_address": test_address,
            "network": "bsc"
        }
        
        # Send request
        response = requests.post(
            "http://localhost:8000/scan-contract",
            json=request_data,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            
            print("✅ Comprehensive Scan API is working!")
            print(f"📊 Contract Address: {result.get('contract_address')}")
            print(f"🎯 Risk Score: {result.get('risk_score')}/100")
            
            # Display analysis summary
            print(f"\n📋 Analysis Summary:")
            print("-" * 40)
            print(result.get('analysis_summary', 'No summary available'))
            
            # Display detailed sections
            print(f"\n🔍 Detailed Analysis:")
            print("-" * 40)
            
            # Vulnerabilities
            vuln_flags = result.get('vulnerability_flags', [])
            print(f"🚨 Vulnerabilities ({len(vuln_flags)}):")
            if vuln_flags:
                for flag in vuln_flags:
                    print(f"  • {flag}")
            else:
                print("  ✅ No vulnerabilities detected")
            
            # Liquidity
            liquidity = result.get('liquidity_data', {})
            print(f"\n💰 Liquidity Analysis:")
            if liquidity.get('has_liquidity'):
                print(f"  Total: {liquidity.get('total_liquidity_bnb', 'N/A')} BNB")
                print(f"  USD Value: ~${liquidity.get('total_liquidity_usd', 'N/A')}")
                if liquidity.get('concentration_risk'):
                    print("  ⚠️ High concentration detected")
            else:
                print("  ⚠️ No liquidity found")
            
            # Holder analysis
            holders = result.get('holder_analysis', {})
            print(f"\n👥 Holder Analysis:")
            if 'top_10_percentage' in holders:
                print(f"  Top 10 holders: {holders.get('top_10_percentage', 'N/A')}%")
                if holders.get('concentration_risk'):
                    print("  ⚠️ High concentration detected")
            else:
                print("  Unable to analyze holder distribution")
            
            # Contract functions
            functions = result.get('contract_functions', [])
            print(f"\n🔧 Contract Functions ({len(functions)}):")
            if functions:
                for i, func in enumerate(functions[:5], 1):
                    print(f"  {i}. {func}")
                if len(functions) > 5:
                    print(f"  ... and {len(functions) - 5} more functions")
            else:
                print("  No functions detected")
            
            # Save results to file
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"comprehensive_scan_result_{timestamp}.json"
            with open(filename, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"\n📄 Full results saved to: {filename}")
            
        else:
            print(f"❌ API request failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Please start the backend first:")
        print("cd backend && python main.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_comprehensive_scan() 