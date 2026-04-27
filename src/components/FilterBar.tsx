import type {
  CapacityFilter,
  DdrFilter,
  FilterState,
  Product,
  SortKey,
  SsdGenerationFilter,
  VendorId,
} from '../types/ram';
import { vendorMeta, vendorSequence } from '../utils/vendors';

interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  products: Product[];
  resultCount: number;
}

const ddrValues: DdrFilter[] = ['all', 'DDR3', 'DDR4', 'DDR5'];
const ssdGenerationValues: SsdGenerationFilter[] = ['all', 'Gen3', 'Gen4', 'Gen5'];
const sortValues: SortKey[] = ['price-asc', 'price-desc', 'brand', 'category', 'speed', 'capacity'];

const ramCapacityValues: CapacityFilter[] = ['all', 8, 16, 32, 64, 128];
const ssdCapacityValues: CapacityFilter[] = ['all', 256, 512, 1024, 2048];
const mixedCapacityValues: CapacityFilter[] = ['all', 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

const vendors: Array<VendorId | 'all'> = ['all', ...vendorSequence];

const sortLabels: Record<SortKey, string> = {
  'price-asc': 'Price Low to High',
  'price-desc': 'Price High to Low',
  brand: 'Brand A to Z',
  category: 'Category',
  speed: 'Speed / Throughput',
  capacity: 'Capacity',
};

interface SelectRowProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Array<string | number>;
  disabled?: boolean;
  renderLabel?: (value: string | number) => string;
}

const SelectRow = ({ label, value, onChange, options, renderLabel, disabled }: SelectRowProps) => (
  <label className={`sidebar-field ${disabled ? 'disabled' : ''}`}>
    <span>{label}</span>
    <select value={String(value)} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
      {options.map((option) => (
        <option key={String(option)} value={String(option)}>
          {renderLabel ? renderLabel(option) : String(option)}
        </option>
      ))}
    </select>
  </label>
);

const formatCapacity = (value: string | number) => {
  if (value === 'all') {
    return 'All capacities';
  }

  const numeric = Number(value);
  if (numeric >= 1024) {
    return `${numeric / 1024} TB`;
  }

  return `${numeric} GB`;
};

const FilterBar = ({ filters, onChange, products, resultCount }: FilterBarProps) => {
  const brands = Array.from(new Set(products.map((product) => product.brand))).sort((a, b) => a.localeCompare(b));
  const isSsd = filters.category === 'ssd';

  const capacityValues =
    filters.category === 'ram'
      ? ramCapacityValues
      : filters.category === 'ssd'
        ? ssdCapacityValues
        : mixedCapacityValues;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Sort & Filter</h2>
        <p>{resultCount} results</p>
      </div>

      <label className="sidebar-field">
        <span>Search (Regex)</span>
        <input
          className="sidebar-search"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="e.g. Samsung|Crucial|Gen4"
        />
      </label>

      {isSsd ? (
        <SelectRow
          label="M.2 SSD Gen"
          value={filters.ssdGeneration}
          onChange={(value) => onChange({ ...filters, ssdGeneration: value as SsdGenerationFilter })}
          options={ssdGenerationValues}
          renderLabel={(value) => (value === 'all' ? 'All generations' : String(value))}
        />
      ) : (
        <SelectRow
          label="DDR"
          value={filters.ddrVersion}
          onChange={(value) => onChange({ ...filters, ddrVersion: value as DdrFilter })}
          options={ddrValues}
        />
      )}

      <SelectRow
        label="Brand"
        value={filters.brand}
        onChange={(value) => onChange({ ...filters, brand: value })}
        options={['all', ...brands]}
      />

      <SelectRow
        label="Capacity"
        value={filters.capacity}
        onChange={(value) => onChange({ ...filters, capacity: value === 'all' ? 'all' : Number(value) as CapacityFilter })}
        options={capacityValues}
        renderLabel={formatCapacity}
      />

      <SelectRow
        label="Vendor"
        value={filters.vendor}
        onChange={(value) => onChange({ ...filters, vendor: value as VendorId | 'all' })}
        options={vendors}
        renderLabel={(value) => (value === 'all' ? 'All vendors' : vendorMeta[value as VendorId].label)}
      />

      <SelectRow
        label="Sort"
        value={filters.sortKey}
        onChange={(value) => onChange({ ...filters, sortKey: value as SortKey })}
        options={sortValues}
        renderLabel={(value) => sortLabels[value as SortKey]}
      />
    </aside>
  );
};

export default FilterBar;
