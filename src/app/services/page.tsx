import type { Metadata } from 'next';
import {
  Armchair,
  ArrowRight,
  Building2,
  Check,
  Gem,
  Home,
  MessageCircle,
  Paintbrush,
  PencilRuler,
} from 'lucide-react';
import { getDB } from '@/lib/db';
import { waMessage } from '@/lib/whatsapp';
import { CTALink, PageHero, WhatsAppLink } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Residential & commercial interior design, space planning, furniture supply, bespoke furniture and interior decoration.',
};

// Always render fresh so admin service edits appear without a rebuild.
export const dynamic = 'force-dynamic';

const icons = [Home, Building2, PencilRuler, Armchair, Gem, Paintbrush];

export default function ServicesPage() {
  const services = getDB().services.filter((s) => s.active);

  return (
    <>
      <PageHero
        tag="Services"
        title="From First Sketch to Final Styling"
        intro="Our proposed service categories. Each engagement is shaped around your space, timeline and budget."
      />
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.id} delay={i * 70}>
                <article className="card h-full rounded-[24px] p-8 transition-shadow hover:shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-circle bg-bronze-faint text-bronze-dark">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-extrabold tracking-widest2 text-ink/30">0{i + 1}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.blurb}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze-dark" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <CTALink href="/book-consultation" className="!px-6 !py-3">
                      Book This Service <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </CTALink>
                    <WhatsAppLink message={`Hello! I'd like to ask about your "${s.title}" service.`} variant="outline" className="!px-6 !py-3">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask on WhatsApp
                    </WhatsAppLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-xs text-ink-soft">
          Service categories are proposed and can be updated by the business at any time via the admin dashboard.
        </p>
      </div>
    </>
  );
}
