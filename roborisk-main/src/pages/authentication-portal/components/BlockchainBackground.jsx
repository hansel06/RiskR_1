import React from 'react';

const BlockchainBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Hexagonal Patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <polygon 
            points="50,5 85,25 85,75 50,95 15,75 15,25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="animate-pulse-slow"
          />
          <polygon 
            points="50,15 75,30 75,70 50,85 25,70 25,30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="absolute bottom-32 right-16 w-24 h-24 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <polygon 
            points="50,5 85,25 85,75 50,95 15,75 15,25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="absolute top-1/2 left-20 w-16 h-16 opacity-25">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <polygon 
            points="50,5 85,25 85,75 50,95 15,75 15,25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      {/* Circuit Board Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse-slow glow-cyan"></div>
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-slow glow-purple" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-accent rounded-full animate-pulse-slow glow-green" style={{ animationDelay: '3s' }}></div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent"></div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default BlockchainBackground;