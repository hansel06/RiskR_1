import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const ChatIntegrationPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI research assistant. I can help you analyze blockchain data, market trends, and provide insights on Web3 protocols. What would you like to explore?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query) => {
    const responses = [
      "Based on current blockchain analytics, I can see some interesting patterns in the data. Let me break down the key metrics for you...",
      "The market indicators suggest a bullish trend in DeFi protocols. Here\'s what the data shows...",
      "I\'ve analyzed the on-chain metrics and found several risk factors worth considering...",
      "The liquidity patterns indicate potential opportunities in these sectors...",
      "Cross-referencing multiple data sources, I recommend focusing on these key areas..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Market Analysis', icon: 'TrendingUp' },
    { label: 'Risk Assessment', icon: 'Shield' },
    { label: 'Protocol Research', icon: 'Search' },
    { label: 'Portfolio Review', icon: 'PieChart' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Panel - Increased width and improved visibility */}
      <div className="fixed right-0 top-0 h-full w-[28rem] bg-surface border-l border-border z-[190] hidden lg:flex flex-col transition-layout shadow-2xl">
        {/* Header - Enhanced visibility */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center glow-purple">
              <Icon name="Bot" size={18} className="text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Research Assistant</h3>
              <p className="text-xs text-muted-foreground">Blockchain Analytics Expert</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Quick Actions - Improved layout */}
        <div className="p-4 border-b border-border bg-surface/50">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-neon text-sm text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
              >
                <Icon name={action.icon} size={16} className="text-primary" />
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages - Enhanced readability */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-xl shadow-md ${
                  message.type === 'user' ?'bg-primary text-primary-foreground glow-cyan' :'bg-muted text-foreground border border-border'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-4 rounded-xl border border-border">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Improved styling */}
        <div className="p-4 border-t border-border bg-surface/95 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about blockchain data, trends, or protocols..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-input border-border focus:border-primary/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="shrink-0 glow-cyan"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Modal - Enhanced visibility */}
      <div className="fixed inset-0 bg-background z-[190] lg:hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center glow-purple">
              <Icon name="Bot" size={18} className="text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Research Assistant</h3>
              <p className="text-xs text-muted-foreground">Blockchain Analytics Expert</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-border bg-surface/50">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-neon text-sm text-muted-foreground hover:text-foreground border border-border/50"
              >
                <Icon name={action.icon} size={16} className="text-primary" />
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] p-4 rounded-xl shadow-md ${
                  message.type === 'user' ?'bg-primary text-primary-foreground glow-cyan' :'bg-muted text-foreground border border-border'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-4 rounded-xl border border-border">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about blockchain data..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-input border-border focus:border-primary/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="shrink-0 glow-cyan"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatIntegrationPanel;