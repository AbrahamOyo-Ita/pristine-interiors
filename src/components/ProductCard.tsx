import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { categoryLabel, stockLabels } from '@/lib/config';
import { naira } from '@/lib/format';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group card flex h-full flex-col overflow-hidden !rounded-[24px] p-3">
      <div className="relative overflow-hidden rounded-[16px] bg-linen">
        <Link href={`/shop/${product.slug}`} className="block" tabIndex={-1} aria-hidden="true">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={800}
            height={600}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </Link>
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
            product.stock === 'in-stock'
              ? 'bg-cream/95 text-moss'
              : product.stock === 'made-to-order'
                ? 'bg-cream/95 text-bronze-dark'
                : 'bg-ink/85 text-cream'
          }`}
        >
          {stockLabels[product.stock]}
        </span>
        <div className="absolute bottom-4 right-4 translate-y-16 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToCartButton product={product} compact />
        </div>
      </div>

      <div className="flex flex-1 items-start justify-between gap-3 px-2 pb-2 pt-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest2 text-bronze-dark">{categoryLabel(product.category)}</p>
          <h3 className="mt-1.5 text-[15px] font-bold leading-snug">
            <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-bronze-dark">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            {product.price !== null ? naira(product.price) : 'On request'}
          </p>
        </div>
        <Link
          href={`/shop/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="icon-circle bg-linen text-ink transition-all duration-300 hover:bg-bronze group-hover:bg-bronze"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
