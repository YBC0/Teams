
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'glow' | 'hero';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'medium', className = '' }) => {
  const getLogoSrc = () => {
    switch (variant) {
      case 'glow':
        return "/lovable-uploads/77db161f-7cb0-4447-af59-6e19a378eaba.png";
      case 'hero':
        return "/lovable-uploads/f450b11f-3c8d-4822-a76a-7015ab617dde.png";
      default:
        return "/lovable-uploads/a9b001ac-9825-4fd7-a089-4c1a0350b31c.png";
    }
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
