import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

import Button from '../../../components/ui/Button';

const PriceChart = ({ data, title, isLoading }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartType, setChartType] = useState('line');

  const timeRanges = [
    { label: '1H', value: '1h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '1Y', value: '1y' }
  ];

  const mockData = [
    { time: '00:00', price: 42500, volume: 1200000 },
    { time: '04:00', price: 43200, volume: 1350000 },
    { time: '08:00', price: 41800, volume: 980000 },
    { time: '12:00', price: 44100, volume: 1580000 },
    { time: '16:00', price: 43900, volume: 1420000 },
    { time: '20:00', price: 45200, volume: 1680000 },
    { time: '24:00', price: 44800, volume: 1520000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg glow-purple">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                {entry.name}: ${entry.value.toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="h-80 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-neon glow-cyan">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
              iconSize={14}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('area')}
              iconName="BarChart3"
              iconSize={14}
            >
              Area
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-neon ${
                timeRange === range.value
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data || mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00FFFF"
                strokeWidth={2}
                dot={{ fill: '#00FFFF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#00FFFF', strokeWidth: 2, fill: '#00FFFF' }}
                name="Price"
              />
            </LineChart>
          ) : (
            <AreaChart data={data || mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00FFFF"
                fill="url(#colorPrice)"
                strokeWidth={2}
                name="Price"
              />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>BTC/USD</span>
          </div>
          <div>Volume: $1.52B</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" iconName="Download" iconSize={14}>
            Export
          </Button>
          <Button variant="ghost" size="xs" iconName="Maximize2" iconSize={14}>
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;