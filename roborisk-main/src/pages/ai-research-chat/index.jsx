import React, { useState, useRef, useEffect } from 'react';
import DashboardLayoutContainer from '../../components/ui/DashboardLayoutContainer';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import ConversationSidebar from './components/ConversationSidebar';
import WelcomeScreen from './components/WelcomeScreen';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DeepResearch from './components/DeepResearch';

const AIResearchChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // NEW: Real backend integration state variables
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [loading, setLoading] = useState(false);

  // NEW: Tab navigation state
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'deepresearch'

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "DeFi Yield Farming Analysis",
      preview: "Analyzing current yield farming opportunities across major protocols...",
      category: "analysis",
      messageCount: 12,
      updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
      isBookmarked: true
    },
    {
      id: 2,
      title: "Bitcoin Price Correlation Study",
      preview: "Examining Bitcoin\'s correlation with traditional financial markets...",
      category: "research",
      messageCount: 8,
      updatedAt: new Date(Date.now() - 86400000), // 1 day ago
      isBookmarked: false
    },
    {
      id: 3,
      title: "Layer 2 Solutions Comparison",
      preview: "Comparing performance metrics of Polygon, Arbitrum, and Optimism...",
      category: "analysis",
      messageCount: 15,
      updatedAt: new Date(Date.now() - 172800000), // 2 days ago
      isBookmarked: true
    },
    {
      id: 4,
      title: "NFT Market Trends Q3 2025",
      preview: "Deep dive into NFT market performance and emerging trends...",
      category: "research",
      messageCount: 6,
      updatedAt: new Date(Date.now() - 259200000), // 3 days ago
      isBookmarked: false
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NEW: Real backend integration for chat
  const handleSendMessage = async (content) => {
    // Only block if neither chat nor (coinName and coinSymbol) are filled
    if (!(content.trim() || (coinName.trim() && coinSymbol.trim()))) return;

    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setLoading(true);

    try {
      // Build the messages array for backend
      const backendMessages = [
        { role: "system", content: "You are a helpful assistant." },
        ...messages.filter(msg => !msg.isUser).map(msg => ({ role: "assistant", content: msg.content })),
        { role: "user", content }
      ];

      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: backendMessages.slice(1),
          coin_name: coinName,
          coin_symbol: coinSymbol
        })
      });

      const data = await res.json();
      
      const aiResponse = {
        id: Date.now() + 1,
        content: data.summary,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      const errorResponse = {
        id: Date.now() + 1,
        content: "Error: " + err.message,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
    
    setIsTyping(false);
    setLoading(false);
  };

  const generateAIResponse = (query) => {
    const responses = [
      `Based on current blockchain analytics, I can provide insights on ${query.toLowerCase()}. Let me analyze the latest data patterns and market indicators.\n\nKey findings:\n• Market volatility has increased by 15% over the past week\n• On-chain activity shows strong institutional interest\n• DeFi TVL has grown by 8.2% month-over-month\n\nWould you like me to dive deeper into any specific aspect?`,
      `Excellent question about ${query.toLowerCase()}. I've analyzed multiple data sources and cross-referenced with historical patterns.\n\nHere's what the data reveals:\n• Strong correlation with macro-economic factors\n• Technical indicators suggest potential breakout\n• Risk-adjusted returns favor long-term positioning\n\nI can provide more detailed analysis on specific protocols or timeframes if needed.`,
      `I've processed real-time blockchain data to address your query about ${query.toLowerCase()}.\n\nCurrent market analysis shows:\n• Increased whale activity in the past 48 hours\n• Smart money flows indicate accumulation phase\n• Network fundamentals remain strong\n\nShall I generate a comprehensive risk assessment report?`,
      `Great research topic! Let me break down the current landscape for ${query.toLowerCase()}.\n\nMarket Intelligence Summary:\n• Emerging trends show 23% growth in adoption\n• Regulatory clarity improving in key markets\n• Innovation pipeline looks promising for Q4 2025\n\nI can provide specific recommendations based on your risk tolerance and investment horizon.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateAttachment = () => {
    const attachmentTypes = [
      {
        type: 'chart',
        title: 'Price Analysis Chart',
        content: null
      },
      {
        type: 'code',
        content: `// Smart Contract Analysis\ncontract YieldFarm {\n    mapping(address => uint256) public stakes;\n    uint256 public totalRewards = 1000000 * 10**18;\n    \n    function calculateReward(address user) public view returns (uint256) {\n        return stakes[user] * rewardRate / 1e18;\n    }\n}`
      },
      {
        type: 'link',
        title: 'DeFiPulse Analytics Dashboard',
        url: 'https://defipulse.com'
      }
    ];
    return attachmentTypes[Math.floor(Math.random() * attachmentTypes.length)];
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversationId(null);
    setShowSidebar(false);
  };

  const handleStartChat = (initialMessage = null) => {
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
    // Focus the chat input
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    // In a real app, this would load the conversation messages
    const mockMessages = [
      {
        id: 1,
        content: "Hello! I\'d like to analyze DeFi yield farming opportunities.",
        isUser: true,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        content: "I'll help you analyze current yield farming opportunities across major DeFi protocols. Let me gather the latest data...\n\nTop Yield Farming Pools (as of July 2025):\n• Compound USDC: 8.2% APY\n• Aave ETH: 6.7% APY\n• Curve 3Pool: 12.4% APY\n• Uniswap V3 ETH/USDC: 15.8% APY\n\nWould you like me to analyze the risk factors for any specific pool?",
        isUser: false,
        timestamp: new Date(Date.now() - 3580000)
      }
    ];
    setMessages(mockMessages);
    setShowSidebar(false);
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (activeConversationId === conversationId) {
      setActiveConversationId(null);
      setMessages([]);
    }
  };

  const handleExportChat = () => {
    const chatData = {
      conversation: activeConversationId,
      messages: messages,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roborisk-chat-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isWelcomeScreen = messages.length === 0 && !activeConversationId;

  return (
    <DashboardLayoutContainer>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#111]">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 py-4 bg-[#181818] border-b border-border">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'bg-[#232b3b] text-blue-200 hover:bg-blue-800'}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'deepresearch' ? 'bg-blue-600 text-white' : 'bg-[#232b3b] text-blue-200 hover:bg-blue-800'}`}
            onClick={() => setActiveTab('deepresearch')}
          >
            🔍 Deep Research
          </button>
        </div>
        {/* Content Area */}
        {activeTab === 'chat' ? (
          <>
            {/* Main Chat Area (no header) */}
            <div className="flex-1 flex">
              {/* Conversation Sidebar */}
              <ConversationSidebar
                isOpen={showSidebar}
                onClose={() => setShowSidebar(false)}
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelectConversation}
                onDeleteConversation={handleDeleteConversation}
              />
              {/* Chat Content */}
              <div className="flex-1 flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto">
                  {isWelcomeScreen ? (
                    <WelcomeScreen onStartChat={handleStartChat} />
                  ) : (
                    <div className="p-4 space-y-4">
                      {messages.map((message) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          isUser={message.isUser}
                          timestamp={message.timestamp}
                        />
                      ))}
                      {isTyping && (
                        <ChatMessage isTyping={true} />
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
                {/* Chat Input */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                  onRef={(ref) => chatInputRef.current = ref}
                  coinName={coinName}
                  setCoinName={setCoinName}
                  coinSymbol={coinSymbol}
                  setCoinSymbol={setCoinSymbol}
                />
              </div>
            </div>
            {/* Floating New Chat Button (bottom right) */}
            <div className="fixed bottom-8 right-8 z-50">
              <Button
                onClick={handleNewChat}
                size="icon"
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
                aria-label="New Chat"
              >
                <Icon name="Plus" size={28} />
              </Button>
            </div>
            {/* Floating Sidebar Toggle (unchanged) */}
            <div className="fixed bottom-24 left-6 z-50 lg:hidden">
              <Button
                onClick={() => setShowSidebar(true)}
                size="icon"
                className="w-12 h-12 rounded-full glow-purple"
              >
                <Icon name="MessageSquare" size={20} />
              </Button>
            </div>
            <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
              <Button
                onClick={() => setShowSidebar(!showSidebar)}
                variant="outline"
                size="icon"
                className="glow-cyan"
              >
                <Icon name={showSidebar ? "ChevronLeft" : "MessageSquare"} size={20} />
              </Button>
            </div>
          </>
        ) : (
          <DeepResearch />
        )}
      </div>
    </DashboardLayoutContainer>
  );
};

export default AIResearchChat;