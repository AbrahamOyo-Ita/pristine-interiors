'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import { nav, business } from '@/lib/config';
import { useCart } from './CartProvider';

function Logo({ light }: { light: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${business.name} — home`}>
      <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
        <circle cx="9" cy="11" r="7" fill="#E0A458" />
        <circle cx="17" cy="11" r="7" fill="#C4863C" fillOpacity="0.85" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-tight ${light ? 'text-cream' : 'text-ink'}`}>Pristine</span>
        <span className={`mt-1 text-[8px] font-bold uppercase tracking-[0.22em] ${light ? 'text-cream/60' : 'text-ink-soft'}`}>
          {business.tagline}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, loaded } = useCart();
  const onDark = pathname === '/';

  useEffect(() => setOpen(false), [pathname]);

  const linkCls = (active: boolean) =>
    `text-[13px] font-semibold transition-colors ${
      onDark
        ? active
          ? 'text-bronze'
          : 'text-cream/80 hover:text-bronze'
        : active
          ? 'text-bronze-dark'
          : 'text-ink-soft hover:text-bronze-dark'
    }`;

  return (
    <header
      className={
        onDark
          ? 'absolute inset-x-0 top-0 z-40'
          : 'sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur-md'
      }
    >
      <div className="container-site grid h-20 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-3">
        {/* left: logo */}
        <div className="flex items-center">
          <Logo light={onDark} />
        </div>

        {/* center nav on desktop */}
        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkCls(pathname === item.href)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* right: cart + CTA + burger */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className={`icon-circle ${
              onDark ? 'bg-cream/10 text-cream hover:bg-bronze hover:text-ink' : 'bg-white text-ink shadow-card hover:text-bronze-dark'
            } relative`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {loaded && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-bronze px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </Link>
          <Link href="/book-consultation" className={`hidden md:inline-flex ${onDark ? 'btn-light' : 'btn-primary'} !px-6 !py-3`}>
            Contact Us
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`icon-circle lg:hidden ${onDark ? 'bg-cream/10 text-cream' : 'bg-white text-ink shadow-card'}`}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" className={`border-t lg:hidden ${onDark ? 'border-cream/10 bg-ink/95 backdrop-blur' : 'border-ink/5 bg-cream'}`} aria-label="Mobile navigation">
          <div className="container-site flex flex-col gap-1 py-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-semibold ${
                  onDark
                    ? pathname === item.href
                      ? 'bg-cream/10 text-bronze'
                      : 'text-cream/85 hover:bg-cream/5'
                    : pathname === item.href
                      ? 'bg-linen text-bronze-dark'
                      : 'text-ink hover:bg-linen'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/book-consultation" className="btn-gold mt-3">
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
