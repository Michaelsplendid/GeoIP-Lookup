type CacheEntry<T> = { value: T; expiresAt: number }


const memCache = new Map<string, CacheEntry<any>>()


export function setCache<T>(key: string, value: T, ttlSeconds = 60) {
const entry: CacheEntry<T> = { value, expiresAt: Date.now() + ttlSeconds * 1000 }
memCache.set(key, entry)
}


export function getCache<T>(key: string): T | null {
const e = memCache.get(key)
if (!e) return null
if (Date.now() > e.expiresAt) { memCache.delete(key); return null }
return e.value as T
}