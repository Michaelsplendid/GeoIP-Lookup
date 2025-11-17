// Centralized cache + persistence logic

export type CachedData<T> = {
  value: T;
  timestamp: number;
};

// Cache TTL in seconds
const TTL = 60 * 60; // 1 hour

// Save to localStorage
export function setCache<T>(key: string, value: T, ttl = TTL) {
  const data: CachedData<T> = { value, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(data));
}

// Read from localStorage
export function getCache<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const data: CachedData<T> = JSON.parse(item);
    // Check if expired
    if ((Date.now() - data.timestamp) / 1000 > TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

// Optional: Cookie-based persistence
export function setCookie<T>(key: string, value: T, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
}

export function getCookie<T>(key: string): T | null {
  const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2]));
    } catch {
      return null;
    }
  }
  return null;
}
