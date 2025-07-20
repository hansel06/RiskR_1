import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeScreen = ({ onStartChat }) => {
  const researchCapabilities = [
    {
      icon: 'BarChart3',
      title: 'Market Analysis',
      description: 'Real-time blockchain analytics and market trend analysis',
      color: 'text-primary'
    },
    {
      icon: 'Shield',
      title: 'Risk Assessment',
      description: 'Comprehensive security audits and risk evaluation',
      color: 'text-error'
    },
    {
      icon: 'Search',
      title: 'Protocol Research',
      description: 'Deep dive into DeFi protocols and smart contracts',
      color: 'text-warning'
    },
    {
      icon: 'TrendingUp',
      title: 'Investment Insights',
      description: 'Data-driven investment recommendations and strategies',
      color: 'text-success'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-success to-accent rounded-2xl flex items-center justify-center glow-green mx-auto mb-3">
          <Icon name="Bot" size={24} className="text-success-foreground" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          AI Research Assistant
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Your intelligent companion for blockchain analysis, market research, and Web3 insights. Ask me anything about DeFi, cryptocurrencies, or blockchain technology.
        </p>
      </div>
      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl mb-4">
        {researchCapabilities.map((capability, index) => (
          <div
            key={index}
            className="p-3 bg-surface/50 border border-border rounded-xl hover:bg-surface/70 transition-neon group"
          >
            <div className="flex items-start gap-2">
              <div className={`p-2 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-neon`}>
                <Icon name={capability.icon} size={16} className={capability.color} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-1">{capability.title}</h3>
                <p className="text-xs text-muted-foreground">{capability.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Start Chat Button */}
      <Button
        onClick={() => onStartChat()}
        size="md"
        className="glow-cyan mt-2"
        iconName="MessageSquare"
        iconPosition="left"
      >
        Start New Conversation
      </Button>
    </div>
  );
};

export default WelcomeScreen;