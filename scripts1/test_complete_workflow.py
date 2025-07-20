#!/usr/bin/env python3
"""
Test script for the complete workflow:
1. Scan contract and save to scanned.txt
2. Get AI summarization from Flask backend
Usage: python test_complete_workflow.py
"""

import requests
import json
import time
from datetime import datetime

def test_complete_workflow():
    """Test the complete workflow from contract scan to AI summarization"""
    
    # Test contract address
    test_address = "0xA1eD4854920a65B60108e3713c0e905b37B48133"
    
    print(f"🔍 Testing Complete Workflow")
    print(f"Contract Address: {test_address}")
    print("=" * 60)
    
    try:
        # Step 1: Scan contract and save to file
        print("📊 Step 1: Scanning contract and saving to file...")
        
        scan_response = requests.post(
            "http://localhost:8000/scan-contract",
            json={
                "contract_address": test_address,
                "network": "bsc"
            },
            timeout=30
        )
        
        if scan_response.status_code != 200:
            print(f"❌ Contract scan failed: {scan_response.status_code}")
            print(f"Error: {scan_response.text}")
            return
        
        scan_data = scan_response.json()
        print(f"✅ Contract scanned successfully!")
        print(f"📁 Data saved to: C:\\Users\\ashwi\\OneDrive\\Desktop\\Testingggg\\Main\\scanned.txt")
        print(f"🎯 Risk Score: {scan_data.get('risk_score')}/100")
        
        # Wait a moment for file to be written
        time.sleep(2)
        
        # Step 2: Get AI summarization from Flask backend
        print(f"\n🤖 Step 2: Getting AI summarization...")
        
        summary_response = requests.post(
            "http://127.0.0.1:5000/summarize-contract",
            json={
                "query": "Provide a comprehensive analysis of this contract's security and investment potential"
            },
            timeout=30
        )
        
        if summary_response.status_code == 200:
            summary_data = summary_response.json()
            print(f"✅ AI Summarization successful!")
            print(f"📋 Contract: {summary_data.get('contract_address')}")
            print(f"🎯 Risk Score: {summary_data.get('risk_score')}/100")
            print(f"\n📝 AI Analysis Summary:")
            print("-" * 40)
            print(summary_data.get('summary', 'No summary available'))
            
        else:
            print(f"❌ AI summarization failed: {summary_response.status_code}")
            print(f"Error: {summary_response.text}")
        
        # Step 3: Get raw scanned data
        print(f"\n📄 Step 3: Retrieving raw scanned data...")
        
        raw_data_response = requests.get(
            "http://127.0.0.1:5000/get-scanned-data",
            timeout=30
        )
        
        if raw_data_response.status_code == 200:
            raw_data = raw_data_response.json()
            print(f"✅ Raw data retrieved successfully!")
            print(f"📊 Contract Address: {raw_data.get('contract_address')}")
            print(f"🚨 Vulnerabilities: {len(raw_data.get('vulnerability_flags', []))}")
            print(f"💰 Has Liquidity: {raw_data.get('liquidity_data', {}).get('has_liquidity', False)}")
            print(f"👥 Total Holders: {raw_data.get('holder_analysis', {}).get('total_holders', 0)}")
            print(f"🔧 Functions: {len(raw_data.get('contract_functions', []))}")
            
            # Save the complete workflow results
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"complete_workflow_result_{timestamp}.json"
            with open(filename, 'w') as f:
                json.dump({
                    "scan_data": scan_data,
                    "summary_data": summary_data if summary_response.status_code == 200 else None,
                    "raw_data": raw_data if raw_data_response.status_code == 200 else None
                }, f, indent=2)
            
            print(f"\n📄 Complete workflow results saved to: {filename}")
            
        else:
            print(f"❌ Raw data retrieval failed: {raw_data_response.status_code}")
            print(f"Error: {raw_data_response.text}")
        
    except requests.exceptions.ConnectionError as e:
        print(f"❌ Connection error: {e}")
        print("Please ensure both servers are running:")
        print("1. FastAPI backend: cd backend && python main.py")
        print("2. Flask backend: cd AI+frontend/Backend && python app/main.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_complete_workflow() 