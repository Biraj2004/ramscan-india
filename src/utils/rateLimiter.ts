const RATE_LIMIT_CONFIG = {
  maxRequestsPerWindow: 3,
  windowMs: 15 * 60 * 1000,
  cacheExpiryMs: 10 * 60 * 1000,
  storageKey: 'ramscan_tracker_rl',
  cacheKey: 'ramscan_cache_v25',
};

interface RateLimitState {
  windowStart: number;
  requestCount: number;
}

interface CacheEnvelope<T> {
  updatedAt: number;
  payload: T;
}

const parseJSON = <T>(raw: string | null): T | null => {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const getRateState = (): RateLimitState => {
  const existing = parseJSON<RateLimitState>(localStorage.getItem(RATE_LIMIT_CONFIG.storageKey));
  const now = Date.now();

  if (!existing) {
    return { windowStart: now, requestCount: 0 };
  }

  if (now - existing.windowStart > RATE_LIMIT_CONFIG.windowMs) {
    return { windowStart: now, requestCount: 0 };
  }

  return existing;
};

export const getRateLimitStatus = () => {
  const state = getRateState();
  const now = Date.now();
  const elapsed = now - state.windowStart;
  const remainingMs = Math.max(0, RATE_LIMIT_CONFIG.windowMs - elapsed);

  return {
    canRequest: state.requestCount < RATE_LIMIT_CONFIG.maxRequestsPerWindow,
    requestCount: state.requestCount,
    maxRequests: RATE_LIMIT_CONFIG.maxRequestsPerWindow,
    remainingMs,
  };
};

export const markRateLimitRequest = (): void => {
  const state = getRateState();
  const next = {
    ...state,
    requestCount: state.requestCount + 1,
  };

  localStorage.setItem(RATE_LIMIT_CONFIG.storageKey, JSON.stringify(next));
};

export const writeCache = <T>(payload: T): void => {
  const envelope: CacheEnvelope<T> = {
    updatedAt: Date.now(),
    payload,
  };

  localStorage.setItem(RATE_LIMIT_CONFIG.cacheKey, JSON.stringify(envelope));
};

export const readCache = <T>() => {
  const envelope = parseJSON<CacheEnvelope<T>>(localStorage.getItem(RATE_LIMIT_CONFIG.cacheKey));

  if (!envelope) {
    return null;
  }

  const age = Date.now() - envelope.updatedAt;

  if (age > RATE_LIMIT_CONFIG.cacheExpiryMs) {
    return null;
  }

  return envelope;
};

export const rateLimitConfig = RATE_LIMIT_CONFIG;
