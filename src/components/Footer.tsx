import Link from 'next/link';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { business, nav, hasSampleContactDetails } from '@/lib/config';
import { waHref, waMessage } from '@/lib/whatsapp';

function FootHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-bold text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-cream">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${business.name} — home`}>
            <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
              <circle cx="9" cy="11" r="7" fill="#E0A458" />
              <circle cx="17" cy="11" r="7" fill="#C4863C" fillOpacity="0.85" />
            </svg>
            <span className="text-lg font-extrabold tracking-tight">Pristine</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
            A boutique interior design studio and furniture brand crafting warm, elegant, functional spaces for homes
            and businesses across Nigeria.
          </p>
          <div className="mt-6 flex gap-3">
            {business.social.instagram ? (
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-circle bg-white text-ink shadow-card hover:bg-bronze hover:text-ink">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            {business.social.facebook ? (
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="icon-circle bg-white text-ink shadow-card hover:bg-bronze hover:text-ink">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <a href={waHref(waMessage.general())} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="icon-circle bg-white text-ink shadow-card hover:bg-[#128C4B] hover:text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <FootHeading>Explore</FootHeading>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-bronze-dark">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="transition-colors hover:text-bronze-dark">
                Your Cart
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <FootHeading>Services</FootHeading>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>Residential Design</li>
            <li>Commercial Design</li>
            <li>Space Planning & Styling</li>
            <li>Furniture Supply</li>
            <li>Bespoke Furniture</li>
            <li>
              <Link href="/services" className="link-line text-bronze-dark">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FootHeading>Contact</FootHeading>
          <ul className="mt-5 space-y-4 text-sm text-ink-soft">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze-dark" aria-hidden="true" />
              <a href={`tel:${business.phone.replace(/[^+0-9]/g, '')}`} className="hover:text-bronze-dark">
                {business.phone}
                {business.phoneIsSample ? ' (sample)' : ''}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze-dark" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="break-all hover:text-bronze-dark">
                {business.email}
                {business.emailIsSample ? ' (sample)' : ''}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-dark" aria-hidden="true" />
              <span>{business.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bronze-dark" aria-hidden="true" />
              <span>{business.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            {hasSampleContactDetails ? <span>Demo website, sample content until business details are verified.</span> : null}
            <Link href="/admin/login" className="hover:text-bronze-dark">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
