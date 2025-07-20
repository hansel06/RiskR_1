import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useSidebar } from './SidebarContext';

const NavigationSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Analytics Dashboard',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      description: 'Real-time blockchain analytics and market insights'
    },
    {
      id: 'ai-research',
      label: 'AI Research',
      path: '/ai-research-chat',
      icon: 'MessageSquare',
      description: 'Intelligent blockchain research assistant'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings-preferences',
      icon: 'Settings',
      description: 'Platform preferences and customization'
    }
  ];

  const handleNavigation = (item) => {
    navigate(item.path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar - Lower z-index to prevent overlap */}
      <aside className={`fixed left-0 top-0 z-40 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-70'
      } hidden lg:flex flex-col shadow-lg`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-cyan">
              <Icon name="Zap" size={20} className="text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground font-mono">roboRisk</span>
                <span className="text-xs text-muted-foreground">Web3 Analytics</span>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-muted transition-neon z-10"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={14} 
              className="text-muted-foreground" 
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-neon group relative ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20 glow-cyan' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActive(item.path) ? 'text-primary' : 'text-current'} 
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-popover border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      <div className="text-sm font-medium text-popover-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Status Indicator */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
            {!isCollapsed && (
              <span className="text-xs text-muted-foreground font-mono">System Online</span>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Lower z-index */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-glass border-t border-border lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-neon ${
                isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={isActive(item.path) ? 'text-primary glow-cyan' : 'text-current'} 
              />
              <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>


    </>
  );
};

export default NavigationSidebar;