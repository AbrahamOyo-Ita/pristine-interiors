import type { Metadata } from 'next';
import { publicProducts } from '@/lib/db';
import CartView from '@/components/CartView';
import { PageHero } from '@/components/ui';

// Render fresh so cart product data always matches the live catalogue.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your furniture selection and send your order as a WhatsApp enquiry.',
};

export default function CartPage() {
  return (
    <>
      <PageHero
        tag="Your Cart"
        title="Review & Order"
        intro="Your cart is saved on this device between visits. Orders are completed as a WhatsApp enquiry so we can confirm availability and final pricing personally."
      />
      <div className="container-site py-10 md:py-14">
        <CartView allProducts={publicProducts()} />
      </div>
    </>
  );
}
