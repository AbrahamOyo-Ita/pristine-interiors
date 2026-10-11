import Link from 'next/link';
import type { ReactNode } from 'react';
import { waHref } from '@/lib/whatsapp';

export function SectionTag({
  children,
  light = false,
  center = false,
}: {
  children: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest2 ${
        center ? 'justify-center' : ''
      } ${light ? 'text-cream/70' : 'text-ink-soft'}`}
    >
      <span className="h-px w-8 bg-bronze" aria-hidden="true" />
      {children}
    </p>
  );
}

type Variant = 'primary' | 'light' | 'gold' | 'outline' | 'outline-light' | 'whatsapp';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  light: 'btn-light',
  gold: 'btn-gold',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-light',
  whatsapp: 'btn-whatsapp',
};

export function CTALink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function WhatsAppLink({
  message,
  children,
  variant = 'whatsapp',
  className = '',
}: {
  message: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a href={waHref(message)} target="_blank" rel="noopener noreferrer" className={`${variantClass[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function PageHero({ tag, title, intro }: { tag: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-ink/5 bg-cream">
      <div className="container-site py-16 md:py-24">
        <SectionTag>{tag}</SectionTag>
        <h1 className="max-w-4xl text-4xl leading-[1.1] md:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{intro}</p> : null}
      </div>
    </section>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="card mx-auto max-w-lg px-8 py-14 text-center">
      <p className="text-2xl font-bold">{title}</p>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
