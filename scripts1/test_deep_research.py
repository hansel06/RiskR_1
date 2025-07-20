#!/usr/bin/env python3
"""
Test script for the Deep Research API endpoint
Usage: python test_deep_research.py
"""

import requests
import json

def test_deep_research():
    """Test the deep research API endpoint"""
    
    # Test contract address (CAKE token)
    test_address = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
    
    print(f"🔍 Testing Deep Research API with address: {test_address}")
    print("=" * 60)
    
    try:
        # Prepare request
        request_data = {
            "contract_address": test_address,
            "network": "bsc",
            "max_results": 5
        }
        
        # Send request
        response = requests.post(
            "http://localhost:8000/deep-research",
            json=request_data,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            
            print("✅ Deep Research API is working!")
            print(f"📊 Target Contract: {result.get('target_contract')}")
            print(f"📋 Analysis Summary:")
            print(result.get('analysis_summary', 'No summary available'))
            
            similar_contracts = result.get('similar_contracts', [])
            print(f"\n🎯 Found {len(similar_contracts)} similar contracts:")
            
            for i, contract in enumerate(similar_contracts, 1):
                print(f"\nContract {i}:")
                print(f"  Address: {contract.get('address')}")
                print(f"  Similarity: {contract.get('similarity_percentage')}%")
                print(f"  Risk Score: {contract.get('risk_score')}/100")
                print(f"  Total Functions: {contract.get('total_functions')}")
                print(f"  Verified: {contract.get('verified')}")
                
                matching_functions = contract.get('matching_functions', [])
                if matching_functions:
                    print(f"  Matching Functions: {len(matching_functions)}")
                    for func in matching_functions[:3]:  # Show first 3
                        print(f"    • {func}")
                    if len(matching_functions) > 3:
                        print(f"    ... and {len(matching_functions) - 3} more")
            
            print(f"\n📄 Full response saved to: deep_research_test_result.json")
            
            # Save full response to file
            with open('deep_research_test_result.json', 'w') as f:
                json.dump(result, f, indent=2)
                
        else:
            print(f"❌ API request failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Please start the backend first:")
        print("cd backend && python main.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_deep_research() 