export const securityConfig = {
  // Content Security Policy
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://cdn.gpteng.co", // For the GPT Engineer script
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
      ],
      'font-src': [
        "'self'",
        "https://fonts.gstatic.com",
      ],
      'img-src': [
        "'self'",
        "data:",
        "https:",
      ],
      'connect-src': [
        "'self'",
        "https://api.sea.org", // Replace with your actual API domain
      ],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  },

  // Security Headers
  headers: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  },
}; 