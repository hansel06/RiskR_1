import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BrandIntro = () => {
  const features = [
    {
      icon: 'BarChart3',
      title: 'Real-time Analytics',
      description: 'Live blockchain data insights'
    },
    {
      icon: 'Shield',
      title: 'Risk Assessment',
      description: 'Advanced security analysis'
    },
    {
      icon: 'Bot',
      title: 'AI Research',
      description: 'Intelligent market research'
    }
  ];

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-center px-6 max-w-sm">
        {/* Welcome Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to the Future
          </h2>
          <p className="text-muted-foreground">
            Experience next-generation Web3 analytics with AI-powered insights
          </p>
        </motion.div>

        {/* Features List */}
        <motion.div className="space-y-4 mb-8" variants={itemVariants}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.3 + (index * 0.1) }
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">{feature.title}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 text-sm">
            <Icon name="Sparkles" size={14} />
            <span>Powered by Advanced AI</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BrandIntro;