import { HardDrive, MemoryStick, ShoppingCart, Zap } from 'lucide-react';
import type { Product } from '../types/ram';
import PriceTag from './PriceTag';
import VendorBadge from './VendorBadge';

interface ProductCardProps {
  product: Product;
  inCompare: boolean;
  canAdd: boolean;
  onAddCompare: (product: Product) => void;
}

const ProductCard = ({ product, inCompare, canAdd, onAddCompare }: ProductCardProps) => {
  return (
    <article className={`product-card ${inCompare ? 'in-compare' : ''}`}>
      <div className="card-top">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
      </div>

      <div className="card-meta">
        <VendorBadge vendor={product.vendor} />
        {product.isBestDeal && (
          <span className="best-deal-badge">
            <Zap size={10} fill="currentColor" /> Best Deal
          </span>
        )}
        <span className={`stock-pill ${product.inStock ? 'in' : 'out'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <h3>{product.name}</h3>

      <ul className="specs">
        <li className="spec-main">
          {product.category === 'ram' ? <MemoryStick size={14} /> : <HardDrive size={14} />}
          <span>{product.category.toUpperCase()}</span>
          {product.category === 'ram' && (
            <span className={`ddr-badge ddr-${(product.ddrVersion || '4').toLowerCase().replace('ddr', '')}`}>
              {product.ddrVersion}
            </span>
          )}
        </li>
        <li className="spec-item"><strong>{product.capacityGB >= 1024 ? `${product.capacityGB / 1024} TB` : `${product.capacityGB} GB`}</strong><span>Capacity</span></li>
        <li className="spec-item"><strong>{product.category === 'ram' ? `${product.speedMHz} MHz` : product.interface}</strong><span>{product.category === 'ram' ? 'Speed' : 'Interface'}</span></li>
        <li className="spec-item"><strong>{product.latency || (product.category === 'ssd' ? `${product.readMBs} MB/s` : 'N/A')}</strong><span>{product.category === 'ram' ? 'Latency' : 'Read Speed'}</span></li>
      </ul>

      <PriceTag price={product.priceINR} history={product.priceHistory} />

      <div className="card-actions">
        <a href={product.vendorUrl} target="_blank" rel="noreferrer">
          View Seller
        </a>
        <button
          type="button"
          onClick={() => onAddCompare(product)}
          disabled={!canAdd || inCompare}
          aria-label={`Add ${product.name} to compare`}
        >
          <ShoppingCart size={14} />
          {inCompare ? 'Added' : 'Compare'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
