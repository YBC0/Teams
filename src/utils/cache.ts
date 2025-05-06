import { APP_CONFIG } from '@/constants';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheItem<unknown>>;
  private readonly defaultTTL: number;

  private constructor() {
    this.cache = new Map();
    this.defaultTTL = APP_CONFIG.cache.defaultTTL;
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key) as CacheItem<T> | undefined;

    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public getSize(): number {
    return this.cache.size;
  }

  public getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a singleton instance
export const cache = Cache.getInstance();

// Helper function to generate cache keys
export function generateCacheKey(prefix: string, params: Record<string, unknown>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {} as Record<string, unknown>);

  return `${prefix}:${JSON.stringify(sortedParams)}`;
}

// Helper function to cache API responses
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = APP_CONFIG.cache.defaultTTL
): Promise<T> {
  const cachedData = cache.get<T>(key);
  if (cachedData !== null) {
    return cachedData;
  }

  const data = await fetchFn();
  cache.set(key, data, ttl);
  return data;
}

// Initialize cache cleanup interval
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 60000); // Clean up every minute
} 