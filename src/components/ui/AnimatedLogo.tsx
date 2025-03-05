
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <div className="relative w-8 h-8 mr-2">
        {/* Neural network visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-primary/20 animate-pulse-slow"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-float"></div>
        </div>
        {/* Connection lines */}
        <svg className="absolute inset-0" viewBox="0 0 32 32">
          <line x1="16" y1="8" x2="8" y2="16" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="16" y1="8" x2="24" y2="16" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="8" y1="16" x2="16" y2="24" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="24" y1="16" x2="16" y2="24" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>
      <span className="font-bold text-xl tracking-tight">Quest<span className="text-primary">1</span></span>
    </div>
  );
};

export default AnimatedLogo;
