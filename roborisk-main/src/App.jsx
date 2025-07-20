import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./components/AppIcon";
import Routes from "./Routes";
import { SidebarProvider } from "./components/ui/SidebarContext";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  // --- Add this block to force redirect to landing page on first load/reload ---
  const location = typeof window !== 'undefined' ? window.location : null;
  if (location && location.pathname !== "/") {
    window.location.replace("/");
  }
  // --- End block ---

  useEffect(() => {
    // Initial loading phase - 1.5 seconds
    const loadingTimer = setTimeout(() => {
      setShowTransition(true);
      
      // Transition animation phase - 0.5 seconds
      const transitionTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(transitionTimer);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Loading screen variants
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

  // Logo animation variants
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

  // Text animation variants
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

  // App container variants
  const appVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
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
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Icon name="Zap" size={40} className="text-primary-foreground" />
                  </motion.div>
                  
                  {/* Electric effect overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    animate={{
                      x: [-100, 100],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Title with staggered text animation */}
            <motion.div
              className="mb-2"
              variants={textVariants}
              initial="initial"
              animate={showTransition ? "exit" : "animate"}
              transition={{ delay: 0.3 }}
            >
              <motion.h1 className="text-4xl font-bold font-mono text-foreground mb-1">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  robo
                </motion.span>
                <motion.span 
                  className="text-primary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Risk
                </motion.span>
              </motion.h1>
              <motion.div 
                className="h-0.5 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full glow-cyan"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-muted-foreground text-lg mb-8"
              variants={textVariants}
              initial="initial"
              animate={showTransition ? "exit" : "animate"}
              transition={{ delay: 0.6 }}
            >
              Web3 Analytics & AI Research
            </motion.p>

            {/* Loading Progress Indicator */}
            <motion.div
              className="w-48 h-1 bg-muted rounded-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={showTransition ? { width: "100%" } : { width: "85%" }}
                transition={{ 
                  duration: showTransition ? 0.5 : 1.2, 
                  ease: "easeOut",
                  delay: showTransition ? 0 : 0.3
                }}
              />
            </motion.div>

            {/* Status Text */}
            <motion.div
              className="mt-6 text-sm text-muted-foreground font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {showTransition ? "Launching Application..." : "Initializing Systems..."}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <SidebarProvider>
      <motion.div
        variants={appVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-background"
      >
        <Routes />
      </motion.div>
    </SidebarProvider>
  );
}

export default App;