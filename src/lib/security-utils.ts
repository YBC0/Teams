import { securityConfig } from './security-config';

export function generateCSPHeader(): string {
  const { directives } = securityConfig.csp;
  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

export function generateSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': generateCSPHeader(),
    ...securityConfig.headers,
  };
}

// XSS Protection Utilities
export function sanitizeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

// CSRF Protection
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
} 