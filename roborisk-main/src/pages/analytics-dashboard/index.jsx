import React, { useState, useEffect } from "react";

import MetricCard from './components/MetricCard';
import TrendingTokens from './components/TrendingTokens';
import MarketAlerts from './components/MarketAlerts';
import QuickActions from './components/QuickActions';
import PriceChart from './components/PriceChart';
import VolumeChart from './components/VolumeChart';
import MainAppLayout from '../../components/ui/MainAppLayout';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Helmet } from "react-helmet";

const AnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data for charts
  const mockChartData = [
    { time: '00:00', price: 42500, volume: 1250000 },
    { time: '04:00', price: 43200, volume: 1850000 },
    { time: '08:00', price: 42800, volume: 2100000 },
    { time: '12:00', price: 44100, volume: 1900000 },
    { time: '16:00', price: 43700, volume: 1600000 },
    { time: '20:00', price: 44500, volume: 2300000 },
    { time: '24:00', price: 45200, volume: 1750000 }
  ];

  const mockVolumeData = [
    { time: '00:00', volume: 1250000 },
    { time: '04:00', volume: 1850000 },
    { time: '08:00', volume: 2100000 },
    { time: '12:00', volume: 1900000 },
    { time: '16:00', volume: 1600000 },
    { time: '20:00', volume: 2300000 },
    { time: '24:00', volume: 1750000 }
  ];

  const mockTrendingTokens = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$45,200',
      change: '+5.2%',
      changeType: 'positive',
      volume: '$1.2B'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$2,850',
      change: '+3.8%',
      changeType: 'positive',
      volume: '$890M'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: '$98.50',
      change: '-1.2%',
      changeType: 'negative',
      volume: '$450M'
    }
  ];

  const mockAlerts = [
    {
      type: 'price',
      title: 'BTC Price Alert',
      message: 'Bitcoin reached your target price of $45,000',
      time: '5 minutes ago',
      severity: 'high'
    },
    {
      type: 'volume',
      title: 'High Volume Alert',
      message: 'ETH trading volume increased by 150%',
      time: '12 minutes ago',
      severity: 'medium'
    }
  ];

  const dashboardMetrics = [
    {
      title: 'Portfolio Value',
      value: '$127,845.32',
      change: '+5.67%',
      changeType: 'positive',
      icon: 'Wallet',
      trend: '24h change'
    },
    {
      title: 'Total P&L',
      value: '$12,456.78',
      change: '+8.92%',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: 'All time'
    },
    {
      title: 'Active Positions',
      value: '14',
      change: '+2',
      changeType: 'positive',
      icon: 'Activity',
      trend: 'This week'
    },
    {
      title: 'Risk Score',
      value: '6.8/10',
      change: '-0.3',
      changeType: 'positive',
      icon: 'Shield',
      trend: 'Medium risk'
    }
  ];

  // Mock data for dashboard metrics
  const mockMetrics = [
    {
      title: "Total Market Cap",
      value: "$2.1T",
      change: "+5.2%",
      isPositive: true,
      icon: "TrendingUp"
    },
    {
      title: 'Portfolio Value',
      value: '$127,845.32',
      change: '+5.67%',
      changeType: 'positive',
      icon: 'Wallet',
      trend: '24h change'
    },
    {
      title: 'Total P&L',
      value: '$12,456.78',
      change: '+8.92%',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: 'All time'
    },
    {
      title: 'Active Positions',
      value: '14',
      change: '+2',
      changeType: 'positive',
      icon: 'Activity',
      trend: 'This week'
    },
    {
      title: 'Risk Score',
      value: '6.8/10',
      change: '-0.3',
      changeType: 'positive',
      icon: 'Shield',
      trend: 'Medium risk'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [refreshKey]);

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  const handleQuickAction = (actionType) => {
    console.log(`Quick action triggered: ${actionType}`);
    // Handle quick actions here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // Handle search functionality here
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
    // Handle data export
  };

  return (
    <MainAppLayout>
      <Helmet>
        <title>Analytics Dashboard - roboRisk</title>
        <meta name="description" content="Real-time blockchain analytics and market insights" />
      </Helmet>
      
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time blockchain insights and market analytics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search assets, protocols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </form>
            
            {/* Action Buttons */}
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleRefresh}
              iconName="RefreshCw"
              iconSize={16}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PriceChart data={mockChartData} />
          <VolumeChart data={mockVolumeData} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Trending Tokens */}
          <div className="xl:col-span-2">
            <TrendingTokens tokens={mockTrendingTokens} />
          </div>

          {/* Right Column - Market Alerts */}
          <div>
            <MarketAlerts alerts={mockAlerts} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {dashboardMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              trend={metric.trend}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Price Chart - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <PriceChart
              title="BTC/USD Price Analysis"
              isLoading={isLoading}
            />
          </div>
          
          {/* Volume Chart - Takes 1 column on xl screens */}
          <div className="xl:col-span-1">
            <VolumeChart
              title="Trading Volume"
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Market Alerts */}
          <div className="lg:col-span-1">
            <MarketAlerts isLoading={isLoading} />
          </div>
          
          {/* Trending Tokens */}
          <div className="lg:col-span-1">
            <TrendingTokens isLoading={isLoading} />
          </div>
          
          {/* Quick Actions */}
          <div className="lg:col-span-2 xl:col-span-1">
            <QuickActions onActionClick={handleQuickAction} />
          </div>
        </div>

        {/* Market Overview Section */}
        <div className="bg-card border border-border rounded-lg p-6 glow-cyan">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Market Overview</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
              <span>Live Data</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">$2.1T</div>
              <div className="text-sm text-muted-foreground">Total Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">$89.2B</div>
              <div className="text-sm text-muted-foreground">24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">48.2%</div>
              <div className="text-sm text-muted-foreground">BTC Dominance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">12,847</div>
              <div className="text-sm text-muted-foreground">Active Coins</div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <span>Data latency: &lt;100ms</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
              <span>All systems operational</span>
            </div>
            <Button variant="ghost" size="xs" iconName="HelpCircle" iconSize={14}>
              Help
            </Button>
          </div>
        </div>
      </div>
    </MainAppLayout>
  );
};

export default AnalyticsDashboard;