import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, AlertTriangle, TrendingUp, Code, Database, Zap, Moon, Sun, Play, ExternalLink, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskRoboLanding = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants (copied from App.jsx)
  const loadingVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  const logoVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      rotateY: -90
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotateY: 90,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  const textVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // Handle Try Demo click
  const handleDemoClick = () => {
    setIsDemoLoading(true);
    setTimeout(() => {
      setShowTransition(true);
      setTimeout(() => {
        navigate('/ai-research-chat');
      }, 500);
    }, 1200); // 1.2s loading, then 0.5s transition
  };

  const SmartContractIllustration = () => (
    <div className="relative w-72 h-72 mx-auto">
      <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-950/30 to-blue-950/30' : 'bg-gradient-to-r from-purple-100 to-blue-100'} animate-pulse`}></div>
      <div className="absolute inset-4 border-2 border-dashed border-purple-600 rounded-full animate-spin-slow">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Code className="w-16 h-16 text-purple-500 animate-bounce" />
        </div>
        <div className="absolute top-4 right-8">
          <Shield className="w-8 h-8 text-green-500 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-8">
          <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
        </div>
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-ping opacity-75"></div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-75 delay-1000"></div>
    </div>
  );

  const DeFiAnalysisIllustration = () => (
    <div className="relative w-72 h-72 mx-auto">
      <div className={`absolute inset-0 rounded-lg ${darkMode ? 'bg-gradient-to-br from-blue-950/40 to-purple-950/40' : 'bg-gradient-to-br from-blue-100 to-purple-100'} backdrop-blur-sm`}></div>
      <div className="absolute inset-2 border border-blue-500/60 rounded-lg">
        <div className="flex flex-col items-center justify-center h-full space-y-5">
          <TrendingUp className="w-20 h-20 text-blue-500 animate-bounce" />
          <div className="flex space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-5 h-16 ${i === 2 ? 'bg-red-500' : 'bg-green-500'} rounded animate-pulse`}
                style={{ animationDelay: `${i * 200}ms`, height: `${25 + i * 10}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-spin opacity-20"></div>
    </div>
  );

  const MempoolIllustration = () => (
    <div className="relative w-72 h-72 mx-auto overflow-hidden">
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-green-950/30 to-teal-950/30' : 'bg-gradient-to-r from-green-100 to-teal-100'} rounded-full`}></div>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"
          style={{
            top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 90}px`,
            left: `${130 + Math.cos(i * 45 * Math.PI / 180) * 90}px`,
            animationDelay: `${i * 200}ms`
          }}
        ></div>
      ))}
      <div className="absolute inset-20 border-3 border-green-500 rounded-full animate-pulse">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Database className="w-10 h-10 text-green-500 animate-spin" />
        </div>
      </div>
    </div>
  );

  const LiquidityIllustration = () => (
    <div className="relative w-72 h-72 mx-auto">
      <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gradient-to-br from-cyan-950/40 to-blue-950/40' : 'bg-gradient-to-br from-cyan-100 to-blue-100'}`}></div>
      <div className="absolute inset-8 border-3 border-cyan-500/60 rounded-full animate-spin-slow">
        <div className="relative h-full w-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"
              style={{
                top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 300}ms`
              }}
            ></div>
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Zap className="w-10 h-10 text-yellow-500 animate-bounce mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityEcosystemIllustration = () => (
    <div className="relative w-72 h-72 mx-auto">
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-orange-950/30 to-red-950/30' : 'bg-gradient-to-r from-orange-100 to-red-100'} rounded-2xl transform rotate-45`}></div>
      <div className="absolute inset-4 border border-orange-500/60 rounded-2xl transform rotate-12 animate-pulse">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <Shield className="w-20 h-20 text-orange-500" />
        </div>
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping"
          style={{
            top: `${25 + (i % 2) * 50}%`,
            left: `${25 + Math.floor(i / 2) * 50}%`,
            animationDelay: `${i * 500}ms`
          }}
        ></div>
      ))}
    </div>
  );

  const steps = [
    {
      title: "AI-Powered Smart Contract Analysis",
      description: "Machine learning algorithms detect reentrancy, honeypots, and access control vulnerabilities",
      icon: <Code className="w-10 h-10" />,
      illustration: <SmartContractIllustration />
    },
    {
      title: "Real-Time Liquidity Pool Analytics",
      description: "AI-driven analysis of PancakeSwap pools with predictive risk modeling",
      icon: <TrendingUp className="w-10 h-10" />,
      illustration: <DeFiAnalysisIllustration />
    },
    {
      title: "Intelligent Token Distribution Analysis",
      description: "AI examines holder patterns and concentration risks with behavioral analysis",
      icon: <Database className="w-10 h-10" />,
      illustration: <LiquidityIllustration />
    },
    {
      title: "AI-Enhanced Mempool Monitoring",
      description: "Machine learning tracks pending transactions for predictive risk detection",
      icon: <Search className="w-10 h-10" />,
      illustration: <MempoolIllustration />
    },
    {
      title: "Smart Risk Scoring Algorithm",
      description: "AI-powered 0-100 risk index with multi-dimensional analysis and predictions",
      icon: <Shield className="w-10 h-10" />,
      illustration: <SecurityEcosystemIllustration />
    }
  ];

  const technologies = [
    "FastAPI", "Python", "Solidity", "Web3.py", "Hardhat",
    "BscScan API", "PancakeSwap SDK", "WebSocket Monitoring"
  ];

  return (
    <>
      <AnimatePresence>
        {isDemoLoading && (
          <motion.div
            key="demo-loading"
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center overflow-hidden"
            variants={loadingVariants}
            initial="initial"
            animate="initial"
            exit="exit"
          >
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-pulse"></div>
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
              {/* Logo Section with Staggered Animations */}
              <motion.div
                className="mb-8"
                variants={logoVariants}
                initial="initial"
                animate={showTransition ? "exit" : "animate"}
              >
                <div className="relative">
                  {/* Outer glow rings with staggered animation */}
                  <motion.div
                    className="absolute inset-0 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 w-24 h-24 bg-secondary/15 rounded-full blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  {/* Main logo container with rotation */}
                  <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center glow-cyan shadow-2xl"
                    animate={!showTransition ? "pulse" : undefined}
                    variants={logoVariants}
                  >
                    <Shield className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </motion.div>
              {/* Text Section */}
              <motion.div
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-2xl font-bold text-primary"
              >
                Launching AI Research Chat...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: isDemoLoading ? 'none' : undefined }}>
        <div className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white'
            : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
        }`}>

          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-100 h-100 bg-gradient-to-r from-purple-600/15 to-blue-600/15 rounded-full blur-3xl animate-float"
              style={{
                left: `${mousePosition.x * 0.1}px`,
                top: `${mousePosition.y * 0.1}px`,
              }}
            ></div>
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-green-600/15 to-teal-600/15 rounded-full blur-2xl animate-float-delayed"></div>
          </div>

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 p-4">
            <div className={`max-w-6xl mx-auto flex justify-between items-center p-4 rounded-2xl backdrop-blur-md ${
              darkMode ?
                'bg-white/10 border border-white/20' : 'bg-white/70 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  RiskRobo
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-lg transition-colors ${
                  darkMode ?
                    'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                {darkMode ?
                  <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-10">
                <SmartContractIllustration />
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent animate-fade-in">
                RiskRobo
              </h1>
              <p className="text-2xl md:text-3xl mb-10 text-gray-200 max-w-4xl mx-auto">
                AI-Powered Risk Scanner for DeFi & Web3 Security
              </p>
              <p className="text-xl mb-14 text-gray-300 max-w-3xl mx-auto">
                Advanced AI-driven Web3 analytics platform combining smart contract security,
                real-time market monitoring, and automated trading on BSC.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30"
                  onClick={handleDemoClick}
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-6 h-6" />
                    <span>Try Demo</span>
                  </div>
                </button>
                <button className={`px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'border-2 border-white/30 hover:bg-white/15'
                    : 'border-2 border-gray-300 hover:bg-gray-100'
                }`}>
                  Analyze Token Now
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className={`p-10 rounded-3xl backdrop-blur-md ${
                darkMode ?
                  'bg-white/5 border border-white/10' : 'bg-white/50 border border-gray-200'
              }`}>
                <h2 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  About RiskRobo
                </h2>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <DeFiAnalysisIllustration />
                  </div>
                  <div className="space-y-8">
                    <p className="text-xl leading-relaxed">
                      RiskRobo is an advanced Web3 analytics and smart contract security platform that revolutionizes
                      blockchain risk assessment through cutting-edge artificial intelligence and comprehensive data analysis.
                    </p>
                    <div className="space-y-5">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-3"></div>
                        <div>
                          <h4 className="font-bold text-xl text-purple-500">AI-Powered Research</h4>
                          <p className="text-base opacity-90">Multi-source blockchain data analysis with machine learning algorithms</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-3"></div>
                        <div>
                          <h4 className="font-bold text-xl text-blue-500">Smart Contract Security</h4>
                          <p className="text-base opacity-90">Automated vulnerability detection and intelligent risk scoring</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-3"></div>
                        <div>
                          <h4 className="font-bold text-xl text-green-500">Real-Time Analytics</h4>
                          <p className="text-base opacity-90">Live market monitoring and comprehensive DeFi analytics</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-3"></div>
                        <div>
                          <h4 className="font-bold text-xl text-yellow-500">Trading Automation</h4>
                          <p className="text-base opacity-90">Smart contract-based trading bot optimized for BSC</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-pink-500 rounded-full mt-3"></div>
                        <div>
                          <h4 className="font-bold text-xl text-pink-500">Comprehensive Dashboard</h4>
                          <p className="text-base opacity-90">Modern React-based interface for seamless user experience</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full text-base ${
                            darkMode
                              ? 'bg-gradient-to-r from-purple-600/25 to-blue-600/25 border border-purple-500/40'
                              : 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Analyzer Steps */}
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                AI-Powered Risk Analysis Pipeline
              </h2>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                        activeStep === index
                          ? (darkMode
                            ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/60 scale-105'
                            : 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 scale-105')
                          : (darkMode
                            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                            : 'bg-white/30 border border-gray-200 hover:bg-white/50')
                      }`}
                      onMouseEnter={() => setActiveStep(index)}
                    >
                      <div className="flex items-start space-x-5">
                        <div className={`p-4 rounded-xl ${
                          activeStep === index
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : (darkMode ? 'bg-white/10' : 'bg-gray-100')
                        }`}>
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className={darkMode ? 'text-gray-200 text-lg' : 'text-gray-600 text-lg'}>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  {steps[activeStep].illustration}
                </div>
              </div>
            </div>
          </section>

          {/* How It Helps */}
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                How RiskRobo Protects You
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  {
                    icon: <Shield className="w-14 h-14 text-green-500" />,
                    title: "Prevents Rug Pulls",
                    description: "Early detection of suspicious contract patterns"
                  },
                  {
                    icon: <Search className="w-14 h-14 text-blue-500" />,
                    title: "Scans New Tokens",
                    description: "Automated analysis of newly launched DeFi tokens"
                  },
                  {
                    icon: <TrendingUp className="w-14 h-14 text-purple-500" />,
                    title: "Real-Time Monitoring",
                    description: "Continuous risk assessment and alerts"
                  },
                  {
                    icon: <AlertTriangle className="w-14 h-14 text-red-500" />,
                    title: "Investor Protection",
                    description: "Safeguards crypto investments from common threats"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                        : 'bg-white/50 border border-gray-200 hover:bg-white/70'
                    }`}
                  >
                    <div className="mb-5">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className={darkMode ? 'text-gray-200 text-lg' : 'text-gray-600 text-lg'}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Growth Potential */}
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className={`p-10 rounded-3xl backdrop-blur-md ${
                darkMode ? 'bg-gradient-to-r from-green-950/25 to-teal-950/25 border border-green-500/30' : 'bg-gradient-to-r from-green-50 to-teal-50 border border-green-200'
              }`}>
                <div className="mb-10">
                  <MempoolIllustration />
                </div>
                <h2 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                  Massive Growth Potential
                </h2>
                <div className="grid md:grid-cols-3 gap-10 text-left">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-green-500">Integration Ready</h3>
                    <p className={darkMode ? 'text-gray-200 text-lg' : 'text-gray-600 text-lg'}>
                      Perfect for wallets, launchpads, and DEXes seeking to enhance user security
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-teal-500">Multi-Network</h3>
                    <p className={darkMode ? 'text-gray-200 text-lg' : 'text-gray-600 text-lg'}>
                      Supports both testnet and mainnet environments with seamless scaling
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-500">Real-Time Data</h3>
                    <p className={darkMode ? 'text-gray-200 text-lg' : 'text-gray-600 text-lg'}>
                      Live data streams and WebSocket monitoring for instant threat detection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className={`p-14 rounded-3xl backdrop-blur-md ${
                darkMode ? 'bg-gradient-to-r from-purple-950/35 to-blue-950/35 border border-purple-500/40' : 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300'
              }`}>
                <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Ready to Secure Your DeFi Investments?
                </h2>
                <p className="text-2xl mb-10 opacity-90">
                  Join the future of blockchain security analysis
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30"
                    onClick={handleDemoClick}
                  >
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-6 h-6" />
                      <span>Try Demo</span>
                    </div>
                  </button>
                  <button className={`px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3 ${
                    darkMode
                      ? 'border-2 border-white/30 hover:bg-white/15'
                      : 'border-2 border-gray-300 hover:bg-gray-100'
                  }`}>
                    <Mail className="w-6 h-6" />
                    <span>Contact Us</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`py-16 px-4 border-t ${darkMode ? 'border-white/15' : 'border-gray-200'}`}>
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-4 mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  RiskRobo
                </span>
              </div>
              <p className={darkMode ? 'text-gray-300 text-base' : 'text-gray-600 text-base'}>
                © 2025 RiskRobo. Securing the future of DeFi.
              </p>
            </div>
          </footer>

          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-25px); }
            }
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-float {
              animation: float 7s ease-in-out infinite;
            }
            .animate-float-delayed {
              animation: float-delayed 9s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spin-slow 12s linear infinite;
            }
            .animate-fade-in {
              animation: fade-in 1.2s ease-out;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default RiskRoboLanding; 