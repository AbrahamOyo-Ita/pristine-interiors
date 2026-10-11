'use client';

import { useRouter } from 'next/navigation';
import { projectCategories } from '@/lib/config';

export default function PortfolioFilter({ current }: { current: string }) {
  const router = useRouter();
  const options = [{ slug: 'all', label: 'All Projects' }, ...projectCategories];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {options.map((o) => (
        <button
          key={o.slug}
          type="button"
          onClick={() => router.replace(o.slug === 'all' ? '/portfolio' : `/portfolio?cat=${o.slug}`)}
          aria-pressed={current === o.slug}
          className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            current === o.slug ? 'bg-ink text-cream' : 'bg-white text-ink-soft shadow-card hover:text-bronze'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
