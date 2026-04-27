import type { Product } from '../types/ram';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  compareIds: Set<string>;
  maxCompare: number;
  compareCount: number;
  onAddCompare: (product: Product) => void;
  searchQuery: string;
}

const ProductGrid = ({ products, compareIds, maxCompare, compareCount, onAddCompare, searchQuery }: ProductGridProps) => {
  if (!products.length) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 320 220" aria-hidden="true" role="img">
          <rect x="32" y="28" width="256" height="164" rx="14" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <circle cx="134" cy="94" r="24" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="6" />
          <line x1="151" y1="111" x2="184" y2="145" stroke="currentColor" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
          <line x1="74" y1="170" x2="246" y2="170" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <h3>No Matching Products</h3>
        <p>
          {searchQuery.trim()
            ? `No results for regex: ${searchQuery}`
            : 'Try changing vendor, generation, brand, or category filters.'}
        </p>
      </div>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          inCompare={compareIds.has(product.id)}
          canAdd={compareCount < maxCompare}
          onAddCompare={onAddCompare}
        />
      ))}
    </section>
  );
};

export default ProductGrid;
