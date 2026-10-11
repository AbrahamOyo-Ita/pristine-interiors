import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Images, MessageSquare, Package, CalendarClock } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { getDB } from '@/lib/db';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminDashboardPage() {
  const db = getDB();
  const stats = [
    { icon: Package, label: 'Products', value: db.products.length, sub: `${db.products.filter((p) => p.published).length} published`, href: '/admin/products' },
    { icon: Images, label: 'Projects', value: db.projects.length, sub: `${db.projects.filter((p) => p.published).length} published`, href: '/admin/projects' },
    { icon: MessageSquare, label: 'Enquiries', value: db.enquiries.length, sub: `${db.enquiries.filter((e) => e.status === 'new').length} new`, href: '/admin/enquiries' },
    { icon: CalendarClock, label: 'Consultations', value: db.consultations.length, sub: `${db.consultations.filter((c) => c.status === 'new').length} new`, href: '/admin/enquiries' },
  ];

  return (
    <AdminShell active="dashboard">
      <h1 className="font-display text-3xl">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition-shadow hover:shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{s.label}</p>
              <s.icon className="h-4 w-4 text-bronze" aria-hidden="true" />
            </div>
            <p className="mt-2 font-display text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-ink-soft">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Latest enquiries</h2>
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-xs font-bold text-bronze">
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          {db.enquiries.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No enquiries yet. They will appear here when visitors use the contact form.</p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/5">
              {db.enquiries.slice(0, 5).map((e) => (
                <li key={e.id} className="py-3">
                  <p className="text-sm font-semibold">{e.name} <span className="font-normal text-ink-soft">· {formatDate(e.createdAt)}</span></p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">{e.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Latest consultation requests</h2>
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-xs font-bold text-bronze">
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          {db.consultations.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No consultation requests yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/5">
              {db.consultations.slice(0, 5).map((c) => (
                <li key={c.id} className="py-3">
                  <p className="text-sm font-semibold">{c.fullName} <span className="font-normal text-ink-soft">· {c.projectType}</span></p>
                  <p className="mt-0.5 text-xs text-ink-soft">{c.location} · {formatDate(c.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
