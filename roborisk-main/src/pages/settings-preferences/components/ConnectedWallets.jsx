import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConnectedWallets = ({ isExpanded, onToggle }) => {
  const [wallets, setWallets] = useState([
    {
      id: 'metamask',
      name: 'MetaMask',
      address: '0x742d35Cc6634C0532925a3b8D4A2f',
      balance: '2.45 ETH',
      network: 'Ethereum Mainnet',
      connected: true,
      lastSync: '2 minutes ago',
      icon: 'Wallet'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      address: 'DsVmA5QjR3mZkuEbKHcK7Rg8N3pQ2wX',
      balance: '156.78 SOL',
      network: 'Solana Mainnet',
      connected: true,
      lastSync: '5 minutes ago',
      icon: 'Wallet'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      balance: '0.89 BTC',
      network: 'Bitcoin Mainnet',
      connected: false,
      lastSync: '1 hour ago',
      icon: 'Wallet'
    }
  ]);

  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('5min');
  const [showBalances, setShowBalances] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  const handleConnectWallet = (walletId) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, connected: true, lastSync: 'Just now' }
        : wallet
    ));
  };

  const handleDisconnectWallet = (walletId) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, connected: false }
        : wallet
    ));
  };

  const handleSyncWallet = (walletId) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, lastSync: 'Just now' }
        : wallet
    ));
  };

  const getStatusColor = (connected) => {
    return connected ? 'text-success' : 'text-warning';
  };

  const getStatusIcon = (connected) => {
    return connected ? 'CheckCircle' : 'AlertCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-neon"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-warning to-error rounded-lg flex items-center justify-center glow-green">
            <Icon name="Wallet" size={18} className="text-warning-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Connected Wallets</h3>
            <p className="text-sm text-muted-foreground">Manage Web3 wallet connections and sync settings</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground transition-transform duration-200" 
        />
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-border space-y-6">
          {/* Wallet List */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Link" size={16} className="text-primary" />
              Connected Wallets
            </h4>
            
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        wallet.connected 
                          ? 'bg-success/10 border border-success/20' :'bg-muted border border-border'
                      }`}>
                        <Icon 
                          name={wallet.icon} 
                          size={20} 
                          className={wallet.connected ? 'text-success' : 'text-muted-foreground'} 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-foreground">{wallet.name}</h5>
                          <Icon 
                            name={getStatusIcon(wallet.connected)} 
                            size={16} 
                            className={getStatusColor(wallet.connected)} 
                          />
                        </div>
                        
                        <div className="text-sm text-muted-foreground font-mono truncate">
                          {wallet.address}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          {showBalances && wallet.connected && (
                            <span className="text-foreground font-medium">{wallet.balance}</span>
                          )}
                          <span className="text-muted-foreground">{wallet.network}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-1">
                          Last sync: {wallet.lastSync}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {wallet.connected ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSyncWallet(wallet.id)}
                            iconName="RefreshCw"
                            iconPosition="left"
                          >
                            Sync
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDisconnectWallet(wallet.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleConnectWallet(wallet.id)}
                          iconName="Link"
                          iconPosition="left"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="RefreshCw" size={16} className="text-secondary" />
              Sync Settings
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Auto-sync Wallets"
                description="Automatically sync wallet data at regular intervals"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
              />
              
              <Checkbox
                label="Show Wallet Balances"
                description="Display current balance for connected wallets"
                checked={showBalances}
                onChange={(e) => setShowBalances(e.target.checked)}
              />
              
              <Checkbox
                label="Wallet Notifications"
                description="Get notified about wallet transactions and changes"
                checked={enableNotifications}
                onChange={(e) => setEnableNotifications(e.target.checked)}
              />
            </div>
          </div>

          {/* Security Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-accent" />
              Security & Privacy
            </h4>
            
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={16} className="text-accent mt-0.5" />
                <div className="text-sm">
                  <div className="text-foreground font-medium mb-1">Wallet Security</div>
                  <div className="text-muted-foreground">
                    roboRisk never stores your private keys or seed phrases. We only read public wallet data for analytics purposes. Your funds remain secure in your wallet at all times.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Statistics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="BarChart3" size={16} className="text-warning" />
              Connection Statistics
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{wallets.filter(w => w.connected).length}</div>
                <div className="text-sm text-muted-foreground">Connected</div>
              </div>
              
              <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">{wallets.length}</div>
                <div className="text-sm text-muted-foreground">Total Wallets</div>
              </div>
              
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-sm text-muted-foreground">Networks</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Add New Wallet
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectedWallets;