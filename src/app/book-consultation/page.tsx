import type { Metadata } from 'next';
import { CalendarCheck, MessageSquare, PencilRuler } from 'lucide-react';
import ConsultationForm from '@/components/ConsultationForm';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Request an interior design consultation. Tell us about your project and we will contact you to confirm a time.',
};

const steps = [
  { icon: MessageSquare, t: '1 · Send a request', b: 'Tell us about your space and goals using the form.' },
  { icon: CalendarCheck, t: '2 · We confirm', b: 'We contact you by phone or WhatsApp to agree a time.' },
  { icon: PencilRuler, t: '3 · We design', b: 'Your consultation kicks off the design conversation.' },
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        tag="Consultation"
        title="Book a Design Consultation"
        intro="A request is the first step, and your consultation is confirmed once our team gets in touch with you."
      />
      <div className="container-site grid gap-10 py-14 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-4">
          {steps.map((s) => (
            <div key={s.t} className="card flex gap-4 p-5">
              <s.icon className="h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
              <div>
                <p className="font-display text-base">{s.t}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.b}</p>
              </div>
            </div>
          ))}
          <p className="rounded-md bg-linen px-4 py-3 text-xs leading-relaxed text-ink-soft">
            Prefer to talk right away? Use the floating WhatsApp button and we’ll take it from there.
          </p>
        </aside>
        <ConsultationForm />
      </div>
    </>
  );
}
