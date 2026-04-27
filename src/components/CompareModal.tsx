import { X } from 'lucide-react';
import type { Product } from '../types/ram';
import { formatPrice } from '../utils/formatPrice';

interface CompareModalProps {
  items: Product[];
  onClose: () => void;
}

const CompareModal = ({ items, onClose }: CompareModalProps) => {
  const bestValue = items.reduce((best, item) => (item.priceINR < best.priceINR ? item : best), items[0]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="compare-modal">
        <header>
          <div>
            <p className="eyebrow">Comparison Matrix</p>
            <h3>Specs and price side by side</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close comparison modal">
            <X size={18} />
          </button>
        </header>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Capacity</th>
                <th>Speed / Throughput</th>
                <th>Vendor</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={item.id === bestValue.id ? 'best-value' : ''}>
                  <td>{item.name}</td>
                  <td>{item.category.toUpperCase()}</td>
                  <td>{item.capacityGB >= 1024 ? `${item.capacityGB / 1024} TB` : `${item.capacityGB} GB`}</td>
                  <td>
                    {item.category === 'ram'
                      ? `${item.speedMHz ?? '-'} MHz ${item.latency ?? ''}`
                      : `${item.readMBs ?? '-'} / ${item.writeMBs ?? '-'} MB/s`}
                  </td>
                  <td>{item.vendor}</td>
                  <td>{formatPrice(item.priceINR)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
