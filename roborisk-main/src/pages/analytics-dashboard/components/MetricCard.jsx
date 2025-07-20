import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, trend, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-6 w-6 bg-muted rounded"></div>
        </div>
        <div className="h-8 bg-muted rounded w-32 mb-2"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
      </div>
    );
  }

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-neon group glow-cyan">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-neon">
          <Icon name={icon} size={16} className="text-primary-foreground" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground font-mono">{value}</div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">{change}</span>
          </div>
          
          {trend && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>•</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;