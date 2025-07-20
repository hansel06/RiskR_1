import requests
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

def get_github_features(owner_repo):
    if not owner_repo or "/" not in owner_repo:
        return "No official GitHub repo found."
    owner, repo = owner_repo.split("/", 1)
    base_url = f"https://api.github.com/repos/{owner}/{repo}"

    repo_resp = requests.get(base_url, headers=headers).json()
    if not repo_resp or not isinstance(repo_resp, dict):
        return "No official GitHub repo found."
    if "message" in repo_resp and repo_resp["message"] == "Not Found":
        return "No official GitHub repo found."

    contributors_resp = requests.get(f"{base_url}/contributors", headers=headers).json()
    commits_resp = requests.get(f"{base_url}/commits", headers=headers).json()
    issues_resp = requests.get(f"{base_url}/issues?state=open", headers=headers).json()

    # Trust checklist
    has_license = repo_resp.get("license", {}).get("name") is not None
    has_docs = "docs" in repo_resp.get("name", "").lower() or "readme" in repo_resp.get("name", "").lower()
    has_tests = "test" in repo_resp.get("name", "").lower()
    contributors_count = len(contributors_resp) if isinstance(contributors_resp, list) else 0
    recent_commit = commits_resp[0].get("commit", {}).get("author", {}).get("date") if commits_resp else None
    days_since_last_commit = (
        (datetime.utcnow() - datetime.strptime(recent_commit, "%Y-%m-%dT%H:%M:%SZ")).days
        if recent_commit else None
    )
    open_issues = len(issues_resp) if isinstance(issues_resp, list) else 0

    # Simple logic for demo (customize as needed)
    if contributors_count > 2 and days_since_last_commit is not None and days_since_last_commit < 90 and has_license:
        return f"🟢 Legit: Repo has {contributors_count} contributors, recent commits, and a license. Appears well-maintained."
    else:
        reasons = []
        if contributors_count <= 2:
            reasons.append("few contributors")
        if days_since_last_commit is None or days_since_last_commit >= 90:
            reasons.append("no recent commits")
        if not has_license:
            reasons.append("missing license")
        return f"🔴 Risky: Repo has {', '.join(reasons)}."

# Example usage
if __name__ == "__main__":
    print(get_github_features("Uniswap/v3-core"))

import os
import requests

def get_cmc_symbol(query):
    CMC_API_KEY = os.getenv("CMC_API_KEY")
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY}
    params = {"listing_status": "active", "limit": 5000}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()["data"]
        query_lower = query.strip().lower()
        for coin in data:
            if coin["symbol"].lower() == query_lower or coin["name"].lower() == query_lower:
                return coin["symbol"]
    return query.upper()  # fallback

def get_binance_symbol(query):
    url = "https://api.binance.com/api/v3/exchangeInfo"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()["symbols"]
        query_upper = query.strip().upper()
        for symbol in data:
            if symbol["baseAsset"] == query_upper and symbol["quoteAsset"] == "USDT":
                return symbol["symbol"]
            if symbol["baseAsset"].lower() == query.strip().lower() and symbol["quoteAsset"] == "USDT":
                return symbol["symbol"]
    return query.upper() + "USDT"  # fallback

def search_github_repo(query):
    import requests, os
    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }
    url = f"https://api.github.com/search/repositories?q={query}+in:name&sort=stars&order=desc"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        items = response.json().get("items", [])
        if items:
            repo = items[0]
            return f"{repo['owner']['login']}/{repo['name']}"
    return None
