import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import LoadingAnimation from './components/LoadingAnimation';
import BrandIntro from './components/BrandIntro';
import BlockchainBackground from './components/BlockchainBackground';

const AppStartupPreloader = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('initializing');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showBrandIntro, setShowBrandIntro] = useState(false);

  // Loading phases: initializing -> syncing -> authenticating -> ready
  const phases = {
    initializing: { label: 'Initializing roboRisk', duration: 2000 },
    syncing: { label: 'Synchronizing Data', duration: 1500 },
    authenticating: { label: 'Preparing Authentication', duration: 1000 },
    ready: { label: 'System Ready', duration: 800 }
  };

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Initialize
      await simulatePhase('initializing');
      
      // Phase 2: Show brand intro
      setShowBrandIntro(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 3: Data sync
      setCurrentPhase('syncing');
      await simulatePhase('syncing');
      
      // Phase 4: Authentication prep
      setCurrentPhase('authenticating');
      await simulatePhase('authenticating');
      
      // Phase 5: Ready
      setCurrentPhase('ready');
      await simulatePhase('ready');
      
      // Navigate to authentication portal
      setTimeout(() => {
        navigate('/authentication-portal');
      }, 500);
    };

    sequence();
  }, [navigate]);

  const simulatePhase = (phase) => {
    return new Promise((resolve) => {
      const duration = phases[phase].duration;
      const interval = 50;
      const steps = duration / interval;
      let step = 0;

      const progressInterval = setInterval(() => {
        step++;
        const progress = Math.min((step / steps) * 100, 100);
        setLoadingProgress(progress);

        if (step >= steps) {
          clearInterval(progressInterval);
          resolve();
        }
      }, interval);
    });
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated Background */}
      <BlockchainBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
        
        {/* Logo Section */}
        <motion.div
          className="mb-8"
          variants={logoVariants}
          initial="initial"
          animate={currentPhase === 'ready' ? 'pulse' : 'animate'}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
            
            {/* Main logo container */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center glow-cyan shadow-2xl">
              <Icon name="Zap" size={40} className="text-primary-foreground" />
              
              {/* Electric effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Brand Title */}
        <motion.div
          className="mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold font-mono text-foreground mb-1">
            robo<span className="text-primary">Risk</span>
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full glow-cyan"></div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-muted-foreground text-lg mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Web3 Analytics & AI Research
        </motion.p>

        {/* Brand Intro Animation */}
        <AnimatePresence>
          {showBrandIntro && (
            <BrandIntro />
          )}
        </AnimatePresence>

        {/* Loading Section */}
        <div className="w-full">
          <LoadingAnimation 
            currentPhase={currentPhase}
            progress={loadingProgress}
            phaseLabel={phases[currentPhase]?.label || ''}
          />
        </div>

        {/* Status Indicators */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
            <span className="font-mono">Blockchain Network</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
            <span className="font-mono">AI Systems</span>
          </div>
        </motion.div>

        {/* Version Info */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground font-mono">
            v2.1.0 • {new Date().getFullYear()} Edition
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppStartupPreloader;