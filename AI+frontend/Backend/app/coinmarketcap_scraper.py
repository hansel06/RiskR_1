
import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("CMC_API_KEY")

def get_coinmarketcap_data(symbol="ETH"):
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    headers = {"X-CMC_PRO_API_KEY": API_KEY}
    params = {"symbol": symbol}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()["data"][symbol]
        return {
            "price": data["quote"]["USD"]["price"],
            "percent_change_24h": data["quote"]["USD"]["percent_change_24h"],
            "market_cap": data["quote"]["USD"]["market_cap"],
            "volume_24h": data["quote"]["USD"]["volume_24h"],
            "last_updated": data["last_updated"]
        }
    else:
        return f"CoinMarketCap error: {response.text}"

if __name__ == "__main__":
    print(get_coinmarketcap_data("ETHUSDT")) 