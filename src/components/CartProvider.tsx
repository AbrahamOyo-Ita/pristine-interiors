'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '@/lib/types';

const STORAGE_KEY = 'pi-cart-v1';

interface CartContextValue {
  items: CartItem[];
  loaded: boolean;
  count: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i.slug && i.qty > 0));
      }
    } catch {
      /* corrupted storage, start fresh */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        /* storage unavailable */
      }
    }
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const add = (slug: string, qty = 1) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === slug);
        if (existing) return prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
        return [...prev, { slug, qty }];
      });
    const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
    const setQty = (slug: string, qty: number) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, qty) } : i)),
      );
    const clear = () => setItems([]);
    const count = items.reduce((n, i) => n + i.qty, 0);
    return { items, loaded, count, add, remove, setQty, clear };
  }, [items, loaded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
