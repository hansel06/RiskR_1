import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DisplayPreferences = ({ isExpanded, onToggle }) => {
  const [neonIntensity, setNeonIntensity] = useState('medium');
  const [animationLevel, setAnimationLevel] = useState('normal');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState('none');

  const intensityOptions = [
    { value: 'low', label: 'Low Intensity', description: 'Subtle glow effects' },
    { value: 'medium', label: 'Medium Intensity', description: 'Balanced neon effects' },
    { value: 'high', label: 'High Intensity', description: 'Vibrant glow effects' },
    { value: 'maximum', label: 'Maximum Intensity', description: 'Full cyberpunk aesthetic' }
  ];

  const animationOptions = [
    { value: 'none', label: 'No Animations', description: 'Static interface' },
    { value: 'reduced', label: 'Reduced Animations', description: 'Essential animations only' },
    { value: 'normal', label: 'Normal Animations', description: 'Standard transitions' },
    { value: 'enhanced', label: 'Enhanced Animations', description: 'Rich visual effects' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small (12px)', description: 'Compact text size' },
    { value: 'medium', label: 'Medium (14px)', description: 'Standard text size' },
    { value: 'large', label: 'Large (16px)', description: 'Comfortable reading' },
    { value: 'xlarge', label: 'Extra Large (18px)', description: 'Enhanced accessibility' }
  ];

  const colorBlindOptions = [
    { value: 'none', label: 'None', description: 'Standard colors' },
    { value: 'protanopia', label: 'Protanopia', description: 'Red-green colorblind support' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-red colorblind support' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-yellow colorblind support' }
  ];

  const getPreviewClasses = () => {
    let classes = 'p-4 bg-surface border border-border rounded-lg transition-all duration-300';
    
    if (neonIntensity === 'high' || neonIntensity === 'maximum') {
      classes += ' glow-cyan';
    }
    
    if (compactMode) {
      classes += ' p-2';
    }
    
    if (highContrast) {
      classes += ' border-primary';
    }
    
    return classes;
  };

  const handleResetDisplay = () => {
    setNeonIntensity('medium');
    setAnimationLevel('normal');
    setFontSize('medium');
    setCompactMode(false);
    setShowTooltips(true);
    setHighContrast(false);
    setReduceMotion(false);
    setColorBlindMode('none');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-neon"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center glow-green">
            <Icon name="Palette" size={18} className="text-accent-foreground" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Display Preferences</h3>
            <p className="text-sm text-muted-foreground">Visual theme, colors, and accessibility options</p>
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
          {/* Visual Effects */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              Visual Effects
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Neon Intensity"
                description="Adjust glow effects and neon colors"
                options={intensityOptions}
                value={neonIntensity}
                onChange={setNeonIntensity}
              />
              
              <Select
                label="Animation Level"
                description="Control interface animations and transitions"
                options={animationOptions}
                value={animationLevel}
                onChange={setAnimationLevel}
              />
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Type" size={16} className="text-secondary" />
              Typography
            </h4>
            
            <Select
              label="Font Size"
              description="Adjust text size for better readability"
              options={fontSizeOptions}
              value={fontSize}
              onChange={setFontSize}
            />
          </div>

          {/* Layout Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Layout" size={16} className="text-accent" />
              Layout Options
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Compact Mode"
                description="Reduce spacing and padding for more content"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
              />
              
              <Checkbox
                label="Show Tooltips"
                description="Display helpful tooltips on hover"
                checked={showTooltips}
                onChange={(e) => setShowTooltips(e.target.checked)}
              />
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Accessibility" size={16} className="text-warning" />
              Accessibility
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Checkbox
                  label="High Contrast Mode"
                  description="Increase contrast for better visibility"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                
                <Checkbox
                  label="Reduce Motion"
                  description="Minimize animations for motion sensitivity"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                />
              </div>
              
              <Select
                label="Color Blind Support"
                description="Adjust colors for color vision deficiency"
                options={colorBlindOptions}
                value={colorBlindMode}
                onChange={setColorBlindMode}
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-success" />
              Live Preview
            </h4>
            
            <div className={getPreviewClasses()}>
              <div className="flex items-center justify-between mb-3">
                <div className={`font-semibold ${
                  fontSize === 'small' ? 'text-sm' :
                  fontSize === 'large' ? 'text-lg' :
                  fontSize === 'xlarge' ? 'text-xl' : 'text-base'
                }`}>
                  Sample Dashboard Widget
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse-slow ${
                    neonIntensity === 'high' || neonIntensity === 'maximum' ? 'bg-primary glow-cyan' : 'bg-success'
                  }`}></div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-primary/10 border border-primary/20 rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">BTC</div>
                  <div className="font-mono text-primary">$45,230</div>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">ETH</div>
                  <div className="font-mono text-secondary">$2,890</div>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">SOL</div>
                  <div className="font-mono text-accent">$98.45</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleResetDisplay}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              Reset Display
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreferences;