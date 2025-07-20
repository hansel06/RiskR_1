import React from 'react';
import NavigationSidebar from './NavigationSidebar';
import UserProfileDropdown from './UserProfileDropdown';
import Icon from '../AppIcon';

const DashboardLayoutContainer = ({ children }) => {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content Area - Fixed layout calculations */}
      <div className="transition-layout lg:ml-sidebar pb-16 lg:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-glass border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side - can be used for breadcrumbs or page title */}
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-cyan">
                  <Icon name="Zap" size={16} className="text-primary-foreground" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time blockchain insights</p>
              </div>
            </div>

            {/* Right side - User Profile */}
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

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>


    </div>
  );
};

export default DashboardLayoutContainer;