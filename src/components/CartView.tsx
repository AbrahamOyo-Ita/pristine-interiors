'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from './CartProvider';
import { naira } from '@/lib/format';
import { stockLabels } from '@/lib/config';
import { waHref, waMessage } from '@/lib/whatsapp';
import { CTALink, EmptyState } from './ui';

export default function CartView({ allProducts }: { allProducts: Product[] }) {
  const { items, loaded, setQty, remove, clear } = useCart();

  const lines = items
    .map((item) => ({ item, product: allProducts.find((p) => p.slug === item.slug) }))
    .filter((l): l is { item: { slug: string; qty: number }; product: Product } => Boolean(l.product));

  const pricedTotal = lines.reduce((sum, l) => sum + (l.product.price ?? 0) * l.item.qty, 0);
  const hasUnpriced = lines.some((l) => l.product.price === null);

  const orderLines = lines.map(
    (l) =>
      `• ${l.item.qty} × ${l.product.name}, ${l.product.price !== null ? naira(l.product.price) : 'price on request'}`,
  );
  const totalLabel = hasUnpriced
    ? `Estimated total (priced items only): ${naira(pricedTotal)}. Some items are price-on-request.`
    : `Estimated total: ${naira(pricedTotal)}.`;

  if (!loaded) return <div className="py-24 text-center text-sm text-ink-soft">Loading your cart…</div>;

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        body="Browse the collection and add pieces you love. Your cart is saved on this device between visits."
        action={<CTALink href="/shop">Explore Our Collection</CTALink>}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {lines.map(({ item, product }) => (
          <div key={product.slug} className="card flex gap-4 p-4">
            <Link href={`/shop/${product.slug}`} className="shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={160}
                height={120}
                className="aspect-[4/3] w-24 rounded-md object-cover sm:w-32"
              />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg leading-snug">
                    <Link href={`/shop/${product.slug}`} className="hover:text-bronze">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {stockLabels[product.stock]}
                    {product.price !== null ? ` · ${naira(product.price)}` : ' · price on request'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="rounded-full p-2 text-ink/50 hover:bg-linen hover:text-clay"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-full border border-ink/15">
                  <button
                    type="button"
                    onClick={() => setQty(product.slug, item.qty - 1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="p-2 hover:text-bronze"
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-bold" aria-label={`Quantity ${item.qty}`}>
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(product.slug, item.qty + 1)}
                    aria-label={`Increase quantity of ${product.name}`}
                    className="p-2 hover:text-bronze"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-sm font-bold">
                  {product.price !== null ? naira(product.price * item.qty) : 'On request'}
                </p>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={clear} className="text-xs font-semibold text-ink-soft underline hover:text-clay">
          Clear cart
        </button>
      </div>

      <aside className="card h-fit p-6">
        <h2 className="font-display text-xl">Order Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Items</dt>
            <dd className="font-semibold">{lines.reduce((n, l) => n + l.item.qty, 0)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
            <dt className="font-semibold">Subtotal</dt>
            <dd className="font-bold">{naira(pricedTotal)}</dd>
          </div>
        </dl>
        {hasUnpriced ? (
          <p className="mt-3 rounded-md bg-linen px-3 py-2 text-xs text-ink-soft">
            Some items are price-on-request, and we’ll confirm their pricing when you enquire.
          </p>
        ) : null}
        <p className="mt-3 text-xs text-ink-soft">
          Prices and availability are confirmed personally before payment. Checkout is completed as a WhatsApp order
          enquiry.
        </p>
        <div className="mt-5 grid gap-3">
          <a href={waHref(waMessage.order(orderLines, totalLabel))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
            Order via WhatsApp
          </a>
          <a href={waHref(waMessage.quote())} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
            Request a Quote
          </a>
          <CTALink href="/book-consultation" variant="outline" className="w-full">
            Book a Consultation
          </CTALink>
        </div>
      </aside>
    </div>
  );
}
