import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ isExpanded, onToggle }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [portfolioUpdates, setPortfolioUpdates] = useState(true);
  const [researchNotifications, setResearchNotifications] = useState(false);
  const [marketNews, setMarketNews] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('5');
  const [notificationFrequency, setNotificationFrequency] = useState('immediate');
  const [quietHours, setQuietHours] = useState(false);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Report' }
  ];

  const thresholdOptions = [
    { value: '1', label: '1%' },
    { value: '2.5', label: '2.5%' },
    { value: '5', label: '5%' },
    { value: '10', label: '10%' },
    { value: '15', label: '15%' },
    { value: '20', label: '20%' }
  ];

  const handleTestNotification = () => {
    // Mock notification test
    console.log('Test notification sent');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-neon"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center glow-purple">
            <Icon name="Bell" size={18} className="text-secondary-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Notification Settings</h3>
            <p className="text-sm text-muted-foreground">Alerts, updates, and communication preferences</p>
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
          {/* Delivery Methods */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Send" size={16} className="text-primary" />
              Delivery Methods
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Email Notifications"
                description="Receive notifications via email"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              
              <Checkbox
                label="Push Notifications"
                description="Browser and mobile push notifications"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
            </div>
          </div>

          {/* Notification Types */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              Alert Types
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Price Alerts"
                description="Notifications when asset prices hit your targets"
                checked={priceAlerts}
                onChange={(e) => setPriceAlerts(e.target.checked)}
              />
              
              <Checkbox
                label="Portfolio Updates"
                description="Changes in your portfolio value and performance"
                checked={portfolioUpdates}
                onChange={(e) => setPortfolioUpdates(e.target.checked)}
              />
              
              <Checkbox
                label="Research Notifications"
                description="AI research insights and analysis updates"
                checked={researchNotifications}
                onChange={(e) => setResearchNotifications(e.target.checked)}
              />
              
              <Checkbox
                label="Market News"
                description="Important market events and breaking news"
                checked={marketNews}
                onChange={(e) => setMarketNews(e.target.checked)}
              />
            </div>
          </div>

          {/* Alert Configuration */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Settings" size={16} className="text-secondary" />
              Alert Configuration
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Price Change Threshold"
                description="Minimum price change to trigger alerts"
                options={thresholdOptions}
                value={alertThreshold}
                onChange={setAlertThreshold}
              />
              
              <Select
                label="Notification Frequency"
                description="How often to receive notifications"
                options={frequencyOptions}
                value={notificationFrequency}
                onChange={setNotificationFrequency}
              />
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Moon" size={16} className="text-accent" />
              Quiet Hours
            </h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Enable Quiet Hours"
                description="Pause non-critical notifications during specified hours"
                checked={quietHours}
                onChange={(e) => setQuietHours(e.target.checked)}
              />
              
              {quietHours && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <Input
                    label="Start Time"
                    type="time"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                  />
                  
                  <Input
                    label="End Time"
                    type="time"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Notification Preview */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-success" />
              Preview
            </h4>
            
            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Price Alert</div>
                  <div className="text-sm text-muted-foreground">BTC has increased by 5.2% in the last hour</div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleTestNotification}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Send Test Notification
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;