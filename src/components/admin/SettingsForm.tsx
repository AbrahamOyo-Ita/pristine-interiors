'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Product, Project, Settings } from '@/lib/types';
import { settingsFormSchema } from '@/lib/zod-schemas';
import { saveSettings } from '@/lib/actions';

export default function SettingsForm({
  settings,
  products,
  projects,
}: {
  settings: Settings;
  products: Product[];
  projects: Project[];
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<string[]>(settings.featuredProductIds);
  const [featuredProjects, setFeaturedProjects] = useState<string[]>(settings.featuredProjectIds);
  const [showTestimonials, setShowTestimonials] = useState(settings.showTestimonials);
  const [showServices, setShowServices] = useState(settings.showServices);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      heroHeadline: settings.heroHeadline,
      heroHighlight: settings.heroHighlight,
      heroSub: settings.heroSub,
      featuredProductIds: featuredProducts,
      featuredProjectIds: featuredProjects,
      showTestimonials,
      showServices,
    },
  });

  function toggle(list: string[], set: (v: string[]) => void, id: string) {
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  function onSubmit(data: { heroHeadline: string; heroHighlight: string; heroSub: string }) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveSettings({
        ...data,
        featuredProductIds: featuredProducts,
        featuredProjectIds: featuredProjects,
        showTestimonials,
        showServices,
      });
      if (res.ok) setSaved(true);
      else setError(res.error ?? 'Failed to save settings.');
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <section className="card p-6">
        <h2 className="font-display text-xl">Hero section</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="heroHeadline" className="label">Headline *</label>
            <input id="heroHeadline" className="input" {...register('heroHeadline')} />
            {errors.heroHeadline ? <p className="field-error" role="alert">{errors.heroHeadline.message}</p> : null}
          </div>
          <div>
            <label htmlFor="heroHighlight" className="label">Highlight phrase (shown in gold) *</label>
            <input id="heroHighlight" className="input" {...register('heroHighlight')} />
            {errors.heroHighlight ? <p className="field-error" role="alert">{errors.heroHighlight.message}</p> : null}
          </div>
          <div>
            <label htmlFor="heroSub" className="label">Subheading *</label>
            <textarea id="heroSub" rows={2} className="input" {...register('heroSub')} />
            {errors.heroSub ? <p className="field-error" role="alert">{errors.heroSub.message}</p> : null}
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-xl">Homepage sections</h2>
        <div className="mt-4 grid gap-3">
          <label className="flex items-center gap-2.5 text-sm font-semibold">
            <input type="checkbox" className="h-4 w-4 accent-[#A87B3B]" checked={showServices} onChange={(e) => setShowServices(e.target.checked)} />
            Show services overview on the homepage
          </label>
          <label className="flex items-center gap-2.5 text-sm font-semibold">
            <input type="checkbox" className="h-4 w-4 accent-[#A87B3B]" checked={showTestimonials} onChange={(e) => setShowTestimonials(e.target.checked)} />
            Show testimonials section (sample content)
          </label>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-xl">Featured products (homepage)</h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {products.map((p) => (
            <label key={p.id} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#A87B3B]"
                checked={featuredProducts.includes(p.id)}
                onChange={() => toggle(featuredProducts, setFeaturedProducts, p.id)}
              />
              {p.name}
            </label>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-xl">Featured projects (homepage)</h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {projects.map((p) => (
            <label key={p.id} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#A87B3B]"
                checked={featuredProjects.includes(p.id)}
                onChange={() => toggle(featuredProjects, setFeaturedProjects, p.id)}
              />
              {p.title}
            </label>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Saving…' : 'Save homepage settings'}
        </button>
        {saved ? <p className="text-sm font-bold text-moss" role="status">Saved ✓</p> : null}
        {error ? <p className="field-error" role="alert">{error}</p> : null}
      </div>
    </form>
  );
}
