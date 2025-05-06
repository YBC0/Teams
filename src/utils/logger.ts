import { APP_CONFIG } from '@/constants';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private static instance: Logger;
  private readonly isDevelopment: boolean;
  private readonly isProduction: boolean;
  private readonly logBuffer: LogEntry[];
  private readonly maxBufferSize: number;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isProduction = process.env.NODE_ENV === 'production';
    this.logBuffer = [];
    this.maxBufferSize = 100;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry = this.formatMessage(level, message, data);

    // Always log in development
    if (this.isDevelopment) {
      console[level](message, data || '');
    }

    // In production, only log errors and warnings
    if (this.isProduction && (level === 'error' || level === 'warn')) {
      console[level](message, data || '');
    }

    // Store in buffer
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }

    // In production, send to analytics if enabled
    if (this.isProduction && APP_CONFIG.analytics.enabled) {
      this.sendToAnalytics(entry);
    }
  }

  private sendToAnalytics(entry: LogEntry): void {
    // Implement analytics integration here
    // Example: Google Analytics, Sentry, etc.
    if (entry.level === 'error') {
      // Send error to error tracking service
      console.error('Error tracking:', entry);
    }
  }

  public debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  public info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  public warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  public error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  public getLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  public clearLogs(): void {
    this.logBuffer.length = 0;
  }
}

// Create a singleton instance
export const logger = Logger.getInstance();

// Helper function to log API errors
export function logApiError(error: unknown, context?: string): void {
  const message = context ? `API Error in ${context}` : 'API Error';
  if (error instanceof Error) {
    logger.error(message, {
      message: error.message,
      stack: error.stack,
    });
  } else {
    logger.error(message, error);
  }
}

// Helper function to log performance metrics
export function logPerformanceMetric(name: string, value: number): void {
  logger.info(`Performance Metric: ${name}`, { value });
}

// Helper function to log user actions
export function logUserAction(action: string, data?: unknown): void {
  logger.info(`User Action: ${action}`, data);
} 