import React, { ReactNode } from 'react';
import { handleKeyPress } from '@/lib/accessibility-utils';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AccessibleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  ariaLabel?: string;
  description?: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
  children: ReactNode;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      children,
      className,
      ariaLabel,
      description,
      icon,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      onClick,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading && onClick) {
        onClick(event);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      handleKeyPress(event, () => handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>));
    };

    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg',
    };

    const buttonContent = (
      <>
        {isLoading && (
          <span className="mr-2" aria-hidden="true">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {description && (
          <span id={`${props.id}-description`} className="sr-only">
            {description}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <Link to={href} tabIndex={0}>
          <motion.div
            whileHover={!disabled && !isLoading ? { scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' } : {}}
            whileFocus={!disabled && !isLoading ? { scale: 1.03, boxShadow: '0 4px 16px rgba(0,0,0,0.10)' } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              fullWidth && 'w-full',
              className
            )}
            aria-label={ariaLabel}
            aria-describedby={description ? `${props.id}-description` : undefined}
            tabIndex={-1}
          >
            {buttonContent}
          </motion.div>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !isLoading ? { scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' } : {}}
        whileFocus={!disabled && !isLoading ? { scale: 1.03, boxShadow: '0 4px 16px rgba(0,0,0,0.10)' } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={description ? `${props.id}-description` : undefined}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton'; 