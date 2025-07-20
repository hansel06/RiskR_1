import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isTyping, disabled, onRef }) => {
  const [inputValue, setInputValue] = useState('');

  const textareaRef = useRef(null);

  // Expose the ref to parent component
  React.useEffect(() => {
    if (onRef) {
      onRef(textareaRef.current);
    }
  }, [onRef]);



  const handleSend = () => {
    if (!inputValue.trim() || isTyping || disabled) return;
    
    onSendMessage(inputValue.trim());
    setInputValue('');

    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };



  return (
    <div className="border-t border-border bg-surface/95 backdrop-blur-glass">


      {/* Input Area */}
      <div className="p-6">
        <div className="flex items-end gap-4">


          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}

              placeholder="Ask about blockchain data, DeFi protocols, market analysis..."
              disabled={disabled || isTyping}
              className="w-full min-h-[60px] max-h-48 px-6 py-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-neon text-base"
              rows={2}
            />
            
            {/* Character Counter */}
            {inputValue.length > 0 && (
              <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                {inputValue.length}/2000
              </div>
            )}
          </div>

          {/* Attachment Button */}
          <button
            className="p-3 rounded-lg hover:bg-muted/50 transition-neon shrink-0"
            disabled={disabled || isTyping}
          >
            <Icon name="Paperclip" size={22} className="text-muted-foreground hover:text-foreground" />
          </button>

          {/* Voice Input Button */}
          <button
            className="p-3 rounded-lg hover:bg-muted/50 transition-neon shrink-0 md:hidden"
            disabled={disabled || isTyping}
          >
            <Icon name="Mic" size={22} className="text-muted-foreground hover:text-foreground" />
          </button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || disabled}
            size="icon"
            className="shrink-0 glow-cyan p-3"
          >
            {isTyping ? (
              <Icon name="Loader2" size={22} className="animate-spin" />
            ) : (
              <Icon name="Send" size={22} />
            )}
          </Button>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="hidden md:flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <div className="flex items-center gap-4">
            <span>Ctrl+K for shortcuts</span>
            <span>Ctrl+/ for help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;