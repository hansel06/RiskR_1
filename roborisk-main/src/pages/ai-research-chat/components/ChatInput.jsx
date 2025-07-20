import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isTyping, disabled, onRef, coinName, setCoinName, coinSymbol, setCoinSymbol }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  React.useEffect(() => {
    if (onRef) {
      onRef(textareaRef.current);
    }
  }, [onRef]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping || disabled) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
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
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="border-t border-border bg-[#181818] font-sans">
      {/* Coin Name and Symbol Input Fields */}
      <div className="p-2 border-b border-border/50 flex gap-4 items-center justify-center">
        <div className="flex flex-col items-start">
          <label className="text-xs font-medium text-blue-200 mb-1">Coin Name</label>
          <input
            type="text"
            value={coinName}
            onChange={e => setCoinName(e.target.value)}
            placeholder="e.g. Ethereum"
            className="px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-0 focus:border-[#222] text-sm min-w-[120px]"
            disabled={disabled || isTyping}
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="text-xs font-medium text-blue-200 mb-1">Coin Symbol</label>
          <input
            type="text"
            value={coinSymbol}
            onChange={e => setCoinSymbol(e.target.value)}
            placeholder="e.g. ETH"
            className="px-3 py-2 bg-[#111] border border-[#222] rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-0 focus:border-[#222] text-sm min-w-[80px]"
            disabled={disabled || isTyping}
            style={{ boxShadow: 'none' }}
          />
        </div>
      </div>
      {/* Input Area */}
      <div className="p-2">
        <div className="flex items-end gap-4">
          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about any token, coin, or blockchain..."
              disabled={disabled || isTyping}
              className="w-full min-h-[40px] max-h-48 px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-white placeholder-blue-300 resize-none focus:outline-none focus:ring-0 focus:border-[#222] transition-none text-base font-sans"
              rows={1}
              style={{ boxShadow: 'none', overflowY: 'auto' }}
            />
            {inputValue.length > 0 && (
              <div className="absolute bottom-1 right-2 text-xs text-blue-300">
                {inputValue.length}/2000
              </div>
            )}
          </div>
          {/* Attachment Button */}
          <button
            className="p-3 rounded-lg hover:bg-blue-900 transition-neon shrink-0"
            disabled={disabled || isTyping}
          >
            <Icon name="Paperclip" size={22} className="text-blue-300 hover:text-white" />
          </button>
          {/* Voice Input Button */}
          <button
            className="p-3 rounded-lg hover:bg-blue-900 transition-neon shrink-0 md:hidden"
            disabled={disabled || isTyping}
          >
            <Icon name="Mic" size={22} className="text-blue-300 hover:text-white" />
          </button>
          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || disabled}
            size="icon"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-3"
          >
            {isTyping ? (
              <Icon name="Loader2" size={22} className="animate-spin text-blue-300" />
            ) : (
              <Icon name="Send" size={22} />
            )}
          </Button>
        </div>
        <div className="hidden md:flex items-center justify-between mt-2 text-xs text-blue-300">
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