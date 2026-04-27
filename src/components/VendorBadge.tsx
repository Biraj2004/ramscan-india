import type { VendorId } from '../types/ram';
import { vendorMeta } from '../utils/vendors';

const vendorClass: Record<VendorId, string> = {
  amazon: 'vendor-amazon',
  flipkart: 'vendor-flipkart',
  mdcomputers: 'vendor-mdcomputers',
  vedant: 'vendor-vedant',
  primeabgb: 'vendor-primeabgb',
  theitdepot: 'vendor-theitdepot',
  pcpricetracker: 'vendor-pcpricetracker',
  varietyinfotech: 'vendor-varietyinfotech',
  elitehubs: 'vendor-elitehubs',
  vishalperipherals: 'vendor-vishalperipherals',
};

interface VendorBadgeProps {
  vendor: VendorId;
}

const VendorBadge = ({ vendor }: VendorBadgeProps) => {
  const meta = vendorMeta[vendor];
  return <span className={`vendor-badge ${vendorClass[vendor]}`}>{meta.shortLabel}</span>;
};

export default VendorBadge;
