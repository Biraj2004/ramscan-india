import { useMemo, useState } from 'react';
import type { Product } from '../types/ram';

const MAX_COMPARE_ITEMS = 4;

export const useCompare = () => {
  const [items, setItems] = useState<Product[]>([]);

  const ids = useMemo(() => new Set(items.map((item) => item.id)), [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((entry) => entry.id === product.id)) {
        return prev;
      }

      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => setItems([]);

  return {
    items,
    ids,
    addItem,
    removeItem,
    clear,
    maxItems: MAX_COMPARE_ITEMS,
  };
};
