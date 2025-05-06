import { useState, useEffect } from 'react';
import { generateCSRFToken } from '@/lib/security-utils';

export function useCSRF() {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Generate a new CSRF token when the component mounts
    const token = generateCSRFToken();
    setCsrfToken(token);
    
    // Store the token in sessionStorage
    sessionStorage.setItem('csrfToken', token);
  }, []);

  const getCSRFHeader = () => ({
    'X-CSRF-Token': csrfToken,
  });

  return {
    csrfToken,
    getCSRFHeader,
  };
} 