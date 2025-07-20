import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

API_KEY = os.getenv("SERPER_API_KEY")

def get_twitter_features(query, limit=5):
    """
    Given a query (e.g., 'Uniswap'), returns a list of dicts with title, snippet, and link from Twitter-related search results.
    """
    search_query = f"{query} site:twitter.com"
    response = requests.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": API_KEY},
        json={"q": search_query}
    )
    results = []
    if response.status_code == 200:
        organic = response.json().get("organic", [])
        for r in organic[:limit]:
            results.append({
                "title": r.get('title'),
                "snippet": r.get('snippet'),
                "link": r.get('link')
            })
    return results