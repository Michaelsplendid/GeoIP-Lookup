import type { IpstackResponse } from "../types/ipstack";
import { getCache, setCache } from "../utils/cache";

const DEV_BASE = "https://api.ipstack.com";
const PUBLIC_KEY = import.meta.env.VITE_IPSTACK_KEY as string | undefined;

/* Caches in localStorage for persistence */
export async function lookupIPDirect(ip = ""): Promise<IpstackResponse> {
  const target = ip?.trim() ? ip.trim() : "check";
  const cacheKey = `direct:${target}`;

  // Check local cache
  const cached = getCache<IpstackResponse>(cacheKey);
  if (cached) return cached;

  // Check localStorage for persistence
  const saved = localStorage.getItem(cacheKey);
  if (saved) {
    try {
      const data = JSON.parse(saved) as IpstackResponse;
      setCache(cacheKey, data, 60); // refresh TTL
      return data;
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  if (!PUBLIC_KEY) throw new Error("VITE_IPSTACK_KEY not set for dev direct lookup");

  const url = `${DEV_BASE}/${encodeURIComponent(target)}?access_key=${encodeURIComponent(PUBLIC_KEY)}`;

  const resp = await fetch(url, { method: "GET" });
  if (!resp.ok) throw new Error(`IPstack dev lookup failed: ${resp.statusText}`);

  const data: IpstackResponse = await resp.json();

  // Save to cache and localStorage
  setCache(cacheKey, data, 60);
  localStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
}

/**
 * Production lookup via serverless proxy (/api/lookup)
 * Fallback to direct dev call if proxy unavailable
 * Caches in localStorage for persistence
 */
export async function lookupIP(ip = ""): Promise<IpstackResponse> {
  const target = ip?.trim() ? ip.trim() : "check";
  const cacheKey = `proxy:${target}`;

  // Check cache
  const cached = getCache<IpstackResponse>(cacheKey);
  if (cached) return cached;

  // Check localStorage
  const saved = localStorage.getItem(cacheKey);
  if (saved) {
    try {
      const data = JSON.parse(saved) as IpstackResponse;
      setCache(cacheKey, data, 60); // refresh TTL
      return data;
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  const proxyUrl = `/api/lookup?ip=${encodeURIComponent(target)}`;

  try {
    const resp = await fetch(proxyUrl, { method: "GET" });
    if (!resp.ok) throw new Error(`Proxy lookup failed: ${resp.statusText}`);
    const data: IpstackResponse = await resp.json();

    setCache(cacheKey, data, 60);
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err) {
    // fallback to direct dev lookup
    return lookupIPDirect(ip);
  }
}