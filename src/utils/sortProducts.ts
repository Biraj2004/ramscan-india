import type { Product, SortKey } from '../types/ram';

export const sortProducts = (products: Product[], sortKey: SortKey): Product[] => {
  const clone = [...products];

  switch (sortKey) {
    case 'price-asc':
      return clone.sort((a, b) => a.priceINR - b.priceINR);
    case 'price-desc':
      return clone.sort((a, b) => b.priceINR - a.priceINR);
    case 'brand':
      return clone.sort((a, b) => a.brand.localeCompare(b.brand));
    case 'category':
      return clone.sort((a, b) => a.category.localeCompare(b.category));
    case 'speed':
      return clone.sort((a, b) => (b.speedMHz ?? b.readMBs ?? 0) - (a.speedMHz ?? a.readMBs ?? 0));
    case 'capacity':
      return clone.sort((a, b) => b.capacityGB - a.capacityGB);
    default:
      return clone;
  }
};
