import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import WalletConnectionCard from './components/WalletConnectionCard';
import TraditionalLoginCard from './components/TraditionalLoginCard';
import RegistrationCard from './components/RegistrationCard';
import BlockchainBackground from './components/BlockchainBackground';
import AuthenticationModeToggle from './components/AuthenticationModeToggle';

const AuthenticationPortal = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('wallet'); // 'wallet' or 'traditional'
  const [viewMode, setViewMode] = useState('login'); // 'login' or 'register'
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleWalletConnect = async (walletId) => {
    setIsLoading(true);
    setConnectionStatus('connecting');

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setConnectionStatus('connected');

      // Simulate successful connection
      setTimeout(() => {
        navigate('/analytics-dashboard');
      }, 1000);

    } catch (error) {
      setConnectionStatus('error');
      setIsLoading(false);
    }
  };

  const handleTraditionalLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to dashboard
      navigate('/analytics-dashboard');

    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleRegistration = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to dashboard
      navigate('/analytics-dashboard');

    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderAuthenticationCard = () => {
    if (authMode === 'wallet') {
      return (
        <WalletConnectionCard
          onWalletConnect={handleWalletConnect}
          isConnecting={isLoading} />);


    }

    if (viewMode === 'register') {
      return (
        <RegistrationCard
          onRegister={handleRegistration}
          onSwitchToLogin={() => setViewMode('login')}
          isLoading={isLoading} />);


    }

    return (
      <TraditionalLoginCard
        onLogin={handleTraditionalLogin}
        onSwitchToRegister={() => setViewMode('register')}
        isLoading={isLoading} />);


  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Blockchain Background */}
      <BlockchainBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 bg-[rgba(64,8,8,0)]">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-cyan">
                <Icon name="Zap" size={28} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-foreground font-mono">roboRisk</h1>
                <p className="text-sm text-muted-foreground">Web3 Analytics Platform</p>
              </div>
            </div>
            
            {/* Connection Status */}
            {connectionStatus &&
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            connectionStatus === 'connecting' ? 'bg-warning/10 text-warning border border-warning/20' :
            connectionStatus === 'connected' ? 'bg-success/10 text-success border border-success/20 glow-green' : 'bg-destructive/10 text-destructive border border-destructive/20'}`
            }>
                {connectionStatus === 'connecting' &&
              <>
                    <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting wallet...</span>
                  </>
              }
                {connectionStatus === 'connected' &&
              <>
                    <Icon name="CheckCircle" size={16} />
                    <span>Wallet connected successfully!</span>
                  </>
              }
                {connectionStatus === 'error' &&
              <>
                    <Icon name="XCircle" size={16} />
                    <span>Connection failed</span>
                  </>
              }
              </div>
            }
          </div>

          {/* Authentication Mode Toggle */}
          {!connectionStatus &&
          <AuthenticationModeToggle
            currentMode={authMode}
            onModeChange={(mode) => {
              setAuthMode(mode);
              setViewMode('login'); // Reset to login when switching modes
            }} />

          }

          {/* Authentication Card */}
          {!connectionStatus &&
          <div className="bg-surface/80 backdrop-blur-glass border border-border rounded-2xl p-8 glow-purple">
              {renderAuthenticationCard()}
            </div>
          }

          {/* Trust Signals */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Lock" size={14} className="text-primary" />
              <span>Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Zap" size={14} className="text-accent" />
              <span>Decentralized</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} roboRisk. Empowering Web3 decisions with AI-driven analytics.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <button className="text-xs text-muted-foreground hover:text-primary transition-neon">
                Privacy Policy
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary transition-neon">
                Terms of Service
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary transition-neon">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground font-mono">
        v2.1.0 • Build 2025.07.20
      </div>
    </div>);

};

export default AuthenticationPortal;