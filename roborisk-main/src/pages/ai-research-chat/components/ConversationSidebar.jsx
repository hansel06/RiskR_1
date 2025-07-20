import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationSidebar = ({ isOpen, onClose, conversations, activeConversationId, onSelectConversation, onDeleteConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Chats', icon: 'MessageSquare' },
    { id: 'analysis', label: 'Analysis', icon: 'BarChart3' },
    { id: 'research', label: 'Research', icon: 'Search' },
    { id: 'bookmarked', label: 'Bookmarked', icon: 'Bookmark' }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || conv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-surface border-r border-border z-150 hidden lg:flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Search */}
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-neon ${
                  selectedCategory === category.id
                    ? 'bg-primary/20 text-primary border border-primary/30' :'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`group p-3 rounded-lg cursor-pointer transition-neon mb-2 ${
                    activeConversationId === conversation.id
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate mb-1">
                        {conversation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {conversation.preview}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(conversation.updatedAt)}</span>
                        <span>•</span>
                        <span>{conversation.messageCount} messages</span>
                        {conversation.isBookmarked && (
                          <>
                            <span>•</span>
                            <Icon name="Bookmark" size={12} className="text-warning" />
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-neon"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Full Screen Modal */}
      <div className="fixed inset-0 bg-background z-200 lg:hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Search */}
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-neon ${
                  selectedCategory === category.id
                    ? 'bg-primary/20 text-primary border border-primary/30' :'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    onSelectConversation(conversation.id);
                    onClose();
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-neon ${
                    activeConversationId === conversation.id
                      ? 'bg-primary/10 border border-primary/20' :'bg-muted/20 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate mb-1">
                        {conversation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {conversation.preview}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(conversation.updatedAt)}</span>
                        <span>•</span>
                        <span>{conversation.messageCount} messages</span>
                        {conversation.isBookmarked && (
                          <>
                            <span>•</span>
                            <Icon name="Bookmark" size={12} className="text-warning" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-150 lg:hidden"
        onClick={onClose}
      />
    </>
  );
};

export default ConversationSidebar;