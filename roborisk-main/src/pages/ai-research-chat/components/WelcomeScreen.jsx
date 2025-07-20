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
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-success to-accent rounded-2xl flex items-center justify-center glow-green mx-auto mb-6">
          <Icon name="Bot" size={40} className="text-success-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          AI Research Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your intelligent companion for blockchain analysis, market research, and Web3 insights. 
          Ask me anything about DeFi, cryptocurrencies, or blockchain technology.
        </p>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8">
        {researchCapabilities.map((capability, index) => (
          <div
            key={index}
            className="p-6 bg-surface/50 border border-border rounded-xl hover:bg-surface/70 transition-neon group"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-neon`}>
                <Icon name={capability.icon} size={24} className={capability.color} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Start Chat Button */}
      <Button
        onClick={() => onStartChat()}
        size="lg"
        className="glow-cyan"
        iconName="MessageSquare"
        iconPosition="left"
      >
        Start New Conversation
      </Button>

      {/* Features Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-warning" />
          <span>Real-time Data</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span>Secure & Private</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Globe" size={16} className="text-primary" />
          <span>Multi-chain Support</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span>24/7 Available</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;