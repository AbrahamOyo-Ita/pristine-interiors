'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { priceRanges, productCategories } from '@/lib/config';

interface Props {
  q: string;
  cat: string;
  price: string;
  sort: string;
}

export default function ShopControls({ q, cat, price, sort }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(q);

  useEffect(() => setSearch(q), [q]);

  function params(overrides: Partial<Props>): string {
    const v = { q: search, cat, price, sort, ...overrides };
    const sp = new URLSearchParams();
    if (v.q.trim()) sp.set('q', v.q.trim());
    if (v.cat && v.cat !== 'all') sp.set('cat', v.cat);
    if (v.price) sp.set('price', v.price);
    if (v.sort && v.sort !== 'newest') sp.set('sort', v.sort);
    return sp.toString();
  }

  useEffect(() => {
    const t = setTimeout(() => router.replace(`/shop${params({ q: search }) ? `?${params({ q: search })}` : ''}`), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="card grid gap-3 p-4 md:grid-cols-[1fr_auto_auto_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name…"
          aria-label="Search products by name"
          className="input !pl-10"
        />
      </div>
      <select
        value={cat}
        onChange={(e) => router.replace(`/shop?${params({ cat: e.target.value })}`)}
        aria-label="Filter by category"
        className="input md:w-48"
      >
        <option value="all">All categories</option>
        {productCategories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>
      <select
        value={price}
        onChange={(e) => router.replace(`/shop?${params({ price: e.target.value })}`)}
        aria-label="Filter by price range"
        className="input md:w-52"
      >
        <option value="">Any price</option>
        {priceRanges.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => router.replace(`/shop?${params({ sort: e.target.value })}`)}
        aria-label="Sort products"
        className="input md:w-44"
      >
        <option value="newest">Newest first</option>
        <option value="price-asc">Price: low → high</option>
        <option value="price-desc">Price: high → low</option>
        <option value="name">Name A to Z</option>
      </select>
    </div>
  );
}
