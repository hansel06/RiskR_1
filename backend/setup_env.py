#!/usr/bin/env python3
"""
RiskRobo Environment Setup Script
This script helps you set up your .env file from the template.
"""

import os
import shutil
import sys

def setup_environment():
    """Set up the environment configuration file"""
    
    template_path = "environment_template.txt"
    env_path = ".env"
    
    print("🚀 RiskRobo Environment Setup")
    print("=" * 40)
    
    # Check if .env already exists
    if os.path.exists(env_path):
        response = input(f"⚠️  {env_path} already exists. Overwrite? (y/N): ")
        if response.lower() != 'y':
            print("Setup cancelled.")
            return
    
    # Check if template exists
    if not os.path.exists(template_path):
        print(f"❌ Template file {template_path} not found!")
        return
    
    try:
        # Copy template to .env
        shutil.copy2(template_path, env_path)
        print(f"✅ Created {env_path} from template")
        
        # Show next steps
        print("\n📋 Next Steps:")
        print("1. Edit .env file with your actual values")
        print("2. Required variables to set:")
        print("   - BSCSCAN_API_KEY (get from https://bscscan.com/apis)")
        print("   - PRIVATE_KEY (for contract deployment)")
        print("3. Optional but recommended:")
        print("   - QUICKNODE_BSC_RPC or ALCHEMY_BSC_RPC (for better reliability)")
        print("   - Notification settings (email, telegram, discord)")
        
        print("\n🔧 To get started quickly, you only need:")
        print("   BSCSCAN_API_KEY=your-api-key-here")
        print("   (The BSC RPC URLs are already set to public endpoints)")
        
    except Exception as e:
        print(f"❌ Error creating .env file: {e}")

def validate_env():
    """Validate the current .env configuration"""
    
    if not os.path.exists(".env"):
        print("❌ .env file not found. Run setup first.")
        return
    
    print("\n🔍 Validating .env configuration...")
    
    # Load environment variables
    with open(".env", "r") as f:
        lines = f.readlines()
    
    required_vars = [
        "BSC_MAINNET_RPC_1",
        "BSCSCAN_API_KEY"
    ]
    
    optional_vars = [
        "PANCAKE_FACTORY_V2",
        "PANCAKE_ROUTER_V2",
        "PRIVATE_KEY"
    ]
    
    env_vars = {}
    for line in lines:
        if "=" in line and not line.strip().startswith("#"):
            key, value = line.strip().split("=", 1)
            env_vars[key] = value
    
    print("\n📊 Configuration Status:")
    
    # Check required variables
    missing_required = []
    for var in required_vars:
        if var not in env_vars or env_vars[var] in ['', 'your-bscscan-api-key-here']:
            missing_required.append(var)
        else:
            print(f"✅ {var}: Configured")
    
    if missing_required:
        print(f"❌ Missing required variables: {', '.join(missing_required)}")
    
    # Check optional variables
    print("\n📋 Optional variables:")
    for var in optional_vars:
        if var in env_vars and env_vars[var] not in ['', f'your-{var.lower()}-here']:
            print(f"✅ {var}: Configured")
        else:
            print(f"⚠️  {var}: Not configured (optional)")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "validate":
        validate_env()
    else:
        setup_environment() 