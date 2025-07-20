import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'portfolio',
      title: 'Portfolio Analysis',
      description: 'Analyze your current holdings and performance',
      icon: 'PieChart',
      color: 'from-primary to-secondary',
      action: () => onActionClick?.('portfolio')
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Evaluate risk factors across your positions',
      icon: 'Shield',
      color: 'from-warning to-error',
      action: () => onActionClick?.('risk')
    },
    {
      id: 'market-scanner',
      title: 'Market Scanner',
      description: 'Discover new opportunities and trends',
      icon: 'Search',
      color: 'from-success to-accent',
      action: () => onActionClick?.('scanner')
    },
    {
      id: 'alerts-setup',
      title: 'Setup Alerts',
      description: 'Configure price and volume notifications',
      icon: 'Bell',
      color: 'from-secondary to-primary',
      action: () => onActionClick?.('alerts')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-neon glow-cyan">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="group p-4 rounded-lg border border-border hover:border-primary/20 transition-neon hover:bg-muted/20 text-left"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform glow-cyan`}>
                <Icon name={action.icon} size={18} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-neon">
                  {action.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {action.description}
                </p>
              </div>
              
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" 
              />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <Button variant="ghost" size="xs" iconName="Settings" iconSize={14}>
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;