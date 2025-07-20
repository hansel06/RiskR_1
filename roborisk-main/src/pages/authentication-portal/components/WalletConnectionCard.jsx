import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const WalletConnectionCard = ({ onWalletConnect, isConnecting }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      isPopular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Scan with WalletConnect to connect',
      isPopular: true
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect with Coinbase Wallet',
      isPopular: false
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: 'Shield',
      description: 'Connect using Trust Wallet mobile app',
      isPopular: false
    }
  ];

  const handleWalletSelect = (walletId) => {
    setSelectedWallet(walletId);
    onWalletConnect(walletId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto glow-cyan">
          <Icon name="Zap" size={32} className="text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
        <p className="text-muted-foreground">
          Choose your preferred Web3 wallet to access roboRisk analytics
        </p>
      </div>

      {/* Wallet Options */}
      <div className="space-y-3">
        {walletOptions.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => handleWalletSelect(wallet.id)}
            disabled={isConnecting}
            className={`w-full p-4 rounded-lg border transition-neon group relative overflow-hidden ${
              selectedWallet === wallet.id
                ? 'border-primary bg-primary/10 glow-cyan' :'border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/30'
            } ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedWallet === wallet.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground group-hover:text-foreground'
              }`}>
                <Icon name={wallet.icon} size={24} />
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{wallet.name}</span>
                  {wallet.isPopular && (
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded-full border border-accent/30">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{wallet.description}</p>
              </div>

              {isConnecting && selectedWallet === wallet.id ? (
                <div className="w-6 h-6">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <Icon 
                  name="ChevronRight" 
                  size={20} 
                  className="text-muted-foreground group-hover:text-foreground transition-neon" 
                />
              )}
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-muted/20 border border-border rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-medium text-foreground">Secure Connection</h4>
            <p className="text-sm text-muted-foreground">
              Your wallet connection is encrypted and secure. We never store your private keys or seed phrases.
            </p>
          </div>
        </div>
      </div>

      {/* Alternative Login */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have a Web3 wallet?{' '}
          <button className="text-primary hover:text-primary/80 font-medium transition-neon">
            Learn more about Web3 wallets
          </button>
        </p>
      </div>
    </div>
  );
};

export default WalletConnectionCard;