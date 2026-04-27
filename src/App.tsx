import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ComparePage from './components/ComparePage';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import RateLimitBanner from './components/RateLimitBanner';
import LoadingSkeleton from './components/LoadingSkeleton';
import { useCompare } from './hooks/useCompare';
import { useRamData } from './hooks/useRamData';
import type { FilterState, ProductCategory } from './types/ram';
import { buildSearchRegex } from './utils/search';
import { sortProducts } from './utils/sortProducts';
import { vendorSequence } from './utils/vendors';

const PAGE_SIZE = 28;

const initialFilters: FilterState = {
  category: 'ram',
  ddrVersion: 'all',
  ssdGeneration: 'all',
  brand: 'all',
  search: '',
  capacity: 'all',
  vendor: 'all',
  sortKey: 'price-asc',
};

const App = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { products, loading, rateLimited, remainingMs, lastUpdated, scanningVendor, refresh } = useRamData();
  const compare = useCompare();

  const filtered = useMemo(() => {
    const searchRegex = buildSearchRegex(filters.search);

    const filteredItems = products.filter((product) => {
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      if (product.category === 'ram' && filters.ddrVersion !== 'all' && product.ddrVersion !== filters.ddrVersion) {
        return false;
      }

      if (product.category === 'ssd' && filters.ssdGeneration !== 'all') {
        const normalized = product.interface?.replace('PCIe ', '');
        if (normalized !== filters.ssdGeneration) {
          return false;
        }
      }

      if (filters.brand !== 'all' && product.brand !== filters.brand) {
        return false;
      }

      if (filters.capacity !== 'all' && product.capacityGB !== filters.capacity) {
        return false;
      }

      if (filters.vendor !== 'all' && product.vendor !== filters.vendor) {
        return false;
      }

      if (searchRegex) {
        const haystack = [
          product.name,
          product.brand,
          product.vendor,
          product.ddrVersion ?? '',
          product.interface ?? '',
          `${product.capacityGB}`,
        ].join(' ');

        if (!searchRegex.test(haystack)) {
          return false;
        }
      }

      return true;
    });

    // Identify Best Deals (lowest price per product name)
    const minPrices: Record<string, number> = {};
    filteredItems.forEach((item) => {
      if (!minPrices[item.name] || item.priceINR < minPrices[item.name]) {
        minPrices[item.name] = item.priceINR;
      }
    });

    const withBestDeal = filteredItems.map((item) => ({
      ...item,
      isBestDeal: item.priceINR === minPrices[item.name] && item.inStock,
      vendorUrl: item.vendorUrl.includes('+') 
        ? item.vendorUrl 
        : `${item.vendorUrl}${encodeURIComponent(' ' + item.category)}`
    }));

    return sortProducts(withBestDeal, filters.sortKey);
  }, [products, filters]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const handleCategoryToggle = (category: ProductCategory | 'all') => {
    setFilters((prev) => ({
      ...prev,
      category,
      ddrVersion: category === 'ssd' ? 'all' : prev.ddrVersion,
      ssdGeneration: category === 'ram' ? 'all' : prev.ssdGeneration,
      capacity: 'all',
    }));
  };

  const pagedProducts = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > pagedProducts.length;

  return (
    <div className="app-shell">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={refresh}
        disableRefresh={loading || rateLimited}
        compareCount={compare.items.length}
        scanningVendor={scanningVendor}
        activeCategory={filters.category}
        onCategoryChange={handleCategoryToggle}
        visibleCount={pagedProducts.length}
        totalCount={products.length}
        trackedVendors={vendorSequence}
      />

      {rateLimited && <RateLimitBanner remainingMs={remainingMs} />}

      <Routes>
        <Route
          path="/"
          element={
            <main className="layout">
              <FilterBar
                filters={filters}
                onChange={setFilters}
                products={products}
                resultCount={filtered.length}
              />

              <section className="content">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <>
                    <ProductGrid
                      products={pagedProducts}
                      compareIds={compare.ids}
                      maxCompare={compare.maxItems}
                      compareCount={compare.items.length}
                      onAddCompare={compare.addItem}
                      searchQuery={filters.search}
                    />
                    {hasMore && (
                      <div className="load-more-wrap">
                        <button type="button" className="load-more-btn" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                          Load More ({filtered.length - pagedProducts.length} remaining)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>
            </main>
          }
        />
        <Route
          path="/compare"
          element={
            <ComparePage
              items={compare.items}
              onRemove={compare.removeItem}
              onClear={compare.clear}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
