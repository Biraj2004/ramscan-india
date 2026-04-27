import { HardDrive, MemoryStick, RefreshCcw, Scale } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { ProductCategory, VendorId } from '../types/ram';
import { vendorMeta } from '../utils/vendors';

interface HeaderProps {
  lastUpdated: number;
  onRefresh: () => void;
  disableRefresh: boolean;
  compareCount: number;
  scanningVendor: VendorId | null;
  activeCategory: ProductCategory | 'all';
  onCategoryChange: (next: ProductCategory | 'all') => void;
  visibleCount: number;
  totalCount: number;
  trackedVendors: VendorId[];
}

const Header = ({
  lastUpdated,
  onRefresh,
  disableRefresh,
  compareCount,
  scanningVendor,
  activeCategory,
  onCategoryChange,
  visibleCount,
  totalCount,
  trackedVendors,
}: HeaderProps) => {
  const statusText = scanningVendor
    ? `Checking ${vendorMeta[scanningVendor].label}`
    : 'Scanner Idle';

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <header className="app-header">
      <div className="hero-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <p className="eyebrow">India Components Index</p>
          <p className="last-refresh-tag">Market Live: {formatTime(lastUpdated)}</p>
        </div>
        <h1>RAMScan <span>India</span></h1>
        <p className="subtitle">
          Professional hardware price tracking and comparison engine for the Indian markets.
        </p>

        <div className="hero-metrics">
          <div><strong>{visibleCount}</strong><span>Visible</span></div>
          <div><strong>{totalCount}</strong><span>Total indexed</span></div>
          <div><strong>{compareCount}</strong><span>In basket</span></div>
        </div>

        <div className="hero-toggle" style={{ marginTop: '24px' }}>
          <button
            type="button"
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => onCategoryChange('all')}
          >
            All Hardware
          </button>
          <button
            type="button"
            className={activeCategory === 'ram' ? 'active' : ''}
            onClick={() => onCategoryChange('ram')}
          >
            <MemoryStick size={14} /> Memory
          </button>
          <button
            type="button"
            className={activeCategory === 'ssd' ? 'active' : ''}
            onClick={() => onCategoryChange('ssd')}
          >
            <HardDrive size={14} /> Storage
          </button>
        </div>
      </div>

      <div className="hero-side">
        <nav className="top-nav">
          <NavLink to="/" end className={({ isActive }) => `top-link ${isActive ? 'active' : ''}`}>
            Market Catalog
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `top-link ${isActive ? 'active' : ''}`}>
            <Scale size={14} /> Comparison Tray ({compareCount})
          </NavLink>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <p className={`scan-status ${scanningVendor ? 'active' : ''}`}>
            <span className="scan-dot" />
            {statusText}
          </p>
          <button className="refresh-btn" type="button" onClick={onRefresh} disabled={disableRefresh}>
            <RefreshCcw size={14} className={scanningVendor ? 'animate-spin' : ''} />
            Scan Market Prices
          </button>
          <p className="tracked-vendors" style={{ fontSize: '0.65rem', marginTop: '4px' }}>
            Tracking {trackedVendors.length} major Indian stores
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
