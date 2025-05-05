
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'glow' | 'hero';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  hidden?: boolean;
  linkWrapper?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  hidden = false,
  linkWrapper = true
}) => {
  if (hidden) {
    return null;
  }

  // Size classes
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-14'
  };

  // Variant classes
  const variantClasses = {
    default: 'transition-all duration-300',
    glow: 'transition-all duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    hero: 'transition-all duration-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]'
  };

  const logoImage = (
    <img 
      src="/lovable-uploads/682170c0-48b6-43fb-92dd-8a226b1a1a39.png"
      alt="Team SEA Logo" 
      className={cn(
        sizeClasses[size], 
        variantClasses[variant], 
        "hover:scale-105 transition-transform duration-300",
        className
      )}
    />
  );

  const wrapperClass = "flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md";

  return linkWrapper ? (
    <Link to="/" className={wrapperClass}>
      {logoImage}
    </Link>
  ) : (
    <div className={wrapperClass}>
      {logoImage}
    </div>
  );
};

export default Logo;
