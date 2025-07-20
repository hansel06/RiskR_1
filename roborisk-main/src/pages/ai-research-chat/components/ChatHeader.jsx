import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onNewChat, onSearchToggle, onExportChat }) => {
  return (
    <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur-glass border-b border-border">
      <div className="flex items-center justify-end p-4">
        {/* Only show New Chat and action buttons */}
        <Button
          onClick={onNewChat}
          size="md"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mr-2"
          iconName="Plus"
          iconPosition="left"
        >
          New Chat
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSearchToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="Search" size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onExportChat}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="Download" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;