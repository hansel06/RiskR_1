import React, { useState } from 'react';
import DashboardLayoutContainer from '../../components/ui/DashboardLayoutContainer';
import DashboardCustomization from './components/DashboardCustomization';
import NotificationSettings from './components/NotificationSettings';
import DisplayPreferences from './components/DisplayPreferences';
import ConnectedWallets from './components/ConnectedWallets';
import DataPrivacy from './components/DataPrivacy';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SettingsPreferences = () => {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    notifications: false,
    display: false,
    wallets: false,
    privacy: false
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = Object.values(expandedSections).every(Boolean);
    const newState = !allExpanded;
    setExpandedSections({
      dashboard: newState,
      notifications: newState,
      display: newState,
      wallets: newState,
      privacy: newState
    });
  };

  const handleSaveAll = () => {
    setHasUnsavedChanges(false);
    // Mock save functionality
    console.log('Saving all settings');
  };

  const handleResetAll = () => {
    setHasUnsavedChanges(false);
    // Mock reset functionality
    console.log('Resetting all settings to defaults');
  };

  const handleImportSettings = () => {
    // Mock import functionality
    console.log('Importing settings from file');
  };

  const handleExportSettings = () => {
    // Mock export functionality
    console.log('Exporting settings to file');
  };

  const settingsSections = [
    {
      id: 'dashboard',
      component: DashboardCustomization,
      keywords: 'dashboard layout widgets charts time range refresh animations'
    },
    {
      id: 'notifications',
      component: NotificationSettings,
      keywords: 'notifications alerts email push price portfolio research quiet hours'
    },
    {
      id: 'display',
      component: DisplayPreferences,
      keywords: 'display theme neon colors animations font size accessibility contrast'
    },
    {
      id: 'wallets',
      component: ConnectedWallets,
      keywords: 'wallets web3 metamask phantom coinbase sync balance security'
    },
    {
      id: 'privacy',
      component: DataPrivacy,
      keywords: 'privacy data retention export cookies analytics security encryption'
    }
  ];

  const filteredSections = settingsSections.filter(section =>
    searchQuery === '' || 
    section.keywords.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayoutContainer>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-cyan">
                <Icon name="Settings" size={24} className="text-primary-foreground" />
              </div>
              Settings & Preferences
            </h1>
            <p className="text-muted-foreground mt-2">
              Customize your roboRisk experience with personalized settings and preferences
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning text-sm rounded-full border border-warning/20">
                <Icon name="AlertCircle" size={14} />
                <span>Unsaved changes</span>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExpandAll}
              iconName={Object.values(expandedSections).every(Boolean) ? "Minimize2" : "Maximize2"}
              iconPosition="left"
            >
              {Object.values(expandedSections).every(Boolean) ? "Collapse All" : "Expand All"}
            </Button>
          </div>
        </div>

        {/* Search and Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportSettings}
              iconName="Upload"
              iconPosition="left"
            >
              Import
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSettings}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No settings found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all settings
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-4"
                iconName="X"
                iconPosition="left"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            filteredSections.map(({ id, component: Component }) => (
              <Component
                key={id}
                isExpanded={expandedSections[id]}
                onToggle={() => toggleSection(id)}
              />
            ))
          )}
        </div>

        {/* Global Actions */}
        <div className="sticky bottom-6 bg-surface/95 backdrop-blur-glass border border-border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleResetAll}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              Reset All to Defaults
            </Button>
            
            <Button
              variant="default"
              onClick={handleSaveAll}
              iconName="Save"
              iconPosition="left"
              className="flex-1"
              disabled={!hasUnsavedChanges}
            >
              Save All Changes
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center mt-3">
            Changes are automatically saved when you modify individual settings
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-muted/20 border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={20} className="text-accent" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're having trouble with any settings or need assistance configuring your preferences, 
                our support team is here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Contact Support
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  View Documentation
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Video"
                  iconPosition="left"
                >
                  Watch Tutorials
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutContainer>
  );
};

export default SettingsPreferences;