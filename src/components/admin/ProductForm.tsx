'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload } from 'lucide-react';
import type { Product } from '@/lib/types';
import { productCategories } from '@/lib/config';
import { productFormSchema, type ProductFormInput } from '@/lib/zod-schemas';
import { saveProduct, uploadImage } from '@/lib/actions';

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      category: product?.category ?? 'sofas',
      price: product ? (product.price !== null ? String(product.price) : '') : '',
      description: product?.description ?? '',
      imagesText: product?.images.join('\n') ?? '',
      stock: product?.stock ?? 'in-stock',
      published: product?.published ?? true,
    },
  });

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.set('file', file);
    const res = await uploadImage(fd);
    setUploading(false);
    e.target.value = '';
    if (res.ok) {
      const current = getValues('imagesText');
      setValue('imagesText', current ? `${current}\n${res.url}` : res.url, { shouldValidate: true });
    } else {
      setFormError(res.error);
    }
  }

  function onSubmit(data: ProductFormInput) {
    setFormError(null);
    startTransition(async () => {
      const res = await saveProduct(product?.id ?? '', data);
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setFormError(res.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="p-name" className="label">Product name *</label>
        <input id="p-name" className="input" {...register('name')} />
        {errors.name ? <p className="field-error" role="alert">{errors.name.message}</p> : null}
      </div>
      <div>
        <label htmlFor="p-category" className="label">Category *</label>
        <select id="p-category" className="input" {...register('category')}>
          {productCategories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="p-price" className="label">Price (₦, sample). Leave blank for on request</label>
        <input id="p-price" inputMode="numeric" className="input" placeholder="e.g. 850000" {...register('price')} />
        {errors.price ? <p className="field-error" role="alert">{errors.price.message}</p> : null}
      </div>
      <div>
        <label htmlFor="p-stock" className="label">Stock status *</label>
        <select id="p-stock" className="input" {...register('stock')}>
          <option value="in-stock">In stock</option>
          <option value="made-to-order">Made to order</option>
          <option value="out-of-stock">Out of stock</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="p-desc" className="label">Description *</label>
        <textarea id="p-desc" rows={4} className="input" {...register('description')} />
        {errors.description ? <p className="field-error" role="alert">{errors.description.message}</p> : null}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="p-images" className="label">Images (one path/URL per line; first is the cover) *</label>
        <textarea id="p-images" rows={4} className="input font-mono text-xs" placeholder={'/images/sofa-atom.jpg\nhttps://…'} {...register('imagesText')} />
        {errors.imagesText ? <p className="field-error" role="alert">{errors.imagesText.message}</p> : null}
        <div className="mt-2 flex items-center gap-3">
          <label className="btn-outline cursor-pointer !px-4 !py-2 text-xs">
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            {uploading ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={uploading} />
          </label>
          <p className="text-xs text-ink-soft">Uploads are stored in /public/uploads (demo storage).</p>
        </div>
      </div>
      <label className="flex items-center gap-2.5 text-sm font-semibold md:col-span-2">
        <input type="checkbox" className="h-4 w-4 accent-[#A87B3B]" {...register('published')} />
        Published (visible on the website)
      </label>
      {formError ? <p className="field-error md:col-span-2" role="alert">{formError}</p> : null}
      <div className="flex gap-3 md:col-span-2">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Saving…' : product ? 'Save changes' : 'Create product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
