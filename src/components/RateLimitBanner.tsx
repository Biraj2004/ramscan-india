import { AlertTriangle } from 'lucide-react';

interface RateLimitBannerProps {
  remainingMs: number;
}

const toClock = (ms: number) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
};

const RateLimitBanner = ({ remainingMs }: RateLimitBannerProps) => {
  return (
    <div className="rate-limit-banner" role="status" aria-live="polite">
      <div className="banner-content">
        <AlertTriangle size={16} />
        <span>Market Scan Limit Reached</span>
        <p>Please wait before pulling fresh prices from Indian stores again.</p>
      </div>
      <div className="banner-timer">
        <strong>{toClock(remainingMs)}</strong>
        <span>REMAINING</span>
      </div>
    </div>
  );
};

export default RateLimitBanner;
