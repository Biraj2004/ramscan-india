import type { Product, VendorId } from '../types/ram';

const now = Date.now();

const vendorDomain: Record<VendorId, string> = {
  amazon: 'https://www.amazon.in/s?k=',
  flipkart: 'https://www.flipkart.com/search?q=',
  mdcomputers: 'https://mdcomputers.in/index.php?route=product/search&search=',
  vedant: 'https://www.vedantcomputers.com/index.php?route=product/search&search=',
  primeabgb: 'https://www.primeabgb.com/?s=',
  theitdepot: 'https://www.theitdepot.com/search.html?txt_search=',
  pcpricetracker: 'https://pcpricetracker.in/gen/products?q=',
  varietyinfotech: 'https://varietyinfotech.com/?s=',
  elitehubs: 'https://elitehubs.com/?s=',
  vishalperipherals: 'https://vishalperipherals.com/?s=',
};

const images = {
  corsairVengeance: '/ram-product.png',
  corsairDominator: '/ram-product.png',
  crucialDdr5: '/ram-product.png',
  crucialDdr4: '/ram-product.png',
  crucialDdr3: '/ram-product.png',
  gskillTridentZ5: '/ram-product.png',
  gskillRipjawsV: '/ram-product.png',
  kingstonFury: '/ram-product.png',
  kingstonDdr3: '/ram-product.png',
  samsung990Pro: '/ssd-product.png',
  wdBlackSn850x: '/ssd-product.png',
  crucialP3Plus: '/ssd-product.png',
  kingstonKc3000: '/ssd-product.png',
};

const urlFor = (vendor: VendorId, query: string) => `${vendorDomain[vendor]}${encodeURIComponent(query)}`;

interface SeedSpec {
  baseId: string;
  name: string;
  brand: string;
  category: 'ram' | 'ssd';
  ddrVersion?: 'DDR3' | 'DDR4' | 'DDR5';
  capacityGB: number;
  speedMHz?: number;
  latency?: string;
  iface?: 'SATA' | 'PCIe Gen3' | 'PCIe Gen4' | 'PCIe Gen5';
  readMBs?: number;
  writeMBs?: number;
  imageUrl: string;
  prices: Partial<Record<VendorId, number>>;
}

const seedSpecs: SeedSpec[] = [
  {
    baseId: 'corsair-vengeance-ddr5-16-6000',
    name: 'Corsair Vengeance 16GB DDR5 6000MHz CL36',
    brand: 'Corsair',
    category: 'ram',
    ddrVersion: 'DDR5',
    capacityGB: 16,
    speedMHz: 6000,
    latency: 'CL36',
    imageUrl: images.corsairVengeance,
    prices: {
      amazon: 6299,
      flipkart: 6150,
      mdcomputers: 5850,
      vedant: 5900,
      primeabgb: 5950,
      pcpricetracker: 5800,
      varietyinfotech: 5825,
      elitehubs: 5890,
    },
  },
  {
    baseId: 'gskill-trident-z5-rgb-32-6000',
    name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz CL36',
    brand: 'G.Skill',
    category: 'ram',
    ddrVersion: 'DDR5',
    capacityGB: 32,
    speedMHz: 6000,
    latency: 'CL36',
    imageUrl: images.gskillTridentZ5,
    prices: {
      amazon: 11999,
      flipkart: 11750,
      mdcomputers: 10900,
      vedant: 11100,
      primeabgb: 11250,
      pcpricetracker: 10850,
      varietyinfotech: 11000,
      elitehubs: 11150,
    },
  },
  {
    baseId: 'crucial-ddr5-16-4800',
    name: 'Crucial 16GB DDR5 4800MHz CL40',
    brand: 'Crucial',
    category: 'ram',
    ddrVersion: 'DDR5',
    capacityGB: 16,
    speedMHz: 4800,
    latency: 'CL40',
    imageUrl: images.crucialDdr5,
    prices: {
      amazon: 4599,
      flipkart: 4450,
      mdcomputers: 4200,
      vedant: 4250,
      primeabgb: 4300,
      theitdepot: 4280,
      varietyinfotech: 4220,
      elitehubs: 4260,
    },
  },
  {
    baseId: 'kingston-fury-beast-ddr5-16-5200',
    name: 'Kingston Fury Beast 16GB DDR5 5200MHz CL40',
    brand: 'Kingston',
    category: 'ram',
    ddrVersion: 'DDR5',
    capacityGB: 16,
    speedMHz: 5200,
    latency: 'CL40',
    imageUrl: images.kingstonFury,
    prices: {
      amazon: 5499,
      flipkart: 5250,
      mdcomputers: 4950,
      vedant: 5050,
      primeabgb: 5100,
      pcpricetracker: 4900,
      varietyinfotech: 4980,
    },
  },
  {
    baseId: 'corsair-vengeance-lpx-8-3200',
    name: 'Corsair Vengeance LPX 8GB DDR4 3200MHz CL16',
    brand: 'Corsair',
    category: 'ram',
    ddrVersion: 'DDR4',
    capacityGB: 8,
    speedMHz: 3200,
    latency: 'CL16',
    imageUrl: images.corsairVengeance,
    prices: {
      amazon: 2199,
      flipkart: 2050,
      mdcomputers: 1850,
      vedant: 1900,
      primeabgb: 1950,
      theitdepot: 1880,
      pcpricetracker: 1820,
    },
  },
  {
    baseId: 'gskill-ripjaws-v-16-3200',
    name: 'G.Skill Ripjaws V 16GB (2x8GB) DDR4 3200MHz CL16',
    brand: 'G.Skill',
    category: 'ram',
    ddrVersion: 'DDR4',
    capacityGB: 16,
    speedMHz: 3200,
    latency: 'CL16',
    imageUrl: images.gskillRipjawsV,
    prices: {
      amazon: 4099,
      flipkart: 3950,
      mdcomputers: 3650,
      vedant: 3750,
      primeabgb: 3800,
      pcpricetracker: 3600,
      varietyinfotech: 3700,
    },
  },
  {
    baseId: 'crucial-ddr3-8-1600',
    name: 'Crucial 8GB DDR3 1600MHz CL11',
    brand: 'Crucial',
    category: 'ram',
    ddrVersion: 'DDR3',
    capacityGB: 8,
    speedMHz: 1600,
    latency: 'CL11',
    imageUrl: images.crucialDdr3,
    prices: {
      amazon: 1399,
      flipkart: 1250,
      mdcomputers: 1100,
      vedant: 1150,
      primeabgb: 1180,
      theitdepot: 1120,
    },
  },
  {
    baseId: 'kingston-ddr3-4-1600',
    name: 'Kingston 4GB DDR3 1600MHz CL11',
    brand: 'Kingston',
    category: 'ram',
    ddrVersion: 'DDR3',
    capacityGB: 4,
    speedMHz: 1600,
    latency: 'CL11',
    imageUrl: images.kingstonDdr3,
    prices: {
      amazon: 799,
      flipkart: 720,
      mdcomputers: 650,
      vedant: 680,
      primeabgb: 695,
      pcpricetracker: 640,
    },
  },
  {
    baseId: 'samsung-990-pro-1tb',
    name: 'Samsung 990 Pro NVMe SSD 1TB PCIe Gen4',
    brand: 'Samsung',
    category: 'ssd',
    capacityGB: 1024,
    iface: 'PCIe Gen4',
    readMBs: 7450,
    writeMBs: 6900,
    imageUrl: images.samsung990Pro,
    prices: {
      amazon: 9499,
      flipkart: 9250,
      mdcomputers: 8650,
      vedant: 8800,
      primeabgb: 8900,
      pcpricetracker: 8550,
      varietyinfotech: 8700,
    },
  },
  {
    baseId: 'wd-black-sn850x-1tb',
    name: 'WD Black SN850X NVMe SSD 1TB PCIe Gen4',
    brand: 'WD',
    category: 'ssd',
    capacityGB: 1024,
    iface: 'PCIe Gen4',
    readMBs: 7300,
    writeMBs: 6300,
    imageUrl: images.wdBlackSn850x,
    prices: {
      amazon: 8699,
      flipkart: 8450,
      mdcomputers: 7950,
      vedant: 8100,
      primeabgb: 8250,
      theitdepot: 8050,
      pcpricetracker: 7850,
    },
  },
  {
    baseId: 'crucial-p3-plus-1tb',
    name: 'Crucial P3 Plus NVMe SSD 1TB PCIe Gen4',
    brand: 'Crucial',
    category: 'ssd',
    capacityGB: 1024,
    iface: 'PCIe Gen4',
    readMBs: 5000,
    writeMBs: 3600,
    imageUrl: images.crucialP3Plus,
    prices: {
      amazon: 6199,
      flipkart: 5950,
      mdcomputers: 5450,
      vedant: 5600,
      primeabgb: 5700,
      pcpricetracker: 5350,
      varietyinfotech: 5500,
    },
  },
  {
    baseId: 'kingston-kc3000-2tb',
    name: 'Kingston KC3000 NVMe SSD 2TB PCIe Gen4',
    brand: 'Kingston',
    category: 'ssd',
    capacityGB: 2048,
    iface: 'PCIe Gen4',
    readMBs: 7000,
    writeMBs: 7000,
    imageUrl: images.kingstonKc3000,
    prices: {
      amazon: 15999,
      flipkart: 15650,
      mdcomputers: 14900,
      vedant: 15100,
      primeabgb: 15300,
      pcpricetracker: 14750,
      varietyinfotech: 15000,
    },
  },
];

const makeHistory = (price: number): number[] => [
  Math.max(500, Math.round(price * 1.06)),
  Math.max(500, Math.round(price * 1.03)),
  Math.max(500, Math.round(price * 1.01)),
  Math.max(500, Math.round(price * 0.99)),
  price,
];

export const seedProducts: Product[] = seedSpecs.flatMap((spec) => {
  return Object.entries(spec.prices).map(([vendor, price]) => {
    const vendorId = vendor as VendorId;

    return {
      id: `${spec.baseId}-${vendorId}`,
      name: spec.name,
      brand: spec.brand,
      category: spec.category,
      ddrVersion: spec.ddrVersion,
      capacityGB: spec.capacityGB,
      speedMHz: spec.speedMHz,
      latency: spec.latency,
      interface: spec.iface,
      readMBs: spec.readMBs,
      writeMBs: spec.writeMBs,
      priceINR: price,
      vendor: vendorId,
      vendorUrl: urlFor(vendorId, spec.name),
      imageUrl: spec.imageUrl,
      inStock: Math.random() > 0.12,
      lastUpdated: now,
      priceHistory: makeHistory(price),
    };
  });
});

