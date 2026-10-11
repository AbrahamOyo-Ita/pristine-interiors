'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload } from 'lucide-react';
import type { Project } from '@/lib/types';
import { projectCategories } from '@/lib/config';
import { projectFormSchema, type ProjectFormInput } from '@/lib/zod-schemas';
import { saveProject, uploadImage } from '@/lib/actions';

export default function ProjectForm({ project }: { project?: Project }) {
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
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title ?? '',
      category: project?.category ?? 'living-rooms',
      location: project?.location ?? '',
      cover: project?.cover ?? '',
      imagesText: project?.images.join('\n') ?? '',
      summary: project?.summary ?? '',
      approach: project?.approach ?? '',
      materialsText: project?.materials.join('\n') ?? '',
      published: project?.published ?? true,
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
      const next = current ? `${current}\n${res.url}` : res.url;
      setValue('imagesText', next, { shouldValidate: true });
      if (!getValues('cover')) setValue('cover', res.url);
    } else {
      setFormError(res.error);
    }
  }

  function onSubmit(data: ProjectFormInput) {
    setFormError(null);
    startTransition(async () => {
      const res = await saveProject(project?.id ?? '', data);
      if (res.ok) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        setFormError(res.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="j-title" className="label">Project title *</label>
        <input id="j-title" className="input" {...register('title')} />
        {errors.title ? <p className="field-error" role="alert">{errors.title.message}</p> : null}
      </div>
      <div>
        <label htmlFor="j-category" className="label">Category *</label>
        <select id="j-category" className="input" {...register('category')}>
          {projectCategories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="j-location" className="label">Location *</label>
        <input id="j-location" className="input" placeholder="e.g. Nwaniba, Uyo" {...register('location')} />
        {errors.location ? <p className="field-error" role="alert">{errors.location.message}</p> : null}
      </div>
      <div>
        <label htmlFor="j-cover" className="label">Cover image path/URL *</label>
        <input id="j-cover" className="input font-mono text-xs" {...register('cover')} />
        {errors.cover ? <p className="field-error" role="alert">{errors.cover.message}</p> : null}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="j-summary" className="label">Summary *</label>
        <textarea id="j-summary" rows={3} className="input" {...register('summary')} />
        {errors.summary ? <p className="field-error" role="alert">{errors.summary.message}</p> : null}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="j-approach" className="label">Design approach *</label>
        <textarea id="j-approach" rows={3} className="input" {...register('approach')} />
        {errors.approach ? <p className="field-error" role="alert">{errors.approach.message}</p> : null}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="j-materials" className="label">Materials & finishes (one per line)</label>
        <textarea id="j-materials" rows={3} className="input" {...register('materialsText')} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="j-images" className="label">Gallery images (one path/URL per line) *</label>
        <textarea id="j-images" rows={4} className="input font-mono text-xs" {...register('imagesText')} />
        {errors.imagesText ? <p className="field-error" role="alert">{errors.imagesText.message}</p> : null}
        <div className="mt-2 flex items-center gap-3">
          <label className="btn-outline cursor-pointer !px-4 !py-2 text-xs">
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            {uploading ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={uploading} />
          </label>
          <p className="text-xs text-ink-soft">Uploaded images are added to the gallery list above.</p>
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
          {pending ? 'Saving…' : project ? 'Save changes' : 'Create project'}
        </button>
        <button type="button" onClick={() => router.push('/admin/projects')} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
