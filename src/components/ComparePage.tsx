import { ArrowLeft, Trash2, CheckCircle2, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/ram';
import { formatPrice } from '../utils/formatPrice';
import { vendorMeta } from '../utils/vendors';

interface ComparePageProps {
  items: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const toCapacity = (capacityGB: number) => (capacityGB >= 1024 ? `${capacityGB / 1024} TB` : `${capacityGB} GB`);

const ComparePage = ({ items, onRemove, onClear }: ComparePageProps) => {
  if (items.length === 0) {
    return (
      <section className="empty-state">
        <TrendingDown size={48} />
        <h3>Your basket is empty</h3>
        <p>Add products from the catalog to compare them side-by-side.</p>
        <Link to="/" className="refresh-btn" style={{ marginTop: '20px' }}>Go To Catalog</Link>
      </section>
    );
  }

  const lowestPrice = Math.min(...items.map((item) => item.priceINR));
  const bestValueItem = items.find((item) => item.priceINR === lowestPrice);

  return (
    <section className="compare-route">
      <div className="compare-header-row">
        <div>
          <p className="eyebrow">Comparison Engine</p>
          <h2>Market Analysis</h2>
        </div>
        <div className="compare-route-actions">
          <Link to="/" className="top-link"><ArrowLeft size={14} /> Back to Catalog</Link>
          <button type="button" className="refresh-btn" style={{ background: 'transparent' }} onClick={onClear}>
            <Trash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      <div className="compare-summary-row">
        <div className="compare-summary-chip">
          <strong>{items.length}</strong>
          <span>In Comparison</span>
        </div>
        <div className="compare-summary-chip">
          <strong>{formatPrice(lowestPrice)}</strong>
          <span>Lowest Entry</span>
        </div>
      </div>

      <div className="compare-card-tray">
        {items.map((item) => (
          <article 
            key={item.id} 
            className={`compare-item-mini ${item.id === bestValueItem?.id ? 'is-winner' : ''}`}
          >
            <img src={item.imageUrl} alt={item.name} />
            <div className="card-meta">
              <span className={`ddr-badge ddr-${(item.ddrVersion || '4').toLowerCase().replace('ddr', '')}`}>
                {item.ddrVersion || 'NVMe'}
              </span>
              {item.id === bestValueItem?.id && (
                <span className="best-deal-badge" style={{ padding: '2px 8px' }}>
                  <CheckCircle2 size={10} /> Winner
                </span>
              )}
            </div>
            <h3>{item.name}</h3>
            <p className="price-value">{formatPrice(item.priceINR)}</p>
            <button 
              type="button" 
              className="clear-link" 
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="compare-specs-table">
        <table>
          <thead>
            <tr>
              <th className="row-label">Feature</th>
              {items.map((item) => (
                <th key={item.id} style={{ color: item.id === bestValueItem?.id ? 'var(--success)' : 'inherit' }}>
                  {item.brand} {item.id === bestValueItem?.id ? '★' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="row-label">Market Price</td>
              {items.map((item) => (
                <td key={item.id} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {formatPrice(item.priceINR)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Capacity</td>
              {items.map((item) => (
                <td key={item.id}>{toCapacity(item.capacityGB)}</td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Version / Interface</td>
              {items.map((item) => (
                <td key={item.id}>{item.ddrVersion || item.interface || 'SATA'}</td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Performance</td>
              {items.map((item) => (
                <td key={item.id}>
                  {item.category === 'ram' 
                    ? `${item.speedMHz} MHz ${item.latency}` 
                    : `${item.readMBs} MB/s Read`}
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Vendor Store</td>
              {items.map((item) => (
                <td key={item.id} className={`vendor-${item.vendor.toLowerCase()}`}>
                  {vendorMeta[item.vendor].shortLabel}
                </td>
              ))}
            </tr>
            <tr>
              <td className="row-label">Availability</td>
              {items.map((item) => (
                <td key={item.id}>
                  <span className={`stock-pill ${item.inStock ? 'in' : 'out'}`}>
                    {item.inStock ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="highlight-winner">
              <td className="row-label">Verdict</td>
              {items.map((item) => (
                <td key={item.id}>
                  {item.id === bestValueItem?.id 
                    ? 'Best choice for current selection' 
                    : `+${formatPrice(item.priceINR - lowestPrice)} vs best`}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparePage;

