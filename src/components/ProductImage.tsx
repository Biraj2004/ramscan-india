import type { Product } from '../types/ram';

interface ProductImageProps {
  product: Product;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const W = 400, H = 250;

  // Shared gradients and patterns
  const topGrad = <defs>
    <linearGradient id={`bg-${product.id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#1a1f2e" />
      <stop offset="100%" stopColor="#141820" />
    </linearGradient>
    <linearGradient id={`accent-${product.id}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f99100" />
      <stop offset="100%" stopColor="#cc7700" />
    </linearGradient>
    <linearGradient id={`body-${product.id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#2a2f3e" />
      <stop offset="100%" stopColor="#1e2230" />
    </linearGradient>
    <filter id={`glow-${product.id}`}>
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>;

  const brandLabelY = H - 32;
  const productRect = { x: 40, y: 30, w: W - 80, h: H - 110, rx: 8 };

  if (product.category === 'ram') {
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {topGrad}
        <rect width={W} height={H} fill={`url(#bg-${product.id})`} />
        
        {/* PCB body */}
        <rect x={productRect.x} y={productRect.y} width={productRect.w} height={productRect.h} rx={productRect.rx} fill={`url(#body-${product.id})`} stroke="#3a3f50" strokeWidth="1.5" />

        {/* Heat spreader */}
        <rect x={productRect.x + 10} y={productRect.y + 8} width={productRect.w - 20} height={productRect.h * 0.58} rx="4" fill={`url(#accent-${product.id})`} />
        
        {/* Heat spreader ridges */}
        {[...Array(6)].map((_, i) => (
          <rect key={`ridge-${i}`} x={productRect.x + 24 + i * 45} y={productRect.y + 14} width="3" height={productRect.h * 0.5} rx="1.5" fill="rgba(0,0,0,0.25)" />
        ))}

        {/* Cooling fins on top */}
        {[...Array(9)].map((_, i) => (
          <rect key={`fin-${i}`} x={productRect.x + 28 + i * 33} y={productRect.y - 4} width="8" height="14" rx="2" fill="#4a4f60" />
        ))}

        {/* DDR label */}
        {product.ddrVersion && (
          <text x={productRect.x + productRect.w/2} y={productRect.y + productRect.h * 0.42} textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="700" filter={`url(#glow-${product.id})`}>
            {product.ddrVersion}
          </text>
        )}

        {/* Memory chips */}
        {[...Array(4)].map((_, i) => (
          <rect key={`chip-${i}`} x={productRect.x + 30 + i * 68} y={productRect.y + productRect.h - 42} width="44" height="28" rx="3" fill="#1a1a2e" stroke="#2a2a3e" strokeWidth="0.8" />
        ))}

        {/* Chip pins */}
        {[...Array(4)].map((_, i) => 
          [...Array(5)].map((_, j) => (
            <rect key={`pin-${i}-${j}`} x={productRect.x + 36 + i * 68 + j*6} y={productRect.y + productRect.h - 32} width="2" height="14" fill="#c0a050" opacity="0.7" />
          ))
        )}

        {/* Brand at bottom */}
        <text x={W/2} y={brandLabelY} textAnchor="middle" fill="#8b8fa0" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="600" letterSpacing="1">
          {product.brand.toUpperCase()}
        </text>
        <text x={W/2} y={brandLabelY + 16} textAnchor="middle" fill="#f99100" fontFamily="DM Sans, sans-serif" fontSize="11" letterSpacing="0.5">
          {product.capacityGB >= 1024 ? `${product.capacityGB/1024}TB` : `${product.capacityGB}GB`} {product.speedMHz ? `${product.speedMHz}MHz` : ''}
        </text>
      </svg>
    );
  }

  // SSD
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {topGrad}
      <rect width={W} height={H} fill={`url(#bg-${product.id})`} />

      {/* SSD body (smaller, more compact) */}
      <rect x={productRect.x + 20} y={productRect.y + 15} width={productRect.w - 40} height={productRect.h - 10} rx="6" fill={`url(#body-${product.id})`} stroke="#3a3f50" strokeWidth="1.5" />

      {/* Top metallic strip */}
      <rect x={productRect.x + 24} y={productRect.y + 20} width={productRect.w - 48} height="28" rx="4" fill="url(#accent-1)" />
      <defs>
        <linearGradient id="accent-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a8" />
          <stop offset="100%" stopColor="#2a6" />
        </linearGradient>
      </defs>

      {/* NVMe connector pins */}
      {[...Array(8)].map((_, i) => (
        <rect key={`pin-${i}`} x={productRect.x + 36 + i * 30} y={productRect.y + 20} width="3" height="20" rx="1" fill="#f0c040" opacity="0.8" />
      ))}

      {/* NAND chip */}
      <rect x={productRect.x + 40} y={productRect.y + 62} width="80" height="48" rx="3" fill="#1a1a2e" stroke="#2a2a3e" strokeWidth="0.8" />
      <text x={productRect.x + 80} y={productRect.y + 80} textAnchor="middle" fill="#444" fontFamily="JetBrains Mono, monospace" fontSize="8">NAND</text>

      {/* Controller chip */}
      <rect x={productRect.x + 140} y={productRect.y + 62} width="60" height="48" rx="3" fill="#1a1a2e" stroke="#2a2a3e" strokeWidth="0.8" />
      <text x={productRect.x + 170} y={productRect.y + 80} textAnchor="middle" fill="#444" fontFamily="JetBrains Mono, monospace" fontSize="7">CTRL</text>

      {/* DRAM cache */}
      <rect x={productRect.x + 220} y={productRect.y + 70} width="48" height="32" rx="3" fill="#1a1a2e" stroke="#2a2a3e" strokeWidth="0.8" />

      {/* PCIe version label */}
      <rect x={productRect.x + 32} y={productRect.y + productRect.h - 40} width={productRect.w - 64} height="18" rx="3" fill="rgba(0,0,0,0.3)" />
      <text x={W/2} y={productRect.y + productRect.h - 27} textAnchor="middle" fill="#4a8" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
        {product.interface || 'NVMe'}
      </text>

      {/* Speed indicator */}
      {product.readMBs && (
        <text x={W/2} y={productRect.y + productRect.h - 10} textAnchor="middle" fill="#f99100" fontFamily="JetBrains Mono, monospace" fontSize="9">
          {product.readMBs} MB/s R
        </text>
      )}

      {/* Brand at bottom */}
      <text x={W/2} y={brandLabelY} textAnchor="middle" fill="#8b8fa0" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="600" letterSpacing="1">
        {product.brand.toUpperCase()}
      </text>
      <text x={W/2} y={brandLabelY + 15} textAnchor="middle" fill="#f99100" fontFamily="DM Sans, sans-serif" fontSize="11" letterSpacing="0.5">
        {product.capacityGB >= 1024 ? `${product.capacityGB/1024}TB` : `${product.capacityGB}GB`}
      </text>
    </svg>
  );
};

export default ProductImage;
