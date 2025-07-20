import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataPrivacy = ({ isExpanded, onToggle }) => {
  const [dataRetention, setDataRetention] = useState('1year');
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [allowCookies, setAllowCookies] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [dataExportFormat, setDataExportFormat] = useState('json');
  const [autoDelete, setAutoDelete] = useState(false);
  const [encryptData, setEncryptData] = useState(true);

  const retentionOptions = [
    { value: '3months', label: '3 Months', description: 'Minimal data retention' },
    { value: '6months', label: '6 Months', description: 'Short-term storage' },
    { value: '1year', label: '1 Year', description: 'Standard retention period' },
    { value: '2years', label: '2 Years', description: 'Extended retention' },
    { value: 'indefinite', label: 'Indefinite', description: 'Keep data until manually deleted' }
  ];

  const exportFormatOptions = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable report' },
    { value: 'xml', label: 'XML', description: 'Structured data format' }
  ];

  const handleExportData = () => {
    // Mock data export functionality
    console.log(`Exporting data in ${dataExportFormat} format`);
  };

  const handleDeleteAllData = () => {
    // Mock data deletion functionality
    console.log('Initiating data deletion process');
  };

  const handleDownloadPrivacyReport = () => {
    // Mock privacy report download
    console.log('Downloading privacy report');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-neon"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-error to-destructive rounded-lg flex items-center justify-center glow-purple">
            <Icon name="Shield" size={18} className="text-error-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Data & Privacy</h3>
            <p className="text-sm text-muted-foreground">Control your data, privacy settings, and export options</p>
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
          {/* Data Retention */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Database" size={16} className="text-primary" />
              Data Retention
            </h4>
            
            <div className="space-y-4">
              <Select
                label="Data Retention Period"
                description="How long to keep your data and analytics"
                options={retentionOptions}
                value={dataRetention}
                onChange={setDataRetention}
              />
              
              <Checkbox
                label="Auto-delete Old Data"
                description="Automatically delete data older than retention period"
                checked={autoDelete}
                onChange={(e) => setAutoDelete(e.target.checked)}
              />
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-secondary" />
              Privacy Controls
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Share Anonymous Analytics"
                description="Help improve roboRisk by sharing anonymized usage data"
                checked={shareAnalytics}
                onChange={(e) => setShareAnalytics(e.target.checked)}
              />
              
              <Checkbox
                label="Allow Cookies"
                description="Enable cookies for better user experience"
                checked={allowCookies}
                onChange={(e) => setAllowCookies(e.target.checked)}
              />
              
              <Checkbox
                label="Marketing Communications"
                description="Receive product updates and promotional emails"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
              />
              
              <Checkbox
                label="Third-party Data Sharing"
                description="Allow sharing data with trusted analytics partners"
                checked={thirdPartySharing}
                onChange={(e) => setThirdPartySharing(e.target.checked)}
              />
            </div>
          </div>

          {/* Data Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Lock" size={16} className="text-accent" />
              Data Security
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Encrypt Stored Data"
                description="Use end-to-end encryption for all stored data"
                checked={encryptData}
                onChange={(e) => setEncryptData(e.target.checked)}
              />
            </div>
            
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <div className="text-sm">
                  <div className="text-foreground font-medium mb-1">Security Status</div>
                  <div className="text-muted-foreground">
                    Your data is protected with AES-256 encryption and stored in secure, compliant data centers. We never store wallet private keys or sensitive financial information.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Download" size={16} className="text-warning" />
              Data Export
            </h4>
            
            <div className="space-y-4">
              <Select
                label="Export Format"
                description="Choose format for data export"
                options={exportFormatOptions}
                value={dataExportFormat}
                onChange={setDataExportFormat}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export My Data
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleDownloadPrivacyReport}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Privacy Report
                </Button>
              </div>
            </div>
          </div>

          {/* Data Usage Statistics */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="BarChart3" size={16} className="text-success" />
              Data Usage
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">2.4 MB</div>
                <div className="text-sm text-muted-foreground">Data Stored</div>
              </div>
              
              <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">45</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
              
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent">156</div>
                <div className="text-sm text-muted-foreground">API Calls</div>
              </div>
            </div>
          </div>

          {/* GDPR Compliance */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Scale" size={16} className="text-error" />
              Your Rights
            </h4>
            
            <div className="p-4 bg-muted/10 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-foreground">Right to Access:</strong> Request a copy of your personal data</p>
                <p><strong className="text-foreground">Right to Rectification:</strong> Correct inaccurate personal data</p>
                <p><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data</p>
                <p><strong className="text-foreground">Right to Portability:</strong> Transfer your data to another service</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-destructive flex items-center gap-2">
              <Icon name="AlertTriangle" size={16} className="text-destructive" />
              Danger Zone
            </h4>
            
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Delete All Data</div>
                  <div className="text-sm text-muted-foreground">
                    Permanently delete all your data from roboRisk. This action cannot be undone.
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAllData}
                  iconName="Trash2"
                  iconPosition="left"
                  className="ml-4"
                >
                  Delete All
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              className="flex-1"
            >
              View Privacy Policy
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Privacy Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPrivacy;