import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import ServiceFormCard from '@/components/admin/ServiceFormCard';
import { getDB } from '@/lib/db';

export const metadata: Metadata = { title: 'Manage Services' };

export default async function AdminServicesPage() {
  const services = getDB().services;

  return (
    <AdminShell active="services">
      <h1 className="font-display text-3xl">Services</h1>
      <p className="mt-2 text-sm text-ink-soft">
        These are proposed service categories. Turn off anything the business does not offer, or edit the copy.
      </p>
      <div className="mt-6 grid gap-6">
        {services.map((s) => (
          <ServiceFormCard key={s.id} service={s} />
        ))}
      </div>
    </AdminShell>
  );
}
