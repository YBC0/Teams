
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'glow';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'medium', className = '' }) => {
  const getLogoSrc = () => {
    if (variant === 'glow') {
      return "/lovable-uploads/3c492f95-63c3-4620-aca1-74abf11d315b.png";
    }
    return "/lovable-uploads/2d3efebc-e7af-49d3-bd40-507ea90a1926.png";
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'h-8';
      case 'large': return 'h-16';
      default: return 'h-10';
    }
  };
  
  return (
    <img 
      src={getLogoSrc()} 
      alt="Team SEA Logo" 
      className={`w-auto ${getSizeClass()} ${className}`}
      onError={(e) => {
        // Fallback in case image fails to load
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "/placeholder.svg";
        console.error("Failed to load Team SEA logo");
      }}
    />
  );
};

export default Logo;
