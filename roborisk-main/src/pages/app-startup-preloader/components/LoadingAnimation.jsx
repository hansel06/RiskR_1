import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = ({ currentPhase, progress, phaseLabel }) => {
  const progressBarVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: progress / 100 },
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full">
      {/* Phase Label */}
      <motion.div
        className="mb-4"
        key={phaseLabel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-muted-foreground font-mono">{phaseLabel}</p>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden mb-4">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"></div>
        
        {/* Progress bar */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full origin-left"
          variants={progressBarVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Moving glow effect */}
        <motion.div
          className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
          variants={glowVariants}
          animate="animate"
          style={{ left: `${Math.max(0, progress - 8)}%` }}
        />
      </div>

      {/* Circular Loading Indicators */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-primary/60 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-2xl font-mono font-bold text-foreground">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;