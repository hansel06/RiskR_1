import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationCard = ({ onRegister, onSwitchToLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    marketingEmails: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onRegister(formData);
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-destructive';
    if (strength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto glow-green">
          <Icon name="UserPlus" size={32} className="text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
        <p className="text-muted-foreground">
          Join roboRisk and start your Web3 analytics journey
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
        </div>

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
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-neon"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength(formData.password))}`}
                  style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                {getStrengthText(passwordStrength(formData.password))}
              </span>
            </div>
          </div>
        )}

        {/* Confirm Password Input */}
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-neon"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* Terms and Marketing */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mt-0.5 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <button type="button" className="text-primary hover:text-primary/80 transition-neon">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-primary hover:text-primary/80 transition-neon">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <Icon name="AlertCircle" size={14} />
              {errors.acceptTerms}
            </p>
          )}
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={formData.marketingEmails}
              onChange={handleInputChange}
              className="w-4 h-4 mt-0.5 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-muted-foreground">
              Send me product updates and Web3 market insights
            </span>
          </label>
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          Create Account
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-neon"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationCard;