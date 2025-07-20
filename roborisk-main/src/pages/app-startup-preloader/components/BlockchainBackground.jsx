import React from 'react';
import { motion } from 'framer-motion';

const BlockchainBackground = () => {
  // Generate hexagonal grid pattern
  const hexagons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
  }));

  const floatingVariants = {
    animate: (custom) => ({
      x: [custom.initialX, custom.initialX + 100, custom.initialX - 50, custom.initialX],
      y: [custom.initialY, custom.initialY - 80, custom.initialY + 60, custom.initialY],
      rotate: [0, 180, 360],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const gridLineVariants = {
    animate: {
      opacity: [0.05, 0.15, 0.05],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexGrid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M30 10 L50 25 L50 45 L30 60 L10 45 L10 25 Z"
                fill="none"
                stroke="rgba(0, 255, 255, 0.1)"
                strokeWidth="0.5"
                variants={gridLineVariants}
                animate="animate"
              />
            </pattern>
            
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 255, 255, 0.1)" />
              <stop offset="50%" stopColor="rgba(138, 43, 226, 0.1)" />
              <stop offset="100%" stopColor="rgba(57, 255, 20, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      </div>

      {/* Floating Hexagonal Elements */}
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute pointer-events-none"
          custom={hex}
          variants={floatingVariants}
          animate="animate"
          style={{
            width: hex.size,
            height: hex.size,
          }}
        >
          <div 
            className="w-full h-full border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/80"></div>
      
      {/* Animated Lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner Accents */}
      <motion.div
        className="absolute top-8 right-8 w-16 h-16"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border border-accent/30 rounded-lg" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 85%)' }} />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 w-12 h-12"
        animate={{
          rotate: [360, 270, 180, 90, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border border-success/30 rounded-lg" 
             style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 0 100%)' }} />
      </motion.div>
    </div>
  );
};

export default BlockchainBackground;