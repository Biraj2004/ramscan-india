const LoadingSkeleton = () => {
  return (
    <div className="skeleton-grid">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image pulse" />
          <div className="skeleton-meta">
            <div className="skeleton-chip pulse" />
            <div className="skeleton-chip pulse" />
          </div>
          <div className="skeleton-title pulse" />
          <div className="skeleton-specs">
            <div className="skeleton-line pulse" />
            <div className="skeleton-line pulse" />
            <div className="skeleton-line pulse" />
          </div>
          <div className="skeleton-price pulse" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
