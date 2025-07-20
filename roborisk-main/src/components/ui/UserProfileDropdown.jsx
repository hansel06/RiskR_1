import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userProfile = {
    name: 'Alex Chen',
    email: 'alex.chen@roborisk.io',
    avatar: null,
    walletAddress: '0x742d...4A2f',
    plan: 'Pro Analyst'
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      action: () => navigate('/settings-preferences')
    },
    {
      id: 'wallet',
      label: 'Wallet Connection',
      icon: 'Wallet',
      action: () => setWalletConnected(!walletConnected),
      status: walletConnected ? 'Connected' : 'Disconnected'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      action: () => navigate('/settings-preferences')
    },
    {
      id: 'api',
      label: 'API Keys',
      icon: 'Key',
      action: () => navigate('/settings-preferences')
    },
    {
      id: 'billing',
      label: 'Billing & Usage',
      icon: 'CreditCard',
      action: () => navigate('/settings-preferences')
    },
    {
      id: 'support',
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => window.open('https://help.roborisk.io', '_blank')
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => navigate('/authentication-portal'),
      variant: 'destructive'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (item) => {
    item.action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-neon group"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-cyan">
          <Icon name="User" size={16} className="text-primary-foreground" />
        </div>
        
        {/* User Info - Hidden on mobile */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">{userProfile.name}</div>
          <div className="text-xs text-muted-foreground">{userProfile.plan}</div>
        </div>
        
        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg glow-purple z-150 overflow-hidden">
          {/* User Info Header */}
          <div className="p-4 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-cyan">
                <Icon name="User" size={20} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">{userProfile.name}</div>
                <div className="text-sm text-muted-foreground truncate">{userProfile.email}</div>
                <div className="text-xs text-muted-foreground font-mono">{userProfile.walletAddress}</div>
              </div>
            </div>
            
            {/* Plan Badge */}
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                <Icon name="Crown" size={12} />
                {userProfile.plan}
              </span>
              <div className={`flex items-center gap-1 text-xs ${
                walletConnected ? 'text-success' : 'text-warning'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  walletConnected ? 'bg-success animate-pulse-slow' : 'bg-warning'
                }`}></div>
                {walletConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-neon ${
                  item.variant === 'destructive' ?'text-destructive hover:text-destructive-foreground hover:bg-destructive/10' :'text-foreground'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={16} 
                  className={item.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'} 
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.status && (
                    <div className={`text-xs mt-0.5 ${
                      item.status === 'Connected' ? 'text-success' : 'text-warning'
                    }`}>
                      {item.status}
                    </div>
                  )}
                </div>
                {item.id === 'support' && (
                  <Icon name="ExternalLink" size={12} className="text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/10">
            <div className="text-xs text-muted-foreground text-center">
              roboRisk v2.1.0 • Last updated: July 2025
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;