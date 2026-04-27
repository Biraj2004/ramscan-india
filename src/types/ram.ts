export type VendorId =
  | 'amazon'
  | 'flipkart'
  | 'mdcomputers'
  | 'vedant'
  | 'primeabgb'
  | 'theitdepot'
  | 'pcpricetracker'
  | 'varietyinfotech'
  | 'elitehubs'
  | 'vishalperipherals';

export type ProductCategory = 'ram' | 'ssd';

export type DdrFilter = 'all' | 'DDR3' | 'DDR4' | 'DDR5';
export type SsdGenerationFilter = 'all' | 'Gen3' | 'Gen4' | 'Gen5';
export type CapacityFilter = 'all' | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

export type SortKey =
  | 'price-asc'
  | 'price-desc'
  | 'brand'
  | 'category'
  | 'speed'
  | 'capacity';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  ddrVersion?: 'DDR3' | 'DDR4' | 'DDR5';
  capacityGB: number;
  speedMHz?: number;
  latency?: string;
  interface?: 'SATA' | 'PCIe Gen3' | 'PCIe Gen4' | 'PCIe Gen5';
  readMBs?: number;
  writeMBs?: number;
  priceINR: number;
  vendor: VendorId;
  vendorUrl: string;
  imageUrl: string;
  inStock: boolean;
  lastUpdated: number;
  priceHistory?: number[];
  isBestDeal?: boolean;
}

export interface FilterState {
  category: ProductCategory | 'all';
  ddrVersion: DdrFilter;
  ssdGeneration: SsdGenerationFilter;
  brand: string;
  search: string;
  capacity: CapacityFilter;
  vendor: VendorId | 'all';
  sortKey: SortKey;
}
