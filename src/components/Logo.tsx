
import React from 'react';
import { Link } from 'react-router-dom';

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
    default: '',
    glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    hero: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]'
  };

  const logoImage = (
    <img 
      src="/lovable-uploads/682170c0-48b6-43fb-92dd-8a226b1a1a39.png"
      alt="Team SEA Logo" 
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    />
  );

  return linkWrapper ? (
    <Link to="/" className="flex items-center space-x-2">
      {logoImage}
    </Link>
  ) : (
    <div className="flex items-center space-x-2">
      {logoImage}
    </div>
  );
};

export default Logo;
