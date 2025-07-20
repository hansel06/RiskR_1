import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onNewChat, onSearchToggle, onExportChat, conversationCount }) => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur-glass border-b border-border">
      <div className="flex items-center justify-between p-4">
        {/* Left Section - AI Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-xl flex items-center justify-center glow-green">
            <Icon name="Bot" size={20} className="text-success-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AI Research Assistant</h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-success animate-pulse-slow' : 'bg-muted'
              }`}></div>
              <span className="text-sm text-muted-foreground font-mono">
                {isOnline ? 'Online' : 'Offline'} • {conversationCount} conversations
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Search" size={18} />
          </Button>

          {/* Export Chat */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onExportChat}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Download" size={18} />
          </Button>

          {/* New Chat */}
          <Button
            variant="outline"
            size="sm"
            onClick={onNewChat}
            iconName="Plus"
            iconPosition="left"
            className="hidden sm:flex"
          >
            New Chat
          </Button>

          {/* Mobile New Chat */}
          <Button
            variant="outline"
            size="icon"
            onClick={onNewChat}
            className="sm:hidden"
          >
            <Icon name="Plus" size={18} />
          </Button>

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>

      {/* AI Capabilities Banner */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Zap" size={12} className="text-warning" />
            <span>Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Database" size={12} className="text-primary" />
            <span>Blockchain Data</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="TrendingUp" size={12} className="text-success" />
            <span>Market Insights</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Shield" size={12} className="text-error" />
            <span>Risk Assessment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;