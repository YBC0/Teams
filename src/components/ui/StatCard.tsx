import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  number?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label, description, icon, className }) => (
  <motion.div
    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
    whileFocus={{ scale: 1.03, boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 shadow-md flex flex-col items-center text-center transition-all duration-200 ${className || ''}`}
    tabIndex={0}
  >
    {icon && <div className="text-4xl mb-2" aria-hidden="true">{icon}</div>}
    {number && <div className="text-2xl md:text-3xl font-bold text-primary mb-1" aria-hidden="true">{number}</div>}
    <div className="text-lg font-semibold mb-1">{label}</div>
    {description && <p className="text-gray-600 text-sm md:text-base">{description}</p>}
  </motion.div>
); 