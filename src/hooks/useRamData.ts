import { useCallback, useEffect, useMemo, useState } from 'react';
import { seedProducts } from '../data/ram-products';
import type { Product, VendorId } from '../types/ram';
import {
  getRateLimitStatus,
  markRateLimitRequest,
  rateLimitConfig,
  readCache,
  writeCache,
} from '../utils/rateLimiter';
import { vendorSequence } from '../utils/vendors';

interface UseRamDataState {
  products: Product[];
  loading: boolean;
  rateLimited: boolean;
  remainingMs: number;
  lastUpdated: number;
  scanningVendor: VendorId | null;
  refresh: () => void;
}

const jitterPrice = (base: number): number => {
  const delta = Math.round(base * (Math.random() * 0.04 - 0.02));
  return Math.max(500, base + delta);
};

const refreshProducts = (items: Product[]): Product[] => {
  const now = Date.now();

  return items.map((item) => {
    const nextPrice = jitterPrice(item.priceINR);
    const priorHistory = item.priceHistory ?? [item.priceINR];
    const nextHistory = [...priorHistory.slice(-4), nextPrice];

    // Force sync imageUrl from seedProducts to ensure broken cache links are fixed
    const freshSeed = seedProducts.find(s => s.id.split('-').slice(0, -1).join('-') === item.id.split('-').slice(0, -1).join('-'));
    
    return {
      ...item,
      priceINR: nextPrice,
      inStock: Math.random() > 0.1,
      lastUpdated: now,
      priceHistory: nextHistory,
      imageUrl: freshSeed?.imageUrl || item.imageUrl
    };
  });
};

const wait = (durationMs: number) => new Promise((resolve) => window.setTimeout(resolve, durationMs));

export const useRamData = (): UseRamDataState => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [remainingMs, setRemainingMs] = useState(0);
  const [scanningVendor, setScanningVendor] = useState<VendorId | null>(null);

  useEffect(() => {
    const cached = readCache<Product[]>();

    if (cached) {
      setProducts(cached.payload);
      setLoading(false);
      return;
    }

    const seeded = refreshProducts(seedProducts);
    writeCache(seeded);
    setProducts(seeded);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const status = getRateLimitStatus();
      setRemainingMs(status.remainingMs);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const refresh = useCallback(() => {
    const status = getRateLimitStatus();
    setRemainingMs(status.remainingMs);

    if (!status.canRequest || loading) {
      return;
    }

    setLoading(true);

    void (async () => {
      for (const vendor of vendorSequence) {
        setScanningVendor(vendor);
        await wait(140);
      }

      await wait(120);
      markRateLimitRequest();
      const updated = refreshProducts(products.length ? products : seedProducts);
      writeCache(updated);
      setProducts(updated);
      setScanningVendor(null);
      setLoading(false);
    })();
  }, [products, loading]);

  const limitStatus = useMemo(() => getRateLimitStatus(), [products, remainingMs]);
  const lastUpdated = useMemo(() => {
    if (!products.length) {
      return Date.now();
    }

    return Math.max(...products.map((product) => product.lastUpdated));
  }, [products]);

  return {
    products,
    loading,
    rateLimited: !limitStatus.canRequest,
    remainingMs: remainingMs || limitStatus.remainingMs,
    lastUpdated,
    scanningVendor,
    refresh,
  };
};

export { rateLimitConfig };
