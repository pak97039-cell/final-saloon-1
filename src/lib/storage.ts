/**
 * Resilient storage wrapper with try/catch and in-memory fallback
 * Guarantees zero crashing in private browsing, iframes, or restricted storage environments.
 */

const memoryStorage = new Map<string, string>();

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Fallback to in-memory store
    }
    return memoryStorage.get(key) ?? null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch {
      // Fallback to in-memory store
    }
    memoryStorage.set(key, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Fallback to in-memory store
    }
    memoryStorage.delete(key);
  },
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // Fallback to in-memory store
    }
    return memoryStorage.get(`session:${key}`) ?? null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch {
      // Fallback to in-memory store
    }
    memoryStorage.set(`session:${key}`, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // Fallback to in-memory store
    }
    memoryStorage.delete(`session:${key}`);
  },
};

/**
 * Type-safe JSON retrieval with validation and seed fallback
 */
export function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const raw = safeLocalStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || parsed === undefined) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * Type-safe JSON persistence
 */
export function setStoredItem<T>(key: string, value: T): void {
  try {
    safeLocalStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Graceful error silence
  }
}

export const STORAGE_KEYS = {
  STUDIO: 'luxeora:v1:studio',
  SERVICES: 'luxeora:v1:services',
  ARTISTS: 'luxeora:v1:artists',
  APPOINTMENTS: 'luxeora:v1:appointments',
} as const;
