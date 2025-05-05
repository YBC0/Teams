
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'glow' | 'hero';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  hidden?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'medium',
  className = '',
  hidden = false
}) => {
  // Always return null to completely remove the logo
  return null;
};

export default Logo;
