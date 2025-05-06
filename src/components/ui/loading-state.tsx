import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoadingStateProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  fullScreen = false,
  message,
  size = 'md'
}) => {
  const { language } = useLanguage();

  const defaultMessage = {
    da: 'Indlæser...',
    en: 'Loading...'
  };

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center p-4';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClasses}
      role="status"
      aria-label={message || defaultMessage[language]}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`rounded-full border-2 border-primary border-t-transparent ${sizeClasses[size]}`}
        />
        {(message || defaultMessage[language]) && (
          <p className="text-gray-600 text-sm">
            {message || defaultMessage[language]}
          </p>
        )}
      </div>
    </motion.div>
  );
}; 