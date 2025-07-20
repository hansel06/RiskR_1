import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DashboardCustomization = ({ isExpanded, onToggle }) => {
  const [widgetLayout, setWidgetLayout] = useState('grid');
  const [defaultTimeRange, setDefaultTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);

  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const layoutOptions = [
    { value: 'grid', label: 'Grid Layout' },
    { value: 'list', label: 'List Layout' },
    { value: 'compact', label: 'Compact View' }
  ];

  const chartTypeOptions = [
    { value: 'candlestick', label: 'Candlestick' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'bar', label: 'Bar Chart' }
  ];

  const refreshIntervalOptions = [
    { value: '10', label: '10 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '300', label: '5 minutes' },
    { value: '900', label: '15 minutes' }
  ];

  const handleResetDefaults = () => {
    setWidgetLayout('grid');
    setDefaultTimeRange('24h');
    setAutoRefresh(true);
    setRefreshInterval('30');
    setChartType('candlestick');
    setShowVolume(true);
    setEnableAnimations(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-neon"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-cyan">
            <Icon name="Layout" size={18} className="text-primary-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Dashboard Customization</h3>
            <p className="text-sm text-muted-foreground">Widget layout, charts, and display preferences</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground transition-transform duration-200" 
        />
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-border space-y-6">
          {/* Layout Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Grid3X3" size={16} className="text-primary" />
              Layout & Display
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Widget Layout"
                description="Choose how dashboard widgets are arranged"
                options={layoutOptions}
                value={widgetLayout}
                onChange={setWidgetLayout}
              />
              
              <Select
                label="Default Time Range"
                description="Default time period for charts and data"
                options={timeRangeOptions}
                value={defaultTimeRange}
                onChange={setDefaultTimeRange}
              />
            </div>
          </div>

          {/* Chart Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="BarChart3" size={16} className="text-secondary" />
              Chart Preferences
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Default Chart Type"
                description="Primary chart style for price data"
                options={chartTypeOptions}
                value={chartType}
                onChange={setChartType}
              />
              
              <div className="space-y-3">
                <Checkbox
                  label="Show Volume Bars"
                  description="Display trading volume below price charts"
                  checked={showVolume}
                  onChange={(e) => setShowVolume(e.target.checked)}
                />
                
                <Checkbox
                  label="Enable Chart Animations"
                  description="Smooth transitions and loading animations"
                  checked={enableAnimations}
                  onChange={(e) => setEnableAnimations(e.target.checked)}
                />
              </div>
            </div>
          </div>

          {/* Auto-Refresh Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="RefreshCw" size={16} className="text-accent" />
              Data Refresh
            </h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Auto-refresh Data"
                description="Automatically update dashboard data at regular intervals"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              
              {autoRefresh && (
                <Select
                  label="Refresh Interval"
                  description="How often to update data automatically"
                  options={refreshIntervalOptions}
                  value={refreshInterval}
                  onChange={setRefreshInterval}
                  className="ml-6"
                />
              )}
            </div>
          </div>

          {/* Widget Preview */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-warning" />
              Preview
            </h4>
            
            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-3">Dashboard Preview</div>
              <div className={`grid gap-2 ${
                widgetLayout === 'grid' ? 'grid-cols-3' : 
                widgetLayout === 'list' ? 'grid-cols-1' : 'grid-cols-4'
              }`}>
                {[1, 2, 3, 4, 5, 6].slice(0, widgetLayout === 'list' ? 3 : 6).map((i) => (
                  <div 
                    key={i} 
                    className={`bg-surface border border-border rounded p-2 ${
                      widgetLayout === 'compact' ? 'h-8' : 'h-12'
                    }`}
                  >
                    <div className="w-full h-2 bg-primary/20 rounded animate-pulse-slow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleResetDefaults}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              Reset to Defaults
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCustomization;