import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import SettingsForm from '@/components/admin/SettingsForm';
import { getDB } from '@/lib/db';

export const metadata: Metadata = { title: 'Homepage Settings' };

export default async function AdminSettingsPage() {
  const db = getDB();

  return (
    <AdminShell active="settings">
      <h1 className="font-display text-3xl">Homepage & Content</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Control the homepage hero, featured items and section visibility. Business contact details live in{' '}
        <code className="rounded bg-linen px-1.5 py-0.5 text-xs">src/lib/config.ts</code>.
      </p>
      <div className="mt-6">
        <SettingsForm settings={db.settings} products={db.products} projects={db.projects} />
      </div>
    </AdminShell>
  );
}
