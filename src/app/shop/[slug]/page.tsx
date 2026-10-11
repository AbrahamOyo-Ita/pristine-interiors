import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Truck } from 'lucide-react';
import { getProductBySlug, relatedProducts } from '@/lib/db';
import { categoryLabel, stockLabels } from '@/lib/config';
import { naira } from '@/lib/format';
import { waMessage } from '@/lib/whatsapp';
import Gallery from '@/components/Gallery';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import { WhatsAppLink } from '@/components/ui';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} · Furniture Shop` : 'Product not found',
    description: product?.description.slice(0, 160),
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="container-site py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-soft">
        <Link href="/" className="hover:text-bronze">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/shop" className="hover:text-bronze">Shop</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <Gallery images={product.images} alt={product.name} />

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest2 text-bronze-dark">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-2xl font-bold">
              {product.price !== null ? naira(product.price) : 'Price on request'}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                product.stock === 'in-stock'
                  ? 'bg-moss/10 text-moss'
                  : product.stock === 'made-to-order'
                    ? 'bg-bronze-faint text-bronze-dark'
                    : 'bg-ink/10 text-ink-soft'
              }`}
            >
              {stockLabels[product.stock]}
            </span>
          </div>

          <p className="mt-8 border-t border-ink/10 pt-7 leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-8 grid gap-3">
            <AddToCartButton product={product} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <WhatsAppLink message={waMessage.product(product.name)}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Enquire on WhatsApp
              </WhatsAppLink>
              <WhatsAppLink message={waMessage.quote()} variant="outline">
                Request a Quote
              </WhatsAppLink>
            </div>
          </div>

          <p className="mt-8 flex items-start gap-3 border-l-2 border-bronze pl-4 text-xs leading-relaxed text-ink-soft">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
            Delivery, placement and installation arranged on every order. Prices and availability are confirmed
            personally before payment.
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl md:text-3xl">You May Also Like</h2>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-bold text-bronze hover:text-bronze-dark">
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" /> Browse all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
