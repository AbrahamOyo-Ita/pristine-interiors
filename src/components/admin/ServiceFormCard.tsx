'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Service } from '@/lib/types';
import { serviceFormSchema, type ServiceFormInput } from '@/lib/zod-schemas';
import { saveService } from '@/lib/actions';

export default function ServiceFormCard({ service }: { service: Service }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormInput>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: service.title,
      blurb: service.blurb,
      pointsText: service.points.join('\n'),
      active: service.active,
    },
  });

  function onSubmit(data: ServiceFormInput) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveService(service.id, data);
      if (res.ok) setSaved(true);
      else setError(res.error ?? 'Failed to save.');
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`s-title-${service.id}`} className="label">Service title *</label>
          <input id={`s-title-${service.id}`} className="input" {...register('title')} />
          {errors.title ? <p className="field-error" role="alert">{errors.title.message}</p> : null}
        </div>
        <label className="flex items-end gap-2.5 pb-2.5 text-sm font-semibold">
          <input type="checkbox" className="h-4 w-4 accent-[#A87B3B]" {...register('active')} />
          Offered on the website
        </label>
      </div>
      <div className="mt-4">
        <label htmlFor={`s-blurb-${service.id}`} className="label">Short description *</label>
        <textarea id={`s-blurb-${service.id}`} rows={2} className="input" {...register('blurb')} />
        {errors.blurb ? <p className="field-error" role="alert">{errors.blurb.message}</p> : null}
      </div>
      <div className="mt-4">
        <label htmlFor={`s-points-${service.id}`} className="label">Bullet points (one per line) *</label>
        <textarea id={`s-points-${service.id}`} rows={4} className="input" {...register('pointsText')} />
        {errors.pointsText ? <p className="field-error" role="alert">{errors.pointsText.message}</p> : null}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={pending} className="btn-primary !px-5 !py-2 text-xs disabled:opacity-60">
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : null} Save service
        </button>
        {saved ? <p className="text-xs font-bold text-moss" role="status">Saved ✓</p> : null}
        {error ? <p className="field-error" role="alert">{error}</p> : null}
      </div>
    </form>
  );
}
