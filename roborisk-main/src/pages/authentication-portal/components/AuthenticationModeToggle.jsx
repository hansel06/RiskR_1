import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticationModeToggle = ({ currentMode, onModeChange }) => {
  const modes = [
    {
      id: 'wallet',
      label: 'Web3 Wallet',
      icon: 'Wallet',
      description: 'Connect with MetaMask or WalletConnect',
      isRecommended: true
    },
    {
      id: 'traditional',
      label: 'Email & Password',
      icon: 'Mail',
      description: 'Sign in with traditional credentials',
      isRecommended: false
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted/20 rounded-lg border border-border">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`relative p-4 rounded-md transition-neon group ${
              currentMode === mode.id
                ? 'bg-primary text-primary-foreground glow-cyan'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                currentMode === mode.id
                  ? 'bg-primary-foreground/20'
                  : 'bg-muted/50 group-hover:bg-muted'
              }`}>
                <Icon 
                  name={mode.icon} 
                  size={18} 
                  className={currentMode === mode.id ? 'text-primary-foreground' : 'text-current'} 
                />
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-sm font-medium">{mode.label}</span>
                  {mode.isRecommended && currentMode !== mode.id && (
                    <span className="px-1.5 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded border border-accent/30">
                      Rec
                    </span>
                  )}
                </div>
                <p className="text-xs opacity-80 mt-1 hidden sm:block">
                  {mode.description}
                </p>
              </div>
            </div>

            {/* Active Indicator */}
            {currentMode === mode.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-md"></div>
            )}
          </button>
        ))}
      </div>

      {/* Mode Description for Mobile */}
      <div className="mt-3 text-center sm:hidden">
        <p className="text-xs text-muted-foreground">
          {modes.find(mode => mode.id === currentMode)?.description}
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 p-4 bg-muted/10 border border-border rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">
              {currentMode === 'wallet' ? 'Web3 Benefits' : 'Traditional Benefits'}
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {currentMode === 'wallet' ? (
                <>
                  <li>• Decentralized authentication</li>
                  <li>• No password management required</li>
                  <li>• Direct blockchain interaction</li>
                </>
              ) : (
                <>
                  <li>• Familiar login experience</li>
                  <li>• Password recovery options</li>
                  <li>• Multi-factor authentication</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModeToggle;