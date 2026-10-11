import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest2 text-bronze-dark">404</p>
      <h1 className="mt-4 text-4xl md:text-5xl">This page has wandered off</h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
        The page you are looking for does not exist or has moved. Let us take you back to somewhere beautiful.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/shop" className="btn-outline">
          Browse the Collection
        </Link>
      </div>
    </section>
  );
}
