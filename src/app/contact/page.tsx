import type { Metadata } from 'next';
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { business } from '@/lib/config';
import { waHref, waMessage } from '@/lib/whatsapp';
import ContactForm from '@/components/ContactForm';
import { PageHero } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${business.name} by phone, WhatsApp, email or the contact form.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="We’d love to hear from you"
        intro="Call, chat on WhatsApp, or send a message and we reply to every enquiry personally."
      />
      <div className="container-site grid gap-14 py-16 md:py-24 lg:grid-cols-[400px_1fr]">
        <Reveal>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            <a href={`tel:${business.phone.replace(/[^+0-9]/g, '')}`} className="group flex items-center gap-5 py-6">
              <span className="rounded-full border border-ink/15 p-3 text-bronze transition-colors group-hover:border-bronze">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">Call us</span>
                <span className="mt-1 block font-display text-lg tracking-tight group-hover:text-bronze">{business.phone}</span>
              </span>
            </a>
            <a href={waHref(waMessage.general())} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-6">
              <span className="rounded-full border border-ink/15 p-3 text-[#128C4B] transition-colors group-hover:border-[#128C4B]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">WhatsApp</span>
                <span className="mt-1 block font-display text-lg tracking-tight group-hover:text-[#128C4B]">Chat with us instantly</span>
              </span>
            </a>
            <a href={`mailto:${business.email}`} className="group flex items-center gap-5 py-6">
              <span className="rounded-full border border-ink/15 p-3 text-bronze transition-colors group-hover:border-bronze">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">Email</span>
                <span className="mt-1 block break-all font-display text-lg tracking-tight group-hover:text-bronze">{business.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-5 py-6">
              <span className="rounded-full border border-ink/15 p-3 text-bronze">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">Studio</span>
                <span className="mt-1 block font-display text-lg tracking-tight">{business.address}</span>
              </span>
            </div>
            <div className="flex items-center gap-5 py-6">
              <span className="rounded-full border border-ink/15 p-3 text-bronze">
                <Clock className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">Opening hours</span>
                <span className="mt-1 block font-display text-lg tracking-tight">{business.hours}</span>
              </span>
            </div>
          </div>

          {business.social.instagram || business.social.facebook ? (
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest2 text-ink-soft">Follow</span>
              {business.social.instagram ? (
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-ink/15 p-2.5 transition-colors hover:border-bronze hover:text-bronze">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              {business.social.facebook ? (
                <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-ink/15 p-2.5 transition-colors hover:border-bronze hover:text-bronze">
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 rounded-md border border-dashed border-bronze/40 p-6 text-center">
            <MapPin className="mx-auto h-5 w-5 text-bronze" aria-hidden="true" />
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              A Google Map of the studio will appear here once the verified business address is supplied.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
