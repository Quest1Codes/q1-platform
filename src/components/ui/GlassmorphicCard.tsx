
import React from 'react';
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'purple';
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  children, 
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'glass-effect',
    dark: 'glass-effect-dark',
    purple: 'glass-effect-purple'
  };

  return (
    <div className={cn(
      "rounded-lg p-4 transition-all duration-300 hover:shadow-md",
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
};

export default GlassmorphicCard;
