import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TraditionalLoginCard = ({ onLogin, onSwitchToRegister, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    email: 'alex.chen@roborisk.io',
    password: 'Web3Analytics2025!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Check mock credentials
    if (formData.email !== mockCredentials.email || formData.password !== mockCredentials.password) {
      setErrors({
        general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password}`
      });
      return;
    }
    
    onLogin(formData);
  };

  const socialProviders = [
    { id: 'google', name: 'Google', icon: 'Chrome' },
    { id: 'github', name: 'GitHub', icon: 'Github' },
    { id: 'discord', name: 'Discord', icon: 'MessageCircle' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto glow-purple">
          <Icon name="User" size={32} className="text-secondary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your roboRisk account to continue
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">{errors.general}</span>
            </div>
          </div>
        )}

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-neon"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-neon"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            type="button"
            className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-neon group"
          >
            <Icon 
              name={provider.icon} 
              size={20} 
              className="text-muted-foreground group-hover:text-foreground mx-auto" 
            />
          </button>
        ))}
      </div>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium transition-neon"
          >
            Create account
          </button>
        </p>
      </div>

      {/* Mock Credentials Helper */}
      <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-xs text-accent">
            <strong>Demo Credentials:</strong><br />
            Email: {mockCredentials.email}<br />
            Password: {mockCredentials.password}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraditionalLoginCard;