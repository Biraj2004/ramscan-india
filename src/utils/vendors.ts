import type { VendorId } from '../types/ram';

export const vendorMeta: Record<VendorId, { label: string; shortLabel: string }> = {
  amazon: { label: 'Amazon India', shortLabel: 'Amazon' },
  flipkart: { label: 'Flipkart', shortLabel: 'Flipkart' },
  mdcomputers: { label: 'MDComputers', shortLabel: 'MDComputers' },
  vedant: { label: 'Vedant Computers', shortLabel: 'Vedant' },
  primeabgb: { label: 'PrimeABGB', shortLabel: 'PrimeABGB' },
  theitdepot: { label: 'The IT Depot', shortLabel: 'The IT Depot' },
  pcpricetracker: { label: 'PC Price Tracker', shortLabel: 'PC Price Tracker' },
  varietyinfotech: { label: 'Variety Infotech', shortLabel: 'Variety' },
  elitehubs: { label: 'EliteHubs', shortLabel: 'EliteHubs' },
  vishalperipherals: { label: 'Vishal Peripherals', shortLabel: 'Vishal' },
};

export const vendorSequence: VendorId[] = [
  'amazon',
  'flipkart',
  'mdcomputers',
  'vedant',
  'primeabgb',
  'theitdepot',
  'pcpricetracker',
  'varietyinfotech',
  'elitehubs',
  'vishalperipherals',
];
