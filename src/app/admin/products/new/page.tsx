import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import ProductForm from '@/components/admin/ProductForm';

export const metadata: Metadata = { title: 'New Product' };

export default function NewProductPage() {
  return (
    <AdminShell active="products">
      <h1 className="font-display text-3xl">New Product</h1>
      <p className="mt-2 text-sm text-ink-soft">Prices entered here are demonstration prices until verified.</p>
      <div className="mt-6">
        <ProductForm />
      </div>
    </AdminShell>
  );
}
