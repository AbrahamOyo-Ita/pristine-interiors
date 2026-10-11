'use client';

import { useEffect, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from './CartProvider';

export default function AddToCartButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = product.stock === 'out-of-stock';

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  if (compact) {
    return (
      <button
        type="button"
        disabled={disabled}
        aria-label={disabled ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
        title={disabled ? 'Out of stock' : 'Add to cart'}
        onClick={() => {
          add(product.slug, 1);
          setAdded(true);
        }}
        className={`rounded-full p-3 shadow-soft transition-all duration-300 ${
          added
            ? 'bg-moss text-white'
            : disabled
              ? 'cursor-not-allowed bg-linen text-ink/30'
              : 'bg-cream text-ink hover:bg-bronze hover:text-white'
        }`}
      >
        {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        add(product.slug, 1);
        setAdded(true);
      }}
      className={added ? 'btn bg-moss text-white' : disabled ? 'btn cursor-not-allowed bg-linen text-ink/40' : 'btn-primary w-full'}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" /> Added to cart
        </>
      ) : disabled ? (
        'Out of stock'
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to cart
        </>
      )}
    </button>
  );
}
