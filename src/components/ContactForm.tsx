'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/zod-schemas';
import { submitEnquiry } from '@/lib/actions';

export default function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  function onSubmit(data: ContactInput) {
    setResult(null);
    startTransition(async () => {
      const res = await submitEnquiry({ ...data, source: 'contact' });
      setResult(res);
      if (res.ok) reset();
    });
  }

  if (result?.ok) {
    return (
      <div className="card px-8 py-12 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-moss" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
          Thank you for reaching out. Your enquiry has been saved and our team will reply as soon as possible.
        </p>
        <button type="button" onClick={() => setResult(null)} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card grid gap-5 p-6 md:p-8">
      <div>
        <label htmlFor="c-name" className="label">Your name *</label>
        <input id="c-name" className="input" autoComplete="name" {...register('name')} />
        {errors.name ? <p className="field-error" role="alert">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="label">Phone</label>
          <input id="c-phone" type="tel" className="input" autoComplete="tel" placeholder="+234 …" {...register('phone')} />
          {errors.phone ? <p className="field-error" role="alert">{errors.phone.message}</p> : null}
        </div>
        <div>
          <label htmlFor="c-email" className="label">Email</label>
          <input id="c-email" type="email" className="input" autoComplete="email" {...register('email')} />
          {errors.email ? <p className="field-error" role="alert">{errors.email.message}</p> : null}
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="label">Message *</label>
        <textarea id="c-message" rows={5} className="input" placeholder="How can we help?" {...register('message')} />
        {errors.message ? <p className="field-error" role="alert">{errors.message.message}</p> : null}
      </div>
      {result && !result.ok ? <p className="field-error" role="alert">{result.error}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {pending ? 'Sending…' : 'Send Message'}
      </button>
      <p className="text-center text-xs text-ink-soft">Provide a phone number or an email so we can reply to you.</p>
    </form>
  );
}
