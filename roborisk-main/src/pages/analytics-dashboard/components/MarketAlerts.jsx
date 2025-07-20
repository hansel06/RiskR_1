import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketAlerts = ({ alerts, isLoading }) => {
  const [filter, setFilter] = useState('all');

  const mockAlerts = [
    {
      id: 1,
      type: 'price',
      severity: 'high',
      title: 'BTC Price Alert',
      message: 'Bitcoin has crossed $45,000 resistance level',
      timestamp: new Date(Date.now() - 300000),
      asset: 'BTC',
      isRead: false
    },
    {
      id: 2,
      type: 'volume',
      severity: 'medium',
      title: 'ETH Volume Spike',
      message: 'Ethereum trading volume increased by 150% in the last hour',
      timestamp: new Date(Date.now() - 900000),
      asset: 'ETH',
      isRead: false
    },
    {
      id: 3,
      type: 'news',
      severity: 'low',
      title: 'Market Update',
      message: 'DeFi TVL reaches new all-time high of $200B',
      timestamp: new Date(Date.now() - 1800000),
      asset: 'DeFi',
      isRead: true
    },
    {
      id: 4,
      type: 'risk',
      severity: 'high',
      title: 'Risk Warning',
      message: 'High volatility detected in AVAX/USD pair',
      timestamp: new Date(Date.now() - 3600000),
      asset: 'AVAX',
      isRead: false
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error border-error/20 bg-error/5';
      case 'medium': return 'text-warning border-warning/20 bg-warning/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'price': return 'TrendingUp';
      case 'volume': return 'BarChart3';
      case 'news': return 'Newspaper';
      case 'risk': return 'AlertTriangle';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    // Add safety checks for undefined/null timestamp
    if (!timestamp) return 'Unknown time';
    
    // Ensure timestamp is a Date object
    const alertDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
    
    // Check if the date is valid
    if (isNaN(alertDate.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diff = now - alertDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return alertDate.toLocaleDateString();
  };

  const filteredAlerts = (alerts || mockAlerts).filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.isRead;
    return alert.severity === filter;
  });

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 border border-muted rounded-lg animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
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
          <h3 className="text-lg font-semibold text-foreground">Market Alerts</h3>
          <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center animate-pulse-slow">
            <span className="text-xs font-bold text-error-foreground">
              {filteredAlerts.filter(a => !a.isRead).length}
            </span>
          </div>
        </div>
        
        <Button variant="ghost" size="xs" iconName="Settings" iconSize={14}>
          Settings
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {['all', 'unread', 'high', 'medium', 'low'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-neon capitalize ${
              filter === filterType
                ? 'bg-primary text-primary-foreground glow-cyan'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border rounded-lg transition-neon hover:border-primary/20 ${
              getSeverityColor(alert.severity)
            } ${!alert.isRead ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                alert.severity === 'high' ? 'bg-error/20' :
                alert.severity === 'medium' ? 'bg-warning/20' : 'bg-success/20'
              }`}>
                <Icon 
                  name={getTypeIcon(alert.type)} 
                  size={16} 
                  className={
                    alert.severity === 'high' ? 'text-error' :
                    alert.severity === 'medium' ? 'text-warning' : 'text-success'
                  }
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {alert.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {alert.asset}
                    </span>
                    {!alert.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {alert.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="xs" iconName="Eye" iconSize={12}>
                      View
                    </Button>
                    <Button variant="ghost" size="xs" iconName="X" iconSize={12}>
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No alerts found</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {filteredAlerts.length} alerts
        </span>
        <Button variant="ghost" size="xs" iconName="MoreHorizontal" iconSize={14}>
          View All
        </Button>
      </div>
    </div>
  );
};

export default MarketAlerts;