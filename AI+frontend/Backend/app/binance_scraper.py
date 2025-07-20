import requests

def get_binance_data(symbol="ETHUSDT"):
    """
    Fetches 24hr ticker price change statistics for the given symbol from Binance public API.
    Returns a dictionary with price, percent_change_24h, volume_24h, high_24h, and low_24h.
    """
    url = f"https://api.binance.com/api/v3/ticker/24hr?symbol={symbol}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            "price": data.get("lastPrice"),
            "percent_change_24h": data.get("priceChangePercent"),
            "volume_24h": data.get("volume"),
            "high_24h": data.get("highPrice"),
            "low_24h": data.get("lowPrice")
        }
    else:
        return f"Binance error: {response.text}"

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

if __name__ == "__main__":
    print(get_binance_data("ETHUSDT")) 