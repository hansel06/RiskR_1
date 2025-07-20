import React from 'react';
import NavigationSidebar from './NavigationSidebar';
import UserProfileDropdown from './UserProfileDropdown';
import Icon from '../AppIcon';

const MainAppLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar - Fixed on the left */}
      <NavigationSidebar />

      {/* Main Content Area - Properly spaced from sidebar */}
      <div className="transition-layout duration-300 ease-in-out lg:ml-sidebar ml-0 pb-16 lg:pb-0">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-glass border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side - Mobile logo and page info */}
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-cyan">
                  <Icon name="Zap" size={16} className="text-primary-foreground" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">roboRisk Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time blockchain insights</p>
              </div>
            </div>

            {/* Right side - Status and User Profile */}
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success text-sm rounded-full border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span className="font-mono">Live Data</span>
              </div>

              {/* User Profile Dropdown */}
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        {/* Main Content - Properly padded to avoid sidebar overlap */}
        <main className="p-6">
          {children}
        </main>
      </div>


    </div>
  );
};

export default MainAppLayout;