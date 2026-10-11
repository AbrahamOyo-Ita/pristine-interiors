import type { Metadata } from 'next';
import { publicProducts } from '@/lib/db';
import { priceRanges } from '@/lib/config';
import ShopControls from '@/components/ShopControls';
import ProductCard from '@/components/ProductCard';
import { CTALink, EmptyState, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Furniture Shop',
  description:
    'Browse quality sofas, beds, dining furniture, chairs, tables, storage and accessories. Every order is confirmed personally before payment.',
};

interface SearchParams {
  q?: string;
  cat?: string;
  price?: string;
  sort?: string;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? '').trim();
  const cat = searchParams.cat ?? 'all';
  const price = searchParams.price ?? '';
  const sort = searchParams.sort ?? 'newest';

  let list = publicProducts();
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  if (cat !== 'all') list = list.filter((p) => p.category === cat);
  const range = priceRanges.find((r) => r.slug === price);
  if (range) list = list.filter((p) => p.price !== null && p.price >= range.min && p.price < range.max);

  list = [...list];
  if (sort === 'price-asc') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (sort === 'price-desc') list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <PageHero
        tag="Furniture Shop"
        title="Pieces Crafted for Comfort & Character"
        intro="Search, filter and sort the collection. Every order is confirmed personally before payment."
      />
      <div className="container-site py-10 md:py-14">
        <ShopControls q={q} cat={cat} price={price} sort={sort} />
        <p className="mt-6 text-sm text-ink-soft" role="status">
          {list.length} piece{list.length === 1 ? '' : 's'}
          {q ? ` matching “${q}”` : ''}
        </p>
        {list.length === 0 ? (
          <div className="py-10">
            <EmptyState
              title="No products match"
              body="Try a different search term, or clear the filters to see the full collection."
              action={<CTALink href="/shop" variant="outline">Clear filters</CTALink>}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
