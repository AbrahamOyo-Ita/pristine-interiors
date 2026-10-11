'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { consultationSchema, type ConsultationInput } from '@/lib/zod-schemas';
import { submitConsultation } from '@/lib/actions';
import { WhatsAppLink } from './ui';
import { waMessage } from '@/lib/whatsapp';

const projectTypes = [
  'Residential interior design',
  'Commercial interior design',
  'Space planning & styling',
  'Furniture supply',
  'Bespoke furniture / custom pieces',
  'Interior decoration & finishing',
  'Other',
];

const budgets = ['Under ₦1m', '₦1m to ₦5m', '₦5m to ₦15m', 'Above ₦15m', 'Not sure yet'];

export default function ConsultationForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; id?: string; error?: string } | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { fullName: '', phone: '', email: '', projectType: '', location: '', budget: '', preferredDate: '', description: '' },
  });

  function onSubmit(data: ConsultationInput) {
    setResult(null);
    startTransition(async () => {
      const res = await submitConsultation(data);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="card px-8 py-12 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-moss" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl">Consultation request received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Thank you. Your request <span className="font-bold text-ink">#{result.id?.slice(0, 8)}</span> has been saved.
          Our team will contact you to confirm a consultation time. A request is not a confirmed booking until we get in
          touch.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppLink message={waMessage.consultation()}>Continue on WhatsApp</WhatsAppLink>
          <button type="button" onClick={() => setResult(null)} className="btn-outline">
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="fullName" className="label">Full name *</label>
        <input id="fullName" className="input" autoComplete="name" {...register('fullName')} />
        {errors.fullName ? <p className="field-error" role="alert">{errors.fullName.message}</p> : null}
      </div>
      <div>
        <label htmlFor="phone" className="label">Phone number *</label>
        <input id="phone" type="tel" className="input" autoComplete="tel" placeholder="+234 …" {...register('phone')} />
        {errors.phone ? <p className="field-error" role="alert">{errors.phone.message}</p> : null}
      </div>
      <div>
        <label htmlFor="email" className="label">Email address (optional)</label>
        <input id="email" type="email" className="input" autoComplete="email" {...register('email')} />
        {errors.email ? <p className="field-error" role="alert">{errors.email.message}</p> : null}
      </div>
      <div>
        <label htmlFor="projectType" className="label">Type of project *</label>
        <select id="projectType" className="input" {...register('projectType')}>
          <option value="">Select…</option>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.projectType ? <p className="field-error" role="alert">{errors.projectType.message}</p> : null}
      </div>
      <div>
        <label htmlFor="location" className="label">Property location *</label>
        <input id="location" className="input" placeholder="e.g. Nwaniba, Uyo" {...register('location')} />
        {errors.location ? <p className="field-error" role="alert">{errors.location.message}</p> : null}
      </div>
      <div>
        <label htmlFor="budget" className="label">Estimated budget range</label>
        <select id="budget" className="input" {...register('budget')}>
          <option value="">Prefer not to say</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="preferredDate" className="label">Preferred consultation date</label>
        <input id="preferredDate" type="date" min={today} className="input" {...register('preferredDate')} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="description" className="label">Project description *</label>
        <textarea id="description" rows={5} className="input" placeholder="Tell us about the space, what you love, and what isn't working…" {...register('description')} />
        {errors.description ? <p className="field-error" role="alert">{errors.description.message}</p> : null}
      </div>
      {result && !result.ok ? (
        <p className="field-error md:col-span-2" role="alert">{result.error}</p>
      ) : null}
      <div className="md:col-span-2">
        <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Sending…' : 'Request a Consultation'}
        </button>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Submitting sends a request, and we will contact you to confirm. No booking is final until confirmed.
        </p>
      </div>
    </form>
  );
}
