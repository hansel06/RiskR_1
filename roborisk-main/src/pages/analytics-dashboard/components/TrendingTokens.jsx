import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTokens = ({ tokens, isLoading }) => {
  const [sortBy, setSortBy] = useState('change');

  const mockTokens = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 44850.32,
      change24h: 5.67,
      volume: 28500000000,
      marketCap: 875000000000,
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      trend: 'up'
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2845.67,
      change24h: 3.24,
      volume: 15200000000,
      marketCap: 342000000000,
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      trend: 'up'
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change24h: -2.15,
      volume: 2100000000,
      marketCap: 42000000000,
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      trend: 'down'
    },
    {
      id: 4,
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 35.78,
      change24h: 8.92,
      volume: 850000000,
      marketCap: 13500000000,
      logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
      trend: 'up'
    },
    {
      id: 5,
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.89,
      change24h: -1.45,
      volume: 420000000,
      marketCap: 8200000000,
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
      trend: 'down'
    }
  ];

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString()}`;
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    return `$${(volume / 1e3).toFixed(1)}K`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(1)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
    return `$${(marketCap / 1e6).toFixed(1)}M`;
  };

  const sortedTokens = [...(tokens || mockTokens)].sort((a, b) => {
    switch (sortBy) {
      case 'change':
        return Math.abs(b.change24h) - Math.abs(a.change24h);
      case 'volume':
        return b.volume - a.volume;
      case 'marketCap':
        return b.marketCap - a.marketCap;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-muted rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-neon glow-cyan">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">Trending Tokens</h3>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-muted border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="change">By Change</option>
          <option value="volume">By Volume</option>
          <option value="marketCap">By Market Cap</option>
        </select>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTokens.map((token, index) => (
          <div
            key={token.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-neon cursor-pointer group"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {token.symbol.charAt(0)}
                  </span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                  token.trend === 'up' ? 'bg-success' : 'bg-error'
                }`}>
                  <Icon 
                    name={token.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={8} 
                    className="text-white" 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {token.name}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Vol: {formatVolume(token.volume)}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm text-foreground">
                {formatPrice(token.price)}
              </div>
              <div className={`text-xs font-medium flex items-center gap-1 justify-end ${
                token.change24h >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={token.change24h >= 0 ? 'ArrowUp' : 'ArrowDown'} 
                  size={10} 
                />
                {Math.abs(token.change24h).toFixed(2)}%
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="text-sm font-mono text-foreground">
                {formatMarketCap(token.marketCap)}
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-neon">
              <Button variant="ghost" size="xs" iconName="ExternalLink" iconSize={12}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Top {sortedTokens.length} trending tokens
        </span>
        <Button variant="ghost" size="xs" iconName="RefreshCw" iconSize={14}>
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default TrendingTokens;