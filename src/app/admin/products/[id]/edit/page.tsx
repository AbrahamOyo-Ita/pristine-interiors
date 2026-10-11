import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ProductForm from '@/components/admin/ProductForm';
import { getDB } from '@/lib/db';

export const metadata: Metadata = { title: 'Edit Product' };

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = getDB().products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <AdminShell active="products">
      <h1 className="font-display text-3xl">Edit: {product.name}</h1>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </AdminShell>
  );
}
