import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

interface PriceTagProps {
  price: number;
  history?: number[];
}

const PriceTag = ({ price, history }: PriceTagProps) => {
  const previous = history && history.length > 1 ? history[history.length - 2] : price;
  const isUp = price > previous;
  const isDown = price < previous;

  return (
    <div className="price-tag">
      <p className="price-value">{formatPrice(price)}</p>
      <p className="price-trend">
        {isUp && <ArrowUp size={14} aria-hidden="true" />}
        {isDown && <ArrowDown size={14} aria-hidden="true" />}
        {!isUp && !isDown && <span>Flat</span>}
        {(isUp || isDown) && <span>{Math.abs(price - previous)} INR vs last refresh</span>}
      </p>
    </div>
  );
};

export default PriceTag;
