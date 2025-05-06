import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { Badge } from '@/components/ui/badge';

interface DonationFormProps {
  onSubmit: (amount: number, frequency: 'one-time' | 'monthly') => Promise<void>;
  minAmount?: number;
  suggestedAmounts?: number[];
}

const IMPACT_METRICS = {
  water: {
    amount: 50, // liters per person per day
    unit: 'liters',
    description: 'of clean water per person per day',
  },
  people: {
    amount: 100, // people served per well
    unit: 'people',
    description: 'people served by one well',
  },
  lifespan: {
    amount: 20, // years
    unit: 'years',
    description: 'average lifespan of a well',
  },
};

export const DonationForm: React.FC<DonationFormProps> = ({
  onSubmit,
  minAmount = 10,
  suggestedAmounts = [25, 50, 100, 250],
}) => {
  const [amount, setAmount] = useState<number>(suggestedAmounts[0]);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');

  const calculateImpact = (donationAmount: number) => {
    const wells = Math.floor(donationAmount / 5000); // Assuming $5000 per well
    return {
      water: wells * IMPACT_METRICS.water.amount * IMPACT_METRICS.people.amount,
      people: wells * IMPACT_METRICS.people.amount,
      lifespan: wells * IMPACT_METRICS.lifespan.amount,
    };
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= minAmount) {
      setAmount(numericValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < minAmount) return;

    setIsSubmitting(true);
    try {
      await onSubmit(amount, frequency);
    } finally {
      setIsSubmitting(false);
    }
  };

  const impact = calculateImpact(amount);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="space-y-6">
        {/* Frequency Selection */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFrequency('one-time')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              frequency === 'one-time'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            One-time Donation
          </button>
          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              frequency === 'monthly'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            Monthly Donation
          </button>
        </div>

        {/* Amount Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Amount</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {suggestedAmounts.map((suggestedAmount) => (
              <button
                key={suggestedAmount}
                type="button"
                onClick={() => handleAmountSelect(suggestedAmount)}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  amount === suggestedAmount && !customAmount
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                ${suggestedAmount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Custom amount"
              min={minAmount}
              step="1"
              className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Impact Visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary/5 rounded-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">Your Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {impact.water.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{IMPACT_METRICS.water.description}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {impact.people.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{IMPACT_METRICS.people.description}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {impact.lifespan.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{IMPACT_METRICS.lifespan.description}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Submit Button */}
        <AccessibleButton
          type="submit"
          disabled={amount < minAmount || isSubmitting}
          isLoading={isSubmitting}
          fullWidth
          size="lg"
          className="bg-primary text-white hover:bg-primary/90"
        >
          {isSubmitting ? 'Processing...' : `Donate $${amount} ${frequency === 'monthly' ? 'per month' : 'now'}`}
        </AccessibleButton>

        {/* Security Note */}
        <p className="text-sm text-gray-500 text-center">
          Your donation is secure and encrypted. We use industry-standard security measures to protect your information.
        </p>

        {/* Trust & Security Badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-4" aria-label="Security and Trust Badges">
          <Badge variant="default" className="flex items-center gap-2 bg-green-100 text-green-800 border-green-200">
            <span aria-hidden="true">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4m-7 4v4m0 0h4m-4 0H8" /></svg>
            </span>
            SSL Encrypted
          </Badge>
          <Badge variant="default" className="flex items-center gap-2 bg-blue-100 text-blue-800 border-blue-200">
            <span aria-hidden="true">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V7a8 8 0 1 0-16 0v5c0 6 8 10 8 10z" /></svg>
            </span>
            Payment Security
          </Badge>
          <Badge variant="default" className="flex items-center gap-2 bg-yellow-100 text-yellow-800 border-yellow-200">
            <span aria-hidden="true">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            Verified Charity
          </Badge>
        </div>
      </div>
    </motion.form>
  );
}; 