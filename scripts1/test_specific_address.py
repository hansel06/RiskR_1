#!/usr/bin/env python3
"""
Test script for the specific address mentioned by the user
Usage: python test_specific_address.py
"""

import requests
import json
from datetime import datetime

def test_specific_address():
    """Test the comprehensive scan API with the specific address"""
    
    # The specific address mentioned by the user
    test_address = "0xA1eD4854920a65B60108e3713c0e905b37B48133"
    
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
                print(f"  Pair Address: {liquidity.get('pair_address', 'N/A')}")
                print(f"  Token Reserve: {liquidity.get('token_reserve', 'N/A')}")
                print(f"  BNB Reserve: {liquidity.get('bnb_reserve', 'N/A')} BNB")
                print(f"  Total Liquidity: {liquidity.get('total_liquidity_bnb', 'N/A')} BNB")
                print(f"  USD Value: ~${liquidity.get('total_liquidity_usd', 'N/A')}")
                print(f"  LP Total Supply: {liquidity.get('lp_total_supply', 'N/A')}")
                print(f"  Concentration Risk: {'⚠️ Yes' if liquidity.get('concentration_risk') else '✅ No'}")
                
                # Top LP holders
                top_lp_holders = liquidity.get('top_lp_holders', [])
                if top_lp_holders:
                    print(f"  Top LP Holders:")
                    for holder in top_lp_holders:
                        print(f"    {holder.get('address', 'N/A')}: {holder.get('percentage', 'N/A')}%")
                
                # Liquidity locked
                liquidity_locked = liquidity.get('liquidity_locked', {})
                if liquidity_locked:
                    print(f"  Liquidity Locked: {'🔒 Yes' if liquidity_locked.get('is_locked') else '🔓 No'}")
                    print(f"  Locked Percentage: {liquidity_locked.get('locked_percentage', 0)}%")
                    print(f"  Safety Score: {liquidity_locked.get('liquidity_safety_score', 0)}/100")
            else:
                print("  ⚠️ No liquidity found")
            
            # Holder analysis
            holders = result.get('holder_analysis', {})
            print(f"\n👥 Holder Analysis:")
            if holders.get('total_holders'):
                print(f"  Total Holders: {holders.get('total_holders')}")
                print(f"  Top 1 Holder: {holders.get('top_1_percentage', 'N/A')}%")
                print(f"  Top 5 Holders: {holders.get('top_5_percentage', 'N/A')}%")
                print(f"  Top 10 Holders: {holders.get('top_10_percentage', 'N/A')}%")
                print(f"  Concentration Risk: {'⚠️ Yes' if holders.get('concentration_risk') else '✅ No'}")
                
                # Holder list
                holder_list = holders.get('holders', [])
                if holder_list:
                    print(f"  Top Holders:")
                    for holder in holder_list:
                        print(f"    {holder.get('address', 'N/A')}: {holder.get('balance', 'N/A')}")
            else:
                print("  Unable to analyze holder distribution")
            
            # Contract functions
            functions = result.get('contract_functions', [])
            print(f"\n🔧 Contract Functions ({len(functions)}):")
            if functions:
                for i, func in enumerate(functions[:10], 1):
                    print(f"  {i}. {func}")
                if len(functions) > 10:
                    print(f"  ... and {len(functions) - 10} more functions")
            else:
                print("  No functions detected")
            
            # Save results to file
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"specific_address_scan_{timestamp}.json"
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
    test_specific_address() 