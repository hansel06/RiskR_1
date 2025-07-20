import requests
from bs4 import BeautifulSoup

def scrape_whale_alerts():
    url = "https://cryptocurrencyalerting.com/crypto-whale-tracker.html"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    alerts = []
    rows = soup.select("table tbody tr")
    for row in rows:
        cols = row.find_all("td")
        if len(cols) >= 4:
            token = cols[0].text.strip()
            amount = cols[1].text.strip()
            usd_value = cols[2].text.strip()
            time = cols[3].text.strip()
            alerts.append({
                "token": token,
                "amount": amount,
                "usd_value": usd_value,
                "time": time
            })
    return alerts

if __name__ == "__main__":
    whale_alerts = scrape_whale_alerts()
    for a in whale_alerts[:5]:  # Show only top 5
        print(f"{a['time']} — {a['token']} moved {a['amount']} worth {a['usd_value']}")
