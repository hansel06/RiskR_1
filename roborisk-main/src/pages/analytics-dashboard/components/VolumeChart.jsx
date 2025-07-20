import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VolumeChart = ({ data, title, isLoading }) => {
  const [timeRange, setTimeRange] = useState('24h');

  const mockData = [
    { time: '00:00', volume: 1200000, trades: 2450 },
    { time: '04:00', volume: 1350000, trades: 2680 },
    { time: '08:00', volume: 980000, trades: 1920 },
    { time: '12:00', volume: 1580000, trades: 3120 },
    { time: '16:00', volume: 1420000, trades: 2890 },
    { time: '20:00', volume: 1680000, trades: 3350 },
    { time: '24:00', volume: 1520000, trades: 3020 }
  ];

  const timeRanges = [
    { label: '1H', value: '1h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg glow-purple">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">
              Volume: ${payload[0]?.value?.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-secondary">
              Trades: {payload[0]?.payload?.trades?.toLocaleString()}
            </p>
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="h-64 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-neon glow-cyan">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{title || 'Trading Volume'}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="BarChart3" size={16} />
            <span>24h Volume</span>
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

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data || mockData}>
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
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="volume"
              fill="url(#colorVolume)"
              radius={[2, 2, 0, 0]}
              name="Volume"
            />
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#39FF14" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#39FF14" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Volume</span>
          </div>
          <div>Avg: $1.42M</div>
          <div>Peak: $1.68M</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" iconName="Download" iconSize={14}>
            Export
          </Button>
          <Button variant="ghost" size="xs" iconName="TrendingUp" iconSize={14}>
            Analyze
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;