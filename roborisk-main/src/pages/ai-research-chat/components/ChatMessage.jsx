import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isTyping) {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-[85%] md:max-w-[75%]">
          <div className="bg-muted/50 border border-success/20 rounded-2xl px-4 py-3 glow-green">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm text-success font-mono">AI is analyzing...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%] md:max-w-[75%]">
        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary/20 border border-primary/30 text-primary-foreground glow-cyan'
              : 'bg-muted/50 border border-success/20 text-muted-foreground'
          }`}
        >
          {/* Message Content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>

          {/* Rich Content Support */}
          {message.attachment && (
            <div className="mt-3 p-3 bg-surface/50 rounded-lg border border-border">
              {message.attachment.type === 'code' && (
                <div className="font-mono text-xs text-accent">
                  <pre className="whitespace-pre-wrap">{message.attachment.content}</pre>
                </div>
              )}
              {message.attachment.type === 'chart' && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="BarChart3" size={16} />
                  <span>Chart: {message.attachment.title}</span>
                </div>
              )}
              {message.attachment.type === 'link' && (
                <a
                  href={message.attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-neon"
                >
                  <Icon name="ExternalLink" size={16} />
                  <span>{message.attachment.title}</span>
                </a>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs mt-2 opacity-70 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {formatTimestamp(timestamp)}
          </div>
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-2 ml-2">
            <button className="p-1 rounded-full hover:bg-muted/50 transition-neon">
              <Icon name="Copy" size={14} className="text-muted-foreground hover:text-foreground" />
            </button>
            <button className="p-1 rounded-full hover:bg-muted/50 transition-neon">
              <Icon name="Heart" size={14} className="text-muted-foreground hover:text-error" />
            </button>
            <button className="p-1 rounded-full hover:bg-muted/50 transition-neon">
              <Icon name="Bookmark" size={14} className="text-muted-foreground hover:text-warning" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;